const db = require("../db");

class Model {
  constructor(name) {
    this.name = name;
  }
  async run(query) {
    try {
      const resp = await db.query(query);
      return resp;
    } catch (error) {
      throw new Error(error);
    }
  }
  async findbyId(id) {
    if (!id) {
      throw new Error("ID not provided");
    }
    const query = `SELECT * FROM ${this.name} WHERE id = ${parseInt(id, 10)}`;
    const resp = await this.run(query);
    return resp;
  }
  async findbyIdAndDelete(id) {
    if (!id) {
      throw new Error("ID not provided");
    }
    const query = `DELETE FROM ${this.name} WHERE id = ${parseInt(id, 10)}`;
    const resp = await this.run(query);
    return resp;
  }
  async findbyIdAndUpdate(id, fields) {
    if (!id) {
      throw new Error("ID not provided");
    }
    const entries = Object.entries(fields);
    const query = `UPDATE ${this.name} SET ${entries
      .map(([column, value]) => `${column}='${value}'`)
      .join(",")} WHERE id=${parseInt(id)};`;
    const resp = await this.run(query);
    return resp;
  }
  async FindOne(fields) {
    if (!fields || Object.values(fields).length === 0) {
      const query = `SELECT * FROM ${this.name}`;
      const response = await this.run(query);
      return response;
    } else {
      const entries = Object.entries(fields);
      const whereClause = `${entries
        .map(([key, value]) => `${key}='${value}'`)
        .join(" AND ")}`;
      const query = `SELECT * FROM ${this.name} WHERE  ${whereClause};`;
      const response = await this.run(query);
      return response;
    }
  }
  async save(fields) {
    if (!fields || Object.values(fields).length === 0) {
      throw new Error("values not provided");
    }
    const columns = Object.keys(fields);
    const values = Object.values(fields);
    const query = `INSERT INTO  ${this.name} (${columns.join(
      ","
    )}) VALUES (${values.map((v) => `'${v}'`).join(",")});`;
    const resp = await this.run(query);
    return resp;
  }

}
module.exports = Model;