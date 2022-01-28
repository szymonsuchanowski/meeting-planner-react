export const sortMeetingsByTime = (data) => {
    return data.sort((a, b) => {
        if (a.date === b.date) {
            return b.time - a.time;
        }
        return a.date < b.date ? -1 : 1;
    });
};

export const isArrayEmpty = (arr) => arr.length === 0;

const getCurrentDate = () => {
    const timezoneOffset = new Date().getTimezoneOffset() * 60000;
    return new Date(Date.now() - timezoneOffset).toISOString().slice(0, 10);
};

export const setDateRange = (type) =>
    type === "date" ? getCurrentDate() : null;

export const isObjectEmpty = (obj) => Object.keys(obj).length === 0;

export const convertArrToObj = (arr) => Object.assign({}, ...arr);

export const createStateObject = (fields) => {
    const fieldsStateDataArr = createStateData(fields);
    fieldsStateDataArr.push({ errors: {} });
    return convertArrToObj(fieldsStateDataArr);
};

const createStateData = (fields) => {
    return fields.map((input) => {
        const { name, filter } = input;
        const stateData = {
            [name]: {
                value: "",
                isValid: true,
            },
        };
        return filter
            ? createStateDataWithSuggestions(stateData, name)
            : stateData;
    });
};

const createStateDataWithSuggestions = (stateData, inputName) => {
    return {
        [inputName]: {
            ...stateData[inputName],
            showSuggestions: false,
            dataSuggestions: [],
        },
    };
};

export const getDataInfo = (date) => {
    const newDate = new Date(date);
    const monthName = newDate
        .toLocaleString("en-us", { month: "short" })
        .toUpperCase();
    const dateDataArr = date.split("-").reverse();
    dateDataArr[1] = monthName;
    return dateDataArr;
};

export const setDateFormat = (date) => date.split("-").reverse().join(".");
