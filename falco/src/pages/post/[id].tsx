import { Flex, Heading } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import React from "react";
import { EditDeletePostButtons } from "../../components/EditDeletePostButtons";
import { Layout } from "../../components/Layout";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useGetPostFromUrl } from "../../utils/useGetPostFromUrl";
import { withApollo } from "../../utils/withApollo";

const Post = ({}) => {
  const { data, error, loading } = useGetPostFromUrl();

  if (loading) {
    return (
      <Layout>
        <Box>loading...</Box>
      </Layout>
    );
  }

  if (error) {
    return <Box>{error.message}</Box>;
  }

  if (!data?.post) {
    return (
      <Layout variant="regular">
        <Box>Post could not be found</Box>
      </Layout>
    );
  }

  // could do without ? since we have a check in place before this
  return (
    <Layout variant="regular">
      <Flex align="center">
        <Heading mb={4}>{data?.post?.title}</Heading>
        <Box ml="auto">
          <EditDeletePostButtons
            id={data.post.id}
            creatorId={data.post.creator.id}
          />
        </Box>
      </Flex>
      {data?.post?.text}
    </Layout>
  );
};

export default withApollo({ ssr: true })(Post);
