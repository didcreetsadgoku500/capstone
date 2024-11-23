import { Separator } from "@/components/ui/separator";
import { DetailsNav } from "./detailsNav";
import { h3Styles } from "@/components/textStyles";
import { getTournament } from "@/app/api/queries/getTournament";

export async function DetailsHeader({params}: {params: {tournamentId: string}}) {
    const tournamentId = params.tournamentId

    if (!params.tournamentId || params.tournamentId == 'undefined') {
        return <div>Loading</div>
      }
    
    const tournamentDetails = await getTournament(BigInt(tournamentId))

    


    return (<>

        <img className="rounded-md aspect-banner object-cover mb-3" src={tournamentDetails?.bannerUrl} />
        <div className="flex flex-row justify-between">

        <h2 className={h3Styles}>{tournamentDetails?.tourName}</h2> <h3 className={"text-2xl font-semibold text-primary/50"}>{!tournamentDetails?.public && "Draft"}</h3>
        </div>
    </>
    )
}