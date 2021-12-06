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
        const err = this.validateData();
        if (Object.keys(err).length !== 0) {
            this.setState({
                errors: err
            });
        };
        console.log('errList:' + Object.keys(err).length);
        const inputValuesList = this.getInputValues();
        const meetingData = this.convertArrToObj(inputValuesList);
        console.log(meetingData);
    };

    validateData() {
        const errors = [];
        const dataValidator = new DataValidator();
        const inputsNames = this.getInputsNames();
        inputsNames.forEach(inputName => {
            const err = dataValidator.checkData(inputName, this.state[inputName]);
            if (err) {
                errors.push(err);
            };
        });
        const errObj = this.convertArrToObj(errors);
        return errObj;
    }

    getInputValues() {
        const inputsNames = this.getInputsNames();
        return inputsNames.map(inputName => {
            return { [inputName]: this.state[inputName] };
        });
    };

    getInputsNames() {
        console.log(this.props);
        const { fields } = this.props;
        return fields.map(input => input.name);
    };

    convertArrToObj(arr) {
        return Object.assign({}, ...arr);
    };

    renderFormInputs() {
        const { fields } = this.props;
        return (
            fields.map((input, index) => {
                const { name, label, type } = input;
                return (
                    <>
                        <div className='form__field' key={index}>
                            <label className='form__label' htmlFor={name}>
                                {label}
                                <input
                                    className='form__input'
                                    id={name}
                                    name={name}
                                    type={type}
                                    value={this.state[name]}
                                    onChange={this.inputChange}
                                />
                                <span className='form__border'></span>
                            </label>
                        </div>
                        <div className='form__err'>
                            {Object.keys(this.state.errors).length !== 0 && this.renderFormErr(name)}
                        </div>
                    </>
                );
            })
        );
    };

    renderFormErr(name) {
        const err = this.state.errors[name];
        if (err) {
            return (
                <p className='form__err-msg'>{err}</p>
            );
        } else {
            console.log('no err');
        }
    }

    render() {
        return (
            <section className='calendar__section-form'>
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
        )
    }
}