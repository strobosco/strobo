import { UsernamePasswordInput } from "src/resolvers/UsernamePasswordInput";

export const validateRegister = (options: UsernamePasswordInput) => {
  // check if username is long enough
  if (!options.email.includes("@")) {
    return [
      {
        field: "email",
        message: "invalid email",
      },
    ];
  }

  if (options.username.length <= 2) {
    return [
      {
        field: "username",
        message: "length must be longer",
      },
    ];
  }

  if (options.username.includes("@")) {
    return [
      {
        field: "username",
        message: "cannor include @",
      },
    ];
  }

  // check if password is long enough
  if (options.password.length <= 6) {
    return [
      {
        field: "password",
        message: "length must be longer",
      },
    ];
  }

  return null;
};
