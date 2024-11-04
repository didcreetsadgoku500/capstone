import { h3Styles } from "@/components/textStyles";
import { Separator } from "@/components/ui/separator";
import TournamentCard from "./tournamentCard";
import { ITournament } from "../api/queries/getTournaments";


export default function TournamentsTableView({tournaments}: {tournaments: ITournament[]}) {
    return (
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                
               {tournaments.map((tournament) => <TournamentCard key={tournament.tournamentId} details={tournament}/>)}
            </div>


    )
}