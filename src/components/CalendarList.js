import React from "react";
import CalendarItem from "./CalendarItem";
import "./CalendarList.css";
import { isArrayEmpty } from "../helpers/helpersFunctions";

export default class CalendarList extends React.Component {
    render() {
        return (
            <section className="calendar__section calendar__section--list">
                <header className="calendar__subheader calendar__subheader--list">
                    <h2 className="calendar__subtitle">meeting list</h2>
                </header>
                <div className="calendar__container">
                    {this.renderSectionContent()}
                </div>
            </section>
        );
    }

    renderSectionContent() {
        const { meetingsList } = this.props;
        return isArrayEmpty(meetingsList)
            ? this.renderInfoMsg()
            : this.renderMeetingsList();
    }

    renderInfoMsg() {
        return <p className="calendar__msg">meeting list empty</p>;
    }

    renderMeetingsList() {
        return (
            <ol className="calendar__list list">
                {this.renderMeetingItemsList()}
            </ol>
        );
    }

    renderMeetingItemsList() {
        const { meetingsList } = this.props;
        return meetingsList.map((meeting) => (
            <CalendarItem
                data={meeting}
                removeMeeting={this.props.removeMeeting}
                key={meeting.id}
            />
        ));
    }
}
