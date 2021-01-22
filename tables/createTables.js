require("dotenv").config();
const fs = require("fs");
const path = require("path");
const db = require("../src/utils/db");
const { promisify } = require("util");

const read = promisify(fs.readFile);

const createTable = async () => {
    try {
        const pathData = path.join(__dirname, `../data/index.sql`);
        const data = await read(pathData);
        const SQLString = data.toString();
        await db.query(SQLString);
        console.info('Tables created');
    } catch (error) {
        console.error('Tables not created')
        console.error(error)
    }
    db.pool.end();
};

createTable();