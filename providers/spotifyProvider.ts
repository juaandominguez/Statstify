const SpotifyProvider = {
    id: "spotify",
    name: "Spotify",
    type: "oauth",
    authorize: {
      endpoint: "https://accounts.spotify.com/authorize",
      client_id: process.env.SPOTIFY_CLIENT_ID,
      client_secret: process.env.SPOTIFY_CLIENT_SECRET,
      scope: "user-read-email user-read-private",
    },
    profile: (profile: any) => {
      return {
        id: profile.id,
        name: profile.display_name,
        email: profile.email,
        image: profile.images?.[0]?.url,
        accessToken: profile.access_token,
      };
    },
  };
  
  export default SpotifyProvider;