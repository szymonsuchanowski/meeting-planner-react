import React from 'react';
import DataValidator from '../helpers/DataValidator';

export default class CalendarForm extends React.Component {
    state = this.createStateObject();

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
                        noValidate>
                        {this.renderFormInputs()}
                        <div className='form__field'>
                            <input className='form__submit'
                                value='Add'
                                type='submit'
                            />
                        </div>
                    </form>
                </div>
            </section>
        );
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
                                className={this.state[name].isValid ? 'form__input' : 'form__input form__input--invalid'}
                                id={name}
                                name={name}
                                type={type}
                                value={this.state[name].value}
                                onChange={this.inputChange}
                                min={type === 'date' ? this.getCurrentDate() : null}
                            />
                            <span className={this.state[name].isValid ? 'form__border' : 'form__border form__border--invalid'}></span>
                        </label>
                        <div className='form__placeholder'>
                            {this.renderFormErrMsg(name)}
                        </div>
                    </div>
                );
            })
        );
    };

    renderFormErrMsg(name) {
        if (!this.isObjectEmpty(this.state.errors) && this.state.errors[name]) {
            const errMsg = this.state.errors[name];
            return (
                <p className='form__err'>
                    {errMsg}
                </p>
            );
        }
        return null;
    };

    createStateObject() {
        const fieldsStateDataArr = this.createStateData();
        fieldsStateDataArr.push({ errors: {} });
        return this.convertArrToObj(fieldsStateDataArr);
    }

    createStateData() {
        return this.props.fields.map(input => {
            const { name } = input;
            return {
                [name]: {
                    value: '',
                    isValid: true,
                }
            };
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
            const stateObject = this.createStateObject();
            this.setState(stateObject);
        } else {
            this.setState({
                errors: errors
            });
        };
    };

    inputChange = e => {
        const { name, value } = e.target;
        const newStateData = {
            value: value,
        }
        this.updateInputState(name, newStateData);
    };

    checkDataCorrectness() {
        const errorsArr = [];
        this.createErrors(errorsArr);
        const errorsObj = this.convertArrToObj(errorsArr);
        return errorsObj;
    };

    createErrors(errorsArr) {
        const validator = new DataValidator();
        const inputsNamesList = this.getInputsNames();
        inputsNamesList.forEach(inputName => {
            const err = validator.checkDataErrors(inputName, this.state[inputName].value);
            if (err) {
                errorsArr.push(err);
                const newStateData = {
                    isValid: false,
                }
                this.updateInputState(inputName, newStateData);
            } else {
                if (!this.state[inputName].isValid) {
                    const newStateData = {
                        isValid: true,
                    }
                    this.updateInputState(inputName, newStateData);
                }
            }
        });
    };

    getInputValues() {
        const inputsNames = this.getInputsNames();
        return inputsNames.map(inputName => {
            return { [inputName]: this.state[inputName].value.trim() };
        });
    };

    getInputsNames() {
        const { fields } = this.props;
        return fields.map(input => input.name);
    };

    updateInputState(inputName, newStateData) {
        this.setState(prevState => ({
            [inputName]: { ...prevState[inputName], ...newStateData },
        }));
    };

    convertArrToObj(arr) {
        return Object.assign({}, ...arr);
    };

    isObjectEmpty(obj) {
        return Object.keys(obj).length === 0;
    };

    getCurrentDate() {
        const timezoneOffset = (new Date()).getTimezoneOffset() * 60000;
        return (new Date(Date.now() - timezoneOffset)).toISOString().slice(0, 10);
    };
}