import {getTournaments} from "../api/queries/getTournaments";
import Filters from "./filters";
import TournamentsTableView from "./tournamentsTableView";


export default async function ListingsPage() {
    const tournaments = await getTournaments();
    
    return (
        <div className="max-w-screen-xl w-full mx-auto grid grid-cols-4 gap-6">
            <div className="hidden lg:flex col-span-1">
                <Filters />
            </div>
            <div className="col-span-4 lg:col-span-3 ">
                <TournamentsTableView tournaments={tournaments}/>
            </div>
        </div>
    )
}