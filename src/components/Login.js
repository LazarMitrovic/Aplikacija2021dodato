import { Redirect } from 'react-router-dom';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { isLogged } from '../actions/index'; 


const Login =()=>{
    

const [dataEmail, setdataEmail] = useState({email : 'no'});
const [dataPassword, setPassword] = useState({password : 'no'});


const selectData = useSelector(stat => stat.logReducer);
const dispatch = useDispatch();


const handleEmail = event => setdataEmail({email : event.target.value});
const handlePassword = event => setPassword({password : event.target.value});
 



const handleButton = (event)=>{ 
    event.preventDefault();
    const postData = { email: dataEmail.email, password: dataPassword.password }
    dispatch(isLogged(postData));

}
if (selectData===true) return <Redirect to="/users" />


return(
   
    <div>
        <h3>Login Page</h3>

        <form >
            <input placeholder="Enter email" type="text" name="email" onChange={handleEmail}/><br/><br/>
            <input placeholder="Enter passworde" type="password" name="password" onChange={handlePassword}/><br/>
            <button type="submit" onClick={handleButton}>Login</button>
            <p>{selectData.condition===false ? selectData.message :''}</p>
        </form>
        <NavLink exact activeClassName="active" to="/registration">Registration</NavLink>
    </div>
);

};

export default Login;