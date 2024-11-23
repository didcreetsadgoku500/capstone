import { joinUserDetails } from "@/app/api/joinUserData";
import { h2Styles, h3Styles, largeStyles, smallStyles } from "@/components/textStyles";
import { Card, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/auth";
import { bws, rankFormatter } from "@/lib/helper";
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
    

    return (
        <div className="w-full flex flex-col items-center">
            <div className="max-w-screen-md w-full">
                <Card>
                    <CardHeader>
                        <div className="flex flex-row gap-2 items-end">
                            <img  src={userData.avatar_url} className="rounded-sm w-24 h-24"/>
                            <div className="flex flex-col p-2">
                                <h2 className={h2Styles}>{userData.username}</h2>
                                <span className="flex flex-row items-center gap-1">
                                    <img src={`https://osuflags.omkserver.nl/${userData.country.code}.png`} className="w-8"/>
                                    <h3 className="text-primary/80">{userData.country.name}</h3>
                                    </span>
                            </div>
                        </div>
                            <div className="flex flex-row gap-12">
                                <div className="flex flex-col p-2">
                                    <div className={`${smallStyles} text-primary/80`}>Global Rank</div>
                                    <div className="font-medium text-2xl">#{userData.statistics.global_rank?.toLocaleString() || 0}</div>

                                </div>

                                <div className="flex flex-col p-2">
                                    <div className={`${smallStyles} text-primary/80`}>BWS Rank</div>
                                    <div className="font-medium text-2xl">#{userData.statistics.global_rank ? Math.floor(bws(userData.statistics.global_rank, badgeCount)).toLocaleString()  : 0}</div>

                                </div>


                                <div className="flex flex-col p-2">
                                    <div className={`${smallStyles} text-primary/80`}>Country Rank</div>
                                    <div className="font-medium text-2xl">#{userData.statistics.country_rank?.toLocaleString() || 0}</div>

                                </div>

                            </div>

                        <Separator />
                        { badgeCount > 0 && <div className="flex flex-row flex-wrap gap-4 px-2">

                            {userData.badges.map((badge) => <img key={badge.awarded_at} className="h-12 shadow-sm" src={badge["image@2x_url"]} />)}
                            <Separator/>
                        </div>
                        }
                    </CardHeader>
                </Card>
            </div>
        </div>
    )

}