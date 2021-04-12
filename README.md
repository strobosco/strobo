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