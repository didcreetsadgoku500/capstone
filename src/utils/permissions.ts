"use server";
import { Staff } from "@prisma/client";
import prisma from "./db";
import { ReactElement } from "react";

export async function getRoles(userId: number | null | undefined, scope: string | bigint): Promise<Staff[]> {
    if (!userId) {
        return [];
    }

    // Grab tournament ID from legacy scope string (eg "tournament-0123456")
    if (typeof scope == "string") { 
        scope = BigInt(scope.split("-")[1])
    }

    const result = prisma.staff.findMany({
        where: {
            AND: [
                {userId: userId, tournamentId: scope}
            ]
        }
    })

    return result;
}

export async function verifyRole(userId: number | null | undefined, scope: string | bigint, roles: string[]): Promise<Staff[]> {
    if (!userId) {
        return [];
    }

    const userRoles = (await getRoles(userId, scope)).filter((role) => roles.includes(role.role));

    if (userRoles.length == 0) {
        return [];
    }

    return userRoles;
}


export async function PermissionGate({
    userId,
    tournamentId,
    role,
    Fallback: fallback,
    children
}: { 
    userId: number, 
    tournamentId: bigint, 
    role: string | string[], 
    Fallback: ReactElement, 
    children: ReactElement 
}): Promise<ReactElement> {

    const allowedRoles = Array.isArray(role) ? role : [role];
    const userRoles = await verifyRole(userId, tournamentId, allowedRoles)

    const hasPermission = userRoles.some(userRole => allowedRoles.includes(userRole.role));

    return hasPermission ? children : fallback;
}