import React, { useEffect, useState } from 'react'

export default function Chat({ socket, mainState }) {
    const [messagesList, setMessagesList] = React.useState([]);
    const [inputValue, setInputValue] = React.useState('');

    //AUTO SCROLL
    const bottomRef = React.useRef(null);

    //FETCH MESSAGES //ON FIRST PAGE LOAD
    useEffect(() => {
        socket.emit("fetch_messages");
    }, [])

    //SEND CHAT MESSAGE 
    const sendMsg = () => {
        if (inputValue != '') {
            const obj = { name: mainState.username, message: inputValue }
            socket.emit("message_from_client", obj)
            //setMessagesList(messages => [...messages, obj])
            setInputValue('');
        }
    }

    //HANDLE MESSAGE FROM SERVER
    const handler = (data) => setMessagesList(messages => [...messages, data])

    //MESSAGE FROM SERVER
    React.useEffect(() => {
        socket.on("message_from_server", handler)
        socket.on("messages_list", (data) => {
            setMessagesList(data)
        })
    }, [])

    //CHEKC IF HIT ENTER
    const d = (k) => {
        if (k.key == 'Enter')
            sendMsg();
    }
    //LISTNER TO KEYBOARD ENTER BUTTON
    React.useEffect(() => {
        document.addEventListener('keydown', d)
        return () => document.removeEventListener('keydown', d)
    }, [inputValue])


    //AUTO SCROLL
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messagesList]);

    return (
        <div className="chat">
            <div className="cont">

                {messagesList &&
                    <div className="messages_list">
                        {messagesList.map((msg) => {
                            return <div ref={bottomRef} className="message">
                                <span className="name">{msg.name}:</span>
                                <span className="msg">{msg.message}</span>
                            </div>
                        })}
                    </div>
                }
                <div className="new_message">
                    <input onChange={(v) => setInputValue(v.target.value)} value={inputValue} placeholder="Start typing..." />
                </div>
            </div>
        </div>
    )
}
