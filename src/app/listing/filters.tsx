import { h3Styles, smallStyles } from "@/components/textStyles";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";





export default function Filters() {
    return (
        <div className="space-y-3 flex flex-col">
            <div>

            <h3 className={h3Styles}>Filters</h3>
            <Separator className="bg-primary/75" />
            </div>
            <div className="items-center flex space-x-2">

                <Checkbox id="filter-ineligible"/>
                <label className={smallStyles} htmlFor="filter-ineligible">
                    Show ineligible tournaments
                </label>
            </div>
        </div>
    )

}