"use client"

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
import { useForm, Controller } from 'react-hook-form'

import { z } from "zod"
import createTournament from "../api/queries/createTournament"

const schema = z.object({
    tourName: z.string().min(1, "Tournament name is required").max(50, "Tournament name must be 50 characters or less")
})

type FormData = z.infer<typeof schema>


export default function CreateTournamentDialog({TriggerComponent}: {TriggerComponent: React.ReactNode}) {
    const { register, handleSubmit, formState: { errors, isSubmitting, isValid} } = useForm<FormData>({
        resolver: zodResolver(schema)})
    


    return (
        
        <Dialog>
            <DialogTrigger asChild>
                    {TriggerComponent}
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                    <DialogTitle>New Tournament</DialogTitle>
                    <DialogDescription>
                        Your tournament won't be made public just yet!
                    </DialogDescription>
                    </DialogHeader>
            <form id="createTournamentDialog" onSubmit={handleSubmit(onCreateSubmit)}>

                    <div className="space-y-2">
                        <Label htmlFor="tourName">Tournament Name</Label>
                        <Input
                        id="tourName"
                        {...register('tourName')}
                        // placeholder="Name of your tournament"
                        autoComplete="off"
                        />
                        {errors.tourName && <p className="text-sm text-red-500">{errors.tourName.message}</p>}
                    </div>
        </form>
                    <div className="flex justify-end">
                        <Button form="createTournamentDialog" className="transition-all" type="submit" disabled={!isValid || isSubmitting}>Create</Button>
                    </div>


                </DialogContent>
        </Dialog>


    )
}

async function onCreateSubmit(formdata: FormData) {
    const newTournament = await createTournament(formdata.tourName)

    if (newTournament == 0) {
        // TODO: handle unexpected behavior error
        return;
    }


}