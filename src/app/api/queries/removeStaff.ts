"use server"

import { auth } from "@/utils/auth";
import prisma from "@/utils/db"
import { verifyRole } from "@/utils/permissions";
import { revalidatePath } from "next/cache";

export async function removeStaff(tournamentId: bigint, roleIds: bigint[]) {
    const session = await auth()
    const userRole = await verifyRole(session?.user.id, `tournament-${tournamentId}`, ["host"])
    if (!userRole || userRole.length == 0) {
        return 0;
    }

    const ORoptions = roleIds.map((item) => {return {id: item}})

    const result = await prisma.permission.deleteMany({
        where: {
            OR: ORoptions
        }
    });

    revalidatePath(`/dashboard/${tournamentId}/staff`, 'page')

    return result;

}