import { auth } from "@/lib/auth"
// import prisma from "@/lib/db"
import { NextResponse } from "next/server"
import { Client } from 'osu-web.js';

export const GET = auth(async function GET(req) {
    // const myTournament = await prisma.tournament.findFirst();
    const myTournament = {"hello": "world"};
    const session = req.auth;
    if (session?.access_token) {
      const osu = new Client(session?.access_token)
      const res = await osu.users.getSelf()
      
    return NextResponse.json(res);
    }

    return NextResponse.json(myTournament);
  })