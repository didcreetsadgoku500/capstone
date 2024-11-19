"use client"

import { addStaff } from "@/app/api/queries/addStaff"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from 'react-hook-form'

import { z } from "zod"


const schema = z.object({
    userId: z.coerce.number().step(1).min(1),
    role: z.string().min(1)
})

type FormData = z.infer<typeof schema>


export default function AddStaffDialog({tournamentId, TriggerComponent, onStaffAdd}: {tournamentId: string, TriggerComponent: React.ReactNode, onStaffAdd: (formdata: FormData) => {} }) {
    const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitted, isValid} } = useForm<FormData>({
        resolver: zodResolver(schema)})
    
        const [open, setOpen] = useState(false);
        

    return (
        
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                    {TriggerComponent}
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                    <DialogTitle>Add Staff</DialogTitle>
                    <DialogDescription>
                        Enter the user ID and role of your new staff member.
                    </DialogDescription>
                    </DialogHeader>
            <form id="addStaffDialog" onSubmit={handleSubmit((formdata) => {
                onStaffAdd(formdata)
                setOpen(false)

                })}>

                    <div className="space-y-2">
                    <Label htmlFor="userId">Staff User ID</Label>
                        <Input
                        id="userId"
                        {...register('userId')}
                        autoComplete="off"
                        />
                        {errors.userId && <p className="text-sm text-red-500">{errors.userId.message}</p>}
                        
                        <Label htmlFor="role">Role</Label>
                        <Input
                        id="role"
                        {...register('role')}
                        autoComplete="off"
                        />
                        {errors.role && <p className="text-sm text-red-500">{errors.role.message}</p>}
                    </div>
        </form>
                    <div className="flex justify-end">
                        <Button form="addStaffDialog" className="transition-all" type="submit" disabled={!isValid || isSubmitting}>Add</Button>
                    </div>


                </DialogContent>
        </Dialog>


    )
}




