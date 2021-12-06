import React from 'react';
import CalendarAPI from '../helpers/CalendarAPI';
import CalendarForm from './CalendarForm';
import CalendarList from './CalendarList';
import { formFields as fields } from '../helpers/formFields';

export default class Calendar extends React.Component {
    constructor() {
        super();
        this.api = new CalendarAPI();
    };

    state = {
        meetings: [],
    };

    addMeeting = meetingData => {
        this.api.addData(meetingData)
            .then(() => this.loadMeetings())
            .catch(err => console.error(err))
    };

    loadMeetings() {
        this.api.loadData()
            .then(data => this.setState({ meetings: data }))
            .catch(err => console.error(err))
    };

    render() {
        return (
            <main className='calendar'>
                <header className='calendar__header'>
                    <h1 className='calendar__title'>meeting planner</h1>
                    <p className='calendar__description'>never be late</p>
                </header>
                <article className='calendar__wrapper'>
                    <CalendarForm fields={fields} addMeeting={this.addMeeting} />
                    <CalendarList />
                </article>
            </main>
        );
    };
}