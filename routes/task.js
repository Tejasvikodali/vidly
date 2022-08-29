const express = require("express");
const router = express.Router();
//const app = express();
//var data = req.body;
router.post("/test", async (req, res) => {
  return;
  res.staus(200).send(req.body.name);
});
module.exports = router;
