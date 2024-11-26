"use server"

import { ServerActionResponse } from "@/lib/serverActionResponse"
import { Mappool } from "@prisma/client"

export async function updateMappool (touchedFields : { [key: string]: { "mod"?: string, "mapId"?: string } }) : Promise<ServerActionResponse<Mappool[]>> {
    console.log(touchedFields)
}