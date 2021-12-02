import React from 'react';

export default class CalendarForm extends React.Component {
    renderFormInputs() {
        const { fields } = this.props;
        return (
            fields.map((input, index) => {
                const { name, label, type } = input;
                return (
                    <div className='form__field' key={index}>
                        <label className='form__label' htmlFor={name}>
                            {label}
                            <input className='form__input' id={name} name={name} type={type} />
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
                    <form className='calendar__form form'>
                        {this.renderFormInputs()}
                        <div className='form__field'>
                            <input className='form__submit' value='Add' type='submit'/>
                        </div>
                    </form>
                </div>
            </section>
        )
    }
}