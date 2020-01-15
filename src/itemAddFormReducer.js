const SAVE_INPUT_VALUE = 'SAVE INPUT VALUE';

const initialState = {
    text: ''
};

const itemAddFormReducer = (state = initialState, action) => {

    let stateCopy = {...state};

    switch (action.type) {
        case SAVE_INPUT_VALUE:
            stateCopy.text = action.text;
            return stateCopy;
        default:
            return stateCopy;
    }
};

export default itemAddFormReducer;

export const saveValue = (text) => ({ type: SAVE_INPUT_VALUE, text});