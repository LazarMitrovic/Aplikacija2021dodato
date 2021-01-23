import axios from '../axios';
import { SIGN_IN , RESET, CREATE} from '../types';
import Cookies from "js-cookie";



//provjera da li postoji user
export const isLogged = postData => async dispatch => {
    axios.post('/api/users/login',postData)
    .then(response => {
        const { accessToken, refreshToken } = response.data;
        Cookies.set("access", accessToken);
        Cookies.set("refresh", refreshToken); 
        dispatch({type: SIGN_IN, payload: response.data.condition});
    })
    .catch(error => {
        dispatch({type: SIGN_IN, payload: error.response.data});;
    });
}

//kreiranje novog user
export const createUser = (postData) => async (dispatch) => {


    try{
        axios.post('/api/users/',postData)
        .then(response => { 
             response.data.newUser = true;
             dispatch({type: CREATE, payload: response.data})
        })
        .catch(error => {
             dispatch({type: CREATE, payload: error.response.data})
        });
    }catch(error){
        console.log(error);
    }
 }
 
//praznjenje state
export const reset =()=>{
    
    return({
        type: RESET
    }      
    )
}