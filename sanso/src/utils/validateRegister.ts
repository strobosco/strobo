import { UsernamePasswordInput } from "src/resolvers/UsernamePasswordInput";

export const validateRegister = (options: UsernamePasswordInput) => {
  // check if username is long enough
  if (!options.email.includes("@")) {
    return [
      {
        field: "email",
        message: "The email you entered is invalid",
      },
    ];
  }

  if (options.username.length <= 2) {
    return [
      {
        field: "username",
        message: "Username must contain at least 2 characters",
      },
    ];
  }

  if (options.username.includes("@")) {
    return [
      {
        field: "username",
        message: "Username canno include '@'",
      },
    ];
  }

  // check if password is long enough
  if (options.password.length <= 6) {
    return [
      {
        field: "password",
        message: "Password must contain at least 6 characters",
      },
    ];
  }

  return null;
};
