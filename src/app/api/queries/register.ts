"use server"

import { auth } from "@/utils/auth";
import prisma from "@/utils/db"
import { ServerActionResponse } from "@/utils/serverActionResponse";
import { Gamemode } from "@prisma/client";
import { revalidatePath } from "next/cache";



export async function register(tournamentId: bigint): Promise<ServerActionResponse<boolean>> {
    const session = await auth();

    if (!session || !session.user.id) {
        return {"error": "You must be logged in to register for a tournament."};
    }

    // Get tournament requirements
    const tournament = await prisma.tournament.findFirst({
        where: {
            tournamentId: tournamentId
        },
        include: {
            registrations: true
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
        console.log("Max rank: ", tournament.maxRank)
        console.log("Min rank: ", tournament.minRank)
            console.log(playerRank)
        
        return {"error": "You are not within the rank range for this tournament."}
    }

    const userId = session.user.id.toString()

    // Check already registered
    for (const registration of tournament.registrations) {
        if (registration.userId == userId) {
            return {"error": "You are already registered for this tournament."}
        }
    }


    // Register if good
    await prisma.registrations.create({
        data: {
            userId: userId,
            tournamentId: tournamentId
        }
    })

    revalidatePath(`/dashboard/${tournamentId}/registrations`, 'page')

    // Return response
    return {"body": true}
}
