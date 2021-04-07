import { Box, Button, Flex } from "@chakra-ui/react";
import React from "react";
import { Layout } from "../components/Layout";
import { PostsView } from "../components/PostsView";
import { SideBar } from "../components/SideBar";
import { usePostsQuery } from "../generated/graphql";
import { withApollo } from "../utils/withApollo";

const Index = () => {
  const { data, error, loading, fetchMore, variables } = usePostsQuery({
    variables: {
      limit: 15,
      cursor: null as null | string,
    },
    notifyOnNetworkStatusChange: true,
  });

  if (!loading && !data) {
    return <div>{error?.message}</div>;
  }

  return (
    <Layout variant="regular">
      <Flex>
        <Box w="20%" ml={4} mr="auto">
          <SideBar />
        </Box>
        <Box w="60%" mr="auto">
          {!data && loading ? <div>loading...</div> : <PostsView data={data} />}
        </Box>
      </Flex>
      {data && data.posts.hasMore ? (
        <Flex>
          <Button
            onClick={() => {
              fetchMore({
                variables: {
                  limit: variables?.limit,
                  cursor:
                    data.posts.posts[data.posts.posts.length - 1].createdAt,
                },
              });
            }}
            isLoading={loading}
            m="auto"
            my={8}
          >
            Load more
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export default withApollo({ ssr: true })(Index);
