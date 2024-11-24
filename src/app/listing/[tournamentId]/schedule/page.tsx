import { joinUserDetails } from "@/app/api/joinUserData";
import { getTournamentRegistrants } from "@/app/api/queries/getTournamentRegistrants";
import MatchListItem from "@/components/matchListItem";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { Accordion } from "@radix-ui/react-accordion";

export default async function Page({ params }: { params: { tournamentId: string } }) {
    const session = await auth();

    if (!session || !session.user.id) {
        return "You must be logged in to view upcoming matches."
    }


    const matches = await prisma.match.findMany({
        where: {
            tournamentId: BigInt(params.tournamentId),

        }
    })

    const stages = await prisma.stage.findMany({
        where: {
            tournamentId: BigInt(params.tournamentId),
            public: true
        },
        orderBy: {
            stageNo: 'asc'
        }
    })

    if (stages.length == 0) {
        return <p className="text-primary/75 text-sm">The schedule isn't released yet! Check back later.</p>
    }

    const regs = await prisma.registrations.findMany({
        where: {
            tournamentId: BigInt(params.tournamentId)
        }
    })

    const res = await joinUserDetails(regs, r => Number(r.userId))

    if (!res) {
        return "Could not fetch registrants. Try logging out and logging back in."
    }

    const regsDetails = res.map(r => r.userDetails)


    return <div>
        <Accordion type="multiple">
            {stages.filter(s => s.isBracket).map(stage =>
                <AccordionItem key={stage.stageNo} value={stage.stageName}>
                    <AccordionTrigger>{stage.stageName}</AccordionTrigger>
                    <AccordionContent>
                        <div className="flex flex-col gap-4 p-2 items-center w-full">

                        {matches.filter(m => m.stageNo == stage.stageNo).map(match =>
                            <MatchListItem key={match.matchId} match={match} users={regsDetails}/>
                            
                        )}
                        </div>
                        </AccordionContent>
                </AccordionItem>


            )}
        </Accordion>

    </div>
}