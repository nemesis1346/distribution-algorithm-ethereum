import * as ACTIONS from '../constants/actions';
import equal from 'fast-deep-equal'; //this is a library for comparing variables
import moment from 'moment'; //this is a variable to handle datetime

const initState = {
    menuOpen: false,

}
const appReducer = (state = initState, action = {}) => {
    switch (action.type) {
        case ACTIONS.TOOGLE_HAMBURGER_MENU: //this is for opening
            return {
                ...state,
                menuOpen: true
            }
        case ACTIONS.CLOSE_HAMBURGER_MENU:
            return {
                ...state,
                menuOpen: false
            }
        case ACTIONS.HANDLE_STATE_CHANGE_HAMBURGER_BURGER:
            return {
                ...state,
                menuOpen: !state.menuOpen
            }
        default:
            return state;
    }
};

export default appReducer;
