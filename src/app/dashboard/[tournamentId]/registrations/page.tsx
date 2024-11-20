import { OtherError, Unauthenticated, Unauthorized } from "../errorViews";
import { verifyRole } from "@/lib/permissions";
import { auth } from "@/lib/auth";
import { getTournamentStaff } from "@/app/api/queries/getTournamentStaff";
import DashboardClient from "./dashboardClient";
import { getRegistered } from "@/app/api/queries/getRegistered";
import { getTournamentRegistrants } from "@/app/api/queries/getTournamentRegistrants";
import { dataUserDetails, joinUserDetails } from "@/app/api/joinUserData";
import { Registrations } from "@prisma/client";

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




    return (
        <DashboardClient tournamentId={params.tournamentId} registrants={detailedRegistrants}/>
        
    )

}