import axios from 'axios'
import {AUTH_LOGOUT, AUTH_SUCCESS} from './actionTypes'

export function auth(email, password, isLogin) {
    return async dispatch => {

        const authData = {
                   email, password
               }
        let url ='https://server.it-vladimirov.com/api/account/register';
        if (isLogin) {
            url = 'https://server.it-vladimirov.com/api/account/login';
        }

    try {
        const responce = await axios.post(url, authData,
            {
            headers: {
            'Access-Control-Allow-Origin': "http://localhost:8181/rest/",
                'Content-Type': 'application/json',
                    mode: 'cors',
                    body: JSON.stringify ( {email:email,  password:password})
            }
        })
        const data = responce.data
        if (data.auth) {
                //console.log("VERIFICATION")
                const expirationDate = new Date(new Date().getTime()+ 3600*1000)
                localStorage.setItem('token', data.jwt);
                localStorage.setItem('userId', data.userId);
                localStorage.setItem('expirationDate', expirationDate);
                dispatch(authSuccess(data.jwt, expirationDate))
                dispatch(autoLogout(3600))
            }
        } catch (e) {
            dispatch(authSuccess('', new Date()))
            // console.log(e.errorMessage)
            console.log(e)
        }
    }
}

export function autoLogout(time) {
    return dispatch => {
         setTimeout(()=>{
             dispatch(logout())
         }, time*1000)
    }
}

export function autoLogin(){
    return dispatch =>{
        const token = localStorage.getItem('token')
        if (!token){
            dispatch(logout())
        }else{
            const expDate = new Date(localStorage.getItem('expirationDate'));
            if (expDate<= new Date()){
                dispatch(logout())
            }else{
                dispatch(authSuccess(token, expDate))
                dispatch(autoLogout((expDate.getTime()-new Date().getTime())/1000))
            }
        }
    }
}

export function logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');
    return {
        type:  AUTH_LOGOUT
    }
}

export function  authSuccess(token, expDate){
    return {
        type: AUTH_SUCCESS,
        token,
        expDate
    }

}


