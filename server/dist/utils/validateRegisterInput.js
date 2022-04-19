"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRegisterInput = void 0;
const validateRegisterInput = (username, email, password) => {
    let errors = [];
    if (username.length <= 2) {
        errors.push({
            field: "username",
            message: "Username must be greater than 2 characters",
        });
    }
    if (username.includes("@")) {
        errors.push({
            field: "username",
            message: "Username must not include @ symbol",
        });
    }
    let emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailTest = emailPattern.test(email);
    if (!emailTest) {
        errors.push({ field: "email", message: "Invalid email format" });
    }
    let passwordRegexPattern = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    const validPassword = passwordRegexPattern.test(password);
    if (!validPassword) {
        errors.push({ field: "password", message: "Invalid password format" });
    }
    return errors;
};
exports.validateRegisterInput = validateRegisterInput;
//# sourceMappingURL=validateRegisterInput.js.map