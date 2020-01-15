export default class TodoListService {
    constructor() {
        this._apiBase = 'http://localhost:3001/data';
        this._POST = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }
    }

    getResource = async (url, options) => {
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
        const data = await this.getResource(this._apiBase);
        return data.map(this._transformData);
    };
    changePropValue = async (id, prop) => {
        const data = await this.getResource(this._apiBase);
        const index = data.findIndex(elem => elem.id === id);
        // const newItem =
    };
    // uploadValueToBD = async (value) => {
    //     const data = await this.getResource(this._apiBase);
    //     const saved = value.toString();
    //     this._checkValueInData(data, saved)
    //         ? console.error(`"${saved}" is already in the list`)
    //         : await this.getResource(this._apiBase, {...this._POST, body: JSON.stringify({ saved })})
    // }
    _transformData = (item) => ({
        label: item.label,
        actual: item.actual,
        id: item.id
    })
}

