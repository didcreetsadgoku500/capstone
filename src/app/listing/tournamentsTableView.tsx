import { h3Styles } from "@/components/textStyles";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function TournamentsTableView() {
    return (
        <div className="space-y-3 flex flex-col">
            <div>

            <h3 className={h3Styles}>Tournaments</h3>
            <Separator className="bg-primary/75" />
            </div>
            
            <div className="flex flex-col">
                <Card className="hover:shadow-md">
                    Hello World
                </Card>
            </div>


        </div>
    )
}