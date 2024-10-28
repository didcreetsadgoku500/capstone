import { h3Styles } from "@/components/textStyles";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import TournamentCard from "./tournamentCard";
import { ITournament } from "../api/queries/getTournaments";
//


const myTournaments = [
    {
        title: "My Amazing Tournament",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        bannerSrc: "/strafeSmoke.jpg",
        tournamentId: 200
    
    },
    {
        title: "Private Tournament",
        description: "This tournament is private you can't access it yet",
        bannerSrc: "/strafeSmoke.jpg",
        tournamentId: 18734265876
    
    }
]

export default function TournamentsTableView({tournaments}: {tournaments: ITournament[]}) {
    return (
        <div className="space-y-3 flex flex-col">
            <div>

            <h3 className={h3Styles}>Tournaments</h3>
            <Separator className="bg-primary/75" />
            </div>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                
               {tournaments.map((tournament) => <TournamentCard key={tournament.tournamentId} details={tournament}/>)}
            </div>


        </div>
    )
}