"use server"

import prisma from "@/utils/db"
import { ServerActionResponse } from "@/utils/serverActionResponse";
import { Staff } from "@prisma/client";

export async function getTournamentStaff(tID: bigint): Promise<ServerActionResponse<Staff[]>> {
    const dbResult = await prisma.staff.findMany({
        where: {
            tournamentId: tID
        }
    });

    return {body: dbResult};

}