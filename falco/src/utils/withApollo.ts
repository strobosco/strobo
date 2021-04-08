import { ApolloClient, InMemoryCache } from "@apollo/client";
import { NextPageContext } from "next";
import { withApollo as createWithApollo } from "next-apollo";
import { PaginatedPosts } from "../generated/graphql";

const createClient = (ctx?: NextPageContext) =>
  new ApolloClient({
    uri: "http://localhost:8080/graphql",
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
          },
        },
      },
    }),
  });

export const withApollo = createWithApollo(createClient);
