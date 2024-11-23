import { Switch } from "@/components/ui/switch";
import { Stage } from "@prisma/client";


const specialStages = ["registration"]


export function StageListItem({stage}: {stage: (Stage & {_count: {matches: number}})}) {

    return <div className="border rounded-md max-w-screen-sm py-3 px-5 flex flex-row justify-between items-center">
        <div className="flex flex-col">
            <b className="capitalize">{stage.stageName}</b>
            <div className="flex flex-row text-primary/75 text-sm">
                {stage.stageName == "registration" && "This is where players sign up"}
                {!specialStages.includes(stage.stageName) && stage.isBracket && `${stage._count.matches} matches`}
                {!specialStages.includes(stage.stageName) && !stage.isBracket && "Your custom stage"}
            </div>
        </div>
        <Switch className="mr-5" />

        </div>
}