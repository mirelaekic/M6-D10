const router = require("express").Router();
const Model = require("../../utils/model");
const Reviews = new Model ("reviews");
const db = require("../../utils/db")

router.get("/", async (req, res, next) => {
    try {
      const {rows}  = await db.query("SELECT * FROM reviews");
      res.send(rows);
    } catch (e) {
      console.log(e);
      res.status(500).send(e);
    }
  });
  
  router.get("/:review_id", async (req, res, next) => {
    try {
      const {rows} = await db.query(`SELECT * FROM reviews WHERE review_id='${parseInt(req.params.review_id, 10)}'`);
      res.send(rows);
    } catch (e) {
      console.log(e);
      res.status(500).send(e);
    }
  });
  
  router.post("/", async (req, res, next) => {
    try {
      const response = await Reviews.save(req.body);
      res.send(response)
    } catch (e) {
      console.log(e)
      res.status(500).send(e.message);
    }
  
  });
  
  router.put("/:id", async (req, res, next) => {
    try {
      const response = await Reviews.findbyIdAndUpdate(req.params.id,req.body)
      res.send(response);
    } catch (e) {
      res.status(500).send(e);
    }
  });
  
  router.delete("/:id", async (req, res, next) => {
    try {
      const { rows } = await db.query(`DELETE FROM reviews WHERE review_id = '${parseInt(req.params.id, 10)}'`);
      res.send("deleted");
    } catch (e) {
      console.log(e);
      res.status(500).send(e);
    }
  });
  
  module.exports = router;