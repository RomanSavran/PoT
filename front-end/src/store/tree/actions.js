import * as types from './actionTypes';
import * as API from '../../services/api/api'
import { treeTube } from '../../reducers/index'
import { globalStore } from '../../modules/_index'


export function GET_tree(path) {
    return ( dispatch, getState ) => {
        dispatch({ type: types.REQ_PROCESS });

        let state = getState();
        let treeData = JSON.parse(JSON.stringify(state.tree.treeData));
        let restUrl = path.split('/');

        let reqSettings = {
            url: null,
            key: null,
            method: 'get'
        };
        let reqUrl = '';
        let reqPrefix;
        let reqPromises = [];

        restUrl = restUrl.filter(item => item); //delete all ""

        for( const urlPart of restUrl ) {
            reqUrl += reqUrl ? '/' + urlPart : urlPart;

            if( !globalStore.treeRestApi.get(urlPart) ) {
                reqPrefix = reqUrl.split('/');

                reqSettings.url = reqUrl + '/' + reqPrefix[reqPrefix.length - 1] + '.jsonld';
                reqSettings.key = urlPart;
                reqSettings.path = reqUrl;

                globalStore.treeRestApi.set(urlPart, true);
                reqPromises.push(API.FETCH(reqSettings));
            }
        }

        Promise.all(reqPromises).then((allData) => {
            const findTreeElem = (elem, key, children) => {
                if( elem.name === key ) {
                    elem.children = children;

                    return;
                }else {
                    for( const treeElem of elem.children ) {
                        findTreeElem(treeElem, key, children);
                    }
                }
            };

            for( const data of allData ) {
                if( data.res && data.res.data.defines ) {
                    let modelData = [], modelItem;

                    for( const child of data.res.data.defines ) {
                        modelItem = treeTube(child);

                        modelItem.path = data.rs.path + '/' + modelItem.name;
                        modelData.push( modelItem );
                    }
                    for( const treeElem of treeData ) {
                        findTreeElem(treeElem, data.rs.key, modelData);
                    }
                }
            }

            dispatch({ type: types.GET_TREE_DONE, treeData: treeData });
        });
    }
}

export function nodeClick(data) {
    return ( dispatch, getState ) => {
        
    }
}
export function Unmount() {
    return ( dispatch, getState ) => {
        dispatch({ type: types.UNMOUNT_TREE });
    }
}