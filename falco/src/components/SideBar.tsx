import { Box, Button, Grid, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

interface SideBarProps {}

export const SideBar: React.FC<SideBarProps> = ({}) => {
  return (
    <Grid
      position="sticky"
      borderRightStyle="solid"
      borderRightColor="white"
      borderRightWidth="1px"
      templateRows="repeat(5, 1fr)"
      alignItems="flex-end"
    >
      <Box>
        <NextLink href="/create-post">
          <Button as={Link} bg="transparent" fontSize={32} mt={0} ml={6}>
            Create Post
          </Button>
        </NextLink>
      </Box>
      <Box>
        <NextLink href="/">
          <Button as={Link} bg="transparent" fontSize={32} mt={10} ml={6}>
            Home
          </Button>
        </NextLink>
      </Box>
      <Box>
        <NextLink href="/">
          <Button as={Link} bg="transparent" fontSize={32} mt={10} ml={6}>
            Following
          </Button>
        </NextLink>
      </Box>
      <Box>
        <NextLink href="/">
          <Button as={Link} bg="transparent" fontSize={32} mt={10} ml={6}>
            Explore
          </Button>
        </NextLink>
      </Box>
      <Box>
        <NextLink href="/">
          <Button as={Link} bg="transparent" fontSize={32} mt={10} ml={6}>
            Meassages
          </Button>
        </NextLink>
      </Box>
    </Grid>
  );
};
