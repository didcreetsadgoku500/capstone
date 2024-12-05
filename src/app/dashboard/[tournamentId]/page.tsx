import { getTournament } from "@/app/api/queries/getTournament";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { verifyRole } from "@/lib/permissions";
import DashboardClient from "./dashboardClient";
import { Unauthenticated, Unauthorized } from "./errorViews";


export default async function Page({ params }: { params: { tournamentId: string } }) {
    const tournamentDetailsPromise = getTournament(BigInt(params.tournamentId));

    const session = await auth();

    if (!session || !session.user.id) {
        return <Unauthenticated />
    }
    const permission = await verifyRole(session.user.id, `tournament-${params.tournamentId}`, ["host", "cohost"])
    if (!permission) {
        return <Unauthorized tournamentId={params.tournamentId}/>
    }

    const tournamentDetails = await tournamentDetailsPromise;
    if (tournamentDetails == null) {
        return <Unauthorized tournamentId={params.tournamentId}/>
    }    


    return (<DashboardClient tournamentDetails={tournamentDetails}/>)
                

  }


