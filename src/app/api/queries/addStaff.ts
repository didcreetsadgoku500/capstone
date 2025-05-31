"use server"

import { auth } from "@/utils/auth";
import prisma from "@/utils/db"
import { onlyUnique } from "@/utils/helper";
import { verifyRole } from "@/utils/permissions";
import { revalidatePath } from "next/cache";
import { Client } from "osu-web.js";

export async function addStaff(tournamentId: bigint, userId: number, roles: string[]) {
    const session = await auth()
    const userRole = await verifyRole(session?.user.id, `tournament-${tournamentId}`, ["host"])
    if (!userRole || userRole.length == 0 || !session) {
        return {error: "Not authenticated"};
    }

    const data = roles.map((item) => {return {userId: userId, tournamentId: tournamentId, role: item}})

    const tournamentStaff = await prisma.staff.createManyAndReturn({
        data
    });

    revalidatePath(`/dashboard/${tournamentId}/staff`, 'page')

    const osu = new Client(session.access_token)

    const userDetails = await osu?.users.getUsers({query: {ids: tournamentStaff.map(u => Number(u.userId)).filter(onlyUnique)}})

    const extendedStaff = tournamentStaff.map(t => ({
        ...t,
        userDetails: userDetails?.find(u => u.id == Number(t.userId))
    }))


    return {body: extendedStaff};

}