import React from 'react';
import CalendarAPI from '../helpers/CalendarAPI';
import CalendarForm from './CalendarForm';
import CalendarList from './CalendarList';
import { formFields as fields } from '../helpers/formFields';

export default class Calendar extends React.Component {
    constructor() {
        super();
        this.api = new CalendarAPI();
        this._isMounted = false;
    };

    state = {
        meetings: [],
    };

    render() {
        return (
            <main className='calendar'>
                <header className='calendar__header'>
                    <h1 className='calendar__title'>meeting planner</h1>
                    <p className='calendar__description'>never be late</p>
                </header>
                <article className='calendar__wrapper'>
                    <CalendarForm
                        fields={fields}
                        addMeeting={this.addMeeting}
                    />
                    <CalendarList
                        meetingsList={this.state.meetings}
                        removeMeeting={this.removeMeeting}
                    />
                </article>
            </main>
        );
    };

    componentDidMount() {
        this._isMounted = true;
        this.loadMeetings();
    };

    componentWillUnmount() {
        this._isMounted = false;
    };

    addMeeting = meetingData => {
        this.api.addData(meetingData)
            .then(() => this.loadMeetings())
            .catch(err => console.error(err))
    };

    removeMeeting = meetingId => {
        this.api.removeData(meetingId)
            .then(() => this.loadMeetings())
            .catch(err => console.error(err))
    };

    loadMeetings() {
        this.api.loadData()
            .then(data => this.sortMeetingsByTime(data))
            .then(data => (this._isMounted && this.setState({ meetings: data })))
            .catch(err => console.error(err))
    };

    sortMeetingsByTime(data) {
        return data.sort((a, b) => {
            if (a.date === b.date) {
                return b.time - a.time;
            };
            return a.date < b.date ? -1 : 1;
        });
    };
}