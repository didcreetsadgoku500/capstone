"use server"

import prisma from "@/utils/db"
import { ServerActionResponse } from "@/utils/serverActionResponse";
import { Registration } from "@prisma/client";

export async function getTournamentRegistrants(tID: bigint): Promise<ServerActionResponse<Registration[]>> {
    const dbResult = await prisma.registration.findMany({
        where: {
            tournamentId: tID
        }
    });

    return {body: dbResult};

}