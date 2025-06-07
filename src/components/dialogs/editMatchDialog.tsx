"use client"

import { Combobox } from "@/components/combobox"
import { DatePicker } from "@/components/datepicker"
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
import { statusText } from "@/utils/helper"
import { zodResolver } from "@hookform/resolvers/zod"
import { Match, MatchStatus } from "@prisma/client"
import { Edit } from "lucide-react"
import { UserCompact } from "osu-web.js"
import { useState } from "react"
import { Controller, useForm } from 'react-hook-form'

import { z } from "zod"

const MatchStatusOptions = [
    {
        value: MatchStatus.IN_PROGRESS,
        label: statusText(MatchStatus.IN_PROGRESS) || ""
    },
    {
        value: MatchStatus.NOT_STARTED,
        label: statusText(MatchStatus.NOT_STARTED) || ""
    },
    {
        value: MatchStatus.ENDED,
        label: statusText(MatchStatus.ENDED) || ""
    },
    {
        value: MatchStatus.PAUSED,
        label: statusText(MatchStatus.PAUSED) || ""
    },
]


const schema = z.object({
    // matches: z.coerce.number().step(1).optional(),
    // stageName: z.string().min(1),
    // isBracket: z.boolean()
    team1Id: z.string().optional(),
    team2Id: z.string().optional(),
    team1Score: z.coerce.number().step(1).optional(),
    team2Score: z.coerce.number().step(1).optional(),
    referee: z.string().optional(),
    matchDateTime: z.date().optional(),
    matchTime: z.string().optional(),
    matchStatus: z.nativeEnum(MatchStatus).optional()


})

export type MatchFormData = z.infer<typeof schema>


export default function EditMatchDialog({ onSubmit, match, users, referees }:
    { onSubmit: (formdata: MatchFormData) => void, match: Match, users: UserCompact[], referees: UserCompact[] }) {
    const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitted, isValid }, control } = useForm<MatchFormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            team1Id: match.team1Id || undefined,
            team2Id: match.team2Id || undefined,
            team1Score: match.team1Score,
            team2Score: match.team2Score,
            referee: match.referee || undefined,
            matchDateTime: match.matchDateTime || undefined,
            matchTime: match.matchDateTime ? match.matchDateTime.toISOString().split(/T(\d{2}:\d{2})/)[1] : undefined,
            matchStatus: match.matchStatus

        }
    })



    const [open, setOpen] = useState(false);

    const PlayerOptions = users.map(u => ({
        value: String(u.id),
        label: u.username
    }))

    const RefOptions = referees.map(u => ({
        value: String(u.id),
        label: u.username
    }))

    return (

        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={"ghost"} className="text-primary-foreground">Edit <Edit className="w-4 h-4 ml-1" /></Button>
            </DialogTrigger>
            <DialogContent className="">
                <DialogHeader>
                    <DialogTitle>Edit Match</DialogTitle>
                </DialogHeader>
                <form id="editMatchDialog" onSubmit={handleSubmit((formdata) => {
                    onSubmit(formdata)
                    setOpen(false)
                }, (e => console.log(e)))}>




                    {/* Begin form content */}

                    <div className="flex flex-row w-full gap-2">


                        <div className="flex flex-col space-y-3 w-1/2">

                            <div>
                                <Label htmlFor="team1Id">Player 1</Label>
                                <Controller
                                    control={control}
                                    name="team1Id"
                                    render={({ field }) => (
                                        <Combobox
                                            options={PlayerOptions}
                                            placeholder="Select player..."
                                            className="w-full"
                                            value={field.value}
                                            onChange={field.onChange}

                                        />)}
                                />
                            </div>

                            <div>
                                <Label htmlFor="team1Score">Player 1 Score</Label>
                                <Input
                                    id="team1Score"
                                    {...register('team1Score')}
                                    type="number"
                                />
                            </div>

                            <div>
                                <Label htmlFor="referee">Referee</Label>
                                <Controller
                                    control={control}
                                    name="referee"
                                    render={({ field }) => (
                                        <Combobox
                                            options={RefOptions}
                                            placeholder="Select referee..."
                                            className="w-full"
                                            value={field.value}
                                            onChange={field.onChange}

                                        />)}
                                />
                            </div>



                            <div>
                                <Label htmlFor="matchDateTime">Match Date</Label>
                                <Controller
                                    control={control}
                                    name="matchDateTime"
                                    render={({ field }) => (
                                        <DatePicker value={field.value} onChange={field.onChange} className="w-full" />
                                    )}
                                />
                            </div>






                        </div>

                        <div className="flex flex-col space-y-3 w-1/2">

                            <div>
                                <Label htmlFor="team2Id">Player 2</Label>
                                <Controller
                                    control={control}
                                    name="team2Id"
                                    render={({ field }) => (
                                        <Combobox
                                            options={PlayerOptions}
                                            placeholder="Select player..."
                                            className="w-full"
                                            value={field.value}
                                            onChange={field.onChange}

                                        />)}
                                />
                            </div>
                            <div>
                                <Label htmlFor="team2Score">Player 2 Score</Label>
                                <Input
                                    id="team2Score"
                                    {...register('team2Score')}
                                    type="number"
                                />
                            </div>


                            <div>
                                <Label htmlFor="matchStatus">Match Status</Label>

                                <Controller
                                    control={control}
                                    name="matchStatus"
                                    render={({ field }) => (
                                        <Combobox
                                            options={MatchStatusOptions}
                                            placeholder="Select status..."
                                            className="w-full"
                                            value={field.value}
                                            onChange={field.onChange}

                                        />)}
                                />
                            </div>


                            <div>
                                <Label htmlFor="matchTime">Match Time</Label>

                                <Controller
                                    control={control}
                                    name="matchTime"
                                    render={({ field }) => (
                                        <Input
                                            id="matchTime"
                                            type="time" 
                                            value={field.value}
                                            onChange={field.onChange}
                                            min={"00:00"}
                                            max={"23:59"}
                                            
                                            />
                                    )}
                                />
                            </div>






                        </div>
                    </div>
                    {/* End form content */}


                </form>
                <div className="flex justify-end">
                    <Button form="editMatchDialog" className="transition-all" type="submit" disabled={!isValid || isSubmitting}>Confirm</Button>
                </div>


            </DialogContent>
        </Dialog>


    )
}




