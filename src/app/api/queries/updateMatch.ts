"use server"

import { MatchFormData } from "@/app/dashboard/[tournamentId]/matches/editMatchDialog";
import { Match } from "@prisma/client";

export default async function updateMatch(match: Match, formdata: MatchFormData) {
    
}