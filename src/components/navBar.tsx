import { auth } from "@/lib/auth";
import { h2Styles } from "./textStyles";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent } from "./ui/dropdown-menu";
import { UserRound } from "lucide-react";
import { signOut } from "next-auth/react";
import { NavBarLoginItem } from "./navBarLoginItem";





export async function NavBar() {
    const session = await auth()


    const signedIn = !!session;
    console.log(signedIn)

    return (
        <div className="flex flex-row justify-around items-end">
            <h1 className={h2Styles}>tournament.sh</h1>
            
                
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <Avatar className="w-12 h-12 ring-0 ring-primary/75 transition-all duration-150 hover:ring">
                        <AvatarImage src={session?.user.avatar_url} />
                        
                        <AvatarFallback><UserRound /></AvatarFallback>
                    </Avatar>

                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <NavBarLoginItem signedIn={signedIn}/>
                </DropdownMenuContent>
            </DropdownMenu>
            
        </div>
    )
}