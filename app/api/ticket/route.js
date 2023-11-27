import Ticket from "../../models/Ticket";
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

export async function GET (){
  try {
    const ticket = await Ticket.find({})
    return NextResponse.json({ message: "ticket found", ticket }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: "error occured", error}, {status: 500})
  }
}