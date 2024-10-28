import prisma from "@/lib/db"
import { Tournament, Visibility } from "@prisma/client"

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
            visibility: Visibility.PUBLIC
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