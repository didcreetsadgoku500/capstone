import { getTournament } from "@/app/api/queries/getTournament"
import { getTournamentRegistrants } from "@/app/api/queries/getTournamentRegistrants"
import { getTournamentStaff } from "@/app/api/queries/getTournamentStaff"
import RegisterButton from "@/components/registerButton"
import { pStyles, smallStyles } from "@/components/textStyles"
import { auth } from "@/lib/auth"
import { rankFormatter } from "@/lib/helper"
import { verifyRole } from "@/lib/permissions"
import { Gamemode, Tournament } from "@prisma/client"

export default async function Page({ params }: { params: { tournamentId: string } }) {
  const tournamentId = BigInt((await params).tournamentId)
  const promises = { 0: getTournament(tournamentId), 1: getTournamentRegistrants(tournamentId), 2: auth(), 3: getTournamentStaff(tournamentId)}
  const tournament = await promises[0]
  const registrants = await promises[1]

  if (!tournament) {
    return "Error could not find tournament"
  }

  const session = await promises[2]
  const staff = await promises[3]

  let isRegistered = false
  let isStaff = false

  if (session) {
    const reg = registrants.body?.find(r => r.userId == session.user.id);
    if (reg) isRegistered = true;

    const role = staff.body?.find(r => r.userId == session.user.id)
    if (role) isStaff = true;
  }




  return (<div className={"flex flex-row justify-between gap-4"}>
    <div className={pStyles}>

      {tournament?.tourDesc}
    </div>
    <div className={smallStyles + " bg-zinc-100 flex flex-col gap-2 p-2 rounded-md h-fit"}>
      <div className="flex flex-row w-48 justify-between">Gamemode <img src={icons[tournament.gamemode]} className="brightness-0 h-4 w-4" /></div>
      <div className="flex flex-row w-48 justify-between">{tournament.usesBWS ? "Uses BWS" : "No BWS"}</div>
      <div className="flex flex-row w-48 justify-between">
        {tournament.minRank ? rankFormatter(tournament.minRank) : "1"}
         
         {tournament.maxRank ? " - "  + rankFormatter(tournament.maxRank) : "+"}

      </div>

      <RegisterButton details={tournament} isDefaultRegistered={isRegistered} />
    </div>

  </div>
  )
}

const icons = {
  [Gamemode.STANDARD]: "/mode-osu.png",
  [Gamemode.TAIKO]: "/mode-taiko.png",
  [Gamemode.CTB]: "/mode-fruits.png",
  [Gamemode.MANIA]: "/mode-mania.png",
}