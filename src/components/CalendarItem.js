import React from 'react';
import './CalendarItem.css';

export default class CalendarItem extends React.Component {
    render() {
        return (
            <li className='list__item'>
                {this.renderItemCard()}
                {this.renderItemPersonInfo()}
            </li>
        );
    };

    renderItemCard() {
        const { date, time } = this.props.data;
        const [day, month, year] = this.getDataInfo(date);
        return (
            <div className='list__card'>
                <span className='list__window'></span>
                <div className='list__date'>
                    <p className='list__day'>{+day}</p>
                    <p className='list__month'>{month}, {year}</p>
                </div>
                <p className='list__time'>{time}</p>
            </div>
        );
    };

    renderItemPersonInfo() {
        const { name, lastName, email, id } = this.props.data;
        return (
            <div className='list__wrapper'>
                <div className='list__person'>
                    <p className='list__name'>{name}</p>
                    <p className='list__surname'>{lastName}</p>
                    <p className='list__email'>{email}</p>
                </div>
                <button className='list__btn'
                    title='remove meeting'
                    onClick={() => this.removeTask(id)}>
                    remove
                </button>
            </div>
        );
    };

    removeTask(id) {
        const { removeMeeting } = this.props;
        removeMeeting(id);
    };

    getDataInfo(date) {
        return date.split('-').reverse();
    };
}