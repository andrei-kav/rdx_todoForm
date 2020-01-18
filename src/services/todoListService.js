export default class TodoListService {
    constructor() {
        this._apiBase = 'http://localhost:3001/data/';
    }
    _setMethod = (method) => ({
        method: method,
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    });

    _getResource = async (url, options) => {
        const res = await fetch(url, options);
        if (!res.ok) {
            throw {
                status: res.status,
                // status: 345,
                text: new Error(`Could not fetch ${url}, received ${res.status}`)
            };
        }
        return await res.json();
    };

    getData = async () => {
        return await this._getResource(this._apiBase);
    };
    uploadItemToDB = async (label) => {
        const item = {label, actual: true};
        await this._getResource(this._apiBase, {...this._setMethod('POST'), body: JSON.stringify(item)})
    };
    toggleActualProp = async (id, label, actual) => {
        const item = { label, actual };
        await this._getResource(this._apiBase + id, {...this._setMethod('PUT'), body: JSON.stringify(item)})
    };
}

