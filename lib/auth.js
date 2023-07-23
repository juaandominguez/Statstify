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
      }
      //if token is expired, refresh it
      if (Date.now() > token.expires) {
        const refreshToken = await SpotifyProvider.refreshAccessToken({
          clientId: process.env.SPOTIFY_CLIENT_ID,
          clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
          refreshToken: token.refreshToken,
        });
        token.accessToken = refreshToken.access_token;
        token.refreshToken = refreshToken.refresh_token;
        token.expires = Date.now() + refreshToken.expires_in * 1000;
      }
      return token;
    },
    async session({ session, token, user }) {
      session.accessToken = token.accessToken;
      session.user.id = token.id;
      session.refreshToken = token.refreshToken;
      return session;
    },
  },
};
