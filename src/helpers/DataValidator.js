export default class DataValidator {
    name = {
        regExp: /^[a-zA-Z]{3,}(?:(-| )[a-zA-Z]+){0,2}$/,
        err: 'Name is required (min. 3 characters).'
    };

    lastName = {
        regExp: /^[a-zA-Z]{3,}(?:(-| )[a-zA-Z]+){0,2}$/,
        err: 'Last name is required (min. 3 characters).'
    };

    email = {
        regExp: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
        err: 'Please enter valid e-mail.'
    };

    date = {
        regExp: /^20\d{2}[-/.](0[1-9]|1[0-2])[-/.](0[1-9]|[12]\d|3[01])$/,
        err: 'Please enter valid date (current or future day & format: dd.mm.yyyy).'
    };

    time = {
        regExp: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
        err: 'Please enter valid time (format: hh:mm).'
    };

    checkDataErrors(inputName, inputValue) {
        const isDataValid = this.isMatchRegex(inputName, inputValue.trim());
        const isDateValid = inputName === 'date' ? this.isFutureDate(inputValue) : true;
        return (!isDataValid || !isDateValid) ? this.createErrObject(inputName) : null;
    };

    isMatchRegex(inputName, inputValue) {
        return this[inputName].regExp.test(inputValue);
    };

    isFutureDate(inputValue) {
        const currentDate = this.getCurrentDate();
        return new Date(inputValue) >= new Date(currentDate);
    };

    getCurrentDate() {
        const timezoneOffset = (new Date()).getTimezoneOffset() * 60000;
        return (new Date(Date.now() - timezoneOffset)).toISOString().slice(0, 10);
    };

    createErrObject(inputName) {
        return {
            [inputName]: this[inputName].err,
        };
    };
}