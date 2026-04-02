import { getTournament } from "@/app/api/queries/getTournament";
import { auth } from "@/utils/auth";
import { PermissionGate, verifyRole } from "@/utils/permissions";
import DashboardClient from "./dashboardClient";
import { Unauthenticated, Unauthorized } from "./errorViews";


export default async function Page({ params }: { params: { tournamentId: string } }) {
    const session = await auth();
    const tournamentId = BigInt(params.tournamentId);
    const authorizedRoles = ["host", "cohost"];

    if (!session || !session.user.id) {
        return <Unauthenticated />;
    }

    type DashboardData = Awaited<ReturnType<typeof getTournament>>;
    let tournamentDetails: DashboardData = null;

    if (await verifyRole(session.user.id, tournamentId, authorizedRoles)) {
        tournamentDetails = await getTournament(tournamentId);
    }

    return (
        <PermissionGate
            userId={session.user.id}
            fallback={<Unauthorized tournamentId={params.tournamentId} />}
            role={authorizedRoles}
            tournamentId={tournamentId}
        >
            <>{tournamentDetails
                ? <DashboardClient tournamentDetails={tournamentDetails} />
                : <Unauthorized tournamentId={params.tournamentId} />
            }</>
        </PermissionGate>
    );
}
