import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
import React, { useState } from "react";
import { PostSnippetFragment, useVoteMutation } from "../generated/graphql";

interface VoteSectionProps {
  // post: PostsQuery["posts"]["posts"][0];
  post: PostSnippetFragment;
}

export const VoteSection: React.FC<VoteSectionProps> = ({ post }) => {
  const [loadingState, setLoadingState] = useState<
    "upvote-loading" | "downvote-loading" | "not-loading"
  >("not-loading");
  const [, vote] = useVoteMutation();

  return (
    <Flex direction="column" justifyContent="center" alignItems="center" mr={4}>
      <IconButton
        aria-label="Upvote post"
        icon={<ChevronUpIcon w={7} h={7} />}
        onClick={() => {
          if (post.voteStatus === 1) {
            return;
          }
          setLoadingState("upvote-loading");
          vote({
            postId: post.id,
            value: 1,
          });
          setLoadingState("not-loading");
        }}
        colorScheme={post.voteStatus === 1 ? "green" : undefined}
        isLoading={loadingState === "upvote-loading"}
      />
      {post.points}
      <IconButton
        aria-label="Downvote post"
        icon={<ChevronDownIcon w={7} h={7} />}
        onClick={() => {
          if (post.voteStatus === -1) {
            return;
          }
          setLoadingState("downvote-loading");
          vote({
            postId: post.id,
            value: -1,
          });
          setLoadingState("not-loading");
        }}
        colorScheme={post.voteStatus === -1 ? "red" : undefined}
        isLoading={loadingState === "downvote-loading"}
      />
    </Flex>
  );
};
