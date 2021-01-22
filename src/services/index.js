const router = require("express").Router();
const productsRouter = require("./products");
const reviewsRouter = require("./reviews");

router.use("/products", productsRouter);
router.use("/reviews", reviewsRouter);

module.exports = router