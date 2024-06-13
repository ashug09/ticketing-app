import Ticket from "../../../models/Ticket";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  try {
    const id = params.id;

    const data = await Ticket.findById(id);
    return NextResponse.json(
      { message: "ticket found with given id", data },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "error occured", error },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    const body = await req.json();
    const id = params.id;
    const data = await Ticket.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json(
      { message: "ticket updated", data },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "error occured", error },
      { status: 500 }
    );
  }
}
