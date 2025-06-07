"use client"

import { deleteTournament } from "@/app/api/queries/deleteTournament"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { useState } from "react"


export default function DeleteTournamentDialog({TriggerComponent, tournamentId}: {TriggerComponent: React.ReactNode, tournamentId: bigint}) {
    const [submitting, setSubmitting] = useState(false)

    return (
        
        <Dialog>
            <DialogTrigger asChild>
                    {TriggerComponent}
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                    <DialogTitle>Delete Tournament</DialogTitle>
                    <DialogDescription>
                        Are you sure? This action cannot be undone.
                    </DialogDescription>
                    </DialogHeader>
                        <div className="flex justify-end">
                        <Button className="transition-all" type="button" variant={"destructive"} disabled={submitting} onClick={() => {
                            setSubmitting(true)
                            deleteTournament(tournamentId)

                        }}>Confirm</Button>
                    </div>


                </DialogContent>
        </Dialog>


    )
}