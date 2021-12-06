export default class DataValidator {
    name = {
        regExp: /^[a-zA-Z]{3,}(?:(-| )[a-zA-Z]+){0,2}$/,
        err: 'Name is required (at least 3 characters).'
    };

    lastName = {
        regExp: /^[a-zA-Z]{3,}(?:(-| )[a-zA-Z]+){0,2}$/,
        err: 'Last name is required (at least 3 characters).'
    };

    email = {
        regExp: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
        err: 'Please enter valid e-mail.'
    };

    date = {
        regExp: /^20\d{2}[-/.](0[1-9]|1[0-2])[-/.](0[1-9]|[12]\d|3[01])$/,
        err: 'Please enter valid date (format: dd.mm.yyyy).'
    };

    time = {
        regExp: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
        err: 'Please enter valid time (format: hh:mm).'
    };

    checkData(inputName, inputValue) {
        const isDataValid = this.isMatchRegex(inputName, inputValue);
        return !isDataValid ? this.createErrObject(inputName) : null;
    };

    isMatchRegex(inputName, inputValue) {
        return this[inputName].regExp.test(inputValue);
    };

    createErrObject(inputName) {
        return {
            [inputName]: this[inputName].err,
        };
    };
}