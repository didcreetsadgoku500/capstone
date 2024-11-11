'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const activeStyle = "bg-primary/5 p-2 rounded-md text-primary"
const inactiveStyle = "hover:bg-primary/5 hover:text-primary p-2 rounded-md text-primary/80"

export function SidebarItem({ children, route}: { children: React.ReactNode, route: string }) {
    const pathname = usePathname();
    const isActive = pathname==route;
    return (
        <Link className={isActive ? activeStyle : inactiveStyle} href={route}>
            {children}
        </Link>
    )
}