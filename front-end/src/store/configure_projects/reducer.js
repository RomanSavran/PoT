import * as types from './actionTypes';

const initialState = {
    projects: [],
    selectedRecords: [],
    perPage: 10,
    popupMode: false,
    popupParams: false,
    isFetching: false
};

//_CP_ - configure projects page

export default function configProj(state = initialState, action) {
    switch (action.type) {

        case types.GET_CP_DONE:
            return {
                ...state, projects: action.projects, isFetching: false
            };
        case types.DELETE_CP_DONE:
            return {
                ...state, projects: action.projects, selectedRecords: action.selectedRecords, isFetching: false
            };
        case types.EDIT_CP_DONE:
            return {
                ...state, projects: action.projects, selectedRecords: action.selectedRecords, isFetching: false
            };
        case types.SELECT_CP_ROW:
            return {
                ...state, projects: action.projects, selectedRecords: action.selectedRecords
            };
        case types.SHOW_CP_POPUP:
            return {
                ...state, popupMode: action.popupMode, popupParams: action.popupParams
            };
        case types.REQ_PROCESS:
            return {
                ...state, isFetching: true
            };
        case types.UNMOUNT_CP:
            return {
                ...state, popupMode: action.popupMode, selectedRecords: action.selectedRecords, projects: action.projects
            };

        default:
            return state;
    }
}