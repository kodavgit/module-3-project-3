const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres', // default PostgreSQL user
  host: 'localhost', // or your database host
  database: 'cruddb', // your database name
  password: 'kodav21db', // your database password
  port: 5432, // default PostgreSQL port
});

module.exports = pool;
