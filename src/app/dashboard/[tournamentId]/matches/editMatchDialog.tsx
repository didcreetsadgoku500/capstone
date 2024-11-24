"use client"

import { DatePicker } from "@/components/datepicker"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Switch } from "@/components/ui/switch"
import { zodResolver } from "@hookform/resolvers/zod"
import { Match, MatchStatus } from "@prisma/client"
import { PopoverPortal } from "@radix-ui/react-popover"
import { Edit } from "lucide-react"
import { useState } from "react"
import { Controller, useForm } from 'react-hook-form'

import { z } from "zod"


const schema = z.object({
    // matches: z.coerce.number().step(1).optional(),
    // stageName: z.string().min(1),
    // isBracket: z.boolean()
    team1Id: z.string(),
    team2Id: z.string(),
    team1Score: z.coerce.number().step(1).optional(),
    team2Score: z.coerce.number().step(1).optional(),
    referee: z.string(),
    matchDate: z.date().optional(),
    matchStatus: z.nativeEnum(MatchStatus)


})

type FormData = z.infer<typeof schema>


export default function EditMatchDialog({ onSubmit, match }: { onSubmit: (formdata: FormData) => void, match: Match }) {
    const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitted, isValid }, control } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            team1Id: match.team1Id || undefined,
            team2Id: match.team2Id || undefined,
            team1Score: match.team1Score,
            team2Score: match.team2Score,
            referee: match.referee || undefined,
            matchDate: match.matchDateTime || undefined,
            matchStatus: match.matchStatus

        }
    })



    const [open, setOpen] = useState(false);


    return (

        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={"ghost"} className="text-primary-foreground">Edit <Edit className="w-4 h-4 ml-1" /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Match</DialogTitle>
                </DialogHeader>
                <form id="editMatchDialog" onSubmit={handleSubmit((formdata) => {
                    onSubmit(formdata)
                    setOpen(false)
                })}>




                    {/* Begin form content */}
                    <div className="space-y-3">
                        <div>
                            <Label htmlFor="team1Id">Player 1</Label>
                            <Input
                                id="team1Id"
                                {...register('team1Id')}
                            />
                        </div>

                        <div>
                            <Label htmlFor="team2Id">Player 2</Label>
                            <Input
                                id="team2Id"
                                {...register('team2Id')}
                            />
                        </div>

                        <div>
                            <Label htmlFor="referee">Referee</Label>
                            <Input
                                id="referee"
                                {...register('referee')}
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
                            <Label htmlFor="team2Score">Player 2 Score</Label>
                            <Input
                                id="team2Score"
                                {...register('team2Score')}
                                type="number"
                            />
                        </div>

                        <div>
                            <Label htmlFor="matchDate">Match Date</Label>
                            <Controller
                                control={control}
                                name="matchDate"
                                render={({ field }) => (
                                    <DatePicker value={field.value} onChange={field.onChange} className="w-full" />
                                )}
                            />
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




