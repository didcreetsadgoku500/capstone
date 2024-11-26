import { joinBeatmapDetails } from "@/app/api/joinBeatmapData";
import { joinUserDetails } from "@/app/api/joinUserData";
import { getTournamentRegistrants } from "@/app/api/queries/getTournamentRegistrants";
import MatchListItem from "@/components/matchListItem";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { Accordion } from "@radix-ui/react-accordion";
import { Beatmap, Beatmapset, Fails } from "osu-web.js";

export default async function Page({ params }: { params: { tournamentId: string } }) {
    const session = await auth();

    if (!session || !session.user.id) {
        return "You must be logged in to view upcoming matches."
    }


    const stages =  await prisma.stage.findMany({
        where: {
            tournamentId: BigInt(params.tournamentId),
            public: true
        },
        include: {
            mappool: true
        },
        orderBy: {
            stageNo: 'asc'
        }
    })

 
    if (stages.length == 0) {
        return <p className="text-primary/75 text-sm">The mappools aren't released yet! Check back later.</p>
    }

    const mapIds = stages.flatMap(s => s.mappool.map(m => m.mapId)).filter((x: number | null): x is number => x !== null);
    const res = await joinBeatmapDetails(mapIds, m => m || 2684122)

    if (!res) {
        return <p>Could not load maps. Try relogging</p>
    }

    const mapDetails = res.map(m => m.mapDetails)

    return <div>
        <Accordion type="multiple">
            {stages.filter(s => s.isBracket).map(stage =>
                <AccordionItem key={stage.stageNo} value={stage.stageName}>
                    <AccordionTrigger>{stage.stageName}</AccordionTrigger>
                    <AccordionContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Mods</TableHead>
                                    <TableHead>Title - Artist [Difficulty]</TableHead>
                                    <TableHead className="w-40">CS | AR | OD | HP</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {stage.mappool.map(m => 
                                        mapToRow("" + m.mods + m.modIndex, mapDetails.find(x => x.id == m.mapId)) || "Beatmap not found"
                                )}
                            </TableBody>
                        </Table>

                        </AccordionContent>
                </AccordionItem>


            )}
        </Accordion>

    </div>
}


function mapToRow(modNo: string, map: (Beatmap & {
    failtimes: Fails;
    max_combo: number;
    checksum: string | null;
    beatmapset: Beatmapset & {
        ratings: number[];
    };
}) | null | undefined) {

    if (!map) {
        return <TableRow key={modNo}>
            <TableCell>{modNo}</TableCell>
            <TableCell>Beatmap not found</TableCell>
            <TableCell></TableCell>
            </TableRow>
    }
    return <TableRow key={modNo}>
    <TableCell>{modNo}</TableCell>
    <TableCell>
        <a href={`https://osu.ppy.sh/b/${map.id}`} target={"_blank"}>
            {map.beatmapset.artist_unicode} - {map.beatmapset.title} [{map.version}]
            </a>
    </TableCell>
    <TableCell>{map.cs} | {map.ar} | {map.accuracy} | {map.drain}</TableCell>
    </TableRow>

}
