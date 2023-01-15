

const express = require('express');
const { Client } = require('pg');

const app = express();
const client = new Client({
  connectionString: 'postgres://username:password@host:port/database'
});

client.connect()
  .then(() => {
    console.log('Connected to the database');
    app.listen(3000, () => {
      console.log('Server started on port 3000');
    });
  })
  .catch(err => {
    console.error('Failed to connect to the database', err);
  });

app.get('/data', (req, res) => {
    client.query('SELECT * FROM customer', (err, result) => {
        if (err) {
            res.status(500).json({error: err});
        }else {
            res.json(result.rows);
        }
    });
});

