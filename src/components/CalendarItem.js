import React from 'react';

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
                <div className='footer__description'>
                    <p className='footer__paragraph'>{this.changeDateFormat(date)}</p>
                    <p className='footer__paragraph'>{time}</p>
                </div>
                <button className='footer__btn'
                    title='remove meeting'
                    onClick={() => this.removeTask(id)}>
                    delete
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