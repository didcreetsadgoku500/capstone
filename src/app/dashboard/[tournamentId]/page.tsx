import { getTournament } from "@/app/api/queries/getTournament";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { auth } from "@/lib/auth";
import { verifyRole } from "@/lib/permissions";


export default async function Page({ params }: { params: { tournamentId: string } }) {
    const tournamentDetailsPromise = getTournament(BigInt(params.tournamentId));

    const session = await auth();

    if (!session || !session.user.id) {
        return <Unauthenticated />
    }
    const permission = await verifyRole(session.user.id, `tournament-${params.tournamentId}`, "host")
    if (!permission) {
        return <Unauthorized tournamentId={params.tournamentId}/>
    }

    const tournamentDetails = await tournamentDetailsPromise;
    if (tournamentDetails == null) {
        return <Unauthorized tournamentId={params.tournamentId}/>
    }

    return <div className="mx-auto max-w-screen-xl w-full">
        <Card className="max-w-screen-xl grid grid-cols-4">
            <div className="col-span-1">

            <CardHeader>
                <CardTitle>Navigate</CardTitle>
            </CardHeader>
            <CardContent>

            </CardContent>
            </div>
            <div className="col-span-3">

            <CardHeader>
                <CardTitle>Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid w-full items-center gap-4">

                    <div>
                        <Label htmlFor="name">Tournament Name</Label>
                        <Input id="name" placeholder="Name of your tournament" 
                        defaultValue={tournamentDetails.tourName}/>
                    </div>

                    <div>
                        <Label htmlFor="desc">Description</Label>
                        <Textarea id="desc" placeholder="Describe your tournament" 
                        defaultValue={tournamentDetails.tourDesc}
                        />
                    </div>

                    <div>
                        <Label htmlFor="min">Rank Range</Label>
                        <div className="flex flex-row items-center max-w-96 w-full justify-between">

                            <Input  id="min" placeholder="Min" type="number" step={1} 
                            defaultValue={tournamentDetails.minRank ? tournamentDetails.minRank : ""}/>
                            <span className="mx-3"> - </span>
                            <Input id="min" placeholder="Max" type="number" step={1}
                            defaultValue={tournamentDetails.maxRank ? tournamentDetails.maxRank : ""}/>
                        </div>
                    </div>

                    <div className="flex items-center max-w-96 w-full justify-between">
                        <Label htmlFor="bws">Use Badge Weighted Seeding</Label>
                        <Switch id="bws" defaultChecked={tournamentDetails.usesBWS ? true : false}/>
                    </div>


                </div>
            </CardContent>
            <CardFooter>
                <div className="flex w-full justify-end">

                <Button disabled={true}>Save changes</Button>
                </div>
            </CardFooter>
            </div>
            
        </Card>
        </div>
        

  }



function Unauthenticated() {
    return <div className="mx-auto">You are not signed in</div>
  }


function Unauthorized({tournamentId}: {tournamentId: string}) {
    return (<div className="mx-auto">Missing required permissions for tournament ID {tournamentId}. </div>)  }    