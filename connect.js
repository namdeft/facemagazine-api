import mysql from 'mysql'

export const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Deft2306@',
    database: 'social',
})
