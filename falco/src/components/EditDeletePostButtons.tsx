import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Box, IconButton, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { useDeletePostMutation, useMeQuery } from "../generated/graphql";

interface EditDeletePostButtonsProps {
  id: number;
  creatorId: number;
}

export const EditDeletePostButtons: React.FC<EditDeletePostButtonsProps> = ({
  id,
  creatorId,
}) => {
  const [, deletePost] = useDeletePostMutation();
  const [{ data: MeData }] = useMeQuery();

  if (MeData?.me?.id !== creatorId) {
    return null;
  }
  return (
    <Box>
      <NextLink href="/post/edit/[id]" as={`/post/edit/${id}`}>
        <IconButton
          as={Link}
          mr={4}
          aria-label="Edit post"
          icon={<EditIcon w={7} h={7} />}
        />
      </NextLink>
      <IconButton
        aria-label="Delete post"
        icon={<DeleteIcon w={7} h={7} />}
        // colorScheme="red"
        onClick={() => {
          deletePost({ id });
        }}
      />
    </Box>
  );
};
