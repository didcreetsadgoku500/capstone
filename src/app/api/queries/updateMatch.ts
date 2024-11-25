"use server"

import { MatchFormData } from "@/app/dashboard/[tournamentId]/matches/editMatchDialog";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { verifyRole } from "@/lib/permissions";
import { Match } from "@prisma/client";
import { revalidatePath } from "next/cache";

export default async function updateMatch(match: Match, formdata: MatchFormData) {
    const session = await auth()
    const userRole = await verifyRole(session?.user.id, `tournament-${match.tournamentId}`, ["host", "cohost", "referee"])
    if (!userRole || userRole.length == 0 || !session) {
        return { error: "Not authorized" };
    }

    const res = await prisma.match.update({
        where: { 
            tournamentId_matchId: {
                tournamentId: match.tournamentId,
                matchId: match.matchId
            }},
        data: formdata
    })

    revalidatePath(`/dashboard/${match.tournamentId}/matches`)
    revalidatePath(`/listing/${match.tournamentId}/schedule`)

    return {body: res}

}