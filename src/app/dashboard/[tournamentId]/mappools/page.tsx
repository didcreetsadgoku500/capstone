import { auth } from "@/lib/auth";
import { Unauthenticated, Unauthorized } from "../errorViews";
import { verifyRole } from "@/lib/permissions";
import prisma from "@/lib/db";
import { MappoolTable } from "./mappoolTable";
import { onlyUnique } from "@/lib/helper";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {DashboardClient} from "./dashboardClient";
import { joinBeatmapDetails } from "@/app/api/joinBeatmapData";
import { Mappool } from "@prisma/client";

export default async function Page({ params }: { params: { tournamentId: string } }) {
    const session = await auth();

    if (!session || !session.user.id) {
        return <Unauthenticated />
    }
    const permission = await verifyRole(session.user.id, `tournament-${params.tournamentId}`, ["host", "cohost", "pooler"])
    if (!permission) {
        console.log(permission)
        return <Unauthorized tournamentId={params.tournamentId}/>
    }

    const stages = await prisma.stage.findMany({
        where: {
            tournamentId: BigInt(params.tournamentId),
            isBracket: true
        },
        include: {
            mappool: true
        },
        orderBy: {
            stageNo: "asc"
        }
        
    })

    if (!stages) {
        return <p>Could not load maps</p>
    }

    const mapIds = stages.flatMap(s => s.mappool.map(m => m.mapId)).filter((x: number | null): x is number => x !== null);
    const mapDetails = await joinBeatmapDetails(mapIds, m => m || 2684122)

    if (!mapDetails) {
        return <p>Could not load maps</p>
    }

    return (
        <>
            <DashboardClient stages={stages} initialMaps={mapDetails.map(m => m.mapDetails)}/>
        </>
    )
}