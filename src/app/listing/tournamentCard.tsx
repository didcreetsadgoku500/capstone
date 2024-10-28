import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ITournament } from "../api/queries/getTournaments";
import { UserRoundIcon, UsersRound } from "lucide-react";
import { smallStyles } from "@/components/textStyles";


// interface TournamentDetails {
//   title: string,
//   description: string,
//   bannerSrc: string,
//   tournamentId: number,
// }


interface TournamentCardProps {
  details: ITournament
  action?: "register" | "unregister"
}

export default function TournamentCard({ details, action = "register"}: TournamentCardProps) {
    return (
      <Link href={`/dashboard/${details.tournamentId}`}>
      <div className="border rounded-lg p-3 flex flex-col w-[300px] h-60 hover:shadow-md bg-card cursor-pointer">
        <img className="w-full h-20 object-cover rounded-lg" src={details.bannerUrl || ""} alt="Tournament Banner" />
        <div className="flex flex-col flex-grow overflow-hidden mt-2">
          <h3 className="text-md font-medium">{details.tourName}</h3>
          <p className="text-xs font-regular text-primary/75 line-clamp-3">{details.tourDesc}</p>
        </div>
        <div className="flex justify-between mt-2">
          <span className={`flex flex-row items-center font-medium`}> <UserRoundIcon className="mr-1 opacity-75" /> {details._count.registrations}</span>
          <Button className="py-1 px-2 text-xs font-medium" size={null}>Register</Button>
        </div>
      </div>
      </Link>
    )
  }