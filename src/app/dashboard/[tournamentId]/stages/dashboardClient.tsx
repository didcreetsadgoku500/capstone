"use client"
import { Stage } from "@prisma/client";
import { useState } from "react";
import { StageListItem } from "./stageListItem";
import { Button } from "@/components/ui/button";
import AddStageDialog from "./addStageDialog";
import { useToast } from "@/hooks/use-toast";
import { createStage } from "@/app/api/queries/createStage";
import { deleteStage } from "@/app/api/queries/deleteStage";

export default function DashboardClient({ defaultStages, tournamentId }: { defaultStages: (Stage & { _count: { matches: number } })[], tournamentId: string }) {
    const [stages, setStages] = useState(defaultStages)
    const { toast } = useToast()

    return (<div className="flex flex-col gap-4">
        {stages.length == 0 && <p className="text-primary/75 text-sm">No stages yet. Add a <b>Registration</b> stage to get started.</p>}

        {stages.map(s =>
            <StageListItem key={s.stageNo} stage={s} onDelete={async () => {
                let newStages = stages.filter((s2) => s2.stageNo != s.stageNo);
                newStages = newStages.map((s2, i) => {s2.stageNo = i; return s2});
                setStages([...stages].filter((s2) => s2.stageNo != s.stageNo))

                const res = await deleteStage(BigInt(tournamentId), s.stageNo);
                if (res.error) {
                    toast({
                        title: "Error",
                        description: res.error,
                        variant: "destructive"
                    })
                }
                }
            } />
        )}
        <AddStageDialog TriggerComponent={

            <Button className="mt-4">
                Add Stage
            </Button>
        } onStageAdd={async (form) => {

            if (form.isBracket && form.matches == 0) {
                toast({
                    title: "Error",
                    description: "Bracket stages must have at least 1 match",
                    variant: "destructive"
                })
            }


            // Make a server action for creating a stage, then creating its matches, then returning stage object
            // then add the stage object to the state
            const res = await createStage(BigInt(tournamentId), form)

            if (res.error) {
                toast({
                    title: "Error",
                    description: res.error,
                    variant: "destructive"
                })

                return;
            }

            if (res.body) {
                setStages([...stages, res.body])
            }

        }} />
    </div>
    )
}