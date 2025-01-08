import { auth } from "@/utils/auth";
import { NextResponse } from "next/server";
import prisma from "@/utils/db";

export const GET = auth(async function GET(req, { params }) {
  if (!params || !params.tournamentId) {
    return NextResponse.json(
      { error: "Missing tournamentId" },
      { status: 400 }
    );
  }

  if (typeof params.tournamentId !== "string") {
    return NextResponse.json(
      { error: "Invalid tournamentId" },
      { status: 400 }
    );
  }

  let tournamentId;
  try {
    tournamentId = BigInt(params.tournamentId);
  } catch (e) {
    return NextResponse.json(
      { error: "Invalid tournamentId" },
      { status: 400 }
    );
  }

  const session = req.auth;

  const tournament = await prisma.tournament.findFirst({
    where: {
      tournamentId: tournamentId,
    },
    include: {
      staff: {
        where: {
          userId: session?.user.id || undefined
        }
      },
      
    },
    
  });

  if (!tournament) {
    return NextResponse.json(
      { error: "Tournament not found" },
      { status: 404 }
    );
  }
    
  // If tournament isn't public, are they staff? If not, deny access   
  if (!tournament.public && !tournament.staff.length) {
    return NextResponse.json(
      { error: "Not authorized" },
      { status: 403 }
    );
  }

  return NextResponse.json( 
    tournament, { status: 200 });
});
