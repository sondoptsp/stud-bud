export const validateRegisterInput = (
  username: string,
  email: string,
  password: string
) => {
  //username validation (<=3, cannot include @)

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

  //email validation (use regex)

  let emailPattern: RegExp =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const emailTest: Boolean = emailPattern.test(email);

  if (!emailTest) {
    errors.push({ field: "email", message: "Invalid email format" });
  }

  //password validation (min 8 letter password, with at least a symbol, upper and lower case letters and a number)
  let passwordRegexPattern: RegExp =
    /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  const validPassword: Boolean = passwordRegexPattern.test(password);

  if (!validPassword) {
    errors.push({ field: "password", message: "Invalid password format" });
  }

  return errors;
};
