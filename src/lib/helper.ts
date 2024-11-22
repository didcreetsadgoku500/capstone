import { ProfileData } from "./auth";
import { Profile } from "next-auth"


export function narrowProfile(profile: Profile): ProfileData {
  const result: ProfileData = {
    id: profile.id,
    username: profile.username,
    avatar_url: profile.avatar_url,
    country_code: profile.country_code,
    country: profile.country,
    discord: profile.discord,
    is_restricted: profile.is_restricted,
    statistics_rulesets: {
      osu: {
        global_rank: profile.statistics_rulesets.osu.global_rank
      },
      taiko: {
        global_rank: profile.statistics_rulesets.taiko.global_rank

      },
      fruits: {
        global_rank: profile.statistics_rulesets.fruits.global_rank

      },
      mania: {
        global_rank: profile.statistics_rulesets.mania.global_rank

      }
    }
  }

  return result;
}

export function onlyUnique(value, index, array) {
  return array.indexOf(value) === index;
}

export function rankFormatter(rank: number) {
  return new Intl.NumberFormat('en', { notation: 'compact' }).format(
    rank,
  )
}