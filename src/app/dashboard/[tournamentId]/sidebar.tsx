import { SidebarItem } from "./sidebarItem"

export async function Sidebar({params}: {params: Promise<{tournamentId: string}>}) {
    const tournamentId = (await params).tournamentId
    const baseUrl = `/dashboard/${tournamentId}`

    return (
        <div className="flex flex-col gap-2">
            <SidebarItem route={`${baseUrl}`}>
                Overview
            </SidebarItem>
            <SidebarItem route={`${baseUrl}/staff`}>
                Staff
            </SidebarItem>
            <SidebarItem route={`${baseUrl}/registrations`}>
                Registrations
            </SidebarItem>
        </div>

    )
}