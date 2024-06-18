export const REG_EXP = {
    ALLOW: {
        AZ_09_SPACE: new RegExp(/^[a-zA-Z0-9\s]+$/),
        AZ_SPACE: new RegExp(/^[a-zA-Z\s]+$/),
        AZ_09: new RegExp(/^[a-zA-Z0-9]+$/),
        AZ: new RegExp(/^[a-zA-Z]+$/),
        NUMNER_ONLY: new RegExp(/^[0-9]+$/),
        ALPHA_NUMERIC: new RegExp(/^[a-zA-Z0-9\,\.\_/\s\-]+$/),
        EnglishOnly: new RegExp(/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/? ]*$/)
    },
}