## Run Locally

To run the web app locally these are the following requisites:

  - PostgreSQLL database for persistant storage
  - Redis instance for caching
  - Node.js
  - npm to install dependencies

The main commands to run the app are:

  1. Navigate to ```sanso``` and run ```npm install``` to install dependencies
  2. Navigate to ```sanso``` and run ```npm run dev``` to start a local nodemon instance
  3. Navigate to ```falco``` and run ```npm install``` to install dependencies
  4. Navigate to ```falco``` and run ```npm run dev``` to start a local nextjs instance

After that navigate to your desired localhost port and use the app!

## Structure

| Codebase          |     Description     |
| :------------     | :------------------ |
| [sanso](sanso)    | Express/GraphQL API |
| [falco](falco)    | Web app frontend    |
|                   | React Native app    |
|                   | Desktop app         |

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
