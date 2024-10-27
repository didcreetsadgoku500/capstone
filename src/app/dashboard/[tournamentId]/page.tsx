import { Card } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { verifyRole } from "@/lib/permissions";


export default async function Page({ params }: { params: { tournamentId: string } }) {
    const session = await auth();

    if (!session || !session.user.id) {
        return <Unauthenticated />
    }
    const permission = await verifyRole(session.user.id, `tournament-${params.tournamentId}`, "host")
    if (!permission) {
        return <Unauthorized tournamentId={params.tournamentId}/>
    }

    return <div className="mx-auto">
        <Card>

            Dashboard access granted for tournament ID {params.tournamentId}
            <br /><br />
            TODO: Make dashboard
        </Card>
        </div>
        

  }


function Unauthenticated() {
    return <div className="mx-auto">You are not signed in</div>
  }


function Unauthorized({tournamentId}: {tournamentId: string}) {
    return (<div className="mx-auto">Missing required permissions for tournament ID {tournamentId}. </div>)  }
