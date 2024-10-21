import { h3Styles } from "@/components/textStyles";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import TournamentCard from "./tournamentCard";
//

export default function TournamentsTableView() {
    return (
        <div className="space-y-3 flex flex-col">
            <div>

            <h3 className={h3Styles}>Tournaments</h3>
            <Separator className="bg-primary/75" />
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
                
               <TournamentCard />
               <TournamentCard />
               <TournamentCard />
               <TournamentCard />
               <TournamentCard />
               <TournamentCard />
            </div>


        </div>
    )
}