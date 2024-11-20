"use server"

import prisma from "@/lib/db"
import { ServerActionResponse } from "@/lib/serverActionResponse";
import { Registrations } from "@prisma/client";

export async function getTournamentRegistrants(tID: bigint): Promise<ServerActionResponse<Registrations[]>> {
    const dbResult = await prisma.registrations.findMany({
        where: {
            tournamentId: tID
        }
    });

    return {body: dbResult};

}