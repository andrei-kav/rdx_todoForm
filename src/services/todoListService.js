import firebase from "../config";

export default class TodoListService {
    constructor() {
        this._apiBase = firebase.firestore().collection('todoPosts');
    }

    getData = () => {
        return this._apiBase.get()
            .then((res) => {
                return res.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
            })
            .catch(err => console.error(err));
    };

    toggleActualProp = (id, label, actual) => {
        return this._apiBase.doc(id).set({ label, actual })
            .then(() => console.log(`post "${label}" successfully updated`))
            .catch(err => console.error(err));
    };

    uploadItemToDB = (label) => {
        return this._apiBase.add({label, actual: true})
            .then(() => console.log(`post "${label}" was added to db`))
            .catch(err => console.error(err));
    };
}

