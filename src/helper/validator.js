class validator {
    static userValidator(user, userList) {
      if (
        user.hasOwnProperty("email") &&
        user.hasOwnProperty("preferences") &&
        user.hasOwnProperty("password") &&
        this.validateEmailId(user) &&
        this.validateUserDetails(user) &&
        this.validateUniqueUser(user, userList) &&
        this.validatePreferences(user["preferences"])
      ) {
        return {
          status: true,
          message: "User details has been validated",
        };
      }
  
      if (!this.validateUniqueUser(user, userList)) {
        return {
          status: false,
          message: "Email id is already registered.",
        };
      }
  
      if (!this.validateEmailId(user)) {
        return {
          status: false,
          message: "Email id format is not valid",
        };
      }
  
      if (!this.validatePreferences(user["preferences"])) {
        return {
          status: false,
          message: "Preferences are not in valid format",
        };
      }
      if (!this.validateUserDetails(user)) {
        return {
          status: false,
          message: "Incorrect User details passed",
        };
      }
      return {
        status: false,
        message:
          "User details are not in correct format. User validation failed.",
      };
    }
  
    static validateEmailId(user) {
      if (
        !/^[\-0-9a-zA-Z\.\+_]+@[\-0-9a-zA-Z\.\+_]+\.[a-zA-Z]{2,}$/.test(
          String(user.email)
        )
      ) {
        return false;
      }
      return true;
    }
  
    static validateUserDetails(user) {
      if (user.email != "" && user.preferences != "" && user.password != "") {
        return true;
      }
      return false;
    }
  
    static validateUniqueUser(user, userList) {
      let valueFound = userList.Users.some((item) => item.email === user.email);
      if (valueFound) return false;
      return true;
    }
  
    static validatePreferences(userPreference) {
      const preferencesPassed = Object.keys(userPreference);
      const allowedValues = ["language", "country"];
      const validatePref = preferencesPassed.every((preference) =>
        allowedValues.includes(preference)
      );
      return validatePref;
    }
  }
  
  module.exports = validator;
  