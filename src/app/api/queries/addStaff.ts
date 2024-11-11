"use server"

import { auth } from "@/lib/auth";
import prisma from "@/lib/db"
import { verifyRole } from "@/lib/permissions";

export async function addStaff(tournamentId: bigint, userId: string, roles: string[]) {
    const session = await auth()
    const userRole = await verifyRole(session?.user.id, `tournament-${tournamentId}`, ["host"])
    if (!userRole || userRole.length == 0) {
        return 0;
    }

    const data = roles.map((item) => {return {userId: userId, scope: `tournament-${tournamentId}`,role: item}})

    const result = await prisma.permission.createMany({
        data
    });

    return result;

}