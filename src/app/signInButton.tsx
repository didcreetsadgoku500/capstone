"use client"
import { signIn } from "next-auth/react"
import { useState } from "react"
 
interface SignInButtonProps {
    className: string
}


export default function SignInButton({ className }: SignInButtonProps) {
  const [isLoading, setLoading] = useState(false);

  return (
  <button className={className} onClick={() => {
      signIn("osu", {redirect: true})
      setLoading(true)

  }}>
    j
    </button>
    )
}