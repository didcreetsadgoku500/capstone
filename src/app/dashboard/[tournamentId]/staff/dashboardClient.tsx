"use client"
import { removeStaff } from "@/app/api/queries/removeStaff";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Permission } from "@prisma/client";
import { useState } from "react";


export default function DashboardClient({tournamentId, staff}: {tournamentId: string, staff: Permission[]}) {
    const [rows, setRows] = useState(staff)

    function removeRole(roleID: bigint) {
        setRows(rows.filter((row) => row.id != roleID))
        removeStaff(BigInt(tournamentId), [roleID])
    }


    return (


        <div className="space-y-2">
           <Label>Staff roles</Label>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead className="w-[200px] text-center">Action</TableHead>
                    </TableRow>
                    
                </TableHeader>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.userId}</TableCell>
                            <TableCell>{row.role}</TableCell>
                            <TableCell className="text-center"><Button onClick={() => removeRole(row.id)}>Remove</Button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
)
}