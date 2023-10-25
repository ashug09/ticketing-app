import Ticket from "../../../(models)/Ticket";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  try {
    const id = params.id;
    await Ticket.findByIdAndDelete(id);

    return NextResponse.json({ message: "ticket deleted" }, { status: 200 });
  } catch (error) {
    console.log(params);
    return NextResponse.json(
      { message: "error occured", error },
      { status: 500 }
    );
  }
}
