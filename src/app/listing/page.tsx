import Filters from "./filters";


export default function ListingsPage() {

    
    return (
        <div className="max-w-screen-xl w-full mx-auto grid grid-cols-4 lg:gap-6">
            <div className=" col-span-1">
                <Filters />

            </div>
        </div>
    )
}