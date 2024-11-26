"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { MappoolTable } from "./mappoolTable"
import { useState } from "react"
import { updateMappool } from "@/app/api/queries/updateMappool"


export function DashboardClient({ stages }) {
    const [stagesClient, setStages] = useState(stages)

    return <Accordion type="single">
        {stagesClient.map(s =>
            <AccordionItem value={s.stageName} key={s.stageNo}>
                <AccordionTrigger>{s.stageName}</AccordionTrigger>
                <AccordionContent>
                    <MappoolTable maps={s.mappool} onUpdate={
                        async (touchedFields) => {
                            const newStage = updateMappool(touchedFields)
                        }
                    }/>
                </AccordionContent>
            </AccordionItem>)}
    </Accordion>
}