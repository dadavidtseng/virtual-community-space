/**
 * ---------------------------------------------------------------------------------------------------
 * reset.js
 * 
 * @module server.config
 * ---------------------------------------------------------------------------------------------------
 */

import { pool } from './database.js'
import eventData from '../data/events.js'
import locationData from '../data/locations.js'

/**
 * ---------------------------------------------------------------------------------------------------
 */
const createLocationQuery = `
    DROP TABLE IF EXISTS events;
    DROP TABLE IF EXISTS locations;

    CREATE TABLE IF NOT EXISTS locations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        address VARCHAR(255) NOT NULL,
        city VARCHAR(255) NOT NULL,
        state VARCHAR(2) NOT NULL,
        zip VARCHAR(10) NOT NULL,
        image TEXT NOT NULL
    )
`

/**
 * ---------------------------------------------------------------------------------------------------
 */
const createEventQuery = `
    CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        date VARCHAR(100) NOT NULL,
        time INTEGER NOT NULL,
        location INTEGER NOT NULL REFERENCES locations(id),
        image TEXT NOT NULL
    )
`

/**
 * ---------------------------------------------------------------------------------------------------
 */
const createLocationTable = async () => {
    try {
        const res = await pool.query(createLocationQuery)
        console.log('🎉 location table created successfully')
    }
    catch (err) {
        console.error('⚠️ error creating location table', err)
    }
}

/**
 * ---------------------------------------------------------------------------------------------------
 */
const createEventTable = async () => {
    try {
        await pool.query(createEventQuery)
        console.log('🎉 events table created successfully')
    } catch (err) {
        console.error('⚠️ error creating events table', err)
    }
}

/**
 * ---------------------------------------------------------------------------------------------------
 */
const seedLocationTable = async () => {
    await createLocationTable()

    locationData.forEach((location) => {
        const insertQuery = {
            text: "INSERT INTO locations (name, address, city, state, zip, image) VALUES ($1, $2, $3, $4, $5, $6)"
        }

        const values = [
            location.name,
            location.address,
            location.city,
            location.state,
            location.zip,
            location.image
        ]

        pool.query(insertQuery, values, (err, res) => {
            if (err) {
                console.error('⚠️ error inserting location', err)
                return
            }
            console.log(`✅ ${location.name} added successfully`)

        })
    })
}

/**
 * ---------------------------------------------------------------------------------------------------
 */
const seedEventTable = async () => {
    await createEventTable()

    eventData.forEach((event) => {
        const insertQuery = {
            text: 'INSERT INTO events (title, date, time, location, image) VALUES ($1, $2, $3, $4, $5)'
        }

        const values = [
            event.title,
            event.date,
            event.time,
            event.location,
            event.image
        ]

        pool.query(insertQuery, values, (err, res) => {
            if (err) {
                console.error('⚠️ error inserting event', err)
                return
            }
            console.log(`✅ ${event.title} added successfully`)
        })
    })
}

/**
 * ---------------------------------------------------------------------------------------------------
 */
const seedDatabase = async () => {
    await seedLocationTable()
    await seedEventTable()
}

/**
 * ---------------------------------------------------------------------------------------------------
 */
seedDatabase()