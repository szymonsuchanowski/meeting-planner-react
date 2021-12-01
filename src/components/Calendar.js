import React from 'react';
import CalendarAPI from '../helpers/CalendarAPI';
import CalendarForm from './CalendarForm';
import CalendarList from './CalendarList';

export default class Calendar extends React.Component {
    constructor() {
        super();
        this.api = new CalendarAPI();
    };

    state = {
        meetings: [],
    };

    render() {
        return (
            <main className='calendar'>
                <header className='calendar__header'>
                    <h1 className='calendar__name'>Calendar</h1>
                    <p className='calendar__description'>never be late</p>
                </header>
                <article className='calendar__wrapper'>
                    <CalendarForm />
                    <CalendarList />
                </article>
            </main>
        );
    };
};