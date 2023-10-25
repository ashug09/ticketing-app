import Ticket from "../../(models)/Ticket";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    Ticket.create(body);
    return NextResponse.json(
      { message: "ticket created", Ticket },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "error occured", error},
      { status: 500 }
    );
  }
}
