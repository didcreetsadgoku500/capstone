import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Stage } from "@prisma/client";
import { Delete, DeleteIcon, Trash } from "lucide-react";


const specialStages = ["registration"]


export function StageListItem({ stage, onDelete }: { stage: (Stage & { _count: { matches: number } }), onDelete: () => void }) {
    const stageName = stage.stageName.toLowerCase()

    return <div className="flex flex-row items-center group">
        <div className="border rounded-md max-w-screen-sm w-full py-3 px-5 flex flex-row justify-between items-center">

            <div className="flex flex-col">
                <b>{stage.stageName}</b>
                <div className="flex flex-row text-primary/75 text-sm">
                    {stageName == "registration" && "This is where players sign up"}
                    {!specialStages.includes(stageName) && stage.isBracket && `${stage._count.matches} matches`}
                    {!specialStages.includes(stageName) && !stage.isBracket && "Your custom stage"}
                </div>
            </div>
            <Switch className="mr-5" />

        </div>

        <Button className="ml-4 opacity-0 transition-opacity group-hover:opacity-100" variant={"ghost"} onClick={onDelete}>
            <Trash />
        </Button>
    </div>
}