import NextAuth, {Profile, type DefaultSession} from "next-auth"
import Osu from "next-auth/providers/osu"
import { narrowProfile } from "./helper"
import { JWT } from "next-auth/jwt"

export interface UserStatistics {
  global_rank: number
}

export type ProfileData = {
    id?: string | null,
    username: string,
    avatar_url: string,
    country_code: string,
    country: string,
    discord: string,
    is_restricted?: boolean,
    statistics_rulesets: {
      osu: UserStatistics,
      taiko: UserStatistics,
      fruits: UserStatistics,
      mania: UserStatistics
  }
}



declare module "next-auth" {
  /**
   * Returned by `auth`, extends session object
   */
  interface Session {
    user: ProfileData
    access_token: string
  }

  interface Profile extends ProfileData {}
}

declare module "next-auth/jwt" {
  interface JWT {
    user: ProfileData;
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

      if (profile) {
        profile = narrowProfile(profile);
        token.user = profile;
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