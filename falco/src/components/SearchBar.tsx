import { SearchIcon } from "@chakra-ui/icons";
import { Box, Flex, IconButton } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";

interface SearchBarProps {}

export const SearchBar: React.FC<SearchBarProps> = ({}) => {
  // const [PostsSearch, { data }] = usePostsSearchLazyQuery();
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
    borderRadius: "3px",
  };
  return (
    <Box alignItems="center">
      <Formik
        initialValues={{ search: "" }}
        onSubmit={async (values) => {
          if (values.search) {
            router.push(`/search/${values.search}`);
          }
        }}
      >
        <Form>
          <Flex>
            <Field
              as="input"
              name="search"
              placeholder="Search..."
              style={myStyle}
            ></Field>
            <IconButton
              aria-label="Search box"
              icon={<SearchIcon />}
              colorScheme="teal"
              type="submit"
              ml={2}
            />
          </Flex>
        </Form>
      </Formik>
    </Box>
  );
};
