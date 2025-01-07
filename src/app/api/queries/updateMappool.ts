"use server"

import { auth } from "@/utils/auth"
import prisma from "@/utils/db"
import { verifyRole } from "@/utils/permissions"
import { ServerActionResponse } from "@/utils/serverActionResponse"
import { Mappool, Stage } from "@prisma/client"

export async function updateMappool(tournamentId: bigint, stageNo: number, touchedFields: { [key: string]: { "mod"?: string, "mapId"?: string } }): Promise<ServerActionResponse<Stage & {mappool: Mappool[]}>> {
    const session = await auth()
    const userRole = await verifyRole(session?.user.id, `tournament-${tournamentId}`, ["host", "cohost", "pooler"])
    if (!userRole || userRole.length == 0 || !session) {
        return { error: "Not authorized" };
    }

    // Prisma's updatemany only works if all the changes are the same, so we have to loop. not ideal, but oh well
    for (const i of Object.keys(touchedFields)) {
        if (BigInt(i) <= 0 && !touchedFields[i].mod) {
            continue
        }



        if (touchedFields[i].mod == "" && BigInt(i) > 0) {
            await prisma.mappool.delete({
                where: {
                    mappoolItemId: BigInt(i)
                }
            })
            continue;
        }


        const dataObj: Pick<Mappool, "mods" | "modIndex" | "mapId"> = {}

        if (touchedFields[i].mod) {
            const modObj = splitMods(touchedFields[i].mod)
        

            if (modObj) {
                
                dataObj.mods = modObj.mods
                dataObj.modIndex = modObj.modIndex ? Number(modObj.modIndex) : 1
            }
        }

        if (touchedFields[i].mapId) {
            dataObj.mapId = Number(touchedFields[i].mapId)
        }

        if (BigInt(i) <= 0) {
            if (!dataObj.mods) {
                continue
            }

            // create new map

            await prisma.mappool.create({
                data: {
                    tournamentId: BigInt(tournamentId),
                    stageNo: stageNo,
                    ...dataObj

                }
            })
        }
        else {
            //update existing map
            await prisma.mappool.update({
                where: {
                    mappoolItemId: BigInt(i)

                },
                data: {
                    ...dataObj

                }
            })


        }
    }

    const newPool = await prisma.stage.findFirst({
        where: {
            tournamentId, stageNo
        },
        include: {
            mappool: true
        }
    })

    if (!newPool) {
        return {error: "Unexpected error occurred."}
    }

    return {body: newPool}

}




function splitMods(input: string) {
    const regex = /^([A-Za-z]+)(\d*)$/;
    const match = input.match(regex);

    if (match) {
        return {
            mods: match[1],
            modIndex: match[2] || null
        };
    } else {
        return null;
    }
}