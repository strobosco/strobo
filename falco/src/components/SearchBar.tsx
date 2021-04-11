import { SearchIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Heading, IconButton } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React from "react";
import { usePostsSearchLazyQuery } from "../generated/graphql";
import { useRouter } from "next/router";

interface SearchBarProps {}

export const SearchBar: React.FC<SearchBarProps> = ({}) => {
  const [PostsSearch, { data }] = usePostsSearchLazyQuery();
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
  return (
    <Box alignItems="center">
      <Formik
        initialValues={{ search: "" }}
        onSubmit={async (values) => {
          await PostsSearch({
            variables: { filter: values.search },
          });
          if (data?.postsSearch) {
            console.log(data.postsSearch[0]);
            router.push(`/post/${data.postsSearch[0].id}`);
          }
        }}
      >
        <Form>
          <Flex>
            <Field
              as="input"
              name="search"
              placeholder="..."
              style={myStyle}
            ></Field>
            <IconButton
              aria-label="Search box"
              icon={<SearchIcon />}
              colorScheme="teal"
              type="submit"
              ml={2}
            />
            <Button type="submit">Submit</Button>
          </Flex>
        </Form>
      </Formik>
      {/* {data?.postsSearch?.map((p) => {
        console.log(p);
      })} */}
    </Box>
  );
};
