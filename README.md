# Contact Management API

This is a simple Contact Management API built with Express.js. It allows you to manage a list of contacts by adding, updating, retrieving, and deleting contacts.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js installed on your machine

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/jadhav-kunal/contacts-apis
   ```

2. Navigate to the project directory:

   ```
   cd contacts-apis
   ```

3. Install dependencies:

   ```
   npm install
   ```

4. Start the server:
   ```
   npm start
   ```

By default, the server will start on port 8080. If you want to specify a different port, set the `PORT` environment variable before starting the server.

## API Endpoints

### Get all contacts

- URL: `/contacts`
- Method: `GET`
- Response: Returns an array of all contacts.

### Get a specific contact

- URL: `/contacts?id={contactId}`
- Method: `GET`
- Response:
  - If the contact exists: Returns the contact object.
  - If the contact doesn't exist: Returns an error message.

### Add a new contact

- URL: `/contacts`
- Method: `POST`
- Request Body: JSON object representing the new contact.
- Response:
  - If the contact is valid and added successfully: Returns a success message.
  - If the contact is invalid or a duplicate: Returns an error message.

### Update a contact

- URL: `/contacts/{contactId}`
- Method: `PUT`
- Request Body: JSON object representing the updated contact.
- Response:
  - If the contact exists and the update is successful: Returns a success message.
  - If the contact doesn't exist or the update is invalid: Returns an error message.

### Delete a contact

- URL: `/contacts/{contactId}`
- Method: `DELETE`
- Response:
  - If the contact exists and is deleted successfully: Returns a success message.
  - If the contact doesn't exist: Returns an error message.

## Contact Validation

The API performs validation on the contact data according to the following rules:

- `id`: Mandatory, unique. Accepts any format.
- `firstName`: Mandatory, only alphabets, minimum length of 3.
- `lastName`: Mandatory, only alphabets, minimum length of 3.
- `gender`: Mandatory, only accepts values of "MALE", "FEMALE", or "OTHERS".
- `address.line1`: Mandatory, accepts any string, minimum length of 8.
- `address.line2`: Optional, accepts any string.
- `address.city`: Mandatory, accepts any string.
- `address.country`: Mandatory, accepts any string in all caps.
- `address.zipCode`: Mandatory, accepts any string, maximum length of 10.
- `email`: Mandatory, valid email format.
- `phone`: Mandatory, only accepts numbers.
- `other`: Optional, additional properties can be added.

If any of the validation rules fail, the API will return an appropriate error message.

## Sample Data

Here's the sample data for contacts:

```
{
"firstName": "Kunal",
"lastName": "Jadhav",
"gender": "MALE",
"address": {
"line1": "123 Main St",
"line2": "Apt 4B",
"city": "Mumbai",
"country": "INDIA",
"zipCode": "12345"
},
"email": "kunal@example.com",
"phone": "1234567890"
}
```

## Built With

- Express.js - Web framework for Node.js
- body-parser - Middleware for parsing JSON request bodies
- dotenv - Environment variable management
- uuid - Library for generating unique IDs

## Author

Kunal Jadhav

[![linkedin](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/jadhav-kunal/)
