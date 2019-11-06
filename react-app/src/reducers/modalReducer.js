import * as ACTIONS from '../constants/actions';

const initState = {
    modalTitle: "Modal Title",
    modalDescription: "Modal Description",
    modalNegativeButton: "Cancel",
    modalPositiveButton: "Ok",
    modalShow: false,
    singleButton:false
};

const modalReducer = (state = initState, action = {}) => {
    switch (action.type) {
        case ACTIONS.LOGOUT_MODAL:
            return {
                ...state,
                modalTitle: "Log Out",
                modalDescription: "Are you sure you want to log out?",
                modalShow: true,
            };
        case ACTIONS.CLOSE_MODAL:
            return {
                ...state,
                modalShow: false,
            };
        default:
            return state;
    }
};

export default modalReducer;
