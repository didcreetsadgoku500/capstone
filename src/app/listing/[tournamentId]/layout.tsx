import { getTournament } from "@/app/api/queries/getTournament";
import { h2Styles, h3Styles } from "@/components/textStyles";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { DetailsNav } from "./detailsNav";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { FallbackSkeleton } from "@/components/textSkeleton";
import { getTournamentStaff } from "@/app/api/queries/getTournamentStaff";
import { auth } from "@/lib/auth";
import { DetailsHeader } from "./header";

export default function DetailsLayout({ children, params }: { children: React.ReactNode, params: { tournamentId: string }}) {
    
    
    // if (!tournamentDetails) {
    //     return (<div className="mx-auto">You shouldn't be here!</div>)
    // }

    // if (!tournamentDetails.public) {
    //     const session = await auth();

    //     const staffRoles = (await getTournamentStaff(BigInt(await (params.tournamentId))).body;
    //     const isStaff = staffRoles?.find(r => r.userId == session?.user.id)
    //     if (!isStaff) {
    //         return (<div className="mx-auto">You shouldn't be here!</div>)
    //     }
    // }


    return (
        <div className="w-full flex flex-col items-center">
            <div className="max-w-screen-md w-full">
                <Card>
                    <CardHeader>
                        <DetailsHeader params={params}/>
                        <Separator />
                        <DetailsNav params={params} />


                    </CardHeader>
                    <CardContent>
                        <Suspense fallback={FallbackSkeleton(20)}>

                            {children}
                        </Suspense>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}



