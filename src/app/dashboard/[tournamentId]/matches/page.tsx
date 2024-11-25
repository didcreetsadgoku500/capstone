import { auth } from "@/lib/auth";
import { Unauthenticated, Unauthorized } from "../errorViews";
import { verifyRole } from "@/lib/permissions";
import prisma from "@/lib/db";
import DashboardClient from "./dashboardClient";
import { joinUserDetails } from "@/app/api/joinUserData";

export default async function Page({ params }: { params: { tournamentId: string } }) {
    const session = await auth();

    if (!session || !session.user.id) {
        return <Unauthenticated />
    }
    const permission = await verifyRole(session.user.id, `tournament-${params.tournamentId}`, ["host", "cohost", "referee"])
    if (!permission) {
        return <Unauthorized tournamentId={params.tournamentId}/>
    }


    const matches = await prisma.match.findMany({
        where: {
            tournamentId: BigInt(params.tournamentId),

        }
    })

    const stages = await prisma.stage.findMany({
        where: {
            tournamentId: BigInt(params.tournamentId),
        }
    })

    const regs = await prisma.registrations.findMany({
        where: {
            tournamentId: BigInt(params.tournamentId)
        }
    })

    const res = await joinUserDetails(regs, r => Number(r.userId))

    if (!res) {
        return <div>Could not fetch user details. Try relogging.</div>
    }

    const regsDetails = res.map(r => r.userDetails)

    return <DashboardClient tournamentId={params.tournamentId} defaultMatches={matches} stages={stages} users={regsDetails}/>
}