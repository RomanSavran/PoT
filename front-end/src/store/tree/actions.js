import * as types from './actionTypes';
import * as API from '../../services/api/api';
import { toTreeNodeModel } from '../../reducers/index';
import { globalStore } from '../../modules/_index';
import queryString from 'query-string';

const getTreeNode = (rs) => {
    return new Promise((resolve) => {
        API.FETCH(rs).then((data) => {
            resolve(data);
        },(err) => {
            resolve({res: [], rs: rs});
        });
    });
};

export function GET_tree(path) {
    return ( dispatch, getState ) => {
        let state = getState();
        let treeData = JSON.parse(JSON.stringify(state.tree.treeData));
        let restUrl = queryString.parse(path);

        let reqUrl = '';
        let reqPrefix;
        let reqPromises = [];

        restUrl = restUrl.api.split('/');
        restUrl = restUrl.filter(item => item); //delete all ""

        for( const urlPart of restUrl ) {
            reqUrl += reqUrl ? '/' + urlPart : urlPart;

            if( !globalStore.treeRestApi.get(urlPart) ) {
                let reqSettings = {
                    url: null,
                    key: null,
                    method: 'get'
                };

                reqPrefix = reqUrl.split('/');

                reqSettings.url = reqUrl + '/' + reqPrefix[reqPrefix.length - 1] + '.jsonld';
                reqSettings.key = urlPart;
                reqSettings.path = reqUrl;

                globalStore.treeRestApi.set(urlPart, true);
                reqPromises.push(getTreeNode(reqSettings));
            }
        }

        if( reqPromises.length ) {
            dispatch({ type: types.REQ_PROCESS });

            Promise.all(reqPromises).then((allData) => {
                const findTreeElem = (elem, key, children, originData) => {
                    if( elem.name === key ) {
                        elem.children = children;
                        elem.originData = originData;

                        return true;
                    }else {
                        for( const treeElem of elem.children ) {
                            findTreeElem(treeElem, key, children, originData);
                        }
                    }
                };

                for( const data of allData ) {
                    if( data.res.data && data.res.data.defines ) {
                        let modelData = [], modelItem;

                        for( const child of data.res.data.defines ) {
                            modelItem = toTreeNodeModel(child);

                            modelItem.path = data.rs.path + '/' + modelItem.name;
                            modelData.push( modelItem );
                        }
                        for( const treeElem of treeData ) {
                            findTreeElem(treeElem, data.rs.key, modelData, data.res.data.defines);
                        }
                    }
                }

                dispatch({ type: types.GET_TREE_DONE, treeData: treeData });
            });
        }
    }
}

export function ShowNodeInfo(data) {
    return ( dispatch, getState ) => {
        const node = {
            name: data.label,
            json: JSON.stringify(data.originData, null, 2)
        };
        dispatch({ type: types.SELECT_NODE, node: node, showNodeInfo: true });
    }
}
export function Unmount() {
    return ( dispatch, getState ) => {
        dispatch({ type: types.UNMOUNT_TREE, treeData: globalStore.initialTreeData });
    }
}