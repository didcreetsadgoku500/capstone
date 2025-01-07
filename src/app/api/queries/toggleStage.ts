"use server"

import { auth } from "@/utils/auth";
import prisma from "@/utils/db";
import { verifyRole } from "@/utils/permissions";
import { revalidatePath } from "next/cache";

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

    revalidatePath(`/listing/${tournamentId}/schedule`, 'page')

    return {body: true}

    
}