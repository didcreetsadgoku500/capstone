import { getTournament } from "@/app/api/queries/getTournament";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { auth } from "@/lib/auth";
import { verifyRole } from "@/lib/permissions";
import DashboardClient from "./dashboardClient";


export default async function Page({ params }: { params: { tournamentId: string } }) {
    const tournamentDetailsPromise = getTournament(BigInt(params.tournamentId));

    const session = await auth();

    if (!session || !session.user.id) {
        return <Unauthenticated />
    }
    const permission = await verifyRole(session.user.id, `tournament-${params.tournamentId}`, "host")
    if (!permission) {
        return <Unauthorized tournamentId={params.tournamentId}/>
    }

    const tournamentDetails = await tournamentDetailsPromise;
    if (tournamentDetails == null) {
        return <Unauthorized tournamentId={params.tournamentId}/>
    }


    


    return <div className="mx-auto max-w-screen-xl w-full">
        <Card className="max-w-screen-xl grid grid-cols-4">
            <div className="col-span-1">

            <CardHeader>
                <CardTitle>Navigate</CardTitle>
            </CardHeader>
            <CardContent>

            </CardContent>
            </div>
            <div className="col-span-3">

            <CardHeader>
                <CardTitle>Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
                <DashboardClient tournamentDetails={tournamentDetails}/>
            </CardContent>
            </div>
            
        </Card>
        </div>
        

  }


function save() {

}


function Unauthenticated() {
    return <div className="mx-auto">You are not signed in</div>
  }


function Unauthorized({tournamentId}: {tournamentId: string}) {
    return (<div className="mx-auto">Missing required permissions for tournament ID {tournamentId}. </div>)  }    