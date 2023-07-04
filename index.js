const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const { validateContact } = require("./utils/validateContact");

const app = express();
const port = process.env.PORT || 8080;
app.use(bodyParser.json());

let contacts = []; // In-memory storage for contacts

// GET /contacts API - Returns the list/array of contacts
app.get("/contacts", (req, res) => {
  const id = req.query.id;

  if (id) {
    return getContactById(req, res);
  } else {
    return getAllContacts(req, res);
  }
});

// Function to get all contacts
function getAllContacts(req, res) {
  console.log("[getAllContacts]");
  res.status(200).json(contacts);
}

// Function to get a specific contact by ID
function getContactById(req, res) {
  console.log("[getContactById]");
  const id = req.query.id;
  const contact = contacts.find((c) => c.id === id);

  if (!contact) {
    res.status(404).json({ error: "Contact not found" });
  } else {
    res.status(200).json(contact);
  }
}

// POST /contacts API - Adds a new contact
app.post("/contacts", (req, res) => {
  console.log("[addContact]");

  const newContact = req.body;
  newContact.id = uuidv4();

  // Validate the contact
  const validation = validateContact(newContact);

  if (!validation.valid) {
    console.error(validation.errorMessage);

    // Send appropriate response with error message
    res.status(400).json({ error: validation.errorMessage });
  } else {
    // Validate uniqueness of email and phone
    const duplicateContact = contacts.find(
      (contact) =>
        contact.email === newContact.email && contact.phone === newContact.phone
    );

    if (duplicateContact) {
      res.status(400).json({ error: "Duplicate contact" });
    } else {
      contacts.push(newContact);
      res.status(201).json({ message: "Contact added successfully" });
    }
  }
});

// PUT /contacts/{id} API - Updates a contact
app.put("/contacts/:id", (req, res) => {
  console.log("[updateContact]");

  const id = req.params.id;
  const updatedContact = req.body;

  // Find the contact to be updated
  const contactIndex = contacts.findIndex((contact) => contact.id === id);

  if (contactIndex === -1) {
    res.status(404).json({ error: "Contact not found" });
  } else {
    // Validate the contact
    const validation = validateContact(updatedContact);

    if (!validation.valid) {
      console.error(validation.errorMessage);

      // Send appropriate response with error message
      res.status(400).json({ error: validation.errorMessage });
    } else {
      // Validate uniqueness of email and phone (excluding the contact being updated)
      const duplicateContact = contacts.find(
        (contact) =>
          contact.email === updatedContact.email &&
          contact.phone === updatedContact.phone &&
          contact.id != updatedContact.id
      );

      if (duplicateContact) {
        res.status(400).json({ error: "Duplicate contact" });
      } else {
        contacts[contactIndex] = {
          ...contacts[contactIndex],
          ...updatedContact,
        };
        res.status(200).json({ message: "Contact updated successfully" });
      }
    }
  }
});

// DELETE /contacts/{id} API - Deletes a contact
app.delete("/contacts/:id", (req, res) => {
  console.log("[deleteContact]");

  const id = req.params.id;
  const contactIndex = contacts.findIndex((c) => c.id === id);

  if (contactIndex === -1) {
    res.status(404).json({ error: "Contact not found" });
  } else {
    contacts.splice(contactIndex, 1);
    res.status(200).json({ message: "Contact deleted successfully" });
  }
});

// Start the web server on port 8080
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
