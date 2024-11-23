"use server"

import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { verifyRole } from "@/lib/permissions";

export async function toggleStage(tournamentId: bigint, stageNo: number, val: boolean) {
    const session = await auth()
    const userRole = await verifyRole(session?.user.id, `tournament-${tournamentId}`, ["host", "cohost"])
    if (!userRole || userRole.length == 0 || !session) {
        return { error: "Not authorized" };
    }

    await prisma.stage.update({
        where: {
            tournamentId_stageNo: {
                tournamentId: tournamentId,
                stageNo: stageNo
            }
        },
        data: {
            public: val
        }
    })

    return {body: true}

    
}