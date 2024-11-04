"use server"

import { auth } from "@/lib/auth";
import prisma from "@/lib/db"
import { verifyRole } from "@/lib/permissions";
import { Tournament } from "@prisma/client";

export default async function updateTournament(tournamentId: bigint, data: Partial<Tournament>) {
    
    const session = await auth()

    const role = await verifyRole(session?.user.id, `tournament-${tournamentId}`, "host")

    await prisma.tournament.update({
        where: {
            tournamentId
        },
        data
    })

    return;
}