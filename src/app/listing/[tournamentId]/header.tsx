import { Separator } from "@/components/ui/separator";
import { DetailsNav } from "./detailsNav";
import { h3Styles } from "@/components/textStyles";
import { getTournament } from "@/app/api/queries/getTournament";

export async function DetailsHeader({params}: {params: {tournamentId: string}}) {
    const tournamentId = params.tournamentId

    if (!tournamentId) {
        return <div>Loading</div>
    }

    let tournamentDetails;
    try {
        tournamentDetails = await getTournament(BigInt(tournamentId))
    } catch {
        return <div>Loading</div>

    }


    return (<>

        <img className="rounded-md aspect-banner object-cover mb-3" src={tournamentDetails?.bannerUrl} />
        <h2 className={h3Styles}>{tournamentDetails?.tourName}</h2>
    </>
    )
}