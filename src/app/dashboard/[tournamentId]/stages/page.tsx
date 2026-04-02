import { auth } from "@/utils/auth";
import { Unauthenticated, Unauthorized } from "../errorViews";
import { PermissionGate, verifyRole } from "@/utils/permissions";
import prisma from "@/utils/db";
import DashboardClient from "./dashboardClient";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";

async function fetchStagesData(tournamentId: bigint) {
    return prisma.stage.findMany({
        where: { tournamentId },
        include: {
            _count: {
                select: { matches: true }
            }
        },
        orderBy: { stageNo: "asc" }
    });
}

export default async function Page({ params }: { params: { tournamentId: string } }) {
    const session = await auth();
    const tournamentId = BigInt(params.tournamentId);
    const authorizedRoles = ["host", "cohost"];

    if (!session || !session.user.id) {
        return <Unauthenticated />;
    }

    type StagesData = Awaited<ReturnType<typeof fetchStagesData>>;
    let stages: StagesData = [];

    if (await verifyRole(session.user.id, tournamentId, authorizedRoles)) {
        stages = await fetchStagesData(tournamentId);
    }

    return (
        <PermissionGate
            userId={session.user.id}
            fallback={<Unauthorized tournamentId={params.tournamentId} />}
            role={authorizedRoles}
            tournamentId={tournamentId}
        >
            <div className="max-w-screen-md">
                <Table className="mb-4 max-w-screen-md">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Stage</TableHead>
                            <TableHead className="w-36 text-right">Public</TableHead>
                            <TableHead className="min-w-24 w-36"></TableHead>
                        </TableRow>
                    </TableHeader>
                </Table>
                <DashboardClient defaultStages={stages} tournamentId={params.tournamentId} />
            </div>
        </PermissionGate>
    );
}
