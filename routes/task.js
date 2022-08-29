const express = require("express");
const router = express.Router();
//const app = express();
//var data = req.body;
router.post("/test", async (req, res) => {
  console.log(req.body);
  return;
  res.status(200).send(req.body.name);
});
module.exports = router;
