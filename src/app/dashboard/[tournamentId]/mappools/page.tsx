import { auth } from "@/lib/auth";
import { Unauthenticated, Unauthorized } from "../errorViews";
import { verifyRole } from "@/lib/permissions";
import prisma from "@/lib/db";
import { MappoolTable } from "./mappoolTable";
import { onlyUnique } from "@/lib/helper";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {DashboardClient} from "./dashboardClient";

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

    return (
        <>
            <DashboardClient stages={stages} />
        </>
    )
}