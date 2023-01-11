import React, { useEffect } from 'react'
import '../css/information_panels.css'
import Chat from './chat'
export default function InformationPanels({ socket, mainState, setState }) {

    //HANDLE SERVER RESPONSE
    socket.on("serverResponse", (data) => {

        //UPDATE STATE..
        setState(state => {
            return { ...state, topUsers: data.topUsers, passed_cars: data.me.passedCars }
        })
    })

    //ON FIRST PAGE LOAD, REQUEST DATA
    useEffect(() => {
        socket.emit("car_passed", { username: mainState.username, no_update: true });
    }, [])


    return (
        <div className="info_container">
            <div className="info_box">
                <div className="my_information">
                    <div className="cont">
                        <div className="tp_title"><span>Information</span></div>
                        <div className="info_txts">
                            <div className="row_1"><span>Name</span><span>{mainState.username}</span></div>
                            <div className="row_1"><span>Level</span><span>{Math.floor(mainState.passed_cars / 10)}</span></div>
                            <div className="row_1"><span>Passes</span><span>{mainState.passed_cars}</span></div>

                        </div>
                    </div>
                </div>
                <Chat mainState={mainState} socket={socket} />
                <div className="top_players">
                    <div className="cont">
                        <div className="tp_title"><span>Top Players</span></div>
                        {mainState.topUsers && mainState.topUsers.length > 0 &&
                            <div className="players_list">
                                {mainState.topUsers.map((user) => {
                                    return <div className="player_box">
                                        <span className="name">{user.username}</span>
                                        <span className="lvl">{Math.floor(user.passedCars / 10)}</span>
                                    </div>
                                })}

                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
