const SAVE_INPUT_VALUE = 'SAVE INPUT VALUE';
const REMOVE_TEXT_VALUE = 'REMOVE TEXT VALUE';
const WAITING_FOR_UPLOADING = 'WAIT FOR UPLOADING';

const initialState = {
    text: '',
    isUploading: false
};

const itemAddFormReducer = (state = initialState, action) => {

    let stateCopy = {...state};

    switch (action.type) {
        case SAVE_INPUT_VALUE:
            stateCopy.text = action.text;
            return stateCopy;
        case REMOVE_TEXT_VALUE:
            stateCopy.text ='';
            return stateCopy;
        case WAITING_FOR_UPLOADING:
            stateCopy.isUploading = action.isUploading;
            return stateCopy;
        default:
            return stateCopy;
    }
};

export default itemAddFormReducer;

export const saveValue = (text) => ({ type: SAVE_INPUT_VALUE, text});
export const removeValue = () => ({ type: REMOVE_TEXT_VALUE });
export const waitUploading = (isUploading) => ({ type: WAITING_FOR_UPLOADING, isUploading });