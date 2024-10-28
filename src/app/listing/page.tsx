import prisma from "@/lib/db";
import Filters from "./filters";
import TournamentsTableView from "./tournamentsTableView";
import { Visibility } from "@prisma/client";


export default async function ListingsPage() {
    const tournaments = await prisma.tournament.findMany({
        where: {
            visibility: Visibility.PUBLIC
        },
        take: 20
    })
    
    return (
        <div className="max-w-screen-xl w-full mx-auto grid grid-cols-4 gap-6">
            <div className="hidden lg:flex col-span-1">
                <Filters />
            </div>
            <div className="col-span-4 lg:col-span-3 ">
                <TournamentsTableView />
            </div>
        </div>
    )
}