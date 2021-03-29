import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";
import { useField } from "formik";
import React from "react";
import { Input } from "./Input";

export const InputField: React.FC<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > & {
    name: string;
    errorMsg?: string;
    label?: string;
    textarea?: boolean;
    altErrorMsg?: string;
  }
> = ({ label, textarea, errorMsg, ref: _, ...props }) => {
  const [field, { error }] = useField(props);

  return (
    <div>
      <FormControl isInvalid={!!error}>
        <FormLabel htmlFor={field.name}>{label}</FormLabel>
        <Input textarea={textarea} {...field} {...props} />
        {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
      </FormControl>
    </div>
  );
};
