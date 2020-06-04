const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.query('SELECT * FROM users, now();', (err, res) => {
    console.log(err, res)
    console.log('connected to the db')
    pool.end()
});
