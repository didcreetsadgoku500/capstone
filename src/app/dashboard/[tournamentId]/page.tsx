import { auth } from "@/lib/auth";
import { verifyRole } from "@/lib/permissions";


export default async function Page({ params }: { params: { tournamentId: string } }) {
    const session = await auth();

    if (!session || !session.user.id) {
        return <div className="mx-auto">You are not signed in</div>
    }
    const permission = await verifyRole(session.user.id, `tournament-${params.tournamentId}`, "host")
    if (!permission) {
        return (<div className="mx-auto">Missing required permissions. </div>)
    }

    return <div className="mx-auto">
            Dashboard access granted for tournament ID {params.tournamentId}
            <br /><br />
            TODO: Make dashboard
        </div>

  }