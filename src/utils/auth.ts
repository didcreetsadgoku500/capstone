import NextAuth, {Profile, type DefaultSession} from "next-auth"
import Osu, { OsuUserCompact } from "next-auth/providers/osu"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  /**
   * Returned by `auth`, extends session object
   */
  interface Session {
    user: OsuUserCompact
    access_token: string
  }

  interface Profile extends OsuUserCompact {}
}

declare module "next-auth/jwt" {
  interface JWT {
    user: OsuUserCompact;
    access_token: string
  }
}



export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Osu({ authorization: "https://osu.ppy.sh/oauth/authorize?scope=identify+public"}),
  ],
  session: {
    maxAge: 86300
  },
  callbacks: {
    jwt({ token, profile, account}) {
      if (account && account.access_token) {
        token.access_token = account.access_token
      }

      if (profile && profile.id) {
        token.user = {
          ...profile,
          id: Number(profile.id)
        };
      }
      return token
    },
    session({ session, token }) { 
      return {
        ...session,
        
        user: {
          ...token.user},
        access_token: token.access_token
      }
    }
  }
})