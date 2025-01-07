"use server"

import { auth } from "@/utils/auth";
import prisma from "@/utils/db"
import { verifyRole } from "@/utils/permissions";
import { ServerActionResponse } from "@/utils/serverActionResponse";
import { revalidatePath } from "next/cache";



export async function unregister(tournamentId: bigint, regIds?: bigint[]): Promise<ServerActionResponse<boolean>> {
    if (regIds) {
        return await unregisterStaffside(tournamentId, regIds)
    }

    const session = await auth();

    if (!session || !session.user.id) {
        return {"error": "You must be logged in to withdraw from a tournament."};
    }
    


    const userId = session.user.id.toString()


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
        return {"error": "Failed to withdraw. Did a host kick you from the tournament?"} // How would we even get here?
    }

}

async function unregisterStaffside(tournamentId: bigint, regIds?: bigint[]): Promise<ServerActionResponse<boolean>> {
    const session = await auth();

    if (!session || !session.user.id) {
        return {"error": "How did you get here."};
    }

    const roles = await verifyRole(session.user.id, `tournament-${tournamentId}`, ["host", "cohost"])

    if (!roles) {
        return {"error": "How did you get here."};
    }

    const res = await prisma.registrations.deleteMany({
        where: {
            regId: {
                in: regIds
            }
        }
    });
    
    revalidatePath(`/dashboard/${tournamentId}/registrations`, 'page')

    return {"body": res.count > 0}

}