import React from 'react';

export default class CalendarForm extends React.Component {
    render() {
        const {fields} = this.props;
        return (
            fields.map((input, index) => {
                const {name, label, type} = input;
                return (
                    <div className='form__field' key={index}>
                        <label className='form__label' htmlFor={name}>
                            {label}
                            <input className='form__input' id={name} name={name} type={type}/>
                            <span className='form__border'></span>
                        </label>
                    </div>
                )
            })
        )
    };
}