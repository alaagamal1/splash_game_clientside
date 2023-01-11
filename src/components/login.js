import React, { useState, useEffect } from 'react'
import '../css/login.css';

export default function Register({ socket, setState, setScreen }) {
    const [userName, setUserName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loginError, setError] = useState('');


    const sendLogin = () => {
        //VALIDATIONS
        if (password == '' || userName == '')
            setError('Please fill empty fields');

        else
            socket.emit("login", { username: userName, password: password });
    }

    useEffect(() => {
        socket.on("login_status", (data) => {
            //SIGNUP SUCCESS
            if (data.status == 1)
                setState(state => {
                    return { ...state, ...data }
                })

            else setError(data.message);
        })
    }, [])

    return (
        <div className="login_container">
            <div className="login_box_container">
                <div className="login_box">
                    <div className="logo" />
                    <div className="inputs">
                        {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
                        <span className="input_title">User Name</span>
                        <div class="input_container"><input onChange={(e) => setUserName(e.target.value)} name="user_name" placeholder="johnadam" /></div>
                        <span className="input_title">Password</span>
                        <div class="input_container"><input onChange={(e) => setPassword(e.target.value)} name="password" type="password" placeholder="*******" /></div>

                        <p onClick={() => setScreen('register')} className="txt1">Dont have an account? signup now!</p>
                        <button className="login_button" onClick={sendLogin}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
