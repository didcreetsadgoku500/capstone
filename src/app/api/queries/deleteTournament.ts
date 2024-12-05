"use server"

import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { verifyRole } from "@/lib/permissions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteTournament(tournamentId: bigint) {
    const session = await auth()
    const userRole = await verifyRole(session?.user.id, `tournament-${tournamentId}`, ["host"])
    if (!userRole || userRole.length == 0 || !session) {
        redirect('/listing')
        return { error: "Not authorized" };
    }

    const res = await prisma.tournament.delete({
        where: {
            tournamentId: tournamentId
        }
    })

    revalidatePath(`/listing/`, 'page')
    redirect('/listing')
    return {body: true}

}