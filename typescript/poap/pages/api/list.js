const fs = require("fs");
export default function handler(req, res) {
  const file = JSON.parse(fs.readFileSync("./pages/contracts.json"));
  if (req.query.id) {
    file.events = file.events.filter((event) => event.id === req.query.id);
  }
  res.status(200).send({ success: true, events: file.events });
}
