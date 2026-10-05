/**
 * ---------------------------------------------------------------------------------------------------
 * Event.jsx
 * 
 * @module client.src.componenets
 * ---------------------------------------------------------------------------------------------------
 */

import React, { useState, useEffect } from 'react'
import '../css/Event.css'

const formatTime = (time) => {
    if (!time && time !== 0) return ''
    const hours24 = Math.floor(time / 100)
    const minutes = time % 100
    const period = hours24 >= 12 ? 'PM' : 'AM'
    const hours12 = hours24 % 12 || 12
    return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`
}

const getRemainingTime = (dateStr) => {
    if (!dateStr) return null
    const eventDate = new Date(dateStr)
    const now = new Date()
    const diff = eventDate - now
    const isPast = diff < 0
    const absDiff = Math.abs(diff)

    const days = Math.floor(absDiff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((absDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((absDiff % (1000 * 60 * 60)) / (1000 * 60))

    const timeStr = `${days}d ${hours}h ${minutes}m`
    return { isPast, timeStr }
}

const Event = ({ id, title, date, time, image }) => {
    const [remaining, setRemaining] = useState(null)

    useEffect(() => {
        const update = () => setRemaining(getRemainingTime(date))
        update()
        const interval = setInterval(update, 60000)
        return () => clearInterval(interval)
    }, [date])

    const formattedTime = formatTime(time)
    const isPast = remaining?.isPast

    return (
        <article className={`event-information ${isPast ? 'past-event' : ''}`}>
            <img src={image} />

            <div className='event-information-overlay'>
                <div className='text'>
                    <h3>{title}</h3>
                    <p><i className="fa-regular fa-calendar fa-bounce"></i> {date} <br /> {formattedTime}</p>
                    {remaining && (
                        <p id={`remaining-${id}`} className={isPast ? 'negative-time-remaining' : ''}>
                            {isPast ? `Event passed: ${remaining.timeStr} ago` : `Starts in: ${remaining.timeStr}`}
                        </p>
                    )}
                </div>
            </div>
        </article>
    )
}

export default Event