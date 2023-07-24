// import SpotifyProvider  from "@/providers/spotifyProvider";
import SpotifyProvider  from "next-auth/providers/spotify";


export const authOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      authorization: {
        params: {
          grant_type: "authorization_code",
          response_type: "code",
          scope: "user-follow-read user-top-read",}
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
        token.id = profile?.id;
        token.refreshToken = account.refresh_token;
        token.expires = Date.now() + 3600;
      }
      //if token is expired, refresh it
      if (Date.now() > token.expires) {
        const response = await fetch("https://accounts.spotify.com/api/token", {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization:
              "Basic " +
              new Buffer.from(
                process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_CLIENT_SECRET
              ).toString("base64"),
          },
          body: new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: token.refreshToken,
          }),
          method: "POST",
        });
        const refreshToken = await response.json();
        console.log(refreshToken);
        token.accessToken = refreshToken.access_token;
        token.refreshToken = refreshToken.refresh_token;
        token.expires = Date.now() + 3600;
      }
      return token;
    },
    async session({ session, token, user }) {
      // console.log("session", session);
      // console.log("token", token);
      session.accessToken = token.accessToken;
      session.user.id = token.id;
      session.refreshToken = token.refreshToken;
      return session;
    },
  },
};
