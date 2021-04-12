import { Box } from "@chakra-ui/layout";
import React from "react";
import { Layout } from "../../components/Layout";
import { usePostsSearchQuery } from "../../generated/graphql";
import { withApollo } from "../../utils/withApollo";
import { useRouter } from "next/router";
import { Button, Flex, Heading, Link, Stack, Text } from "@chakra-ui/react";
import { VoteSection } from "../../components/VoteSection";
import NextLink from "next/link";
import { EditDeletePostButtons } from "../../components/EditDeletePostButtons";
import { SideBar } from "../../components/SideBar";

interface searchProps {}

const Search: React.FC<searchProps> = ({}) => {
  const router = useRouter();
  const { data, error, loading, fetchMore, variables } = usePostsSearchQuery({
    variables: {
      filter: router.query.filter as string,
      limit: 15,
      cursor: null as null | string,
    },
    notifyOnNetworkStatusChange: true,
  });

  if (!loading && !data) {
    return <Box>{error?.message}</Box>;
  }

  return (
    <Layout>
      <Flex zIndex={-1}>
        <Box w="20%" ml={4} mr="auto">
          <SideBar />
        </Box>
        <Box w="60%" mr="auto">
          <Box>Search results for {router.query.filter}</Box>
          <Stack spacing={8}>
            // add format text output
            {data?.postsSearch.posts.map((p) =>
              !p ? null : (
                <Flex key={p.id} p={5} shadow="md" borderWidth="1px">
                  <VoteSection post={p} />
                  <Box flex={1}>
                    <NextLink href="/post/[id]" as={`/post/${p.id}`}>
                      <Link>
                        <Heading fontSize="xl">{p.title}</Heading>
                      </Link>
                    </NextLink>
                    <Text>posted by {p.creator.username}</Text>
                    <Flex align="center">
                      <Text flex={1} mt={4}>
                        {p.textSnippet + " ..."}
                      </Text>
                      <Box ml="auto">
                        <EditDeletePostButtons
                          id={p.id}
                          creatorId={p.creator.id}
                        />
                      </Box>
                    </Flex>
                  </Box>
                </Flex>
              )
            )}
            {data && data.postsSearch.hasMore ? (
              <Flex zIndex={0}>
                <Button
                  onClick={() => {
                    fetchMore({
                      variables: {
                        limit: variables?.limit,
                        cursor:
                          data.postsSearch.posts[
                            data.postsSearch.posts.length - 1
                          ].createdAt,
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
          </Stack>
        </Box>
      </Flex>
    </Layout>
  );
};

export default withApollo({ ssr: true })(Search);
