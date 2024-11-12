import { auth } from "@/lib/auth";
import { logoStyles } from "./textStyles";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent } from "./ui/dropdown-menu";
import { UserRound } from "lucide-react";
import { NavBarLoginItem } from "./navBarLoginItem";
import { Separator } from "./ui/separator";
import Link from "next/link";





export async function NavBar() {
    const session = await auth()


    const signedIn = !!session;

    return (
        <div className="flex flex-col max-w-screen-xl mx-auto">
            
        <div className="flex flex-row justify-between items-end">
            <h1 className={logoStyles}><Link href="/listing">tournament.sh</Link></h1>
            
                
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <Avatar className="m-1 w-12 h-12 ring-0 ring-primary/75 transition-all duration-150 hover:ring">
                        <AvatarImage className="align-text-bottom" src={session?.user.avatar_url} />
                        
                        <AvatarFallback><UserRound /></AvatarFallback>
                    </Avatar>

                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <NavBarLoginItem signedIn={signedIn} session={session}/>
                </DropdownMenuContent>
            </DropdownMenu>
            
 
            </div>
            <Separator />
        </div>
    )
}