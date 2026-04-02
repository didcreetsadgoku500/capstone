import { auth } from "@/utils/auth";
import { Unauthenticated, Unauthorized } from "../errorViews";
import { PermissionGate, verifyRole } from "@/utils/permissions";
import prisma from "@/utils/db";
import DashboardClient from "./dashboardClient";
import { joinUserDetails } from "@/app/api/joinUserData";

async function fetchMatchesData(tournamentId: bigint) {
    const [matches, stages, regs, refs] = await Promise.all([
        prisma.match.findMany({ where: { tournamentId } }),
        prisma.stage.findMany({ where: { tournamentId } }),
        prisma.registration.findMany({ where: { tournamentId } }),
        prisma.staff.findMany({ where: { tournamentId: Number(tournamentId), role: "referee" } })
    ]);

    const regsDetails = (await joinUserDetails(regs, r => Number(r.userId)))?.map(r => r.userDetails);
    const refsDetails = (await joinUserDetails(refs, r => Number(r.userId)))?.map(r => r.userDetails);


    return {
        matches,
        stages,
        regsDetails,
        refsDetails
    };
}

export default async function Page({ params }: { params: { tournamentId: string } }) {
    const session = await auth();
    const tournamentId = BigInt(params.tournamentId);
    const authorizedRoles = ["host", "cohost", "referee"];

    if (!session || !session.user.id) {
        return <Unauthenticated />;
    }

    type MatchData = Awaited<ReturnType<typeof fetchMatchesData>>;
    let data: MatchData | null = null;

    if (await verifyRole(session.user.id, tournamentId, authorizedRoles)) {
        data = await fetchMatchesData(tournamentId);
    }

    return (
        <PermissionGate
            userId={session.user.id}
            fallback={<Unauthorized tournamentId={params.tournamentId} />}
            role={authorizedRoles}
            tournamentId={tournamentId}
        >
            <>{data?.regsDetails && data.refsDetails
                ? <DashboardClient
                    tournamentId={params.tournamentId}
                    defaultMatches={data.matches}
                    stages={data.stages}
                    users={data.regsDetails}
                    referees={data.refsDetails}
                  />
                : <div>Could not fetch user details. Try relogging.</div>
            }</>
        </PermissionGate>
    );
}
