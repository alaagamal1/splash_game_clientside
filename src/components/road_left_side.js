import React, { useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import '../App.css';
const LeftSide = () => {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 20
            }
        }

    }

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
        >

            <motion.div
                className="left_mountain"
                initial={{ top: -10, left: 130, scale: 0 }}
                animate={{ x: -170, scale: 1.4, y: 100 }}
                transition={{ duration: 10, repeat: Infinity, staggerChildren: 5, stiffness: 0 }}
            >
            </motion.div>


            <motion.div
                initial={{ scale: 0, top: -60, left: 150 }}
                animate={{ scale: 1.4, top: 0, top: 100, left: -100 }}
                transition={{ duration: 8, delay: 5, repeat: Infinity, staggerChildren: 5 }}
                className="road_left_side">
            </motion.div>


        </motion.div>
    )
}

export default LeftSide;
