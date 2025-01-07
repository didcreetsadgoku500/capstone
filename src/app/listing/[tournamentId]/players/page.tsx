import { joinUserDetails } from "@/app/api/joinUserData";
import { getTournamentRegistrants } from "@/app/api/queries/getTournamentRegistrants";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { auth } from "@/utils/auth";

export default async function Page({ params }: { params: { tournamentId: string } }) {
  const session = await auth();

  if (!session || !session.user.id) {
    return "You must be logged in to view registered players."
  }

  const registrants = await getTournamentRegistrants(BigInt(params.tournamentId))
  if (!registrants.body) {
    return "Error fetching registrants"
  }


  const detailedRegistrants = await joinUserDetails(registrants.body, (r) => Number(r.userId))

  if (!detailedRegistrants) {
    return "Error fetching registrants"
  }


  return <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Rank</TableHead>
                    </TableRow>
                    
                </TableHeader>
                <TableBody>
                    {detailedRegistrants.map((row) => (
                        <TableRow key={row.data.regId}>
                            <TableCell><span className="flex flex-row items-center gap-5"><img className="w-12 h-12 rounded-full" src={`${row.userDetails?.avatar_url}`}/> {row.userDetails?.username}</span></TableCell>
                            <TableCell>#{row.userDetails?.statistics_rulesets.osu?.global_rank?.toLocaleString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

  </div>
}