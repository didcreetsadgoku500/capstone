import { h3Styles, smallStyles } from "@/components/textStyles";
import {getTournaments} from "../api/queries/getTournaments";
import Filters from "./filters";
import TournamentsTableView from "./tournamentsTableView";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import CreateTournamentDialog from "./createTournamentDialog";


export default async function ListingsPage() {
    const tournaments = await getTournaments();
    
    return (
        <div className="max-w-screen-xl w-full mx-auto grid grid-cols-4 gap-6">
            <div className="hidden lg:flex col-span-1">
                <Filters />
            </div>
            <div className="col-span-4 lg:col-span-3 ">
                <div className="space-y-3 flex flex-col">
                    <div>
                        <div className="flex flex-row justify-between">

                        <h3 className={h3Styles}>Tournaments</h3>
                        <CreateTournamentDialog TriggerComponent={
                            <Button className={"py-1 px-3"} variant={"secondary"} size={"xs"}>Create Tournament</Button>


                        }/>

                        </div>
                        <Separator className="bg-primary/75" />
                    </div>

                <TournamentsTableView tournaments={tournaments}/>
                </div>
            </div>
        </div>
    )
}