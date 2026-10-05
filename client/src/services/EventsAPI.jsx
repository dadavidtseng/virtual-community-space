/**
 * ---------------------------------------------------------------------------------------------------
 * EventsAPI.jsx
 * 
 * @module client.src.services
 * ---------------------------------------------------------------------------------------------------
 */

/**
 * ---------------------------------------------------------------------------------------------------
 */
const getAllEvents = async () => {
    const response = await fetch('/api/events')
    return await response.json()
}

/**
 * ---------------------------------------------------------------------------------------------------
 */
const getEventsByLocation = async (locationId) => {
    const response = await fetch(`/api/events/location/${locationId}`)
    return await response.json()
}

/**
 * ---------------------------------------------------------------------------------------------------
 */
const getEventById = async (id) => {
    const response = await fetch(`/api/events/${id}`)
    return await response.json()
}

/**
 * ---------------------------------------------------------------------------------------------------
 */
export default { getAllEvents, getEventsByLocation, getEventById }