import { auth } from "@/utils/auth"
import prisma from "@/utils/db"
import { NextResponse } from "next/server"

export const GET = auth(async function GET(req) {
    const myTournament = await prisma.tournament.findFirst();
    return NextResponse.json(myTournament);
  })