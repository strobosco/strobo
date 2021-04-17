import { Box, Heading, Link, Text } from "@chakra-ui/layout";
import { Flex, Stack } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { EditDeletePostButtons } from "../../../components/EditDeletePostButtons";
import { Layout } from "../../../components/Layout";
import { VoteSection } from "../../../components/VoteSection";
import { useUserQuery } from "../../../generated/graphql";
import { withApollo } from "../../../utils/withApollo";

const ViewProfile = ({}) => {
  const router = useRouter();
  const id = parseInt(router.query.id as string);
  const { data } = useUserQuery({ variables: { id: id } });

  return (
    <Layout>
      <Heading m={5} mt={6}>
        {data?.user?.username + "'s profile"}
      </Heading>
      <Text m={5} mt={6}>
        Posts:
      </Text>
      <Stack spacing={8} m={5} mt={6}>
        {data?.user?.posts.map((p) =>
          !p ? null : (
            <Flex key={p.id} p={5} shadow="md" borderWidth="1px">
              <VoteSection post={p} />
              <Box flex={1}>
                <NextLink href="/post/[id]" as={`/post/${p.id}`}>
                  <Link>
                    <Heading fontSize="xl">{p.title}</Heading>
                  </Link>
                </NextLink>
                <Flex align="center" p={4}>
                  <Text flex={1} mt={4}>
                    {p.textSnippet + " ..."}
                  </Text>
                  <Box ml="auto">
                    <EditDeletePostButtons id={p.id} creatorId={p.creator.id} />
                  </Box>
                </Flex>
              </Box>
            </Flex>
          )
        )}
      </Stack>
    </Layout>
  );
};

export default withApollo({ ssr: true })(ViewProfile);
