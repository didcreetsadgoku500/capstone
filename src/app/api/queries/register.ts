"use server"

import { auth } from "@/lib/auth";
import prisma from "@/lib/db"
import { ServerActionResponse } from "@/lib/serverActionResponse";
import { Gamemode } from "@prisma/client";
import { Client } from 'osu-web.js';



export async function register(tournamentId: bigint): Promise<ServerActionResponse<boolean>> {
    const session = await auth();

    if (!session || !session.user.id) {
        return {"error": "You must be logged in to register for a tournament."};
    }

    // Get tournament requirements
    const tournament = await prisma.tournament.findFirst({
        where: {
            tournamentId: tournamentId
        }
    })

    if (!tournament || tournament.public != true) {
        return {"error": "Tournament not found."};
    }


    // Compare rank to rank range
    let playerRank = -1;

    if (tournament.gamemode == Gamemode.STANDARD)
        playerRank = session.user.statistics_rulesets.osu.global_rank;
    if (tournament.gamemode == Gamemode.TAIKO)
        playerRank = session.user.statistics_rulesets.taiko.global_rank;
    if (tournament.gamemode == Gamemode.CTB)
        playerRank = session.user.statistics_rulesets.fruits.global_rank;
    if (tournament.gamemode == Gamemode.MANIA)
        playerRank = session.user.statistics_rulesets.mania.global_rank;

    


    if ( playerRank == null ||
        (tournament.maxRank && playerRank > tournament.maxRank) ||
        (tournament.minRank && playerRank < tournament.minRank)
    ) {
        return {"error": "You are not within the rank range for this tournament."}
    }



    // Register if good
    await prisma.registrations.create({
        data: {
            userId: session.user.id,
            tournamentId: tournamentId
        }
    })


    // Return response
    return {"body": true}
}
