'use client'
import React, { useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import Image from 'next/image'

export const CircularAnimation = () => {
    return (
        <>
            <div className="">
                <div className="relative flex  justify-center items-center h-[220px] w-[220px] mx-auto bg-[linear-gradient(135deg,_#fff9c4,_#f8bbd0,_#e1bee7,_#d1c4e9,_#bbdefb)] rounded-full scale-75">
                    <CircularText
                        text="5x faster, beautiful, design, better "
                        className="absolute rounded-full opacity-70 "
                        size="210px"
                        direction
                    />
                    <CircularText
                        text="Lovable UI make ui good "
                        className="absolute  rounded-full opacity-80"
                        size="150px"
                    />
                    <Image
                        className={'absolute'}
                        alt=""
                        width={100}
                        height={100}
                        src={'/assets/memoji/memoji_black.png'}
                    />
                </div>
            </div>
        </>
    )
}

interface CircularTextProps {
    text: string
    spinDuration?: number
    onHover?: 'slowDown' | 'speedUp' | 'pause' | 'goBonkers'
    className?: string
    direction?: boolean
    size?: string
}

const getRotationTransition = (
    duration: number,
    from: number,
    loop: boolean = true
) => ({
    from: from,
    to: from + 360,
    ease: 'linear',
    duration: duration,
    type: 'tween',
    repeat: loop ? Infinity : 0,
})

const getTransition = (duration: number, from: number) => ({
    rotate: getRotationTransition(duration, from),
    scale: {
        type: 'spring',
        damping: 20,
        stiffness: 300,
    },
})

const CircularText: React.FC<CircularTextProps> = ({
    text,
    spinDuration = 20,
    onHover = 'speedUp',
    className = '',
    direction = false,
    size = 100,
}) => {
    const letters = Array.from(text)
    const controls = useAnimation()
    const [currentRotation, setCurrentRotation] = useState(0)

    useEffect(() => {
        controls.start({
            rotate: direction ? currentRotation - 360 : currentRotation + 360,
            scale: 1,
            transition: getTransition(spinDuration, currentRotation),
        })
    }, [spinDuration, controls, onHover, text])

    const handleHoverStart = () => {
        if (!onHover) return
        switch (onHover) {
            case 'slowDown':
                controls.start({
                    rotate: direction
                        ? currentRotation - 360
                        : currentRotation + 360,
                    scale: 1,
                    transition: getTransition(
                        spinDuration * 2,
                        currentRotation
                    ),
                })
                break
            case 'speedUp':
                controls.start({
                    rotate: direction
                        ? currentRotation - 360
                        : currentRotation + 360,
                    scale: 1,
                    transition: getTransition(
                        spinDuration / 4,
                        currentRotation
                    ),
                })
                break
            case 'pause':
                controls.start({
                    rotate: currentRotation,
                    scale: 1,
                    transition: {
                        rotate: { type: 'spring', damping: 20, stiffness: 300 },
                        scale: { type: 'spring', damping: 20, stiffness: 300 },
                    },
                })
                break
            case 'goBonkers':
                controls.start({
                    rotate: direction
                        ? currentRotation - 360
                        : currentRotation + 360,
                    scale: 0.8,
                    transition: getTransition(
                        spinDuration / 20,
                        currentRotation
                    ),
                })
                break
            default:
                break
        }
    }

    const handleHoverEnd = () => {
        controls.start({
            rotate: direction ? currentRotation - 360 : currentRotation + 360,
            scale: 1,
            transition: getTransition(spinDuration, currentRotation),
        })
    }

    return (
        <motion.div
            initial={{ rotate: 0 }}
            className={`mx-auto rounded-full  font-black text-center cursor-pointer origin-center ${className}`}
            style={{ width: size, height: size }}
            animate={controls}
            onUpdate={(latest) => setCurrentRotation(Number(latest.rotate))}
            onMouseEnter={handleHoverStart}
            onMouseLeave={handleHoverEnd}
        >
            {letters.map((letter, i) => {
                const rotation = (360 / letters.length) * i
                const factor = Number((Math.PI / letters.length).toFixed(0))
                const x = factor * i
                const y = factor * i
                const transform = `rotateZ(${rotation}deg) translate3d(${x}px, ${y}px, 0)`

                return (
                    <span
                        key={i}
                        className="absolute inline-block inset-0 text-2xl transition-all duration-500 ease-[cubic-bezier(0,0,0,1)]"
                        style={{ transform, WebkitTransform: transform }}
                    >
                        {letter}
                    </span>
                )
            })}
        </motion.div>
    )
}

export default CircularText
