const router = require("express").Router();
const Model = require("../../utils/model");
const Products = new Model ("products");
const db = require("../../utils/db")

router.get("/", async (req, res, next) => {
    try {
      const {rows}  = await db.query('SELECT * FROM reviews INNER JOIN products ON reviews.productId=products._id');
      res.send(rows);
    } catch (e) {
      console.log(e);
      res.status(500).send(e);
    }
  });
  
  router.get("/:id", async (req, res, next) => {
    try {
      const {rows} = await db.query('SELECT * FROM reviews,products WHERE products._id=reviews.productid');
      res.send(rows);
    } catch (e) {
      console.log(e);
      res.status(500).send(e);
    }
  });
  
  router.post("/", async (req, res, next) => {
    try {
      const response = await Products.save(req.body);
      res.send(response)
    } catch (e) {
      console.log(e)
      res.status(500).send(e.message);
    }
  
  });
  
  router.put("/:id", async (req, res, next) => {
    try {
      const response = await Products.findByIdAndUpdate(req.params.id,req.body)
      res.send(response);
    } catch (e) {
      res.status(500).send(e);
    }
  });
  
  router.delete("/:id", async (req, res, next) => {
    try {
      const { rows } = await Products.findByIdAndDelete(req.params.id);
      res.send(rows);
    } catch (e) {
      console.log(e);
      res.status(500).send(e);
    }
  });
  
  module.exports = router;
