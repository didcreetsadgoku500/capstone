"use server"

import { auth } from "@/lib/auth"
import { Beatmap, Beatmapset, Client, Fails } from "osu-web.js"

export async function joinUserDetails<T>(inputList: T[], extractPredicate: (i: T) => number) {
    const session = await auth()

    if (!session || !session.access_token) {
        return //error
    }
    

    const result: dataBeatmapDetails<T>[] = []
    const mapIds = inputList.map(extractPredicate);
  
 
    const osu = new Client(session.access_token);
    const mapData = await osu.beatmaps.getBeatmaps({query: {ids: mapIds}})
  
    let indices: Record<number, number> = mapData.reduce(
        (acc, el, index) => ({ ...acc, [el.id]: index }),
        {}
    );

    for (const i of inputList) {
        result.push({
            data: i,
            mapDetails: mapData[indices[extractPredicate(i)]]
        })
    }

      return result;
  
  
}
  





export interface dataBeatmapDetails<T> {
    data: T,
    mapDetails: (Beatmap & {
        failtimes: Fails;
        max_combo: number;
        checksum: string | null;
        beatmapset: Beatmapset & {
            ratings: number[];
        };
    })
}

