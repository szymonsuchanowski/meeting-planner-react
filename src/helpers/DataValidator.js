export default class DataValidator {
    name = {
        regExp: /^[a-zA-Z]{3,}(?:(-| )[a-zA-Z]+){0,2}$/,
        err: 'required (min. 3 characters)'
    };

    lastName = {
        regExp: /^[a-zA-Z]{3,}(?:(-| )[a-zA-Z]+){0,2}$/,
        err: 'required (min. 3 characters)'
    };

    email = {
        regExp: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
        err: 'required (valid e-mail address)'
    };

    date = {
        regExp: /^20\d{2}[-/.](0[1-9]|1[0-2])[-/.](0[1-9]|[12]\d|3[01])$/,
        err: 'required - today/future (dd.mm.yyyy)'
    };

    time = {
        regExp: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
        err: 'required (hh:mm)'
    };

    checkDataErrors(inputName, inputValue) {
        const isDataValid = this.isMatchRegex(inputName, inputValue.trim());
        const isDateCorrect = inputName === 'date' ? this.isFutureDate(inputValue) : true;
        return (!isDataValid || !isDateCorrect) ? this.createErrObject(inputName) : null;
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