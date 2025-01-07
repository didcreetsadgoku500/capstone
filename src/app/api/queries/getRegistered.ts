import { auth } from "@/utils/auth";
import prisma from "@/utils/db"
import { ServerActionResponse } from "@/utils/serverActionResponse";
import { Registrations, Tournament } from "@prisma/client"

export async function getRegistered(): Promise<ServerActionResponse<Registrations[]>> {
    const session = await auth();

    if (!session || !session.user.id) {
        return {"error": "User must be logged in to view registered tournaments."};
    }


    const regs = await prisma.registrations.findMany({
        where: {
            userId: session.user.id.toString()
        },
        take: 20
    })

    return {"body": regs}
}
