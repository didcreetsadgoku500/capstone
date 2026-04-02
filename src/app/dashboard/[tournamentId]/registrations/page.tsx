import { OtherError, Unauthenticated, Unauthorized } from "../errorViews";
import { PermissionGate, verifyRole } from "@/utils/permissions";
import { auth } from "@/utils/auth";
import DashboardClient from "./dashboardClient";
import { getTournamentRegistrants } from "@/app/api/queries/getTournamentRegistrants";
import { joinUserDetails } from "@/app/api/joinUserData";

async function fetchRegistrationsData(tournamentId: bigint) {
    const registrants = await getTournamentRegistrants(tournamentId);
    if (!registrants.body) return null;

    const detailedRegistrants = await joinUserDetails(registrants.body, (r) => Number(r.userId));
    if (!detailedRegistrants) return null;

    return detailedRegistrants;
}

export default async function Page({ params }: { params: { tournamentId: string } }) {
    const session = await auth();
    const tournamentId = BigInt(params.tournamentId);
    const authorizedRoles = ["host", "cohost"];

    if (!session || !session.user.id) {
        return <Unauthenticated />;
    }

    type RegistrationsData = Awaited<ReturnType<typeof fetchRegistrationsData>>;
    let data: RegistrationsData = null;

    if (await verifyRole(session.user.id, tournamentId, authorizedRoles)) {
        data = await fetchRegistrationsData(tournamentId);
    }

    return (
        <PermissionGate
            userId={session.user.id}
            fallback={<Unauthorized tournamentId={params.tournamentId} />}
            role={authorizedRoles}
            tournamentId={tournamentId}
        >
            <>{data
                ? <DashboardClient tournamentId={params.tournamentId} registrants={data} />
                : <OtherError />
            }</>
        </PermissionGate>
    );
}
