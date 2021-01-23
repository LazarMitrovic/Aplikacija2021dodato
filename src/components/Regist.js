import { Redirect } from 'react-router-dom';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createUser } from '../actions/index'; 

const Regist =()=>{

    const [dataUsername, setdataUsername] = useState({username : 'null'});
    const [dataEmail, setdataEmail] = useState({email : 'null'});
    const [dataAge, setdataAge] = useState({age : 'null'});
    const [dataPassword, setPassword] = useState({password : 'null'});
 
    const dispatch = useDispatch();
    const selectData = useSelector(stat => stat.logReducer);

  
    const handleUsername = event => setdataUsername({username : event.target.value});
    const handleEmail = event => setdataEmail({email : event.target.value});
    const handlePassword = event => setPassword({password : event.target.value});
    const handleAge = event => setdataAge({age : event.target.value});
  
    
    const handleButton = (event)=>{
        event.preventDefault();
        const postData = {
            username: dataUsername.username,
            password: dataPassword.password,
            email: dataEmail.email,
            age: dataAge.age
        };
        dispatch(createUser(postData))
    };

    if (selectData.newUser===true) return <Redirect to="/" />
    return(
        <div>
            <h3>Registration Page</h3>

            <form onSubmit={handleButton}>
                <input placeholder="Enter username" type="text" name="username" onChange={handleUsername}/><br/><br/>
                <input placeholder="Enter email" type="text" name="email" onChange={handleEmail}/><br/><br/>
                <input placeholder="Enter age" type="text" name="age" onChange={handleAge}/><br/><br/>
                <input placeholder="Enter passworde" type="text" name="password" onChange={handlePassword}/><br/><br/>
                <p>{selectData.newUser!==true ? selectData:''}</p>
                <button type="submit" >Done</button>
            </form>
        </div>
    );

}
export default Regist;