import React from 'react';

export default class CalendarList extends React.Component {
    render() {
        return (
            <section className='calendar__section calendar__section--list'>
                <header className='calendar__subheader'>
                    <h2 className='calendar__subtitle'>...and execute</h2>
                    <p className='calendar__description'>the time is ripe</p>
                </header>
                <div className='calendar__container'>
                    {this.renderSectionContent()}
                </div>
            </section>
        )
    };

    renderSectionContent() {
        const { meetingsList } = this.props;
        return this.isArrEmpty(meetingsList) ? this.renderInfoMsg() : this.renderMeetingsList();
    };

    isArrEmpty(arr) {
        return arr.length === 0;
    }

    renderInfoMsg() {
        return (
            <p className='calendar__msg'>
                No scheduled meetings. Do not hesitate - add first meeting and start doing!
            </p>
        )
    }

    renderMeetingsList() {
        return (
            <ol className='calendar__list list'>
                {this.renderMeetingItemsList()}
            </ol>
        );
    };

    renderMeetingItemsList() {
        const { meetingsList } = this.props;
        return meetingsList.map(meeting => this.renderMeetingItem(meeting));
    };

    renderMeetingItem(meeting) {
        const { id } = meeting;
        return (
            <li className='list__item'
                key={id}>
                {this.renderHeader(meeting)}
                {this.renderFooter(meeting)}
            </li>
        );
    };

    renderHeader(meeting) {
        const { name, lastName, email } = meeting;
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

    renderFooter(meeting) {
        const { date, time, id } = meeting;
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