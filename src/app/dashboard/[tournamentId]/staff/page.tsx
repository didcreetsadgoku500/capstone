import { OtherError, Unauthenticated, Unauthorized } from "../errorViews";
import { verifyRole } from "@/lib/permissions";
import { auth } from "@/lib/auth";
import { getTournamentStaff } from "@/app/api/queries/getTournamentStaff";
import DashboardClient from "./dashboardClient";
import { Client, isOsuJSError } from "osu-web.js";
import { onlyUnique } from "@/lib/helper";

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
    if (!tournamentStaff.body) {
        return <OtherError />
    }
    console.log()

    let osu;
    osu = new Client(session.access_token)

    const userDetails = await osu?.users.getUsers({query: {ids: tournamentStaff.body.map(u => Number(u.userId)).filter(onlyUnique)}})

    const extendedStaff = tournamentStaff.body.map(t => ({
        ...t,
        userDetails: userDetails?.find(u => u.id == Number(t.userId))
    }))
    console.log(extendedStaff)

    return (
        <DashboardClient tournamentId={params.tournamentId} staff={extendedStaff}/>
        
    )

}