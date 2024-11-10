"use server";
import { Permission } from "@prisma/client";
import prisma from "./db";

export async function getRoles(userID: string | null | undefined, scope: string): Promise<Permission[]> {
    if (!userID) {
        return [];
    }


    const result = prisma.permission.findMany({
        where:  
        {
            AND: [
                {

                    userId: userID.toString(),
                    scope: scope,
                }
            ]
            
        }
    })

    return result;
}

export async function verifyRole(userID: string | null | undefined, scope: string, roles: string[]): Promise<Permission[] | null> {

    const userRoles = (await getRoles(userID, scope)).filter((role) => roles.includes(role.role));

    if (userRoles.length == 0) {
        return null;
    }

    return userRoles;
}
