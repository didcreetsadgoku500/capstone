import { auth } from "@/lib/auth";
import prisma from "@/lib/db"

export async function register(tournamentId: bigint) {
    const session = await auth();

    if (!session) {
        return 0;
    }

    // Get tournament requirements
    const tournament = prisma.tournament.findFirst({
        where: {
            tournamentId: tournamentId
        }
    })

    // Compare requirements
    const playerRank = session.user.statistics_rulesets. // TODO: get tournament ruleset


    // Register if good



    // Return response

}
