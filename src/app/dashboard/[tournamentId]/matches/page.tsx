import { auth } from "@/utils/auth";
import { Unauthenticated, Unauthorized } from "../errorViews";
import { verifyRole } from "@/utils/permissions";
import prisma from "@/utils/db";
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


    const matchesPromise =  prisma.match.findMany({
        where: {
            tournamentId: BigInt(params.tournamentId),

        }
    })

    const stagesPromise =  prisma.stage.findMany({
        where: {
            tournamentId: BigInt(params.tournamentId),
        }
    })

    const regsPromise = prisma.registrations.findMany({
        where: {
            tournamentId: BigInt(params.tournamentId)
        }
    })

    const refsPromise = prisma.permission.findMany({
        where: {
            scope: `tournament-${params.tournamentId}`,
            role: "referee"
        }
    })

    const regs = await regsPromise
    const matches = await matchesPromise
    const stages = await stagesPromise
    const refs = await refsPromise

    const res = await joinUserDetails(regs, r => Number(r.userId))
    const res2 = await joinUserDetails(refs, r => Number(r.userId))


    if (!res || !res2) {
        return <div>Could not fetch user details. Try relogging.</div>
    }

    const regsDetails = res.map(r => r.userDetails)
    const refsDetails = res2.map(r => r.userDetails)

    return <DashboardClient 
        tournamentId={params.tournamentId} 
        defaultMatches={matches} 
        stages={stages} 
        users={regsDetails} 
        referees={refsDetails}/>
}