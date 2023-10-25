"use client";
import React from "react";
import { Button } from "@mantine/core";
import { useRouter } from "next/navigation";
import { Router } from "next/router";

export default function DeleteTicket({ id }) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const DeleteTicket = async () => {
    sessionStorage.setItem("loading", "true");
    try {
      const res = await fetch(`http://localhost:3000/api/ticket/${id}`, {
        method: "DELETE",
      });
      if (res.status === 200) {
        alert("Ticket deleted");
        sessionStorage.setItem("loading", "false");
        window.location.reload();
      }
      console.log("this is res: " + res.status);
    } catch (error) {
      alert(error);
    }
  };
  return (
    <Button
      onClick={() => DeleteTicket()}
      className="mx-auto"
      color="red"
      variant="filled"
    >
      Delete
    </Button>
  );
}
