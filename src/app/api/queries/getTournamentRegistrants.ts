"use server"

import prisma from "@/utils/db"
import { ServerActionResponse } from "@/utils/serverActionResponse";
import { Registrations } from "@prisma/client";

export async function getTournamentRegistrants(tID: bigint): Promise<ServerActionResponse<Registrations[]>> {
    const dbResult = await prisma.registrations.findMany({
        where: {
            tournamentId: tID
        }
    });

    return {body: dbResult};

}