"use client"

import { Button } from "@/components/ui/button";
import { Match } from "@prisma/client"
import { User, UserRound } from "lucide-react";
import { UserCompact } from "osu-web.js"

// i think the play is just have an edit match button that callsback to dashboardclient face so registrants doesnt get passed down

export default function MatchListItem({ match, users }: { match: Match, users: UserCompact[] }) {
    const team1 = users.find(u => u.id == Number(match.team1Id));
    const team2 = users.find(u => u.id == Number(match.team2Id));


    return <div className="group rounded-md bg-primary/80 transition-all flex
    max-w-screen-sm xl:max-w-[650px]  
    max-h-24 hover:max-h-48 focus:max-h-48
    flex-col xl:flex-row overflow-clip xl:items-center">

        <div className="flex flex-row border rounded-md p-4 items-center justify-between max-w-screen-sm w-full bg-primary-foreground z-10">
            <div className="flex-grow basis-0">
                <div className="flex flex-row items-center">


                    {team1 ? <img className="w-12 h-12 rounded-full" src={team1?.avatar_url} /> : <UserRound className="w-12 h-12 rounded-full" />}
                    <div className={`text-lg ml-2 ${team1 ? "font-medium" : "text-primary/50"}`}>
                        {team1?.username || "TBD"}
                    </div>
                </div>
            </div>


            <div className="mx-2">VS</div>
            <div className="flex-grow basis-0">
                <div className="flex flex-row-reverse items-center">


                    {team2 ? <img className="w-12 h-12 rounded-full" src={team2?.avatar_url} /> : <UserRound className="w-12 h-12 rounded-full" />}
                    <div className={`text-lg mr-2 ${team2 ? "font-medium" : "text-primary/50"}`}>
                        {team2?.username || "TBD"}
                    </div>
                </div>
            </div>
            
        </div>
        <div>

        <div className="
        -mt-4 group-hover:mt-0  group-focus:mt-0 group-active:mt-0
        xl:-ml-64 xl:group-hover:ml-0  xl:group-focus:ml-0 xl:mt-0 transition-all p-2 flex opacity-0 group-hover:opacity-100 group-focus:opacity-100 group-active:opacity-100 xl:items-center">
            <Button variant={"ghost"} className="text-primary-foreground"   >Edit Match</Button>
            </div>
            </div>
        
    </div>
}