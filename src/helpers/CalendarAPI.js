export default class CalendarAPI {
    constructor() {
        this.url = 'http://localhost:3005/meetings';
    }

    loadData() {
        return this._fetch();
    }

    addData(data) {
        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        return this._fetch(options);
    }

    removeData(id) {
        const options = { method: 'DELETE' };
        return this._fetch(options, `/${id}`);
    }

    updateData(id, data) {
        const options = {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        return this._fetch(options, `/${id}`);
    }

    _fetch(options, additionalPath = '') {
        const path = this.url + additionalPath;
        return fetch(path, options)
            .then(resp => {
                if (resp.ok) { return resp.json() }
                return Promise.reject(new Error('No connection with json-server!'));
            });
    }
}