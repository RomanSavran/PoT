import * as types from '../actionTypes/tree';
import * as API from '../services/api/api';
import { dataKeeperService } from '../services/dataKeeper';
import queryString from 'query-string';

export const toTreeNodeModel = (elem) => {
    let result = {};

    try {
        let name = Reflect.get(elem, '@id') || '';

        result = {
            name: name ? name.split(':')[1] : '',
            label: name ? name.split(':')[1] : '',
            _collapsed: true,
            children: []
        };

    }catch (err) {
        console.log('parse tree response error: ', err);
    }

    return result;
};

const getTreeNode = (rs) => {
    return new Promise((resolve) => {
        API.FETCH(rs).then((data) => {
            resolve(data);
        },(err) => {
            resolve({res: [], rs: rs});
        });
    });
};

export function GET_tree(nodeData, path, event) {
    return ( dispatch, getState ) => {
        let state = getState();
        let treeData = JSON.parse(JSON.stringify(state.tree.data));
        let restUrl = queryString.parse(path);

        let reqUrl = '';
        let reqPrefix;
        let reqPromises = [];

        restUrl = restUrl.api.split('/');
        restUrl = restUrl.filter(item => item); //delete all ""

        const findTreeElem = (tree, key, children, originData) => {
            for( const treeElem of tree ) {
                if( treeElem.name === key ) {
                    treeElem.children = children ? children : treeElem.children;
                    treeElem.originData = originData;

                    if( event === 'page' ) {
                        treeElem._collapsed = false;
                    }
                    if( event === 'node' ) {
                        treeElem._collapsed = nodeData._collapsed;
                    }
                    break;
                }else {
                    findTreeElem(treeElem.children, key, children, originData);
                }
            }
        };

        for( const urlPart of restUrl ) {
            reqUrl += reqUrl ? '/' + urlPart : urlPart;

            if( !dataKeeperService.treeRestApi.get(urlPart) ) {
                let reqSettings = {
                    url: null,
                    key: null,
                    method: 'get'
                };

                reqPrefix = reqUrl.split('/');

                reqSettings.url = reqUrl + '/' + reqPrefix[reqPrefix.length - 1] + '.jsonld';
                reqSettings.key = urlPart;
                reqSettings.path = reqUrl;

                dataKeeperService.treeRestApi.set(urlPart, true);
                reqPromises.push(getTreeNode(reqSettings));
            }
        }

        // if no need load data - we just show node info
        if( reqPromises.length ) {
            dispatch({ type: types.REQ_PROCESS });

            Promise.all(reqPromises).then((allData) => {
                let nodeInfoData = event === 'node'
                    ? {
                    json: null,
                    name: allData[0].rs.key
                }
                    : null;

                for( const data of allData ) {
                    if( data.res.data && data.res.data.defines ) {
                        let modelData = [], modelItem;

                        if( event === 'node' ) {
                            nodeInfoData.json = JSON.stringify(data.res.data.defines, null, 2);
                        }

                        for( const child of data.res.data.defines ) {
                            modelItem = toTreeNodeModel(child);

                            modelItem.path = data.rs.path + '/' + modelItem.name;
                            modelData.push( modelItem );
                        }

                        findTreeElem(treeData, data.rs.key, modelData, data.res.data.defines);
                    }
                }

                dispatch({ type: types.GET_TREE_DONE, treeData: treeData, selectedNode: nodeInfoData });
            });
        }else {
            const node = {
                name: nodeData.label,
                json: JSON.stringify(nodeData.originData, null, 2)
            };

            findTreeElem(treeData, nodeData.name, null, nodeData.originData);

            dispatch({ type: types.GET_TREE_DONE, treeData: treeData, selectedNode: node });
            //dispatch({ type: types.SELECT_NODE, node: node });
        }
    }
}

export function Unmount() {
    return ( dispatch, getState ) => {
        dispatch({ type: types.UNMOUNT_TREE, treeData: dataKeeperService.initialTreeData });
    }
}