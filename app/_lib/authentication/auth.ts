import { getMemberByAuth0Id } from "@/app/_modules/member/member.services";
import { MemberStatus } from "@/app/_modules/member/member.type";
import NextAuth, { Account, type User } from "next-auth";
import Auth0 from "next-auth/providers/auth0";

declare module "next-auth" {
  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User {
    sub?: string;
    status?: MemberStatus;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Auth0({
      clientId: process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      issuer: process.env.AUTH0_ISSUER_BASE_URL!,
      token: {
        params: {
          audience: process.env.AUTH0_AUDIENCE,
        },
      },
      idToken: true,
      authorization: {
        params: {
          audience: encodeURI(process.env.AUTH0_AUDIENCE ?? ""),
        },
      },
      profile(profile) {
        //console.log(profile);
        return { role: profile.role ?? "user", ...profile };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, account, user, profile }) => {
      if (account) {
        console.log("account: ", account);
        token.accessToken = account.access_token;
        token.accessTokenExpires = account.expires_at ?? null;
      }
      if (user && account?.access_token) {
        // to-do
        // fetch user info from member service
        const dbUser = await getMemberByAuth0Id(
          user.sub ?? "",
          account.access_token
        );

        token.user = {
          ...user,
          id: dbUser?.id ?? user.sub,
          name: dbUser?.name ?? user.name,
          status: dbUser?.status ?? MemberStatus.PENDING,
        };
      }
      //console.log("token: ", token);
      return token;
    },
    session: async ({ session, token }) => {
      session.accessToken = token?.accessToken ? String(token.accessToken) : ""; // Attach the token to the session

      session.user.id = (token.user as User)?.id ?? "unknown";
      session.user.name = (token.user as User)?.name ?? session.user.name;
      session.user.status =
        (token.user as User)?.status ?? MemberStatus.PENDING;
      if (token?.accessTokenExpires) {
        session.expires = new Date(
          (token.accessTokenExpires as number) * 1000
        ).toISOString() as Date & string;
      }
      console.log("session: ", session);
      return session;
    },
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth;
    },
  },
});
