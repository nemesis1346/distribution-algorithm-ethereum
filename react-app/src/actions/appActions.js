import {
    TOOGLE_HAMBURGER_MENU,
    CLOSE_HAMBURGER_MENU,
    HANDLE_STATE_CHANGE_HAMBURGER_BURGER
} from "../constants/actions";
import httpApi from "../api/httpApi";
import { parseResponse } from "../utils/Utils";


export const toggleHamburgerMenu = () => {
    return {
        type: TOOGLE_HAMBURGER_MENU,
    };
};

export const closeHamburgerMenu = () => {
    return {
        type: CLOSE_HAMBURGER_MENU,
    }
}
export const handleStateChangeHamburgerBurger = () => {
    return {
        type: HANDLE_STATE_CHANGE_HAMBURGER_BURGER
    }
}