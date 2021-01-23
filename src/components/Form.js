import {Redirect} from 'react-router-dom';
import { useState  } from 'react';
import { reset } from '../actions/index';
import Cookies from "js-cookie";
import axios from '../axios';

import { useSelector, useDispatch } from 'react-redux';





const Form = ()=>{
    const [users, setusers] = useState([{email:'', username:'',age:''}]);
    const [iLog, setiLog] = useState(true);
    const dispatch = useDispatch();
    const selectData = useSelector(stat => stat.categoryRed);
   
    const LogOut =()=>{
        Cookies.set("access", '');
        Cookies.set("refresh", ''); 
        setiLog(false);
        dispatch(reset());
    }


    const refresh = refreshToken =>{

        return new Promise((resolve, reject) => {
            axios.post('api/users/refresh', { token: refreshToken })
                .then(response => {
                    if (response.data.success === false) {
                      resolve(false)
                    } else {
                        const { accessToken } = response.data;
                        Cookies.set("access", accessToken);
                        resolve(accessToken);
                    }
                }).catch(error=>{
                    console.log(error.response);
                });
        })
    }

    const requestLogin = async (accessToken, refreshToken)=>{
        
        return new Promise((resolve, reject)=>{
            axios.get('api/users/',{headers: {authorization: `Bearer ${accessToken}`}})
        .then(async (res)=>{
            console.log(res.data);
            if(res.data.success === false && res.data.isNewToken !== false){
                const accessToken = await refresh(refreshToken);
                if (!accessToken) return resolve(false)
                return await requestLogin(accessToken, refreshToken);
            }
            if (res.data.success !== true ) setusers(res.data) 
        }).catch(error=>{console.log(error.response.data.err.message);})
    })
     
    }


    const hasAccess = async (accessToken, refreshToken) =>{
        if (!refreshToken) return null;
        //access token can be undefined because cookies has expires time
        if (accessToken === undefined) {
            // generate new accessToken
            accessToken = await refresh(refreshToken);
            return accessToken;
        }
        return accessToken;
    };


    const handleButtonProtect = async e =>{
        e.preventDefault();
        let accessToken = Cookies.get("access");
        let refreshToken = Cookies.get("refresh");
      
        accessToken = await hasAccess(accessToken, refreshToken);
         
        if (!accessToken) {
            // Set message saying login again.
        } else {  
            let res = await requestLogin(accessToken, refreshToken);
            if (!res)  LogOut();
        }
    };



    if (!iLog) return <Redirect to="/" />
    //|| logAgain
    
    return(
        <div>
        
        <form>
            <h1>Category Page</h1>
            <ul>
                {selectData.rootKategorija.content}
                <ul>
                    <li>
                    {selectData.podKategorija1.content}
                        <ul>
                            <li>
                            {selectData.podKategorija1.content}
                            </li>
                        </ul>
                    </li>
                </ul>
                <ul>
                    <li>
                    {selectData.podKategorija2.content}
                    </li>
                </ul>
            </ul>
            
            <button onClick={LogOut}>Logout</button>
            <button onClick={handleButtonProtect}>Get Users</button>
        </form>
        <div>
            
            <ui>{users.length >1 ? users[15].username : users[0].username}</ui><br/>
            <ui>{users.length >1 ? users[15].email : users[0].email}</ui><br/>
            <ui>{users.length >1 ? users[15].age : users[0].age}</ui><br/>
            <ui>{users.length >1 ? users[15].refreshToken : users[0].refreshToken}</ui><br/>
        </div>
    </div>
    );
}
export default Form;