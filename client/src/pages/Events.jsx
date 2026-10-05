import React, { useState, useEffect } from 'react'
import Event from '../components/Event'
import EventsAPI from '../services/EventsAPI'
import LocationsAPI from '../services/LocationsAPI'
import '../css/Events.css'

const Events = () => {
    const [events, setEvents] = useState([])
    const [locations, setLocations] = useState([])
    const [selectedLocation, setSelectedLocation] = useState('all')
    const [sortOrder, setSortOrder] = useState('asc')

    useEffect(() => {
        const fetchData = async () => {
            const eventsData = await EventsAPI.getAllEvents()
            const locationsData = await LocationsAPI.getAllLocations()
            setEvents(eventsData)
            setLocations(locationsData)
        }

        fetchData()
    }, [])

    const getLocationName = (locationId) => {
        const location = locations.find(loc => loc.id === locationId)
        return location ? location.name : ''
    }

    const filteredEvents = selectedLocation === 'all'
        ? events
        : events.filter(event => event.location === parseInt(selectedLocation))

    const sortedEvents = [...filteredEvents].sort((a, b) => {
        const dateA = new Date(a.date)
        const dateB = new Date(b.date)
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA
    })

    return (
        <div className='all-events'>
            <div className='events-controls'>
                <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                >
                    <option value='all'>All Locations</option>
                    {locations.map(location => (
                        <option key={location.id} value={location.id}>
                            {location.name}
                        </option>
                    ))}
                </select>

                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                >
                    <option value='asc'>Date: Earliest First</option>
                    <option value='desc'>Date: Latest First</option>
                </select>
            </div>

            <div className='events-list'>
                {sortedEvents && sortedEvents.length > 0
                    ? sortedEvents.map(event => (
                        <div key={event.id} className='event-with-location'>
                            <Event
                                id={event.id}
                                title={event.title}
                                date={event.date}
                                time={event.time}
                                image={event.image}
                            />
                            <p className='event-location-label'>
                                <i className="fa-solid fa-location-dot"></i> {getLocationName(event.location)}
                            </p>
                        </div>
                    ))
                    : <h2>No events found</h2>
                }
            </div>
        </div>
    )
}

export default Events
