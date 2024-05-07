// Backend server code (Node.js with Express.js)

const express = require('express');
const oracledb = require('oracledb');
const app = express();
const cors = require('cors');

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());
// Oracle database connection configuration
const dbConfig = {
    user: 'fcubs',
    password: 'NewUatPw_2021yb',
    connectString: '10.1.0.225:1521/fcdbdev'
  };
//
// const oracledb = require('oracledb');

(async function () {
    try {
        const connection = await oracledb.getConnection({
            user:dbConfig.user,
            password: dbConfig.password,
            connectString:dbConfig.connectString
        });
        console.log('Successfully connected');
        const result = await connection.execute("select customer_type,count(*) from sttm_customer group by customer_type");
         console.log(result.rows);
        // Perform database operations here
        // ...
        await connection.close();
    } catch (err) {
        console.error('Connection failed:', err);
    }
})();



// Endpoint to fetch data from Oracle database
app.get('/api/users', async (req, res) => {
  try {
    const connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute("select customer_type,count(*) from sttm_customer group by customer_type");
    await connection.close();
    
    res.json(result);
    // console.log()
 // console.log(res,'db')
  } catch (error) {
    console.error('Error fetching data from Oracle:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});