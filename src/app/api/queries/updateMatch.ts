"use server"

import { MatchFormData } from "@/app/dashboard/[tournamentId]/matches/editMatchDialog";
import { auth } from "@/utils/auth";
import prisma from "@/utils/db";
import { verifyRole } from "@/utils/permissions";
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
    revalidatePath(`/users/${match.team1Id}/`)
    revalidatePath(`/users/${match.team2Id}/`)


    return {body: res}

}