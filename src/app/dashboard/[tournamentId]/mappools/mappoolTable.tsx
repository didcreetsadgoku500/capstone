"use client"

import { updateMappool } from "@/app/api/queries/updateMappool";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Mappool } from "@prisma/client";
import { Beatmap, Beatmapset, Fails } from "osu-web.js";
import { useState } from "react";

type TouchedFieldsType = { [key: string]: { "mod"?: string, "mapId"?: string } }

export function MappoolTable({ maps, mapDetails, onUpdate }: { maps: Mappool[], mapDetails: (Beatmap & {
    failtimes: Fails;
    max_combo: number;
    checksum: string | null;
    beatmapset: Beatmapset & {
        ratings: number[];
    };
})[], onUpdate?: (a: TouchedFieldsType) => void}) {
    const [tableItems, setTableItems] = useState(maps)

    const [touchedFields, setTouchedFields] = useState<TouchedFieldsType>({})

    return <div>
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead className="w-16">
                    Mod
                </TableHead>
                <TableHead className="w-32">
                    Map Id
                </TableHead>
                <TableHead>
                    Artist - Title [Difficulty]
                </TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {tableItems.map(m => <TableRow key={m.mappoolItemId}>
                <TableCell className="w-fit">
                    <Input className="w-16" defaultValue={m.mods ? m.mods + m.modIndex : ""} onChange={(v) => {
                        const temp = touchedFields
                        if (!temp[m.mappoolItemId.toString()]) temp[m.mappoolItemId.toString()] = {}
                        temp[`${m.mappoolItemId}`]["mod"] = v.target.value
                        setTouchedFields(temp);
                    }} />
                </TableCell>
                <TableCell>
                    <Input className="max-w-36" type={"number"} defaultValue={m.mapId || undefined} onChange={(v) => {
                        const temp = touchedFields
                        if (!temp[m.mappoolItemId.toString()]) temp[m.mappoolItemId.toString()] = {}
                        temp[`${m.mappoolItemId}`]["mapId"] = v.target.value
                        setTouchedFields(temp);
                    }} />
                </TableCell>
                <TableCell>
                    {mapToString(mapDetails.find(x => x.id == m.mapId)) || "Beatmap not found"}
                </TableCell>

            </TableRow>)}
        </TableBody>
    </Table>
    {tableItems.length == 0 && <div className="text-sm text-primary/50 p-4">Mappool empty. Add some maps to get started!</div>}
    <div>

    <Button className="mr-4" onClick={() => {onUpdate && onUpdate(touchedFields)}}>
            Update Mappool</Button> 
    <Button onClick={() => setTableItems([...tableItems, {mappoolItemId: tableItems.length * -1 }])}>Add Map</Button>
    </div>
    </div>
}

function mapToString(map: (Beatmap & {
    failtimes: Fails;
    max_combo: number;
    checksum: string | null;
    beatmapset: Beatmapset & {
        ratings: number[];
    };
}) | null | undefined) {

    if (!map) {
        return null
    }
    return `${map.beatmapset.artist_unicode} - ${map.beatmapset.title} [${map.version}]`

}