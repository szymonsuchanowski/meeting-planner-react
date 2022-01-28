import React from "react";
import DataValidator from "../helpers/DataValidator";
import CalendarAPI from "../helpers/CalendarAPI";
import "./CalendarForm.css";
import {
    isArrayEmpty,
    setDateRange,
    isObjectEmpty,
    convertArrToObj,
    createStateObject,
} from "../helpers/helpersFunctions";

export default class CalendarForm extends React.Component {
    state = createStateObject(this.props.fields);
    api = new CalendarAPI();

    render() {
        return (
            <section className="calendar__section calendar__section--form">
                <header className="calendar__subheader">
                    <h2 className="calendar__subtitle">new meeting</h2>
                </header>
                <div className="calendar__container">
                    <form
                        className="calendar__form form"
                        onSubmit={this.submitHandler}
                        noValidate
                    >
                        {this.renderFormInputs()}
                        <div className="form__field">
                            <input
                                className="form__submit"
                                value="Add"
                                type="submit"
                            />
                        </div>
                    </form>
                </div>
            </section>
        );
    }

    renderFormInputs() {
        const { fields } = this.props;
        return fields.map((input) => {
            const { name, label, type, filter } = input;
            return (
                <div
                    className="form__field"
                    onFocus={() => this.handleFocus(name, filter)}
                    onBlur={() => this.handleBlur(name, filter)}
                    key={name}
                >
                    <label className="form__label" htmlFor={name}>
                        {label}
                        <input
                            className={this.setInputClassName(name)}
                            id={name}
                            name={name}
                            type={type}
                            value={this.state[name].value}
                            onChange={this.inputChange}
                            min={setDateRange(type)}
                            autoComplete="off"
                        />
                        <span className={this.setBorderClassName(name)}></span>
                    </label>
                    {this.renderSuggestions(name)}
                    <div className="form__placeholder">
                        {this.renderFormErrMsg(name)}
                    </div>
                </div>
            );
        });
    }

    renderSuggestions(name) {
        return this.isSuggestion(name)
            ? this.renderSuggestionsList(name)
            : null;
    }

    renderFormErrMsg(name) {
        return !isObjectEmpty(this.state.errors) && this.state.errors[name]
            ? this.showErrMsg(name)
            : null;
    }

    submitHandler = (e) => {
        e.preventDefault();
        const errors = this.findErrors();
        return isObjectEmpty(errors)
            ? this.addNewMeeting()
            : this.showErrors(errors);
    };

    findErrors() {
        const errorsArr = [];
        this.createErrors(errorsArr);
        const errorsObj = convertArrToObj(errorsArr);
        return errorsObj;
    }

    createErrors(errorsArr) {
        const validator = new DataValidator();
        const inputsNamesList = this.getInputsNames();
        inputsNamesList.forEach((inputName) => {
            const err = validator.checkDataErrors(
                inputName,
                this.state[inputName].value
            );
            return err
                ? this.setInputInvalid(errorsArr, err, inputName)
                : this.setInputValid(inputName);
        });
    }

    setInputInvalid(errors, err, inputName) {
        errors.push(err);
        const newStateData = {
            isValid: false,
        };
        this.updateInputState(inputName, newStateData);
    }

    setInputValid(inputName) {
        if (!this.state[inputName].isValid) {
            const newStateData = {
                isValid: true,
            };
            this.updateInputState(inputName, newStateData);
        }
    }

    addNewMeeting() {
        const inputValuesList = this.getInputValues();
        const meetingData = convertArrToObj(inputValuesList);
        this.props.addMeeting(meetingData);
        const stateObject = createStateObject(this.props.fields);
        this.setState(stateObject);
    }

    showErrors(errors) {
        this.setState({
            errors: errors,
        });
    }

    handleFocus = (inputName, filter) => {
        const newStateData = {
            showSuggestions: true,
        };
        return filter ? this.updateInputState(inputName, newStateData) : null;
    };

    handleBlur = (inputName, filter) => {
        if (filter) {
            setTimeout(() => {
                this.updateInputState(inputName, { showSuggestions: false });
            }, 200);
        }
        return null;
    };

    inputChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        const newStateData = {
            value,
        };
        this.setState(
            (prevState) => ({
                [name]: { ...prevState[name], ...newStateData },
            }),
            () => this.findSuggestions(name)
        );
    };

    findSuggestions(inputName) {
        return this.state[inputName].showSuggestions &&
            this.state[inputName].value.length > 1
            ? this.filterData(inputName)
            : null;
    }

    filterData(inputName) {
        this.api
            .loadFilteredData(inputName, this.state[inputName].value)
            .then((data) => this.updateSuggestionsState(data, inputName));
    }

    updateSuggestionsState(dataSuggestions, inputName) {
        const newStateData = {
            dataSuggestions,
        };
        this.updateInputState(inputName, newStateData);
    }

    isSuggestion(inputName) {
        const { showSuggestions, dataSuggestions, value } =
            this.state[inputName];
        return (
            showSuggestions &&
            !isArrayEmpty(dataSuggestions) &&
            value.length > 1
        );
    }

    renderSuggestionsList(inputName) {
        const suggestionContentList = this.getSuggestionContentList(inputName);
        const suggestionsItemList = this.renderSuggestionItem(
            suggestionContentList,
            inputName
        );
        return (
            <ul className="form__prompts">
                <li className="form__suggestion form__suggestion--desc">
                    API suggestions
                </li>
                {suggestionsItemList}
            </ul>
        );
    }

    getSuggestionContentList(inputName) {
        const suggestionsList = this.state[inputName].dataSuggestions.map(
            (suggestion) => suggestion[inputName]
        );
        return [...new Set(suggestionsList)];
    }

    renderSuggestionItem(suggestionContentList, inputName) {
        return suggestionContentList.map((suggestionItem, index) => (
            <li
                className="form__suggestion"
                onClick={(e) => this.completeField(e, inputName)}
                key={index}
            >
                {suggestionItem}
            </li>
        ));
    }

    completeField = (e, inputName) => {
        const value = e.target.innerText;
        const newStateData = {
            value,
            dataSuggestions: [],
        };
        this.updateInputState(inputName, newStateData);
    };

    showErrMsg(inputName) {
        const errMsg = this.state.errors[inputName];
        return <p className="form__err">{errMsg}</p>;
    }

    updateInputState(inputName, newStateData) {
        this.setState((prevState) => ({
            [inputName]: { ...prevState[inputName], ...newStateData },
        }));
    }

    getInputValues() {
        const inputsNames = this.getInputsNames();
        return inputsNames.map((inputName) => {
            return { [inputName]: this.state[inputName].value.trim() };
        });
    }

    getInputsNames() {
        const { fields } = this.props;
        return fields.map((input) => input.name);
    }

    setInputClassName(inputName) {
        return this.state[inputName].isValid
            ? "form__input"
            : "form__input form__input--invalid";
    }

    setBorderClassName(inputName) {
        return this.state[inputName].isValid
            ? "form__border"
            : "form__border form__border--invalid";
    }
}
