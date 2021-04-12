# Directory layout

## Sanso

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


## Falco

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