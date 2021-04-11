import { useApolloClient } from "@apollo/client";
import { Button } from "@chakra-ui/button";
// import { isServer } from "../utils/isServer"; used to make me query from browser not server
import { Box, Flex, Heading, Link, useColorModeValue } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { DarkModeSwitch } from "./DarkModeSwitch";
import { SearchBar } from "./SearchBar";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const router = useRouter();
  const [logout, { loading: logoutFetching }] = useLogoutMutation();
  const apolloClient = useApolloClient();
  const { data, loading } = useMeQuery();
  // can also make request from browser:
  // const [{ data, fetching }] = useMeQuery({
  // pause: isServer(),
  // });
  const bgValue = useColorModeValue("white", "gray.800");
  const bcValue = useColorModeValue("gray.800", "white");

  let body = null;

  // data is loading
  if (loading) {
    // user not logged in
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link ml={4} mr={2}>
            Login
          </Link>
        </NextLink>
        <NextLink href="/register">
          <Link mr={2}>Register</Link>
        </NextLink>
      </>
    );
    // user logged in
  } else {
    body = (
      <Flex align="center">
        <Box mr={4} ml={4}>
          <NextLink href="/profile/mine">
            <Button as={Link} bg="transparent">
              {data.me.username}
            </Button>
          </NextLink>
        </Box>
        <Button
          onClick={async () => {
            await logout();
            await apolloClient.resetStore();
            router.push("/");
          }}
          isLoading={logoutFetching}
          variant="link"
          color=""
        >
          Logout
        </Button>
      </Flex>
    );
  }

  return (
    <Flex
      position="sticky"
      zIndex={1}
      top={0}
      borderBottomStyle="solid"
      borderBottomColor={bcValue}
      borderBottomWidth="1px"
      bg={bgValue}
      p={4}
      align="center"
    >
      <NextLink href="/">
        <Link>
          <Heading>Strobo</Heading>
        </Link>
      </NextLink>
      <Box ml="auto" mr="auto" w="60%">
        <SearchBar />
      </Box>
      <Box ml="10px" mr="5px">
        <Flex align="center">
          <DarkModeSwitch />
          {body}
        </Flex>
      </Box>
    </Flex>
  );
};
