import React from "react";
import "./Modal.css";
import { setDateFormat } from "../helpers/helpersFunctions";

export default class Modal extends React.Component {
    render() {
        const { name, lastName, date, id, closeModal, removeMeeting } =
            this.props;
        return (
            <div
                className="list__modal modal"
                onClick={(e) => this.handleClick(e)}
                aria-hidden
            >
                <div className="modal__content">
                    <button
                        className="modal__btn"
                        title="close window"
                        type="button"
                        onClick={() => closeModal()}
                    >
                        &#x2715;
                    </button>
                    <p className="modal__paragraph">
                        Remove meeting with{" "}
                        <span className="modal__highlight">
                            {name} {lastName}
                        </span>{" "}
                        on {setDateFormat(date)}?
                    </p>
                    <div className="modal__actions">
                        <button
                            className="modal__confirm"
                            onClick={() => removeMeeting(id)}
                            type="button"
                        >
                            yes
                        </button>
                        <button
                            className="modal__cancel"
                            onClick={() => closeModal()}
                            type="button"
                        >
                            no
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    handleClick = (e) => {
        const { closeModal } = this.props;
        return e.target.classList.contains("modal") ? closeModal() : null;
    };
}
