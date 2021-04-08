import { Button } from "@chakra-ui/button";
import { Box, FormLabel } from "@chakra-ui/react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { Wrapper } from "../components/Wrapper";
import { MeDocument, MeQuery, useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { withApollo } from "../utils/withApollo";
// import { useRouter } from "next/router";

interface RegisterProps {}

export const Register: React.FC<RegisterProps> = ({}) => {
  const router = useRouter();
  const [register] = useRegisterMutation();

  const myStyle = {
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
    <Wrapper variant="small">
      <Formik
        initialValues={{ email: "", username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register({
            variables: { options: values },
            update: (cache, { data }) => {
              cache.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                  __typename: "Query",
                  me: data?.register.user,
                },
              });
            },
          });
          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors));
          } else if (response.data?.register.user) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <FormLabel htmlFor="username">Username</FormLabel>
            <Field
              as="input"
              name="username"
              placeholder="username"
              label="Username"
              style={myStyle}
            />
            <ErrorMessage name="username" />
            <Box mt="4">
              <FormLabel htmlFor="password">Password</FormLabel>
              <Field
                as="input"
                name="password"
                placeholder="password"
                label="Password"
                type="password"
                style={myStyle}
              />
              <ErrorMessage name="password" />
            </Box>
            <Box mt="4">
              <FormLabel htmlFor="email">Email</FormLabel>
              <Field
                name="email"
                placeholder="email"
                label="Email"
                style={myStyle}
              />
              <ErrorMessage name="email" />
            </Box>
            <Button
              mt="4"
              type="submit"
              isLoading={isSubmitting}
              colorScheme="teal"
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withApollo({ ssr: false })(Register);
