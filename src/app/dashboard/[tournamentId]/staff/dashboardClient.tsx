"use client"
import { removeStaff } from "@/app/api/queries/removeStaff";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Permission } from "@prisma/client";
import { useState } from "react";
import AddStaffDialog from "./addStaffDialog";
import { UserCompact } from "osu-web.js";
import { addStaff } from "@/app/api/queries/addStaff";

type StaffDetails = Permission & {
    userDetails: UserCompact | undefined
}

export default function DashboardClient({tournamentId, staff}: {tournamentId: string, staff: StaffDetails[]}) {
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
                            <TableCell><span className="flex flex-row items-center gap-5"><img className="w-12 h-12 rounded-full" src={`${row.userDetails?.avatar_url}`}/> {row.userDetails?.username}</span></TableCell>
                            <TableCell className="capitalize">{row.role}</TableCell>
                            <TableCell className="text-center"><Button onClick={() => removeRole(row.id)}>Remove</Button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <AddStaffDialog 
            tournamentId={tournamentId}
             
            onStaffAdd={async (formdata) => {
                // const res = await onDialogSubmit(BigInt(tournamentId), formdata)
                const newStaff = await addStaff(BigInt(tournamentId), formdata.userId.toString(), [formdata.role])
                
                if (newStaff.body) {

                    setRows([...rows, ...(newStaff.body)])
                }
            }}
            TriggerComponent={

                <Button>Add Staff</Button>
            } />
        </div>
)
}
