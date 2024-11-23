"use server"

import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { verifyRole } from "@/lib/permissions";

export async function deleteStage(tournamentId: bigint, stageNo: number) {
    const session = await auth()
    const userRole = await verifyRole(session?.user.id, `tournament-${tournamentId}`, ["host", "cohost"])
    if (!userRole || userRole.length == 0 || !session) {
        return { error: "Not authorized" };
    }

    const res = await prisma.stage.delete({
        where: {
            tournamentId_stageNo: {
                tournamentId: tournamentId,
                stageNo: stageNo
            }
        }
    })

    console.log(res)

    return {body: true}

}