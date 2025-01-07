"use server"

import prisma from "@/utils/db"
import { ServerActionResponse } from "@/utils/serverActionResponse";
import { Permission } from "@prisma/client";

export async function getTournamentStaff(tID: bigint): Promise<ServerActionResponse<Permission[]>> {
    const dbResult = await prisma.permission.findMany({
        where: {
            scope: `tournament-${tID}`
        }
    });

    return {body: dbResult};

}