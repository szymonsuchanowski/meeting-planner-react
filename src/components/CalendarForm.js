import React from 'react';
import DataValidator from '../helpers/DataValidator';

export default class CalendarForm extends React.Component {
    state = {
        name: '',
        lastName: '',
        email: '',
        date: '',
        time: '',
        errors: {}
    };

    inputChange = e => {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
        });
    };

    submitHandler = e => {
        e.preventDefault();
        const errors = this.checkDataCorrectness();
        if (this.isObjectEmpty(errors)) {
            const { addMeeting } = this.props;
            const inputValuesList = this.getInputValues();
            const meetingData = this.convertArrToObj(inputValuesList);
            addMeeting(meetingData);
            this.setState({
                name: '',
                lastName: '',
                email: '',
                date: '',
                time: '',
                errors: {}
            })
        };
        this.setState({
            errors: errors
        });
    };

    checkDataCorrectness() {
        const errorsArr = [];
        this.createErrors(errorsArr);
        const errorsObj = this.convertArrToObj(errorsArr);
        return errorsObj;
    }

    createErrors(errorsArr) {
        const validator = new DataValidator();
        const inputsNamesList = this.getInputsNames();
        inputsNamesList.forEach(inputName => {
            const err = validator.checkDataErrors(inputName, this.state[inputName]);
            if (err) {
                errorsArr.push(err);
            };
        });
    };

    getInputValues() {
        const inputsNames = this.getInputsNames();
        return inputsNames.map(inputName => {
            return { [inputName]: this.state[inputName] };
        });
    };

    getInputsNames() {
        const { fields } = this.props;
        return fields.map(input => input.name);
    };

    convertArrToObj(arr) {
        return Object.assign({}, ...arr);
    };

    isObjectEmpty(obj) {
        return Object.keys(obj).length === 0;
    };

    renderFormInputs() {
        const { fields } = this.props;
        return (
            fields.map(input => {
                const { name, label, type } = input;
                return (
                    <div className='form__field' key={name}>
                        <label className='form__label' htmlFor={name}>
                            {label}
                            <input
                                className='form__input'
                                id={name}
                                name={name}
                                type={type}
                                value={this.state[name]}
                                onChange={this.inputChange}
                                min={type === 'date' ? this.getCurrentDate() : null}
                            />
                            <span className='form__border'></span>
                        </label>
                        <div className='form__placeholder'>
                            {!this.isObjectEmpty(this.state.errors) && this.renderFormErrMsg(name)}
                        </div>
                    </div>
                );
            })
        );
    };

    render() {
        return (
            <section className='calendar__section calendar__section--form'>
                <header className='calendar__subheader'>
                    <h2 className='calendar__subtitle'>schedule a meeting...</h2>
                    <p className='calendar__description'>time is money</p>
                </header>
                <div className='calendar__container'>
                    <form
                        className='calendar__form form'
                        onSubmit={this.submitHandler}
                        noValidate
                    >
                        {this.renderFormInputs()}
                        <div className='form__field'>
                            <input className='form__submit' value='Add' type='submit' />
                        </div>
                    </form>
                </div>
            </section>
        );
    };

    renderFormErrMsg(name) {
        const errMsg = this.state.errors[name];
        return errMsg ? (<p className='form__err'>{errMsg}</p>) : null;
    };

    getCurrentDate() {
        return new Date().toISOString().slice(0, 10);
    };
}