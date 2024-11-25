import { statusText } from "@/lib/helper";
import { Match, MatchStatus } from "@prisma/client"
import { UserRound } from "lucide-react";
import { UserCompact } from "osu-web.js"
import { ReactNode } from "react";


export default function MatchListItem({ match, users, referees, sidePanel }: { match: Match, users: UserCompact[], referees: UserCompact[], sidePanel?: ReactNode }) {
    const team1 = users.find(u => u.id == Number(match.team1Id));
    const team2 = users.find(u => u.id == Number(match.team2Id));
    console.log(referees)
    const ref = referees.find(u => u.id == Number(match.referee));


    return <div className="group rounded-md bg-primary/80 transition-all flex
    max-w-screen-sm xl:max-w-[650px]  
    max-h-28 hover:max-h-48 focus:max-h-48
    flex-col xl:flex-row overflow-clip xl:items-center w-full">

    <div className="flex flex-col border rounded-md px-2 bg-primary-foreground z-10 max-w-screen-sm w-full">
        
                <div className="flex flex-row items-center justify-between">
            <div className="flex-grow basis-0">
                <div className="flex flex-row items-center p-2">


                    {team1 ? <img className="w-12 h-12 rounded-full" src={team1?.avatar_url} /> : <UserRound className="w-12 h-12 rounded-full" />}
                    <div className={`text-lg ml-2 ${team1 ? "font-medium" : "text-primary/50"}`}>
                        {team1?.username || "TBD"}
                    </div>
                </div>
            </div>

            <div className="text-4xl font-bold w-12 text-center">
                {match.matchStatus != MatchStatus.NOT_STARTED && match.team1Score}
            </div>

            <div className="flex-col flex items-center">
                
                <div className="font-bold text-primary/50">
                    VS
                </div>
                
            </div>

            <div className="text-4xl font-bold w-12 text-center">

                {match.matchStatus != MatchStatus.NOT_STARTED && match.team2Score}
            </div>
            <div className="flex-grow basis-0">
                <div className="flex flex-row-reverse items-center p-2">


                    {team2 ? <img className="w-12 h-12 rounded-full" src={team2?.avatar_url} /> : <UserRound className="w-12 h-12 rounded-full" />}
                    <div className={`text-lg mr-2 ${team2 ? "font-medium" : "text-primary/50"}`}>
                        {team2?.username || "TBD"}
                    </div>
                </div>
            </div>

            
            
            </div>

            <div className="px-2 pb-2 text-primary/50 justify-between flex flex-row">
                <div>

                {statusText(match.matchStatus)} • {ref ? `Assigned to ${ref.username}` : "Not assigned referee"}
                </div>
                <div>
                    {match.matchDateTime ? match.matchDateTime.toUTCString() : "Unscheduled"}
                </div>
            </div>
        </div>
        <div>

             {!!sidePanel && <div className="
        -mt-4 group-hover:mt-0  group-focus:mt-0 group-active:mt-0
        xl:-ml-64 xl:group-hover:ml-0  xl:group-focus:ml-0 xl:mt-0 transition-all p-2 flex opacity-0 group-hover:opacity-100 group-focus:opacity-100 group-active:opacity-100 xl:items-center">
                {sidePanel}
            </div>}
        </div>

    </div>
}