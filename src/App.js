import React, { useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import './App.css';
import io from "socket.io-client";
import Lottie from "lottie-react"
//IMPORT IMAGES
import sky from './assets/sky.png'
import road from './assets/road.png'
import mountains from './assets/mountain_fade.png'
import avif from './assets/explosion_spritesheet.avif'
import Explosion from './assets/explosion.json'

import LeftSide from './components/road_left_side'

import RightSide from './components/road_right_side'

import EnemyCars from './components/enemy_cars'
import Car from './components/player_car'

import InformationPanels from './components/information_panels'

import Auth from './components/auth'
//explosion_spritesheet.avif
const App = () => {
  const controls = useAnimation()
  //CONNECT TO THE SOCKET
  const socket = io.connect("http://localhost:3001")

  //SET THE MAIL STATE
  const [mainState, setState] = React.useState({
    carPosition: 'center',
    enemyCar: false,
    gameOn: true,

    //user data
    user_level: 1,
    username: 'alaagamal',//null,
    password: null,
    passed_cars: 0,
    logged_in: false,

    //others
    topUsers: false,
  })


  React.useEffect(() => {
    if (mainState.gameOn === false) {
      const tout = setTimeout(() => {
        console.log("SET GAME ON")
        setState(state => {
          return { ...state, gameOn: true }
        });
      }, 500);
      return () => clearTimeout(tout);
    }
  }, [mainState.gameOn])


  const countSeconds = React.useRef(0)

  /*
            <Car mainState={mainState} setState={setState} countSeconds={countSeconds} />
  
            <LeftSide />
            <RightSide />
            <EnemyCars countSeconds={countSeconds} mainState={mainState} setState={setState} socket={socket} />
  
            */
  if (!mainState.logged_in)
    return (<Auth socket={socket} setState={setState} />)
  return (
    <div>
      <div className="container">

        <img src={sky} className="sky" />
        <img src={road} className="road" />
        <div className="tstbx">
          <img src={mountains} className="mountains" />
          <img src={mountains} className="mountains" />
          <img src={mountains} className="mountains" />


          {mainState.gameOn ?
            <>
              <Car mainState={mainState} setState={setState} countSeconds={countSeconds} />
              <LeftSide />
              <RightSide />
              <EnemyCars countSeconds={countSeconds} mainState={mainState} setState={setState} socket={socket} />
            </> :
            <div style={{ position: 'absolute', top: -300 }}>
              <Lottie loop={false} animationData={Explosion} />
            </div>

          }




        </div>


      </div>

      <InformationPanels socket={socket} mainState={mainState} setState={setState} />

    </div>
  )
}

export default App;
