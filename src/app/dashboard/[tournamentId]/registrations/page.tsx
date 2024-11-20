import { OtherError, Unauthenticated, Unauthorized } from "../errorViews";
import { verifyRole } from "@/lib/permissions";
import { auth } from "@/lib/auth";
import DashboardClient from "./dashboardClient";
import { getTournamentRegistrants } from "@/app/api/queries/getTournamentRegistrants";
import { joinUserDetails } from "@/app/api/joinUserData";

export default async function Page({ params }: { params: { tournamentId: string } }) {
    const session = await auth();

    if (!session || !session.user.id) {
        return <Unauthenticated />
    }
    const permission = await verifyRole(session.user.id, `tournament-${params.tournamentId}`, ["host", "cohost"])
    if (!permission) {
        return <Unauthorized tournamentId={params.tournamentId}/>
    }

    const registrants = await getTournamentRegistrants(BigInt(params.tournamentId))
    if (!registrants.body) {
        return <OtherError />
    }


    const detailedRegistrants = await joinUserDetails(registrants.body, (r) => Number(r.userId))

    if (!detailedRegistrants) {
        return <OtherError />
    }


    return (
        <DashboardClient tournamentId={params.tournamentId} registrants={detailedRegistrants}/>
        
    )

}