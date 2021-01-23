import { SIGN_IN , RESET, CREATE} from '../types';

//reducer
const logReducer = (state =[], actions) => {

switch (actions.type) { 
    case SIGN_IN:
        return actions.payload;
    case RESET:
        return [];
    case CREATE:
        return actions.payload;
    default:
        return state;
}
};
export default logReducer;