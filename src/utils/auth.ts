import NextAuth from "next-auth"
import Osu from "next-auth/providers/osu"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Osu],
  callbacks: {
    jwt({ token, session, account, user}) {
      return {...token, session, account, user}
    },
    session({ session, token }) { // TODO: Whatever isnt working here.Need full access token
      session.user.id = token.id
      return session
    }
  }
})