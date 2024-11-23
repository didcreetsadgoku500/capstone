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
import { Switch } from "@/components/ui/switch"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { Controller, useForm } from 'react-hook-form'

import { z } from "zod"


const schema = z.object({
    matches: z.coerce.number().step(1).optional(),
    stageName: z.string().min(1),
    isBracket: z.boolean()
})

type FormData = z.infer<typeof schema>


export default function AddStageDialog({ tournamentId, TriggerComponent, onStageAdd }: { tournamentId: string, TriggerComponent: React.ReactNode, onStageAdd: (formdata: FormData) => void }) {
    const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitted, isValid }, control } = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    const [open, setOpen] = useState(false);
    const [isBracket, setIsBracket] = useState(false);

    return (

        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {TriggerComponent}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Stage</DialogTitle>
                    <DialogDescription>
                        Enter the details for your new stage
                    </DialogDescription>
                </DialogHeader>
                <form id="addStageDialog" onSubmit={handleSubmit((formdata) => {
                    onStageAdd(formdata)
                    setOpen(false)

                })}>



                    <div className="space-y-3">
                        <div>

                            <Label htmlFor="userId">Stage Name</Label>
                            <Input
                                id="stageName"
                                {...register('stageName')}
                                autoComplete="off"
                            />
                            {errors.stageName && <p className="text-sm text-red-500">{errors.stageName.message}</p>}
                        </div>

                        <div className="flex items-center justify-between">
                            <Label htmlFor="usesBWS">Is Bracket Stage</Label>
                            <Controller
                                control={control}
                                name="isBracket"
                                render={({ field }) => (
                                    <Switch
                                        id="isBracket"
                                        checked={field.value}
                                        onCheckedChange={(a) => {
                                            field.onChange(a)
                                            setIsBracket(a)
                                        }}
                                    />
                                )}
                            />
                        </div>

                        {isBracket && 
                        <div>
                            <Label htmlFor="matches">Number of Matches</Label>
                            <Input
                                {...register('matches')}
                                placeholder="0"
                                type="number"
                                />
                            {errors.matches && <p className="text-sm text-red-500">{errors.matches.message}</p>}
                        </div>
                            }


                        

                    </div>
                </form>
                <div className="flex justify-end">
                    <Button form="addStageDialog" className="transition-all" type="submit" disabled={!isValid || isSubmitting}>Add</Button>
                </div>


            </DialogContent>
        </Dialog>


    )
}




