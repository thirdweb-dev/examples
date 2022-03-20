const fs = require("fs");
const { v4 } = require("uuid");
export default function handler(req, res) {
  const file = JSON.parse(fs.readFileSync("./pages/contracts.json"));
  file.events.push({
    name: req.body.name,
    image: req.body.image,
    description: req.body.description,
    chain: req.body.chain,
    address: req.body.address,
    id: v4(),
  });
  fs.writeFileSync("./pages/contracts.json", JSON.stringify(file));
  res.status(200).send({ success: true });
}
