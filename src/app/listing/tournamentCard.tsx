import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ITournament } from "../api/queries/getTournaments";
import { UserRoundIcon, UsersRound } from "lucide-react";
import { smallStyles } from "@/components/textStyles";
import { register } from "../api/queries/register";
import RegisterButton from "@/components/registerButton";



interface TournamentCardProps {
  details: ITournament
  isRegistered?: boolean
}

export default function TournamentCard({ details, isRegistered = false}: TournamentCardProps) {
    return (
      <Link href={`/listing/${details.tournamentId}`}>
      <div className="border rounded-lg p-3 flex flex-col w-[300px] h-60 hover:shadow-md bg-card cursor-pointer transition-shadow">
        <img className="w-full aspect-banner object-cover rounded-lg" src={details.bannerUrl || ""} alt="Tournament Banner" />
        <div className="flex flex-col flex-grow overflow-hidden mt-2">
          <h3 className="text-md font-medium">{details.tourName}</h3>
          <p className="text-xs font-regular text-primary/75 line-clamp-3">{details.tourDesc}</p>
        </div>
        <div className="flex justify-between mt-2">
          <span className={`flex flex-row items-center font-medium`}> <UserRoundIcon className="mr-1 opacity-75" /> {details._count.registrations}</span>
          {/* button go here */}
          <RegisterButton details={details} isDefaultRegistered={isRegistered}/>

        </div>
      </div>
      </Link>
    )
  }