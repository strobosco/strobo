import { Button } from "@chakra-ui/button";
import { Box, Flex, FormLabel, Link } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/dist/client/router";
import NextLink from "next/link";
import React from "react";
import { Wrapper } from "../components/Wrapper";
import { MeDocument, MeQuery, useLoginMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { toErrorMap } from "../utils/toErrorMap";
import { withApollo } from "../utils/withApollo";
// import { useRouter } from "next/router";

export const Login: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [login] = useLoginMutation();

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
        initialValues={{ usernameOrEmail: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login({
            variables: values,
            update: (cache, { data }) => {
              cache.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                  __typename: "Query",
                  me: data?.login.user,
                },
              });
              cache.evict({ fieldName: "posts:{}" });
            },
          });
          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors));
          } else if (response.data?.login.user) {
            if (typeof router.query.next === "string") {
              router.push(router.query.next);
            } else {
              router.push("/");
            }
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <FormLabel htmlFor="usernameOrEmail">Username or Email</FormLabel>
            <Field
              as="input"
              name="usernameOrEmail"
              placeholder="username or email"
              style={myStyle}
            />
            {/* <InputField
              name="usernameOrEmail"
              placeholder="username or email"
              label="Username or Email"
            /> */}
            <Box mt="4">
              <FormLabel htmlFor="password">Password</FormLabel>
              <Field
                as="input"
                name="password"
                placeholder="Password"
                type="password"
                style={myStyle}
              />
              {/* <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
              /> */}
            </Box>
            <Flex>
              <NextLink href="/forgot-password">
                <Link ml="auto">forgot password</Link>
              </NextLink>
            </Flex>
            <Button
              mt="4"
              type="submit"
              isLoading={isSubmitting}
              colorScheme="teal"
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withApollo({ ssr: false })(Login);
