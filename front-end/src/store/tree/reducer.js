import * as types from './actionTypes';
import { globalStore } from '../../modules/_index'

const initialState = {
    treeData: globalStore.initialTreeData,
    selectedNode: null,
    showNodeInfo: false,
    isFetching: false
};

export default function tree(state = initialState, action) {
    switch (action.type) {

        case types.GET_TREE_DONE:
            return {
                ...state, treeData: action.treeData, isFetching: false
            };
        case types.SELECT_NODE:
            return {
                ...state, selectedNode: action.node, showNodeInfo: action.showNodeInfo
            };
        case types.REQ_PROCESS:
            return {
                ...state, isFetching: true
            };
        case types.UNMOUNT_TREE:
            return {
                ...state
            };

        default:
            return state;
    }
}