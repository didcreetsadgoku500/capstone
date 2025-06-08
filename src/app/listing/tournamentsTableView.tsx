import TournamentCard from "../../components/tournamentCard";
import { ITournament } from "../api/queries/getTournaments";


export default function TournamentsTableView({tournaments}: {tournaments: ITournament[]}) {
    // Typescript not happy but it does, in fact, work
    return (
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                
               {tournaments.map((tournament) => <TournamentCard key={tournament.tournamentId} 
                    details={tournament} 
                    // @ts-expect-error: "registered" does not exist on ITournament
                    isRegistered={tournament.registered}/>)}
            </div>
    )
}