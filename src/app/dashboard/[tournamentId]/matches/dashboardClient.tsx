"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Match, Stage } from "@prisma/client";
import MatchListItem from "@/components/matchListItem";
import { UserCompact } from "osu-web.js";
import EditMatchDialog from "./editMatchDialog";
import updateMatch from "@/app/api/queries/updateMatch";
import { useState } from "react";

export default function DashboardClient({ tournamentId, defaultMatches, stages, users }: 
    { tournamentId: string, defaultMatches: Match[], stages: Stage[], users: UserCompact[] }) {

        const [matches, setMatches] = useState(defaultMatches || [])

    return (<>
        <Accordion type="multiple">
            {stages.filter(s => s.isBracket).map(stage =>
                <AccordionItem key={stage.stageNo} value={stage.stageName}>
                    <AccordionTrigger>{stage.stageName}</AccordionTrigger>
                    <AccordionContent>
                        <div className="flex flex-col gap-4 p-2">

                        {matches.filter(m => m.stageNo == stage.stageNo).sort((a, b) => a.matchId - b.matchId).map(match =>
                            <MatchListItem key={match.matchId} match={match} users={users} sidePanel={
                            <EditMatchDialog users={users} match={match} onSubmit={async (data) => {
                                if (data.matchDateTime) {
                                    const newDate = new Date(data.matchDateTime.toISOString().split("T")[0] + "T" + data.matchTime + ":00.000Z")
                                    data.matchDateTime = newDate;
                                    data.matchTime = undefined
                                }

                                const res = await updateMatch(match, data)
                                if (res.error || !res.body) {
                                    return
                                }
                                const newMatches = matches.map(m => m.matchId == match.matchId ? res.body : m)
                                setMatches(newMatches)
                            }}/>
                        }/>
                            
                        )}
                        </div>
                        </AccordionContent>
                </AccordionItem>


            )}
        </Accordion>

    </>)
}