import React from "react";
import { useRouter } from "next/router";
import { Box, Heading, Text, Link } from "@chakra-ui/layout";
import { Layout } from "../../../components/Layout";
import { withApollo } from "../../../utils/withApollo";
import { useUserQuery } from "../../../generated/graphql";
import { Flex, Stack } from "@chakra-ui/react";
import NextLink from "next/link";
import { EditDeletePostButtons } from "../../../components/EditDeletePostButtons";

const ViewProfile = ({}) => {
  const router = useRouter();
  const id = parseInt(router.query.id as string);
  console.log(id);
  const { data } = useUserQuery({ variables: { id: id } });
  console.log(data);

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
              {/* <VoteSection post={p} /> */}
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
