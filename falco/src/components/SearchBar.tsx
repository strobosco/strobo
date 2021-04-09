import { Box } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React from "react";

interface SearchBarProps {}

export const SearchBar: React.FC<SearchBarProps> = ({}) => {
  const myStyle = {
    color: "black",
    width: "100%",
    paddingTop: "0.625rem",
    paddingBottom: "0.625rem",
    paddingLeft: "0.75rem",
    paddingRight: "0.75rem",
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: "rgb(169,169,169)",
  };
  return (
    <Box>
      <Formik
        initialValues={{ search: "" }}
        onSubmit={async () => {
          return;
        }}
      >
        <Form>
          <Field
            as="input"
            name="search"
            placeholder="..."
            style={myStyle}
          ></Field>
        </Form>
      </Formik>
    </Box>
  );
};
