"use client"
import { Stage } from "@prisma/client";
import { useState } from "react";
import { StageListItem } from "./stageListItem";
import { Button } from "@/components/ui/button";
import AddStageDialog from "./addStageDialog";
import { useToast } from "@/hooks/use-toast";

export default function DashboardClient({ defaultStages }: { defaultStages: (Stage & {_count: {matches: number}})[] }) {
    const [stages, setStages] = useState(defaultStages)
    const { toast }  = useToast()

    return (<div className="flex flex-col">
        {stages.map(s => <StageListItem key={s.stageNo} stage={s}/>)}
        <AddStageDialog tournamentId={"1"} TriggerComponent={

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
            
        }}/>
    </div>
    )
}