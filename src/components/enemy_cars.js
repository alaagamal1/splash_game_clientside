import React, { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import '../App.css';
import enemyCenter from '../assets/cars/enemy_center.png'
import enemyLeft from '../assets/cars/enemy_left.png'
import enemyRight from '../assets/cars/enemy_right.png'


const EnemyCars = ({ mainState, setState, socket, countSeconds }) => {
    //VARIABLE CONTAINS THE CHOORDS OF ENEMY CARS
    const currentEnemy = mainState.enemyCar;

    //HANDLE THE SERVER
    const setCurrentEnemy = (response) => setState({
        ...mainState,
        gameOn: true,
        enemyCar: response.enemy,
        topUsers: response.topUsers,
        passed_cars: response.me.passedCars
    }
    )

    //CONTROL ANIMATION
    const left = useAnimation()
    const center = useAnimation()
    const right = useAnimation()
    const trans = { duration: 5 }


    //START ANIMATION
    useEffect(() => {
        console.log(currentEnemy)
        const startLeft = () => {
            left.set({ x: -20, y: -20, scale: 0 })
            left.start({ x: -290, y: 90, scale: 1.4 })
        }
        const startCenter = () => {
            center.set({ x: -20, y: -20, scale: 0 })
            center.start({ x: -80, y: 90, scale: 1.4 })

        }
        const startRight = () => {
            right.set({ x: -20, y: -20, scale: 0 })
            right.start({ x: 200, y: 90, scale: 1.4 })
        }



        const p1 = currentEnemy.position_1
        const p2 = currentEnemy.position_2

        if (p1 == 'left' || p2 == 'left')
            startLeft();
        if (p2 == 'right' || p2 == 'right')
            startRight()
        if (p1 == 'center' || p2 == 'center')
            startCenter()
    }, [currentEnemy])


    useEffect(() => {
        socket.on('serverResponse', (data) => {
            if (!data.no_update) {
                setCurrentEnemy(data)
                countSeconds.current = 0
            }
        })
    }, [])


    useEffect(() => {
        const intervalId = setInterval(() => {
            socket.emit('car_passed', { username: mainState.username });
        }, 5000);
        return () => clearInterval(intervalId);
    }, [mainState.gameOn])


    const CarLeft = () => (
        <motion.div
            className="enemy_left"
            initial={{ x: -20, y: -20, scale: 0 }}
            animate={left}
            transition={trans}
        >
            <img src={enemyLeft} className="enemy_left_car" />
        </motion.div>
    )

    const CarRight = () => (
        <motion.div
            className="enemy_left"
            initial={{ x: -20, y: -20, scale: 0 }}
            animate={right}
            transition={trans}
        >
            <img src={enemyRight} className="enemy_left_car" />

        </motion.div>
    )

    const CarCenter = () => (
        <motion.div
            className="enemy_left"
            initial={{ x: -20, y: -20, scale: 0 }}
            animate={center}
            transition={trans}
        >
            <img src={enemyCenter} className="enemy_left_car" />
        </motion.div>
    )
    return (
        <motion.div className="enemy_cars">

            <CarLeft />
            <CarCenter />
            <CarRight />

        </motion.div>
    )
}

export default EnemyCars;
