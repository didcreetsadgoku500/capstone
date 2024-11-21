import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function DetailsLayout({ children, params }: { children: React.ReactNode, params: Promise<{ tournamentId: string }>}) {
    return (
        <div className="w-full flex flex-col items-center">
            <div className="max-w-screen-md w-full">
                <Card>
                    <CardHeader>
                        <img className="rounded-md aspect-banner object-cover" src="/strafeSmoke.jpg"/>
                    </CardHeader>
                    <CardContent>
                        {children}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
