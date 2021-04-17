import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";
import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";
import { Input } from "./Input";

// declare module "@chakra-ui/react" {
//   interface InputHTMLAttributes<HTMLInputElement> {
//     cols?: string;
//     rows?: string;
//     textLength?: string;
//     wrap?: string;
//   }
// }
// declare module "react" {
//   interface InputHTMLAttributes<HTMLInputElement> {
//     // cols?: string;
//     // rows?: string;
//     // textLength?: string;
//     // wrap?: string;
//   }
// }

type TestInputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  textarea?: boolean;
};

// type InputTextArea = ComponentWithAs<"textarea", TextareaProps> &
//   ComponentWithAs<"input", InputProps>;

export const TestInputField: React.FC<TestInputFieldProps> = ({
  label,
  textarea,
  size: _,
  ...props
}) => {
  const [field, { error }] = useField(props);

  // let C = Textarea as any;

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      {textarea ? (
        <Input
          {...field}
          {...props}
          id={field.name}
          placeholder={props.placeholder}
        />
      ) : (
        <Input
          {...field}
          {...props}
          id={field.name}
          placeholder={props.placeholder}
        />
      )}
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};

// use declaration merging to add 'userId' to session object
// import session from "express-session"
// declare module "express-session" {
//   interface SessionData {
//     userId: number;
//   }
// }
