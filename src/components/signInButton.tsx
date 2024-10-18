"use client"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { LoaderCircle } from "lucide-react"
 
export default function SignInButton() {
  const [isLoading, setLoading] = useState(false);

  return (
    <Button disabled={isLoading} onClick={() => {
      signIn("osu", {redirect: true})
      setLoading(true)
    }}
      
    >
      {isLoading ? <LoaderCircle strokeWidth={3} className="animate-spin mx-3" /> : "Sign In"} 
    </Button>
    )
}