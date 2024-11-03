"use server"

import prisma from "@/lib/db"
import { Tournament } from "@prisma/client";

export default async function updateTournament(tournamentId: bigint, data: Partial<Tournament>) {
    await prisma.tournament.update({
        where: {
            tournamentId
        },
        data
    })

    return;
}