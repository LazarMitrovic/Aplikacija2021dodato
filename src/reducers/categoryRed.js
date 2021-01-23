//reducer category
const initialState={
    rootKategorija:{
        content:'Root kategorija'
    },
    podKategorija1:{
        content:'podkategorija1'
    },
    podpodKategorija1:{
        content:'podpodkategorija1'
    },
    podKategorija2:{
        content:'podkategorija2'
    }
};

const categoryRed = (state =initialState, actions) => {

switch (actions.type) { 
    case 'nothing':
        return state;
    default:
        return state;
}
};
export default categoryRed;