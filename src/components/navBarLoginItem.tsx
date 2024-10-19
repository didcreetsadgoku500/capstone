// "use client"
// import { signIn, signOut  } from "next-auth/react"
import { signIn, signOut } from "@/lib/auth"
import { DropdownMenuItem } from "./ui/dropdown-menu"

interface NavBarLoginItemProps {
    signedIn?: boolean
}

export function NavBarLoginItem({signedIn}: NavBarLoginItemProps) {
    if (signedIn) return (
        <form action={async () => {
            "use server"
            await signOut()
        }}>

        <DropdownMenuItem asChild>
            <button type="submit">Sign Out</button>
        </DropdownMenuItem>
        </form>    
        
    )



    else return (
        <form action={async () => {
            "use server"
            await signIn("osu", {redirect: true})
        }}>

        <DropdownMenuItem asChild>
            <button type="submit">Sign In</button>
        </DropdownMenuItem>
        </form>
    )
}