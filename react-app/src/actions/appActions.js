import {
    TOOGLE_HAMBURGER_MENU,
    CLOSE_HAMBURGER_MENU,
    HANDLE_STATE_CHANGE_HAMBURGER_BURGER
} from "../constants/actions";


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