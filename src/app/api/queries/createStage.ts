"use server"

import { auth } from "@/utils/auth";
import prisma from "@/utils/db";
import { verifyRole } from "@/utils/permissions";
import { ServerActionResponse } from "@/utils/serverActionResponse";
import { Match, MatchStatus, Stage } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function createStage(tournamentId: bigint, stage: Pick<Stage, 'stageName' | 'isBracket'> & {matches?: number}): Promise<ServerActionResponse<Stage & {_count: {matches: number}}>> {
    
    if (stage.isBracket && !stage.matches) {
        return {error: "Bracket stages must have at least one match"};
    }

    const session = await auth()
    const userRole = await verifyRole(session?.user.id, `tournament-${tournamentId}`, ["host", "cohost"])
    if (!userRole || userRole.length == 0 || !session) {
        return {error: "Not authorized"};
    }


    const newStage = await prisma.stage.create({
        data: {
            stageName: stage.stageName,
            isBracket: stage.isBracket,
            tournamentId: tournamentId
        }
    })


    if (!stage.isBracket || !stage.matches) {
        return {body: {...newStage, _count: {matches: 0}}}
    }

    const matchData = []
    for (let i = 0; i < stage.matches; i++) {
        matchData.push({
            tournamentId: tournamentId,
            stageNo: newStage.stageNo,
            matchStatus: MatchStatus.NOT_STARTED
        })
    }

    await prisma.match.createMany({
        data: matchData
    })

    revalidatePath(`/dashboard/${tournamentId}/stages`, 'page')
    revalidatePath(`/dashboard/${tournamentId}/matches`, 'page')
    revalidatePath(`/dashboard/${tournamentId}/mappools`, 'page')

    return {body: {...newStage, _count: {matches: stage.matches || 0}}}
}

