import { MatchStatus } from "@prisma/client";

export function narrowProfile(input: any) {
      return {
        // OsuUserCompact fields
        avatar_url: input.avatar_url,
        country_code: input.country_code,
        default_group: input.default_group,
        id: Number(input.id),
        is_active: Boolean(input.is_active),
        is_bot: Boolean(input.is_bot),
        is_deleted: Boolean(input.is_deleted),
        is_online: Boolean(input.is_online),
        is_supporter: Boolean(input.is_supporter),
        last_visit: input.last_visit ? new Date(input.last_visit) : null,
        pm_friends_only: Boolean(input.pm_friends_only),
        profile_colour: input.profile_colour,
        username: input.username,

        // Additional OsuProfile fields
        discord: input.discord,
        has_supported: Boolean(input.has_supported),
        interests: input.interests,
        join_date: new Date(input.join_date),
        kudosu: {
            available: Number(input.kudosu?.available),
            total: Number(input.kudosu?.total)
        },
        location: input.location,
        max_blocks: Number(input.max_blocks),
        max_friends: Number(input.max_friends),
        occupation: input.occupation,
        playmode: input.playmode,
        playstyle: Array.isArray(input.playstyle) ? input.playstyle : [],
        post_count: Number(input.post_count),
        profile_order: Array.isArray(input.profile_order) ? input.profile_order : [],
        title: input.title,
        title_url: input.title_url,
        twitter: input.twitter,
        website: input.website,
        country: {
            code: input.country?.code,
            name: input.country?.name
        },
        cover: {
            custom_url: input.cover?.custom_url,
            url: input.cover?.url,
            id: input.cover?.id !== undefined ? Number(input.cover.id) : null
        },
        is_restricted: Boolean(input.is_restricted),

        // More custom fields including ranks
        statistics_rulesets: {
          osu: {global_rank: input.statistics_rulesets.osu.global_rank},
          taiko: {global_rank: input.statistics_rulesets.osu.global_rank},
          fruits: {global_rank: input.statistics_rulesets.osu.global_rank},
          mania: {global_rank: input.statistics_rulesets.osu.global_rank},

        }
    }
}


export function onlyUnique(value: any, index: number, array: any[]) {
  return array.indexOf(value) === index;
}

export function rankFormatter(rank: number) {
  return new Intl.NumberFormat('en', { notation: 'compact' }).format(
    rank,
  )
}

export function bws(rank: number, badges: number) {


  return rank ** (0.9937 ** (badges ** 2))
}


export function statusText(status: MatchStatus) {
  if (status == MatchStatus.NOT_STARTED) {
      return "Not Started"
  }
  if (status == MatchStatus.ENDED) {
      return "Completed"
  }
  if (status == MatchStatus.IN_PROGRESS) {
      return "In Progress"
  }
  if (status == MatchStatus.PAUSED) {
      return "Paused"
  }
}