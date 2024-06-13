"use client";
import React from "react";
import { Button } from "@mantine/core";
import { useRouter } from "next/navigation";
import { Router } from "next/router";
import { Loader } from "@mantine/core";
import toast from "react-hot-toast";

export default function DeleteTicket({ id }) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const DeleteTicket = async () => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:3000/api/ticket/${id}`, {
        method: "DELETE",
      });
      if (res.status === 200) {
        setLoading(false);
        toast.success("Ticket deleted");
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
      {loading ? <Loader color="white" size="xs" /> : <span>Delete</span>}
    </Button>
  );
}
