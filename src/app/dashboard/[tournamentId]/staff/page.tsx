import { Unauthenticated, Unauthorized } from "../errorViews";
import { verifyRole } from "@/lib/permissions";
import { auth } from "@/lib/auth";
import { getTournamentStaff } from "@/app/api/queries/getTournamentStaff";
import DashboardClient from "./dashboardClient";

export default async function Page({ params }: { params: { tournamentId: string } }) {
    const session = await auth();

    if (!session || !session.user.id) {
        return <Unauthenticated />
    }
    const permission = await verifyRole(session.user.id, `tournament-${params.tournamentId}`, ["host"])
    if (!permission) {
        return <Unauthorized tournamentId={params.tournamentId}/>
    }

    const tournamentStaff = await getTournamentStaff(BigInt(params.tournamentId))

    return (
        <DashboardClient tournamentId={params.tournamentId} staff={tournamentStaff}/>
        
    )

}