"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Match, Stage } from "@prisma/client";
import MatchListItem from "./matchListItem";
import { UserCompact } from "osu-web.js";

export default function DashboardClient({ tournamentId, matches, stages, users }: 
    { tournamentId: string, matches: Match[], stages: Stage[], users: UserCompact[] }) {


    return (<>
        <Accordion type="multiple">
            {stages.filter(s => s.isBracket).map(stage =>
                <AccordionItem key={stage.stageNo} value={stage.stageName}>
                    <AccordionTrigger>{stage.stageName}</AccordionTrigger>
                    <AccordionContent>
                        <div className="flex flex-col gap-4 p-2">

                        {matches.filter(m => m.stageNo == stage.stageNo).map(match =>
                            <MatchListItem key={match.matchId} match={match} users={users} onEdit={() => {
                                
                            }}/>
                            
                        )}
                        </div>
                        </AccordionContent>
                </AccordionItem>


            )}
        </Accordion>

    </>)
}