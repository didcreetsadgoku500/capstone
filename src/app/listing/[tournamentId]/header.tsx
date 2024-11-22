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
        <h2 className={h3Styles}>{tournamentDetails?.tourName}</h2>
    </>
    )
}