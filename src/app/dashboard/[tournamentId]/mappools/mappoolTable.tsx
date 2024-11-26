"use client"

import { updateMappool } from "@/app/api/queries/updateMappool";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Mappool } from "@prisma/client";
import { useState } from "react";

type TouchedFieldsType = { [key: string]: { "mod"?: string, "mapId"?: string } }

export function MappoolTable({ maps, onUpdate }: { maps: Mappool[], onUpdate?: (a: TouchedFieldsType) => void}) {
    const [tableItems, setTableItems] = useState(maps)

    const [touchedFields, setTouchedFields] = useState<TouchedFieldsType>({})

    return <div>
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead className="max-w-8">
                    Mod
                </TableHead>
                <TableHead>
                    Map Id
                </TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {tableItems.map(m => <TableRow key={m.mappoolItemId}>
                <TableCell className="max-w-8">
                    <Input className="max-w-16" defaultValue={m.mods ? m.mods + m.modIndex : ""} onChange={(v) => {
                        const temp = touchedFields
                        if (!temp[m.mappoolItemId.toString()]) temp[m.mappoolItemId.toString()] = {}
                        temp[`${m.mappoolItemId}`]["mod"] = v.target.value
                        setTouchedFields(temp);
                    }} />
                </TableCell>
                <TableCell>
                    <Input className="max-w-36" defaultValue={m.mapId || undefined} onChange={(v) => {
                        const temp = touchedFields
                        if (!temp[m.mappoolItemId.toString()]) temp[m.mappoolItemId.toString()] = {}
                        temp[`${m.mappoolItemId}`]["mapId"] = v.target.value
                        setTouchedFields(temp);
                    }} />
                </TableCell>

            </TableRow>)}
        </TableBody>
    </Table>
    <Button className="mr-4" onClick={() => {onUpdate && onUpdate(touchedFields)}}>
            Update Mappool</Button> 
    <Button onClick={() => setTableItems([...tableItems, {mappoolItemId: tableItems.length * -1 }])}>Add Map</Button>
    </div>
}

