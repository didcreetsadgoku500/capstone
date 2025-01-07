import { auth } from "@/lib/auth";
import { logoStyles } from "./textStyles";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator } from "./ui/dropdown-menu";
import { UserRound } from "lucide-react";
import { NavBarLoginItem } from "./navBarLoginItem";
import { Separator } from "./ui/separator";
import Link from "next/link";





export async function NavBar() {
    const session = await auth()


    const signedIn = !!session;

    return (
        <div className="flex flex-col max-w-screen-xl mx-auto">

            <div className="flex flex-row justify-between items-end pt-5">
                <h1 className={logoStyles}>tournament.sh</h1>


                

            </div>
            <Separator />
        </div>
    )
}