import * as types from './actionTypes';
import * as API from '../../services/api/api'
import * as helper from '../../helpers/index'

import Alert from '../../components/layouts/Alert'

const toProjectModel = (data) => {
    let result = [];

    try {
        data.forEach((item) => {
            result.push({
                name: helper.getProp(item, 'Name'),
                projectLeader: helper.getProp(item, 'ProjectLeader'),
                projectLeaderName: helper.getProp(item.ProjectLeader, 'Name'),
                projectLeaderId: helper.getProp(item.ProjectLeader, 'Id'),
                customer: helper.getProp(item, 'Customer'),
                customerName: helper.getProp(item.Customer, 'Name'),
                customerId: helper.getProp(item.Customer, 'Id'),
                startDate: helper.getProp(item, 'StartDate'),
                endDate: helper.getProp(item, 'EndDate'),
                constructionSite: helper.getProp(item, 'ConstructionSite'),
                constructionSiteName: helper.getProp(item.ConstructionSite, 'Name'),
                constructionSiteId: helper.getProp(item.ConstructionSite, 'Id'),
                location: helper.getProp(item, 'Location'),
                locationAddress: helper.getProp(item.Location, 'StreetAddress'),
                stateCode: helper.getProp(item, 'StateCode'),
                selected: false,
                id: item.Id || ''
            });
        });
    }catch (err) {
        console.log('parse projects response error: ', err);
    }
    return result;
};

export function GET_projects() {
    return ( dispatch, getState ) => {
        dispatch({ type: types.REQ_PROCESS });

        const responseHandler = (success, text, data) => {
            if(success) {
                const response = toProjectModel(data);

                if( process.env.NODE_ENV !== 'production' ) {
                    setTimeout(() => {
                        dispatch({ type: types.GET_CP_DONE, projects: response});
                    }, 2000);
                }else {
                    dispatch({ type: types.GET_CP_DONE, projects: response });
                }
            }else {
                dispatch({ type: types.GET_CP_DONE, projects: data });
                alert('Get projects error. Status: ' + text);
            }
        };

        API.GET('project/GetProjectsByOwnerName')
            .then((res) => {
                responseHandler(true, '', res.data);
            }, (err) => {
                responseHandler(false, err, []);
            });
    }
}
export function DELETE_project() {
    return ( dispatch, getState ) => {
        const _ok = () => {
            _close();
            dispatch({ type: types.REQ_PROCESS });

            const toSend = selected.reduce((arr, item) => { if(item.stateCode == 1) arr.push(item.id); return arr; }, []);
            const newData = data.reduce((store, elem) => {
                if( !toSend.includes(elem.id) ) store.push(elem);
                return store;
            }, []);

            const responseHandler = (success, text, data) => {
                if(success) {
                    if( process.env.NODE_ENV !== 'production' ) {
                        setTimeout(() => {
                            dispatch({ type: types.DELETE_CP_DONE, projects: data, selectedRecords: []});
                        }, 2000);
                    }else {
                        dispatch({ type: types.DELETE_CP_DONE, projects: data, selectedRecords: [] });
                    }
                }else {
                    dispatch({ type: types.DELETE_CP_DONE, projects: data, selectedRecords: [] });
                    alert('Remove records error. Status: ' + text);
                }
            };

            API.POST('project/DeleteProject', JSON.stringify(toSend) )
                .then((res) => {
                    if( res.data.hasOwnProperty('Success') && res.data.Success ) {
                        responseHandler(true, '', newData);
                    }else {
                        responseHandler(false, res.status, data);
                    }
                },(error) => {
                    responseHandler(false, error, data);
                });
        };
        const _close = () => {
            dispatch({ type: types.SHOW_CP_POPUP, popupMode: false, popupParams: null });
        };

        const state = getState();
        const selected = JSON.parse(JSON.stringify(state.configProj.selectedRecords));
        const data = JSON.parse(JSON.stringify(state.configProj.projects));
        const alertText = selected.length > 1
                            ? 'Oletko varma, että haluat aktivoida nämä hankkeet?'
                            : 'Oletko varma, että haluat poistaa tämän projektin?';

        dispatch({ type: types.SHOW_CP_POPUP, popupMode: true, popupParams: {title: 'Alert', body: Alert({text:alertText}), popupOk: _ok, popupClose: _close} });
    }
}
export function ACTIVATE_project() {
    return ( dispatch, getState ) => {
        
    }
}
export function EDIT_project() {
    return ( dispatch, getState ) => {
        
    }
}

export function selectRow(id, val) {
    return ( dispatch, getState ) => {
        const state = getState();
        const data = JSON.parse(JSON.stringify(state.configProj.projects));

        let selectedRecords;

        for (let i = 0; i < data.length; i += 1) {
            const item = data[i];

            if(item.id == id) {
                item.selected = val;
                break;
            }
        }

        selectedRecords = data.reduce(function(store, elem) {
            if ( !store.some((item)=>item.id==elem.id) && elem.selected ) store.push(elem);
            return store;
        },[]);

        dispatch({ type: types.SELECT_CP_ROW, projects: data, selectedRecords: selectedRecords });
    }
}

export function Unmount() {
    return ( dispatch, getState ) => {
        dispatch({ type: types.UNMOUNT_CP, popupMode: false, selectedRecords: [], projects: [] });
    }
}