<p align="center" style="font-size:20px">
  <strong>Strobo<strong/>
</p>

## About

Social media platform intended to be used by people who know what they're talking about

## Aims

- bring back accountability and responsibility to social media
- create a community of academics, researchers, scientista, journalists, publishers, CEO's, ...
- create a community that is educated, transparent, mature, methodical, and objective

## Structure

| Codebase                |     Description     |
| :------------           | :------------------ |
| [server](server)        | Express/GraphQL api |
| [frontend](frontend)    | Web app frontend    |

## Server

```
server
+-- src
    +-- entities // files used to create entities (database tables)
    |   +-- Post.ts (post db table structure)
    |   +-- User.ts (user db table structure)
    |
    +-- migrations // mikro-orm migrations
    |   ...
    |
    +-- resolvers // GraphQL resolvers
    |   +-- hello.ts (sample resolver to check functionality)
    |   +-- Post.ts (post resolver that handles CRUD operations)
    |   +-- User.ts (user resolver that handles login, logout, registration)
    |
    +-- utils
    |   +-- sleep.ts (used to check Next.js SSR)
```


## Frontend

```
frontend
+-- src
    +-- components // general components shared by all pages / other components
    |   +-- DarkModeSwitch.tsx (used to tooggle dark/light mode)
    |   +-- InputField.tsx (generic input field)
    |   +-- NavBar.tsx (NavBar)
    |   +-- Wrapper.tsx (wrapper to control sizes of components)
    |
    +-- generated // generated GraphQL client types
    |   ...
    |
    +-- graphql // GraphQL files used to generate types
    |   |   +-- fragments (contains GraphQL fragments)
    |   |   +-- mutations (contains GraphQL mutations)
    |   |   +-- queries (contains GraphQL queries)
    |
    +-- pages //Next.js folder containing app pages
    |
    +-- utils // folder containing various utils
```
