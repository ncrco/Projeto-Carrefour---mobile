/**
 * Centralização de seletores de elementos
 * Boas práticas: manter todos os seletores em um único lugar para facilitar manutenção
 */

module.exports = {
    // Login Page
    LOGIN: {
        USERNAME_INPUT: '~username',
        PASSWORD_INPUT: '~password',
        LOGIN_BUTTON: '~login',
        SIGNUP_BUTTON: '~signUp',
        ERROR_MESSAGE: '~errorMessage',
        WELCOME_MESSAGE: '~welcome'
    },

    // SignUp Page
    SIGNUP: {
        USERNAME_INPUT: '~signUpUsername',
        PASSWORD_INPUT: '~signUpPassword',
        CONFIRM_PASSWORD_INPUT: '~signUpConfirmPassword',
        SIGNUP_BUTTON: '~signUpButton',
        BACK_BUTTON: '~backButton',
        ERROR_MESSAGE: '~signUpErrorMessage',
        SUCCESS_MESSAGE: '~signUpSuccessMessage'
    },

    // Home Page
    HOME: {
        WELCOME_TEXT: '~welcome',
        FORMS_BUTTON: '~forms',
        SWIPE_BUTTON: '~swipe',
        WEBVIEW_BUTTON: '~webView',
        LOGIN_BUTTON: '~login',
        LOGOUT_BUTTON: '~logout'
    },

    // Forms Page
    FORMS: {
        TEXT_INPUT: '~textInput',
        SWITCH_TOGGLE: '~switch',
        DROPDOWN: '~dropdown',
        ACTIVE_BUTTON: '~activeButton',
        INACTIVE_BUTTON: '~inactiveButton',
        SUBMIT_BUTTON: '~submitButton',
        ERROR_MESSAGE: '~formErrorMessage',
        SUCCESS_MESSAGE: '~formSuccessMessage',
        BACK_BUTTON: '~backButton'
    },

    // Swipe Page
    SWIPE: {
        CARD_CONTAINER: '~cardContainer',
        FIRST_CARD: '~card1',
        SECOND_CARD: '~card2',
        THIRD_CARD: '~card3',
        BACK_BUTTON: '~backButton'
    }
};

