const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    db: {
  host: "db4free.net",
  user: "gromova_kris",
  password: "Mir2diborta",
  database: "squirrelchka",
    },
  },
  e2e: {
    setupNodeEvents(on, config) {
       on("task", {
        queryDb: (query) => {
          return queryTestDb(query, config)
        },
       });
     },
  },
});
const mysql = require("mysql");
function queryTestDb(query, config) {
  const connection = mysql.createConnection(config.env.db);
  connection.connect();
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
    if (error) reject(error);
    else{
      connection.end();
      return resolve(results);
    }
  });
});
}
