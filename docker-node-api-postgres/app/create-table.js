const Pool = require("pg").Pool;

// Declare a new client instance from Pool()
const pool = new Pool({
  user: "postgres",
  host: "192.168.1.8",
  database: "postgres",
  password: "",
  port: "5432"
});

// Declare a string for the CRUD Postgres table
const tableName = "employee";

// Declare a constant for the CREATE TABLE SQL statement
const newTableSql = `CREATE TABLE ${tableName} (
id SERIAL NOT NULL,
name VARCHAR(255) NOT NULL,
address TEXT NOT NULL,
email VARCHAR(255) NOT NULL,
phone VARCHAR(20) NOT NULL
);`;

async function createTable() {
  // Promise chain for pg Pool client
  const client = await pool
    .connect()

    .catch(err => {
      console.log("pool .connect ->", err);
    });

  // Check that the pg client is valid
  if (client !== undefined) {
    await client.query(`DROP TABLE ${tableName};`, (err, res) => {
      // client is ready for the query() API call
      console.log("nclient ready:", client.readyForQuery, "n");

      // check for errors with client.query()
      if (err) {
        console.log("DROP TABLE ->", err);
      }
      if (res) {
        console.log("DROP TABLE result:", res);
      }
    });

    await client.query(newTableSql, (err, res) => {
      // check for errors with client.query()
      if (err) {
        console.log("nCREATE TABLE ->", err);
      }
      if (res) {
        console.log("nCREATE TABLE result:", res);
      }

      // Release the pg client instance after last query
      client.release();
      console.log("Client is released");
    });
  }
}

createTable();