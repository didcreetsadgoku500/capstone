import NextAuth from "next-auth"
import Osu from "next-auth/providers/osu"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Osu],
  callbacks: {
    jwt({ token, session, account, user, trigger, profile}) {
      console.log('jwt callback', {
        token,
        trigger,
        profile,
        user,
        session,
        account
      });
      return token
    },
    session({ session, token }) { // TODO: Whatever isnt working here.Need full access token
      console.log('session callback', {
        token,
        session,
      });
      return session
    }
  }
})