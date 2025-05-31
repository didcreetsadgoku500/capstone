import { auth } from "@/utils/auth";
import prisma from "@/utils/db"
import { ServerActionResponse } from "@/utils/serverActionResponse";
import { Registration, Tournament } from "@prisma/client"

export async function getRegistered(): Promise<ServerActionResponse<Registration[]>> {
    const session = await auth();

    if (!session || !session.user.id) {
        return {"error": "User must be logged in to view registered tournaments."};
    }


    const regs = await prisma.registration.findMany({
        where: {
            userId: session.user.id
        },
        take: 20
    })

    return {"body": regs}
}
