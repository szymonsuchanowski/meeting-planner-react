import React from "react";
import "./CalendarItem.css";
import Modal from "./Modal";
import { getDataInfo } from "../helpers/helpersFunctions";

export default class CalendarItem extends React.Component {
    state = {
        isModal: false,
    };

    render() {
        return (
            <li className="list__item">
                {this.renderItemCard()}
                {this.renderItemPersonInfo()}
                {this.renderConfirmation()}
            </li>
        );
    }

    renderItemCard() {
        const { date, time } = this.props.data;
        const [day, month, year] = getDataInfo(date);
        return (
            <div className="list__card">
                <span className="list__window"></span>
                <div className="list__date">
                    <p className="list__day">{+day}</p>
                    <p className="list__month">
                        {month} {year}
                    </p>
                </div>
                <p className="list__time">{time}</p>
            </div>
        );
    }

    renderItemPersonInfo() {
        const { name, lastName, email } = this.props.data;
        return (
            <div className="list__wrapper">
                <div className="list__person">
                    <p className="list__name">{name}</p>
                    <p className="list__surname">{lastName}</p>
                    <a className="list__email" href={`mailto:${email}`}>
                        {email}
                    </a>
                </div>
                <button
                    className="list__btn"
                    title="remove meeting"
                    onClick={() => this.showModal()}
                >
                    remove
                </button>
            </div>
        );
    }

    renderConfirmation() {
        const { removeMeeting } = this.props;
        const { name, lastName, date, id } = this.props.data;
        const { isModal } = this.state;
        return isModal ? (
            <Modal
                name={name}
                lastName={lastName}
                date={date}
                id={id}
                closeModal={this.closeModal}
                removeMeeting={removeMeeting}
            />
        ) : null;
    }

    showModal = () => {
        this.setState({ isModal: true });
    };

    closeModal = () => {
        this.setState({ isModal: false });
    };
}
