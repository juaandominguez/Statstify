# Statstify

![Statstify Home Image](https://statstify.vercel.app/og.png)
![Statstify Audio Features](https://statstify.vercel.app/audio_features.png)

Statstify is a web application that allows users to get their top tracks, artists, and recent plays on Spotify in 3 time ranges: last month, last 6 months, and lifetime, as well as individual track and artist information. It uses the Spotify API and nextAuth authentication to provide a seamless and secure user experience.

## Installation and Usage

To install and run Statstify locally, follow these steps:

1. Clone the repository or download the source code.
2. Open a terminal and navigate to the project directory.
3. Run `npm i --force` to install the dependencies.
4. Run `npm run dev` to start the development server.

Before running the project, make sure to create a `.env` file in the root directory with the following variables:

| .env                  |
| --------------------- |
| SPOTIFY_BASE_API_URL  |
| SPOTIFY_CLIENT_ID     |
| SPOTIFY_CLIENT_SECRET |
| NEXTAUTH_SECRET       |
| NEXTAUTH_URL          |
| NEXT_URL              |

## Features and Functionality

Statstify provides users with a simple and intuitive interface to view their top tracks, artists, and recent plays on Spotify. The main features of the application include:

- Top tracks: View your top tracks on Spotify in 3 time ranges: last month, last 6 months, and lifetime.
- Top artists: View your top artists on Spotify in 3 time ranges: last month, last 6 months, and lifetime.
- Recent plays: View your recent plays on Spotify.
- Tracks: View the main characteristics of each song, and recommended similiar tracks.
- Artists: View the top tracks and albums of each artist, and recommended similiar artists.
- Search: Find your favourite track, artists and albums in a easy and intuitive manner.
- Tier List: Coming soon...
