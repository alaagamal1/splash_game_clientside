import React, { useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import '../App.css';

const RightSide = () => {
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
                className="right_mountain"
                initial={{ top: -10, right: 150, scale: 0 }}
                animate={{ right: -350, scale: 1.4, y: 100 }}
                transition={{ duration: 14, delay: 5, repeat: Infinity, staggerChildren: 5 }}
            >
            </motion.div>


        </motion.div>
    )
}

export default RightSide;
