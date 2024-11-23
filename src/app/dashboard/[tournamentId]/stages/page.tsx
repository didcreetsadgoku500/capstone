import { auth } from "@/lib/auth";
import { Unauthenticated, Unauthorized } from "../errorViews";
import { verifyRole } from "@/lib/permissions";
import prisma from "@/lib/db";
import { Card } from "@/components/ui/card";
import DashboardClient from "./dashboardClient";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default async function Page({ params }: { params: { tournamentId: string } }) {
    const session = await auth();

    if (!session || !session.user.id) {
        return <Unauthenticated />
    }
    const permission = await verifyRole(session.user.id, `tournament-${params.tournamentId}`, ["host", "cohost"])
    if (!permission) {
        return <Unauthorized tournamentId={params.tournamentId}/>
    }

    const stages = await prisma.stage.findMany({
        where: {
            tournamentId: BigInt(params.tournamentId)
        },
        include: {
            _count: {
                select: {
                    matches: true
                }
            }
        }
    })



    return (<div className="max-w-screen-sm">
    <Table className="mb-4">
        <TableHeader>
            <TableRow>
            <TableHead>Stage</TableHead>
            <TableHead className="w-24">Public</TableHead>
            </TableRow>
        </TableHeader>
    </Table>
    <DashboardClient defaultStages={stages}/>
    </div>

)

}