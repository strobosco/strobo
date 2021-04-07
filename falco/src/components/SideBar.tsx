import { Box, Button, Grid, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

interface SideBarProps {}

export const SideBar: React.FC<SideBarProps> = ({}) => {
  return (
    <Grid position="sticky" templateRows="repeat(2, 1fr)" alignItems="flex-end">
      <Box>
        <NextLink href="/create-post">
          <Button as={Link} bg="transparent" fontSize={24} ml={6}>
            Create Post
          </Button>
        </NextLink>
      </Box>
      <Box>
        <NextLink href="/">
          <Button as={Link} bg="transparent" fontSize={24} ml={6}>
            Home
          </Button>
        </NextLink>
      </Box>
    </Grid>
  );
};
