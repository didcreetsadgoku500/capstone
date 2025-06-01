import NextAuth from "next-auth"
import Osu, { OsuUserCompact } from "next-auth/providers/osu"
import { JWT } from "next-auth/jwt"
import { narrowProfile } from "./helper"

declare module "next-auth" {
  /**
   * Returned by `auth`, extends session object
   */
  interface Session {
      user: OsuUserCompact & {
        statistics_rulesets: {
          osu: {global_rank: number},
          taiko: {global_rank: number},
          fruits: {global_rank: number},
          mania: {global_rank: number},

        }
    };    access_token: string
  }

  interface Profile extends OsuUserCompact {}
}

declare module "next-auth/jwt" {
  interface JWT {
    user: OsuUserCompact & {
        statistics_rulesets: {
          osu: {global_rank: number},
          taiko: {global_rank: number},
          fruits: {global_rank: number},
          mania: {global_rank: number},

        }
    };
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
          ...narrowProfile(profile),
          // id: Number(profile.id)
        };
      }
      console.log(token)
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