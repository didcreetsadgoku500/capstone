import NextAuth, {type DefaultSession} from "next-auth"
import Osu from "next-auth/providers/osu"

declare module "next-auth" {
  /**
   * Returned by `auth`, extends session object
   */
  interface Session {
    user: {
      country: {
        code: string,
        name: string
      },
      discord: string,
      rank: number // TODO: track all gamemodes

    } & DefaultSession["user"]
  }
}







export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Osu],
  callbacks: {
    jwt({ token, session, account, user, trigger, profile}) {
      // console.log('jwt callback', {
      //   token,
      //   trigger,
      //   profile,
      //   user,
      //   session,
      //   account
      // });
      return token
    },
    session({ session, token }) { // TODO: Whatever isnt working here.Need full access token
      // console.log('session callback', {
        // token,
        // session,
      // });

      
      return session
    }
  }
})