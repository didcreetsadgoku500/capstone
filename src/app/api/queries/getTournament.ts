import prisma from "@/utils/db"
import { Tournament } from "@prisma/client"

export async function getTournament(tID: bigint) {
    const result = await prisma.tournament.findFirst({
        where: {
            tournamentId: tID
        }
    });

    return result;

}