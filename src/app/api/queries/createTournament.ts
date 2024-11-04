"use server"

import { auth } from "@/lib/auth";
import prisma from "@/lib/db"
import { Gamemode } from "@prisma/client";
import { redirect } from "next/navigation";

export default async function createTournament(tourName: string) {
    
    const session = await auth()
    if (!session || !session.user.id) {
        return 0;
    }

    const newTournament = await prisma.tournament.create({
        data: {
            tourName,
            tourDesc: "",
            gamemode: Gamemode.STANDARD,
            currentStage: 0
        }
    })

    await prisma.permission.create({
        data: {
            userId: session.user.id.toString(),
            scope: "tournament-" + newTournament.tournamentId,
            role: "host"
        }
    })

    redirect(`dashboard/${newTournament.tournamentId}`)
}