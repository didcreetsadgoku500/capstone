"use client"

import { Match } from "@prisma/client"
import { User, UserRound } from "lucide-react";
import { UserCompact } from "osu-web.js"

// i think the play is just have an edit match button that callsback to dashboardclient face so registrants doesnt get passed down

export default function MatchListItem({ match, users }: { match: Match, users: UserCompact[] }) {
    const team1 = users.find(u => u.id == Number(match.team1Id));
    const team2 = users.find(u => u.id == Number(match.team2Id));


    return <div className="group rounded-md bg-primary/80 max-w-[650px] hover:max-w-screen-md transition-all">
        
    <div className="flex flex-row border rounded-md p-4 items-center justify-between max-w-screen-sm bg-primary-foreground">
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

    </div></div>
}