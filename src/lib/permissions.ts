"use server";
import { Permission } from "@prisma/client";
import prisma from "./db";

export async function verifyRole(userID: string | null | undefined, scope: string, role: string): Promise<Permission | null> {
    if (!userID) {
        return null;
    }

    const result = prisma.permission.findFirst({
        where:  {
            userId: userID.toString(),
            scope: scope,
            role: role
        }
    })

    return result;
}