"use client"
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Registrations } from "@prisma/client";
import { useState } from "react";
import { unregister } from "@/app/api/queries/unregister";
import { dataUserDetails } from "@/app/api/joinUserData";


export default function DashboardClient({tournamentId, registrants}: {tournamentId: string, registrants: dataUserDetails<Registrations>[]}) {
    const [rows, setRows] = useState(registrants)

    function removeRegistration(regId: bigint) {
        setRows(rows.filter((row) => row.data.regId != regId))
        unregister(BigInt(tournamentId), [regId])
    }


    return (


        <div className="space-y-2">
           <Label>Staff roles</Label>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Rank</TableHead>
                        <TableHead className="w-[200px] text-center">Action</TableHead>
                    </TableRow>
                    
                </TableHeader>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.data.regId}>
                            <TableCell><span className="flex flex-row items-center gap-5"><img className="w-12 h-12 rounded-full" src={`${row.userDetails?.avatar_url}`}/> {row.userDetails?.username}</span></TableCell>
                            <TableCell>#{row.userDetails.statistics_rulesets.osu?.global_rank?.toLocaleString()}</TableCell>
                            <TableCell className="text-center"><Button onClick={() => removeRegistration(row.data.regId)}>Remove</Button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
)
}
