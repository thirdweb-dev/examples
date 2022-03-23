const fs = require("fs");
const { v4 } = require("uuid");
export default function handler(req, res) {
  const file = JSON.parse(fs.readFileSync("./pages/contracts.json"));
  const id = v4();
  file.events.push({
    name: req.body.name,
    image: req.body.image,
    description: req.body.description,
    chain: "Mumbai",
    address: req.body.address,
    id,
  });
  fs.writeFileSync("./pages/contracts.json", JSON.stringify(file));
  res.status(200).send({ success: true, id });
}
