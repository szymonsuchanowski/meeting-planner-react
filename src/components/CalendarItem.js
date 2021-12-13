import React from 'react';
import './CalendarItem.css';

export default class CalendarItem extends React.Component {
    render() {
        return (
            <li className='list__item'>
                {this.renderHeaderItem()}
                {this.renderFooterItem()}
            </li>
        );
    };

    renderHeaderItem() {
        const { name, lastName, email } = this.props.data;
        return (
            <header className='list__header'>
                <h3 className='list__title'>{name} {lastName}</h3>
                <a className='list__email'
                    href={`mailto:${email}`}>
                    {email}
                </a>
            </header>
        );
    };

    renderFooterItem() {
        const { date, time, id } = this.props.data;
        return (
            <footer className='list__footer'>
                <div className='list__container'>
                    <p className='list__para list__para--date'>{this.changeDateFormat(date)}</p>
                    <p className='list__para list__para--time'>{time}</p>
                </div>
                <button className='list__btn'
                    title='remove meeting'
                    onClick={() => this.removeTask(id)}>
                    remove
                </button>
            </footer>
        );
    };

    removeTask(id) {
        const { removeMeeting } = this.props;
        removeMeeting(id);
    };

    changeDateFormat(date) {
        return date.split('-').reverse().join('.');
    };
}