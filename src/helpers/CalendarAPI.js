export default class CalendarAPI {
    constructor() {
        this.url = "https://fake-server-trip-booking.herokuapp.com/meetings";
    };

    loadData() {
        return this._fetch('');
    };

    loadFilteredData(fieldName, filterQuery) {
        return this._fetch(`?${fieldName}_like=${filterQuery}`);
    };

    addData(data) {
        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        return this._fetch('', options);
    };

    removeData(id) {
        const options = { method: 'DELETE' };
        return this._fetch(`/${id}`, options);
    };

    _fetch(additionalPath, options) {
        const path = this.url + additionalPath;
        return fetch(path, options)
            .then(resp => {
                if (resp.ok) { return resp.json() }
                return Promise.reject(new Error('No connection with json-server!'));
            });
    };
}