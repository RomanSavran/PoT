import * as types from './actionTypes';

const initialState = {
    treeData: [
        {
            name: 'contexts',
            root: true,
            path: '/',
            children: []
        }
    ],
    isFetching: false
};

export default function tree(state = initialState, action) {
    switch (action.type) {

        case types.GET_TREE_DONE:
            return {
                ...state, treeData: action.treeData, isFetching: false
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