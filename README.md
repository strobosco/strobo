# Strobo

## What?

Social media platform that brings back transparency and accountability to the web

## Why?

Social media nowadays lacks **responsibility, accountability, truth, and transparency**. Strobo aims to fix this problem. We want to bring social media back to what it once was: a **community built on solid morals that allowed individuals to interact with one another**.

### Goals

- bring back accountability and responsibility to social media
- create a space that is based on truth and transparency
- create a community that is educated, mature, methodical, objective, and always hungry to know more

## How?

Our users will be divided into 2 main tiers: *Pare*'s and *Torgio*'s.

- *Pare*: this is a verified user who can post, comment, and like whatever material is posted to the app

- *Torgio*: this is a public user, the only action possible from this account is reading

We plan to allow public access to our platform because we believe information should be free and accessible to all. So, anybody can sign up for an account and read everything that is posted to the app. However, to be allowed to post you have to earn the possiblity to do so. Currently, we're thinking of implementing a test system like LinkedIn's where in order to gain badges to display on your profile you must pass a certain test. We are open to suggestions.


## Structure

| Codebase          |     Description     |
| :------------     | :------------------ |
| [sanso](sanso)    | Express/GraphQL API |
| [falco](falco)    | Web app frontend    |
|                   | React Native app    |
|                   | Desktop app         |

### Sanso

```
sanso
+-- src
    +-- entities // files used to create entities (database tables)
    |   +-- Post.ts (post db table structure)
    |   +-- User.ts (user db table structure)
    |   +-- Vote.ts (vote db table structure)
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
    |   +-- createUserLoader.ts (User DataLoader)
    |   +-- createVoteLoader.ts (Vote DataLoader)
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
    |   +-- PostsView.tsx (Load posts on index page)
    |   +-- SideBar.tsx (side bar with menu options)
    |   +-- Wrapper.tsx (wrapper to control sizes of components)
    |   +-- Layout.tsx (component that generalizes the layout using NavBar and Wrapper)
    |   +-- VoteSection.tsx (contains upvote, downvote buttons and points)
    |   +-- EditDeletePostButton.tsx (contains edit and delete buttons)
    |   +-- input (folder needed to fix Textarea problem) // deprecated by using Formik fields
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
    |   +-- post (contains pages to VIEW and EDIT post)
    |   +-- profile (pages to view profiles)
    |   +-- create-post.tsx (create post page)
    |   +-- forgot-password.tsx (forgot password page)
    |   +-- index.tsx (home page)
    |   +-- login.tsx (login page)
    |   +-- register.tsx (registration page)
    |
    +-- utils // folder containing various utils
    |
    +-- styles // folder containing Chakra UI styling
    |   +-- theme.tsx // main theming entrypoint
    |   +-- component // contains componenet specific themes
    |   +-- tokens // contains token specific themes
```

### Tech Stack

- Web Frontend:
  - React bootstrapped using create-nextjs-app
  - Next.js
  - Type-GraphQL for type generation
  - Apollo Client 

- Backend:
  - Node.js using npm package manager
  - Express framework
  - Apollo-Server-Express
  - TypeORM for type generation