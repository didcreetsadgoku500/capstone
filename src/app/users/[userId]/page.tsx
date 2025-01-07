import { joinUserDetails } from "@/app/api/joinUserData";
import MatchListItem from "@/components/matchListItem";
import { h2Styles, h3Styles, largeStyles, smallStyles } from "@/components/textStyles";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { auth } from "@/utils/auth";
import prisma from "@/utils/db";
import { bws } from "@/utils/helper";
import { MatchStatus } from "@prisma/client";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { Client } from "osu-web.js";

export default async function Userpage({ params }: { params: { userId: string } }) {
    const session = await auth();
    if (!session) {
        return <div>You must be logged in to view user profiles!</div>
    }

    let userData;
    try {
        const osu = new Client(session.access_token);
        userData = await osu.users.getUser(params.userId)
    } catch {
        return <div className="mx-auto">Couldn't find any user with ID {params.userId}.</div>
    }

    const userId = userData.id; // Do this so ppl can do username slugs
    const isOwnProfile = session && Number(session.user.id) == userId;

    const badgeCount = userData.badges.length;

    const perms = await prisma.permission.findMany({
        where: {
            userId: userId.toString(),

        }
    })

    const staffedTournamentIds = []
    for (const p of perms) {
        if (p.scope.includes("tournament-")) {
            staffedTournamentIds.push(BigInt(p.scope.split("-")[1]))
        }
    }



    const staffedTournaments = await prisma.tournament.findMany({
        where: {
            tournamentId: {
                in: staffedTournamentIds
            },
            ...(!isOwnProfile && { public: true })
        }
    })


    const upcomingMatches = await prisma.match.findMany({
        where: {
            OR: [
                {team1Id: userId.toString()},
                {team2Id: userId.toString()},
            ],
            matchStatus: {
                in: [MatchStatus.IN_PROGRESS, MatchStatus.NOT_STARTED]
            },
            matchDateTime: {
                gte: new Date()
            },
            stage: {
                public: true
            }
        },
        include: {
            stage: true
        },
        orderBy: {
            matchDateTime: 'asc'
        }
    })

    const opponentIds = upcomingMatches.map((m) => {
        if (m.team1Id == userId.toString()) {
            return m.team2Id
        }
        return m.team1Id
    }).filter(i => i != null)

    upcomingMatches.forEach((m) => m.referee && opponentIds.push(m.referee))
    opponentIds.push(userId.toString())

    const opponents = await joinUserDetails(opponentIds, (i) => Number(i))

    return (
        <div className="w-full flex flex-col items-center">
            <div className="max-w-screen-md w-full">
                <Card>
                    <CardHeader>
                        <div className="flex flex-row w-full justify-between">
                            <div className="gap-2 items-end flex flex-row">

                                <img src={userData.avatar_url} className="rounded-sm w-24 h-24" />
                                <div className="flex flex-col p-2">
                                    <h2 className={h2Styles}>{userData.username}</h2>
                                    <span className="flex flex-row items-center gap-1">
                                        <img src={`https://osuflags.omkserver.nl/${userData.country.code}.png`} className="w-8" />
                                        <h3 className="text-primary/80">{userData.country.name}</h3>
                                    </span>
                                </div>
                            </div>
                            <div>
                                <Link className={buttonVariants({ variant: "outline" })} href={"https://osu.ppy.sh/users/" + userId} target="_blank">
                                    osu! Profile <ExternalLink className="w-4 ml-1" />
                                </Link>

                            </div>
                        </div>
                        <div className="flex flex-row gap-12">
                            <div className="flex flex-col p-2">
                                <div className={`${smallStyles} text-primary/80`}>Global Rank</div>
                                <div className="font-medium text-2xl">#{userData.statistics.global_rank?.toLocaleString() || 0}</div>

                            </div>

                            <div className="flex flex-col p-2">
                                <div className={`${smallStyles} text-primary/80`}>BWS Rank</div>
                                <div className="font-medium text-2xl">#{userData.statistics.global_rank ? Math.floor(bws(userData.statistics.global_rank, badgeCount)).toLocaleString() : 0}</div>

                            </div>


                            <div className="flex flex-col p-2">
                                <div className={`${smallStyles} text-primary/80`}>Country Rank</div>
                                <div className="font-medium text-2xl">#{userData.statistics.country_rank?.toLocaleString() || 0}</div>

                            </div>

                        </div>

                        <Separator />
                        {badgeCount > 0 && <div className="flex flex-row flex-wrap gap-4 px-2">

                            {userData.badges.map((badge) => <img key={badge.awarded_at} className="h-12 shadow-sm" src={badge["image@2x_url"]} />)}
                            <Separator />
                        </div>
                        }
                    </CardHeader>
                    <CardContent>


                    <Label>
                            Upcoming Matches
                        </Label>
                        {upcomingMatches.length == 0 && 
                        <div className="text-primary/50 mb-16">There's nothing here!</div>}
                        {upcomingMatches.length > 0 && 
                            <div className="flex flex-col gap-4 p-2 items-center w-full mb-8">

                            {opponents && upcomingMatches.map(match =>
                                <MatchListItem key={match.matchId} match={match} users={opponents.map(m=>m.userDetails)} referees={opponents.map(m=>m.userDetails)}/>
                                
                            )}
                            </div>
                        }


                        
                        <Label>
                            Staffing History
                        </Label>
                        {staffedTournaments.length == 0 && 
                        <div className="text-primary/50">There's nothing here!</div>}
                        {staffedTournaments.length > 0 && 
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-36">Banner</TableHead>
                                    <TableHead>Tournament Name</TableHead>
                                    <TableHead>Role</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {staffedTournaments.map(t => (

                                    <TableRow key={t.tournamentId}>
                                        <TableCell>
                                        <Link href={`/listing/${t.tournamentId}`}>
                                            <img className="aspect-banner rounded-md max-h-8" src={t.bannerUrl} />
                                    </Link>
                                            </TableCell>
                                        <TableCell>
                                            {t.tourName}
                                            </TableCell>
                                        <TableCell className="capitalize">{perms.filter(p => p.scope == `tournament-${t.tournamentId}`).map(p => p.role).join(", ")}</TableCell>
                                    </TableRow>

                                ))}
                            </TableBody>
                        </Table>
                        }
                        
                    </CardContent>
                </Card>
            </div>
        </div>
    )

}