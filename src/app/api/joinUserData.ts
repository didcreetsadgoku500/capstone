"use server"

import { auth } from "@/lib/auth"
import { Client, Country, Cover, StatisticsRulesets, UserCompact, UserGroup } from "osu-web.js"

export async function joinUserDetails<T>(inputList: T[], extractPredicate: (i: T) => number) {
    const session = await auth()

    if (!session || !session.access_token) {
        return //error
    }
    

    const result: dataUserDetails<T>[] = []
    const userIds = inputList.map(extractPredicate);
  
 
    const osu = new Client(session?.access_token);
    const userData = await osu.users.getUsers({query: {ids: userIds}})
  
    let indices: Record<number, number> = userData.reduce(
        (acc, el, index) => ({ ...acc, [el.id]: index }),
        {}
    );

    for (const i of inputList) {
        result.push({
            data: i,
            userDetails: userData[indices[extractPredicate(i)]]
        })
    }

      return result;
  
  
}
  


export interface dataUserDetails<T> {
    data: T,
    userDetails: (UserCompact & {
        country: Country;
        cover: Cover;
        groups: UserGroup[];
        statistics_rulesets: StatisticsRulesets;
    })
}

