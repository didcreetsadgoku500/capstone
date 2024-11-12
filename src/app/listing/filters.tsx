"use client"

import GamemodeSelect from "@/components/gamemodeSelect";
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

            <div className="flex flex-col space-y-6">

            <div className="items-center flex space-x-2">

                <Checkbox id="filter-ineligible"/>
                <label className={smallStyles} htmlFor="filter-ineligible">
                    Show ineligible tournaments
                </label>
            </div>

            <div className="flex flex-col">

                <label className={smallStyles}>Gamemode</label>
                <GamemodeSelect onGamemodeChange={(gm) => {console.log(gm)}} />
            </div>
            </div>

        </div>
    )

}