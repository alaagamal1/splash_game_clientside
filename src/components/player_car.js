import React, { useState, useEffect } from 'react'
import { motion, useAnimationControls } from 'framer-motion'
import '../App.css';
import carCenter from '../assets/cars/car_center.png'
import carRight from '../assets/cars/car_left.png'
import carLeft from '../assets/cars/car_right.png'

const PlayerCar = ({ mainState, setState, countSeconds }) => {
    const [carPosition, setCarPosition] = useState('center');
    //const carPosition = mainState.carPosition
    //const setCarPosition = (newPosition) => setState({ ...mainState, carPosition: newPosition })
    const enemy = mainState.enemyCar
    const pos = carPosition

    useEffect(() => {
        const iv = setInterval(() => {
            countSeconds.current = countSeconds.current + 1
            if (enemy && (enemy.position_1 == pos || enemy.position_2 == pos) && countSeconds.current > 20 && countSeconds.current < 28 && mainState.gameOn) {
                setState(state => { return { ...state, gameOn: false, enemyCar: false } })
            }
        }, 100);
        return () => clearInterval(iv)
    }, [enemy, pos])

    const up_and_down = {
        init: { y: 0 },
        //move: { y: [0, 3, 0, 1, 0, 3, 0, 3, 0, 1, 0, 3, 0, 5, 0] },
    }

    const detectKeyDown = (e) => {
        if (e.key == 'ArrowLeft')
            goLeft()
        else if (e.key == 'ArrowRight')
            goRight()
    }

    //KEYBOARD
    React.useEffect(() => {
        document.addEventListener('keydown', detectKeyDown)
        return () => document.removeEventListener('keydown', detectKeyDown)
    }, [carPosition])



    const cars = {
        'center': carCenter,
        'left': carLeft,
        'right': carRight
    }

    const goLeft = () => {
        if (carPosition != 'left') {
            setCarPosition(carPosition == 'center' ? 'left' : 'center')
            controls.start({ x: carPosition == 'right' ? 0 : -120, transition: { duration: 0.2 } })
        }
    }

    const goRight = () => {
        if (carPosition != 'right') {
            setCarPosition(carPosition == 'left' ? 'center' : 'right')
            controls.start({ x: carPosition == 'left' ? 0 : 120, transition: { duration: 0.2 } })
        }
    }

    const controls = useAnimationControls()

    useEffect(() => {
        controls.start({ y: [0, 3, 0, 1, 0, 3, 0, 3, 0, 1, 0, 3, 0, 5, 0] })
    }, [])


    return (
        <div>

            <div >
                <motion.img
                    variants={up_and_down}
                    initial="init"
                    animate={controls}
                    transition={{ repeat: Infinity, duration: 3 }}
                    src={cars[carPosition]} className="car_center" />
            </div>
            <div className="buttons">
                <button style={{ padding: 10 }} onClick={goLeft}>LEFT</button>
                <button style={{ padding: 10 }} onClick={goRight}>RIGHT</button>

            </div>
        </div>
    )
}

export default PlayerCar;
