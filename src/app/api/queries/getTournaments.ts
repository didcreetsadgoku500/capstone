import prisma from "@/lib/db"
import { Tournament } from "@prisma/client"

export async function getTournaments() {
    const tournaments = await prisma.tournament.findMany({
        include: {
            _count: {
                select: {
                    registrations: true
                }
            }
        },
        where: {
            public: true
        },
        take: 20
    })

    return tournaments
}

export interface ITournament extends Tournament {
    _count: {
        registrations: number
    }
}