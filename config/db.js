const mysql=require('mysql2/promise');
require('dotenv').config();
const mySqlpool=mysql.createPool({
    host:"localhost",
    user:"root",
    password:process.env.DB_PASSWORD,
    database:"intern"
})
module.exports=mySqlpool;