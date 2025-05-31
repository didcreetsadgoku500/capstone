"use server";
import { Staff } from "@prisma/client";
import prisma from "./db";

export async function getRoles(userID: number | null | undefined, scope: string | bigint): Promise<Staff[]> {
    if (!userID) {
        return [];
    }

    // Grab tournament ID from legacy scope string (eg "tournament-0123456")
    if (typeof scope == "string") { 
        scope = BigInt(scope.split("-")[1])
    }

    const result = prisma.staff.findMany({
        where:  
        {
            AND: [
                {

                    userId: userID,
                    tournamentId: scope,
                }
            ]
            
        }
    })

    return result;
}

export async function verifyRole(userID: number | null | undefined, scope: string | bigint, roles: string[]): Promise<Staff[] | null> {
    if (!userID) {
        return null;
    }

    const userRoles = (await getRoles(userID, scope)).filter((role) => roles.includes(role.role));

    if (userRoles.length == 0) {
        return null;
    }

    return userRoles;
}
