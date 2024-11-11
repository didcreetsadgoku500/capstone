import { Label } from "@/components/ui/label";
import { Unauthenticated, Unauthorized } from "../errorViews";
import { verifyRole } from "@/lib/permissions";
import { auth } from "@/lib/auth";
import { getTournamentStaff } from "@/app/api/queries/getTournamentStaff";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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

        <div className="space-y-2">
           <Label>Staff roles</Label>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Role</TableHead>
                    </TableRow>
                    
                </TableHeader>
            </Table>
        </div>
    )

}