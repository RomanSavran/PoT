import * as types from './actionTypes';
import { globalStore } from '../../modules/_index'

const initialState = {
    treeData: globalStore.initialTreeData,
    selectedNode: {
        name: null,
        json: null
    },
    isFetching: false
};

export default function tree(state = initialState, action) {
    switch (action.type) {

        case types.GET_TREE_DONE:
            return {
                ...state, treeData: action.treeData, selectedNode: action.selectedNode, isFetching: false
            };
        case types.SELECT_NODE:
            return {
                ...state, selectedNode: action.node
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