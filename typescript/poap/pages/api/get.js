const fs = require("fs");
const { v4 } = require("uuid");
export default function handler(req, res) {
  const file = JSON.parse(fs.readFileSync("./pages/contracts.json"));
  const signature = file.signatures[req.query.id];
  res.status(200).send({ success: true, signature });
}
