import { DetailsNavItem } from "./detailsNavItem"


export async function DetailsNav({params}: {params: {tournamentId: string}}) {
    const tournamentId = params.tournamentId
    const baseUrl = `/listing/${tournamentId}`


    return (
        <div className="flex flex-row justify-between">
            <DetailsNavItem route={`${baseUrl}`}>
                Overview
            </DetailsNavItem>
            <DetailsNavItem route={`${baseUrl}/players`}>
                Players
            </DetailsNavItem>
            <DetailsNavItem route={`${baseUrl}/`}>
                Schedule
            </DetailsNavItem>
            <DetailsNavItem route={`${baseUrl}/`}>
                Mappools
            </DetailsNavItem>
        </div>
    )
}
