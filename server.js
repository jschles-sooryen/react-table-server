const express = require("express");
const cors = require("cors");
const fs = require("fs");
const bodyParser = require("body-parser");

const app = express();

const mockData = JSON.stringify([
  {
    id: 1,
    fullName: "Amery Bishop",
    phone: "(869) 456-4662",
    email: "non.bibendum.sed@outlook.net",
    address: "708-7453 Elit Ave",
  },
  {
    id: 2,
    fullName: "Ferris Grimes",
    phone: "(709) 874-9484",
    email: "ante.maecenas.mi@google.edu",
    address: "8928 Dis Rd.",
  },
  {
    id: 3,
    fullName: "Mufutau Mendoza",
    phone: "1-445-401-7821",
    email: "vivamus.sit@yahoo.couk",
    address: "990-7555 Quam, St.",
  },
  {
    id: 4,
    fullName: "Lydia Reynolds",
    phone: "(514) 704-7332",
    email: "sed.id.risus@hotmail.couk",
    address: "559-1649 Eu Street",
  },
  {
    id: 5,
    fullName: "Merrill Leon",
    phone: "1-273-658-1983",
    email: "rhoncus.donec.est@protonmail.net",
    address: "P.O. Box 729, 1359 Eget Rd.",
  },
]);

app.use(cors());
app.use(bodyParser.json());

const HTTP_PORT = 8000;

app.get("/data", (req, res) => {
  const data = fs.readFileSync(__dirname + "/data.json", "utf-8");
  res.json(data);
});

app.post("/data", (req, res) => {
  const data = JSON.parse(fs.readFileSync(__dirname + "/data.json", "utf-8"));
  const newContact = req.body;
  data.push(newContact);
  const newData = JSON.stringify(data);
  fs.unlinkSync(__dirname + "/data.json");
  fs.writeFileSync("data.json", newData);
  res.json(newData);
});

app.patch("/data/:id", (req, res) => {
  const data = JSON.parse(fs.readFileSync(__dirname + "/data.json", "utf-8"));
  const contactId = req.params.id;
  const updatedContact = req.body;
  const newData = JSON.stringify(
    data.map((contact) => {
      if (contact.id === contactId) {
        return updatedContact;
      }
      return contact;
    })
  );
  fs.unlinkSync(__dirname + "/data.json");
  fs.writeFileSync("data.json", newData);
  res.json(newData);
});

app.delete("/data/:id", (req, res) => {
  const data = JSON.parse(fs.readFileSync(__dirname + "/data.json", "utf-8"));
  const contactId = req.params.id;
  const newData = JSON.stringify(
    data.filter((contact) => contact.id !== contactId)
  );
  fs.unlinkSync(__dirname + "/data.json");
  fs.writeFileSync("data.json", newData);
  res.json(newData);
});

app.listen(HTTP_PORT, () => {
  // Delete and regenerate data.json every time server starts
  if (fs.existsSync(__dirname + "/data.json", "utf-8")) {
    fs.unlinkSync(__dirname + "/data.json");
  }

  fs.writeFileSync("data.json", mockData);

  console.log(`Server running on port ${HTTP_PORT}`);
});
