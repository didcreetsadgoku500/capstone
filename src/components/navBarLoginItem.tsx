// "use client"
// import { signIn, signOut  } from "next-auth/react"
import { signIn, signOut } from "@/utils/auth"
import { DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "./ui/dropdown-menu"
import { Session } from "next-auth"
import { LogOutIcon, LogInIcon } from "lucide-react"


interface NavBarLoginItemProps {
    signedIn?: boolean
    session?: Session | null
}

export function NavBarLoginItem({signedIn, session}: NavBarLoginItemProps) {
    if (signedIn) return (
        <form action={async () => {
            "use server"
            await signOut()
        }}>
            <DropdownMenuItem asChild>
                <button className="w-full text-center" type="submit">
                    <LogOutIcon /> <span>Sign Out</span>
                </button>
            </DropdownMenuItem>
        </form>    
        
    )



    else return (
        <form action={async () => {
            "use server"
            await signIn("osu", {redirect: true})
        }}>
            <DropdownMenuItem asChild>
                <button className="w-full text-center" type="submit">
                    <LogInIcon /> <span>Sign In</span>
                </button>
            </DropdownMenuItem>
        </form>
    )
}