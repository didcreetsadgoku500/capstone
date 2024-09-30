"use client"
import { signIn } from "next-auth/react"
 
interface SignInButtonProps {
    className: string
}


export default function SignInButton({ className }: SignInButtonProps) {
  return <button className={className} onClick={() => signIn("osu")}>Sign In</button>
}