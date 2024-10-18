import { Permission } from "@prisma/client";
import prisma from "./db";

export async function verifyRole(userID: string | null | undefined, role: string, scope: string): Promise<Permission | null> {
    if (!userID) {
        return null;
    }

    const result = prisma.permission.findFirst({
        where:  {
            userId: userID.toString(),
            role: role,
            scope: scope
        }
    })

    return result;
}