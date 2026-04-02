import { auth } from "@/utils/auth";
import { Unauthenticated, Unauthorized } from "../errorViews";
import { PermissionGate, verifyRole } from "@/utils/permissions";
import prisma from "@/utils/db";
import {DashboardClient} from "./dashboardClient";
import { joinBeatmapDetails } from "@/app/api/joinBeatmapData";

async function fetchMappoolData(tournamentId: bigint) {
    const stages = await prisma.stage.findMany({
        where: {
            tournamentId: BigInt(tournamentId),
            isBracket: true
        },
        include: {
            mappool: true
        },
        orderBy: {
            stageNo: "asc"
        }
        
    })

    const mapIds = stages.flatMap(s => s.mappool.map(m => m.mapId)).filter((x: number | null): x is number => x !== null);
    const mapDetails = (await joinBeatmapDetails(mapIds, m => m || 2684122)).map(m => m.mapDetails)

    return {stages, mapDetails}



}


export default async function Page({ params }: { params: { tournamentId: string } }) {
    const session = await auth();
    const tournamentId = BigInt(params.tournamentId)
    const authorizedRoles = ["host", "cohost", "pooler"]

    if (!session || !session.user.id) {
        return <Unauthenticated />
    }

    type MappoolData = Awaited<ReturnType<typeof fetchMappoolData>>;
    let stages: MappoolData["stages"] = [];
    let mapDetails: MappoolData["mapDetails"] = [];

    if (await verifyRole(session.user.id, tournamentId, authorizedRoles)) {
        ({stages, mapDetails} = await fetchMappoolData(tournamentId))
    }
    

    return (
            <PermissionGate 
                userId={session.user.id} 
                Fallback={<Unauthorized tournamentId={params.tournamentId}/> }
                role={authorizedRoles}
                tournamentId={BigInt(params.tournamentId)}
                >
                    <DashboardClient stages={stages} initialMaps={mapDetails.map(m => m.mapDetails)}/>
            </PermissionGate>
    )
}