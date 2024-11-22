"use client"


import { smallStyles } from "@/components/textStyles";
import Link from "next/link";
import { usePathname } from "next/navigation";

const baseStyle = `${smallStyles} transition-all flex-grow text-center pt-3 pb-2 border-b-2 text-gray-600 hover:border-gray-400`
const activeStyle = `${baseStyle}  border-blue-400 text-gray-900`

//{isActive ? activeStyle : baseStyle}
export function DetailsNavItem({ children, route}: { children: React.ReactNode, route: string }) {
    
    const pathname = usePathname();
    const isActive = pathname==route;
    return (
        <Link className={isActive ? activeStyle : baseStyle} href={route}>
            {children}
        </Link>
    )
}