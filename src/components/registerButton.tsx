"use client"

import { ITournament } from "@/app/api/queries/getTournaments"
import { Button } from "./ui/button"
import { register } from "@/app/api/queries/register"


// Button for registering for a tournament

export default function RegisterButton({details}: {details: ITournament}) {
    return <Button className="py-1 px-2 text-xs font-medium" size={null} onClick={(e) => {e.preventDefault(); register(details.tournamentId)}}>Register</Button>
}
