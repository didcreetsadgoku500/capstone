import { getTournament } from "@/app/api/queries/getTournament";
import { h2Styles, h3Styles } from "@/components/textStyles";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { DetailsNav } from "./detailsNav";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { FallbackSkeleton } from "@/components/textSkeleton";

export default async function DetailsLayout({ children, params }: { children: React.ReactNode, params: Promise<{ tournamentId: string }>}) {
    const tournamentDetails = await getTournament(BigInt((await params).tournamentId))
    

    if (!tournamentDetails) {
        return (<div className="mx-auto">You shouldn't be here!</div>)
    }

    return (
        <div className="w-full flex flex-col items-center">
            <div className="max-w-screen-md w-full">
                <Card>
                    <CardHeader>
                        <img className="rounded-md aspect-banner object-cover mb-3" src={tournamentDetails.bannerUrl}/>
                        <h2 className={h3Styles}>{tournamentDetails?.tourName}</h2>
                        <Separator />
                        <DetailsNav params={params}/>
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



