import React, { useState, useEffect } from 'react'
import '../css/login.css';

export default function Register({ socket, setState, setScreen }) {
    const [userName, setUserName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [cPassword, setCPassword] = React.useState('');
    const [signupError, setError] = useState('');


    const sendSignup = () => {
        //VALIDATIONS
        if (password == '' || userName == '')
            setError('Please fill empty fields');

        else if (password != cPassword)
            setError('Confirm password must be same as password')

        else
            socket.emit("signup", { username: userName, password: password, cpassword: cPassword, logged_in: true });
    }

    useEffect(() => {
        socket.on("signup_status", (data) => {
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
                        {signupError && <p style={{ color: 'red' }}>{signupError}</p>}
                        <span className="input_title">User Name</span>
                        <div class="input_container"><input onChange={(e) => setUserName(e.target.value)} name="user_name" placeholder="johnadam" /></div>
                        <span className="input_title">Password</span>
                        <div class="input_container"><input onChange={(e) => setPassword(e.target.value)} name="password" type="password" placeholder="*******" /></div>

                        <span className="input_title">Confirm Password</span>
                        <div class="input_container"><input onChange={(e) => setCPassword(e.target.value)} name="password" type="password" placeholder="*******" /></div>


                        <p onClick={() => setScreen('login')} className="txt1">Have an account? login instead</p>
                        <button className="login_button" onClick={sendSignup}>Register</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
