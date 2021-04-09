import { Box, Button, FormLabel } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { Layout } from "../components/Layout";
import { useCreatePostMutation } from "../generated/graphql";
import { useIsAuth } from "../utils/useIsAuth";
import { withApollo } from "../utils/withApollo";

const CreatePost: React.FC<{}> = ({}) => {
  const [createPost] = useCreatePostMutation();
  const router = useRouter();

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

  useIsAuth();

  return (
    <>
      <Layout variant="small">
        <Formik
          initialValues={{ title: "", text: "" }}
          onSubmit={async (values) => {
            console.log(values);
            const { errors } = await createPost({
              variables: { input: values },
              update: (cache) => {
                cache.evict({
                  fieldName: "posts:{}",
                });
                cache.evict({
                  fieldName: "profilePosts:{}",
                });
              },
            });
            if (!errors) {
              router.push("/");
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <FormLabel htmlFor="title">Title</FormLabel>
              <Field
                as="input"
                name="title"
                placeholder="title"
                style={myStyle}
              />
              <Box mt="4">
                <FormLabel htmlFor="text">Body</FormLabel>
                <Field
                  as="textarea"
                  name="text"
                  placeholder="text..."
                  style={myStyle}
                />
              </Box>
              <Button
                mt="4"
                type="submit"
                isLoading={isSubmitting}
                colorScheme="teal"
              >
                Create post
              </Button>
            </Form>
          )}
        </Formik>
      </Layout>
    </>
  );
};

export default withApollo({ ssr: false })(CreatePost);
