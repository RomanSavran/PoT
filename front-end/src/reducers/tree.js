import * as types from '../actionTypes/tree';
import { dataKeeperService } from '../services/dataKeeper'

export const updateTree = (state, action) => {
    if( state == undefined ) {
        return {
            data: dataKeeperService.initialTreeData,
            selectedNode: null,
            isFetching: false
        }
    }

    switch (action.type) {
        case types.GET_TREE_DONE:
            return {
                ...state.tree,
                data: action.treeData,
                selectedNode: action.selectedNode,
                isFetching: false
            };
        case types.SELECT_NODE:
            return {
                ...state.tree,
                selectedNode: action.node
            };
        case types.REQ_PROCESS:
            return {
                ...state.tree,
                isFetching: true
            };
        case types.UNMOUNT_TREE:
            return {
                ...state.tree
            };

        default:
            return state.tree;
    }
};