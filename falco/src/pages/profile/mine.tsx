import { Box, Flex, Stack, Text } from "@chakra-ui/layout";
import { Heading } from "@chakra-ui/react";
import React from "react";
import { Layout } from "../../components/Layout";
import { useMeQuery, useProfilePostsQuery } from "../../generated/graphql";
import { withApollo } from "../../utils/withApollo";

const MyProfile: React.FC<{}> = ({}) => {
  const { data } = useMeQuery();
  const { data: postsData } = useProfilePostsQuery({
    variables: {
      id: data?.me?.id as number,
      limit: 15,
      cursor: null as null | string,
    },
    notifyOnNetworkStatusChange: true,
  });

  return (
    <Layout variant="regular">
      <Heading m={5}>{data?.me?.username}</Heading>
      <Stack spacing={8} m={5} mt={6}>
        {postsData?.profilePosts.posts.map((p) =>
          !p ? null : (
            <Flex key={p.id} p={5} shadow="md" borderWidth="1px">
              <Box flex={1}>
                <Flex align="center" p={4}>
                  <Heading fontSize="xl">{p.title}</Heading>
                  <Text ml={4}>{p.createdAt}</Text>
                </Flex>
                <Text p={4}>{p.textSnippet + "..."}</Text>
              </Box>
            </Flex>
          )
        )}
      </Stack>
    </Layout>
  );
};

export default withApollo({ ssr: true })(MyProfile);
