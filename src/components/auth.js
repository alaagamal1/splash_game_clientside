import React from 'react'
import Login from './login'
import Register from './register'

export default function Auth({ setState, socket }) {
    const [screen, setScreen] = React.useState('login');
    return (screen == 'login') ? <Login setState={setState} socket={socket} setScreen={setScreen} /> :
        <Register setState={setState} socket={socket} setScreen={setScreen} />
    return null;
}
