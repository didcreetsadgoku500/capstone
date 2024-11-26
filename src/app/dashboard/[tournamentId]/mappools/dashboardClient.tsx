"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { MappoolTable } from "./mappoolTable"
import { useState } from "react"
import { updateMappool } from "@/app/api/queries/updateMappool"
import { Mappool, Stage } from "@prisma/client"
import { Beatmap, Beatmapset, Fails } from "osu-web.js"

type StageWithPools = Stage & {mappool: Mappool[]}

export function DashboardClient({ stages, initialMaps }: {stages : StageWithPools[], initialMaps: (Beatmap & {
    failtimes: Fails;
    max_combo: number;
    checksum: string | null;
    beatmapset: Beatmapset & {
        ratings: number[];
    };
})[]}) {
    const [stagesClient, setStages] = useState(stages)
    const [mapDetails, setMapDetails] = useState(initialMaps)

    return <Accordion type="single">
        {stagesClient.map(s =>
            <AccordionItem value={s.stageName} key={s.stageNo}>
                <AccordionTrigger>{s.stageName}</AccordionTrigger>
                <AccordionContent>
                    <MappoolTable maps={s.mappool} mapDetails={mapDetails} onUpdate={
                        async (touchedFields) => {
                            const res = await updateMappool(s.tournamentId, s.stageNo, touchedFields)
                            if (res.body) {
                                setStages(stagesClient.map(a => a.stageNo != s.stageNo ? a : res.body || a))
                            }
                        }
                    }/>
                </AccordionContent>
            </AccordionItem>)}
    </Accordion>
}