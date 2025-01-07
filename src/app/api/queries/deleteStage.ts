"use server"

import { auth } from "@/utils/auth";
import prisma from "@/utils/db";
import { verifyRole } from "@/utils/permissions";
import { revalidatePath } from "next/cache";

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

    revalidatePath(`/dashboard/${tournamentId}/stages`, 'page')
    revalidatePath(`/dashboard/${tournamentId}/matches`, 'page')
    revalidatePath(`/dashboard/${tournamentId}/mappools`, 'page')


    return {body: true}

}