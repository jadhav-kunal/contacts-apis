// Function to validate a contact
function validateContact(contact) {
  // Validate firstName
  if (
    !contact.firstName ||
    typeof contact.firstName !== "string" ||
    contact.firstName.length < 3
  ) {
    return {
      valid: false,
      errorMessage: "Invalid firstName",
    };
  }

  // Validate lastName
  if (
    !contact.lastName ||
    typeof contact.lastName !== "string" ||
    contact.lastName.length < 3
  ) {
    return {
      valid: false,
      errorMessage: "Invalid lastName",
    };
  }

  // Validate gender
  const validGenders = ["MALE", "FEMALE", "OTHERS"];
  if (!contact.gender || !validGenders.includes(contact.gender)) {
    return {
      valid: false,
      errorMessage: "Invalid gender",
    };
  }

  // Validate address
  if (
    !contact.address ||
    typeof contact.address !== "object" ||
    !contact.address.line1 ||
    typeof contact.address.line1 !== "string" ||
    contact.address.line1.length < 8 ||
    !contact.address.city ||
    typeof contact.address.city !== "string" ||
    !contact.address.country ||
    typeof contact.address.country !== "string" ||
    contact.address.country !== contact.address.country.toUpperCase() ||
    !contact.address.zipCode ||
    typeof contact.address.zipCode !== "string" ||
    contact.address.zipCode.length > 10
  ) {
    return {
      valid: false,
      errorMessage: "Invalid address",
    };
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (
    !contact.email ||
    typeof contact.email !== "string" ||
    !emailRegex.test(contact.email)
  ) {
    return {
      valid: false,
      errorMessage: "Invalid email",
    };
  }

  // Validate phone
  const phoneRegex = /^\d+$/;
  if (
    !contact.phone ||
    typeof contact.phone !== "string" ||
    !phoneRegex.test(contact.phone)
  ) {
    return {
      valid: false,
      errorMessage: "Invalid phone",
    };
  }

  // Return valid if all validations pass
  return {
    valid: true,
  };
}

module.exports = { validateContact };
