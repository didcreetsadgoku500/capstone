import { ExternalLink } from "lucide-react"
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
            <SidebarItem route={`${baseUrl}/stages`}>
                Stages
            </SidebarItem>
            <SidebarItem route={`${baseUrl}/registrations`}>
                Registrations
            </SidebarItem>
            <SidebarItem route={`${baseUrl}/matches`}>
                Matches
            </SidebarItem>
            <SidebarItem route={`${baseUrl}/mappools`}>
                Mappools
            </SidebarItem>
            <SidebarItem route={`/listing/${tournamentId}`}>
                <span className="flex flex-row items-center">
                    Listing <ExternalLink className="w-4 h-4 ml-1"/>
                    </span>
            </SidebarItem>
        </div>

    )
}