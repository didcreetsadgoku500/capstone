"use server"

import { auth } from "@/lib/auth";
import prisma from "@/lib/db"
import { ServerActionResponse } from "@/lib/serverActionResponse";



export async function unregister(tournamentId: bigint): Promise<ServerActionResponse<boolean>> {
    const session = await auth();

    if (!session || !session.user.id) {
        return {"error": "You must be logged in to withdraw from a tournament."};
    }

    const userId = session.user.id.toString()


    // Register if good
    const res = await prisma.registrations.deleteMany({
        where: {
            userId: userId,
            tournamentId: tournamentId
        }
    })


    // Return response
    if (res.count > 0) {
        return {"body": true}
    }
    else {
        return {"error": "Unknown error occurred."} // How would we even get here?
    }

}
