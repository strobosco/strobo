# Progress Log

- 31/3/2021
  - enable fetching of posts and users, all together, on what will be home page
  - added email verification when fetching post creators (only see your own email)

- 4/4/2021
  - finished most of the general tutorial, watching the deploy section

- 6/4/2021
  - migrated from Urql to Apollo Client, "main" branch is using Urql while "dev" and "apollo_server" are using Apollo Client

- 7/4/2021
  - added SideBar to home page, abstracted some components

- 8/4/2021
  - added page to view my profile, added query to fetch my posts

- 9/4/2021
  - added page to view other profiles, added query to fetch user and posts

- 11/4/2021
  - worked on search bar, added resolver functionality to return posts containing filter in title or text, simply router.push to first posts id until I figure something else out

- 12/4/2021
  - search bar now routes to search page, woking on fixing it graphically

- 13, 14/4/2021
  - looking at using Redis in a K8 cluster, so far seems alright conceptually, put into practice tomorrow