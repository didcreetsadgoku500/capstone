import { h3Styles } from "@/components/textStyles";
import { Separator } from "@/components/ui/separator";

export default function TournamentsTableView() {
    return (
        <div className="space-y-3 flex flex-col">
            <div>

            <h3 className={h3Styles}>Tournaments</h3>
            <Separator className="bg-primary/75" />
            </div>
            <div className="items-center flex space-x-2">

            </div>
        </div>
    )
}