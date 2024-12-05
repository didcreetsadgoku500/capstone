"use server"

import { auth } from "@/lib/auth";
import prisma from "@/lib/db"
import { verifyRole } from "@/lib/permissions";
import { Tournament } from "@prisma/client";
import { revalidatePath } from 'next/cache'

export default async function updateTournament(tournamentId: bigint, data: Partial<Tournament>) {
    
    const session = await auth()

    const role = await verifyRole(session?.user.id, `tournament-${tournamentId}`, ["host"])

    if (!role || role.length == 0) {
        return 0
    }

    await prisma.tournament.update({
        where: {
            tournamentId
        },
        data
    })
    
    revalidatePath(`/dashboard/${tournamentId}/`, 'page')
    revalidatePath(`/listing/`, 'page')


    return;
}