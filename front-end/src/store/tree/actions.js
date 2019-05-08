import * as types from './actionTypes';
import * as API from '../../services/api/api'
import { treeTube } from '../../reducers/index'


export function GET_tree(path) {
    return ( dispatch, getState ) => {
        dispatch({ type: types.REQ_PROCESS });

        const responseHandler = (success, text, data) => {
            if(success) {
                let response = [];

                if( data.defines ) {
                    for( const child of data.defines ) {
                        response.push( treeTube(child) );
                    }
                }

                dispatch({ type: types.GET_TREE_DONE, treeData: {name: 'contexts', root: true, children: response} });
            }else {
                dispatch({ type: types.GET_TREE_DONE, treeData: [] });
                alert('Get tree data error. Status: ' + text);
            }
        };

        let rs = {
            url: '',
            method: 'get'
        };
        let namePrefix;

        switch (path) {
            case '/contexts':
                rs.url = 'contexts';
                break;
        }

        namePrefix = rs.url.split('/');
        rs.url = rs.url + '/' + namePrefix[namePrefix.length - 1] + '.jsonld';

        API.FETCH(rs)
            .then((res) => {
                responseHandler(true, '', res.data);
            }, (err) => {
                responseHandler(false, err, []);
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