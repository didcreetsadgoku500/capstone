"use client"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
 
export default function SignInButton() {
  const [isLoading, setLoading] = useState(false);

  return (
    <Button disabled={isLoading} onClick={() => {
      // signIn("osu", {redirect: true})
      fetch('/api/myRoute')
      setLoading(true)
    }}
      
    >
      {isLoading ? <Loader2 strokeWidth={3} className="animate-spin mx-3" /> : "Sign In"} 
    </Button>
    )
}