# Strobo

## What?

Social media platform intended to be used by people who know what they're talking about

## Why?

Everybody's tired of having to deal with know-it-alls on social media. You post something innocent or objecctively right
and you find yourself having to deal with annoying and frustrating encounters from "69noobslayer420". Strobo aims to fix this problem. We want to:

- bring back accountability and responsibility to social media
- create a community that is educated, transparent, mature, methodical, objective, humble, and always hungry to know more

## How?

We plan to allow public access to our platform. Meaning anybody can sign up for an account an read everything
that is posted to the app. However, to be allowed to post you have to earn the possiblity to do so. Currently, we're thinking of implementing a test system like LinkedIn's. Where in order to gain badges to display on your profile you must pass a certain test.


## Structure

| Codebase          |     Description     |
| :------------     | :------------------ |
| [sanso](sanso)    | Express/GraphQL API |
| [falco](falco)    | Web app frontend    |

### Sanso

```
sanso
+-- src
    +-- entities // files used to create entities (database tables)
    |   +-- Post.ts (post db table structure)
    |   +-- User.ts (user db table structure)
    |
    +-- middleware // middleware folder
    |   +-- isAuth.ts (is user logged in?)
    |
    +-- migrations // used to populate db with "fake" data
    |
    +-- resolvers // GraphQL resolvers
    |   +-- hello.ts (sample resolver to check functionality)
    |   +-- Post.ts (post resolver that handles CRUD operations)
    |   +-- User.ts (user resolver that handles login, logout, registration)
    |   +-- UsernamePasswordInput.ts (input type used to pass options to resolver functions)
    |
    +-- utils
    |   +-- sleep.ts (used to check Next.js SSR)
    |   +-- sendEmail.ts (send change password email)
    |   +-- validateRegister.ts (validate registration)
    |
    +-- index.ts // main server file
    |
    +-- constants.ts // constants file
    |
    +-- types.ts // MyContext
```


### Falco

```
falco
+-- src
    +-- components // general components shared by all pages / other components
    |   +-- DarkModeSwitch.tsx (used to tooggle dark/light mode)
    |   +-- NavBar.tsx (NavBar)
    |   +-- Wrapper.tsx (wrapper to control sizes of components)
    |   +-- Layout.tsx (component that generalizes the layout using NavBar and Wrapper)
    |   +-- input (folder needed to fix Textarea problem)
    |       +-- Input.tsx
    |       +-- InputField.tsx
    |       +-- testInput.tsx
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
    |   +-- change-password (contains password change dynamic page)
    |   +-- create-post.tsx (create post page)
    |   +-- forgot-password.tsx (forgot password page)
    |   +-- index.tsx (home page)
    |   +-- login.tsx (login page)
    |   +-- input (registration page)
    |
    +-- utils // folder containing various utils
```

## Progress Log

- 31/3/2021
  - enable fetching of posts and users, all together, on what will be home page
  - added email verification when fetching post creators (only see your own email)