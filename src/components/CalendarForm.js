import React from 'react';

export default class CalendarForm extends React.Component {
    state = {
        name: '',
        lastName: '',
        email: '',
        date: '',
        time: '',
        errors: []
    };

    inputChange = e => {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
        });
    };

    submitHandler = e => {
        e.preventDefault();
        const meetingData = this.createMeetingData();
    };

    createMeetingData() {
        return {
            name: this.state.name,
            lastName: this.state.lastName,
            email: this.state.email,
            date: this.state.date,
            time: this.state.time,
        }
    }

    renderFormInputs() {
        const { fields } = this.props;
        return (
            fields.map((input, index) => {
                const { name, label, type } = input;
                return (
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
                )
            })
        )
    };

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