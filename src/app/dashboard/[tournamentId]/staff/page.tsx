import { OtherError, Unauthenticated, Unauthorized } from "../errorViews";
import { PermissionGate, verifyRole } from "@/utils/permissions";
import { auth } from "@/utils/auth";
import { getTournamentStaff } from "@/app/api/queries/getTournamentStaff";
import DashboardClient from "./dashboardClient";
import { Client } from "osu-web.js";
import { onlyUnique } from "@/utils/helper";

async function fetchStaffData(tournamentId: bigint, accessToken: string) {
    const tournamentStaff = await getTournamentStaff(tournamentId);
    if (!tournamentStaff.body) return null;

    const osu = new Client(accessToken);
    const userDetails = await osu?.users.getUsers({ query: { ids: tournamentStaff.body.map(u => Number(u.userId)).filter(onlyUnique) } });

    return tournamentStaff.body.map(t => ({
        ...t,
        userDetails: userDetails?.find(u => u.id == Number(t.userId))
    }));
}

export default async function Page({ params }: { params: { tournamentId: string } }) {
    const session = await auth();
    const tournamentId = BigInt(params.tournamentId);
    const authorizedRoles = ["host", "cohost"];

    if (!session || !session.user.id) {
        return <Unauthenticated />;
    }

    type StaffData = Awaited<ReturnType<typeof fetchStaffData>>;
    let data: StaffData = null;

    if (await verifyRole(session.user.id, tournamentId, authorizedRoles)) {
        data = await fetchStaffData(tournamentId, session.access_token);
    }

    return (
        <PermissionGate
            userId={session.user.id}
            fallback={<Unauthorized tournamentId={params.tournamentId} />}
            role={authorizedRoles}
            tournamentId={tournamentId}
        >
            <>{data
                ? <DashboardClient tournamentId={params.tournamentId} staff={data} />
                : <OtherError />
            }</>
        </PermissionGate>
    );
}
