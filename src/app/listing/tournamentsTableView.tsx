import { h3Styles } from "@/components/textStyles";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import TournamentCard from "./tournamentCard";
//
const tempSrc = "https://raw.githubusercontent.com/didcreetsadgoku500/tournament.sh/refs/heads/main/src/assets/strafeSmoke.jpg?token=GHSAT0AAAAAACX7YTQR7HVEF55W3IWL4Q2UZYWUQEA"

const sampleTournament =  {
    title: "My Tournament",
    description: "I love my tournament",
    bannerSrc: tempSrc,
    tournamentId: 18734265876

}

export default function TournamentsTableView() {
    return (
        <div className="space-y-3 flex flex-col">
            <div>

            <h3 className={h3Styles}>Tournaments</h3>
            <Separator className="bg-primary/75" />
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
                
               <TournamentCard title={sampleTournament.title} description={sampleTournament.description} bannerSrc={sampleTournament.bannerSrc} tournamentId={sampleTournament.tournamentId}/>
            </div>


        </div>
    )
}