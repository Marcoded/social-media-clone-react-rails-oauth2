# About

A full stack social media clone built Ruby with React, Ruby on Rails & Tailwind CSS / Daisy UI

## Challenges

As expected, this project turned out to be a very challenging one!
On the back-end, I used the Devise Gem in combination with Omniauth to achieve an easy one click sign-in with Google.
On the front-end, I took me a bit of times to properly strucuture my api calls and make my components as reusable as possible

## Achievements

I'm proud of this project, It nicelly wraps up everything that i've learned over the last year. It showcases my skills in both Rails and React. 

## Features

The application boasts an array of features reminiscent of top-tier social media platforms, including but not limited to:

- **User Authentication**: Leveraging the robust Devise gem and Omniauth, the app supports secure user sign-in via Google.
  
  
- **Comments and Likes**: Building on the interaction model of popular social media, users can engage with posts by adding comments and 'liking' posts they appreciate.
  
- **Follow Functionality**: With the implementation of a Follow system, users can follow and unfollow other users to curate their content feed according to their preferences.

- **Notifications**: Notifications when a post is liked, or when you get a new follower.

## Technical Details

The application was built using a **React front-end** for seamless user interaction and a **Ruby on Rails back-end** for robust server-side processing. The styling was executed with **Tailwind CSS** and **Daisy UI**.

## Getting Started

If you're interested in setting up the project locally, follow the instructions below:

1. **Set Up Google OAuth Client ID**
    You'll need to set up your `GOOGLE_OAUTH_CLIENT_ID` in the development environment. Visit the [Google Developer Console](https://console.developers.google.com/), create a new project, and generate a new OAuth Client ID.

    Once you have the client ID, add it to your `.env` file (or wherever you store your environment variables) like this:

    ```bash
    GOOGLE_OAUTH_CLIENT_ID=<your-google-oauth-client-id>
    ```

2. **Install Dependencies**
    ```bash
    bundle install
    npm install
    ```

3. **Start the server**
    ```bash
    bin/dev
    ```

This should start your Rails server and React development server.
