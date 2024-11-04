"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
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
        <form onSubmit={e => {e.preventDefault(); console.log("e")}}>

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
                    <div className="flex justify-end">
                        <Button className="transition-all" type="submit" disabled={!isValid || isSubmitting}>Create</Button>
                    </div>


                </DialogContent>
        </Dialog>
        </form>


    )
}

async function onCreateSubmit(formdata: FormData) {
    console.log("fired")
    const newTournament = await createTournament(formdata.tourName)

    if (newTournament == 0) {
        // TODO: unexpected behavior error
        return;
    }


}