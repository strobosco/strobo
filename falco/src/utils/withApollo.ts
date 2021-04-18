import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { NextPageContext } from "next";
import { withApollo as createWithApollo } from "next-apollo";
import { PaginatedPosts } from "../generated/graphql";

const apolloLink = () => {
  return new HttpLink({ uri: process.env.NEXT_PUBLIC_APOLLO_URI });
};

const createClient = (ctx?: NextPageContext) =>
  new ApolloClient({
    link: apolloLink(),
    // uri: process.env.NEXT_PUBLIC_APOLLO_URI,
    credentials: "include",
    headers: {
      cookie:
        (typeof window === "undefined"
          ? (ctx?.req?.headers.cookie as string)
          : undefined) || "",
    },
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            posts: {
              keyArgs: [],
              merge(
                existing: PaginatedPosts | undefined,
                incoming: PaginatedPosts
              ): PaginatedPosts {
                return {
                  ...incoming, // equal to:
                  // __typename: "PaginatedPosts",
                  // hasMore: incoming.hasMore
                  posts: [...(existing?.posts || []), ...incoming.posts],
                };
              },
            },
            profilePosts: {
              keyArgs: [],
              merge(
                existing: PaginatedPosts | undefined,
                incoming: PaginatedPosts
              ): PaginatedPosts {
                return {
                  ...incoming, // equal to:
                  // __typename: "PaginatedPosts",
                  // hasMore: incoming.hasMore
                  posts: [...(existing?.posts || []), ...incoming.posts],
                };
              },
            },
            postsSearch: {
              keyArgs: [],
              merge(
                existing: PaginatedPosts | undefined,
                incoming: PaginatedPosts
              ): PaginatedPosts {
                return {
                  ...incoming, // equal to:
                  // __typename: "PaginatedPosts",
                  // hasMore: incoming.hasMore
                  posts: [...(existing?.posts || []), ...incoming.posts],
                };
              },
            },
          },
        },
      },
    }),
  });

export const withApollo = createWithApollo(createClient);
