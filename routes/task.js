const express = require("express");
const router = express.Router();
//const app = express();

router.post("/test", async (req, res) => {
  var data = req.body.name;
  console.log(req.body);
  return res.status(200).send(data.name);
});
module.exports = router;
