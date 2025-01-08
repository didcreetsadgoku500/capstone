import { MatchStatus } from "@prisma/client";



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