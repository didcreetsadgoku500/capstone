"use server"

import prisma from "@/lib/db"

export async function getTournamentStaff(tID: bigint) {
    const result = await prisma.permission.findMany({
        where: {
            scope: `tournament-${tID}`
        }
    });

    return result;

}