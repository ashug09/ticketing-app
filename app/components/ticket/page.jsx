"use client";
import { Card, Image, Text, Group, RingProgress } from "@mantine/core";
import classes from "./ticket.module.css";
import { Button } from "@mantine/core";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader } from "@mantine/core";
import React from "react";
import TicketDelete from "./delete";
import { createContext } from "react";

export default function Ticket({ ticket }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams({
    id: ticket._id,
    ticket: JSON.stringify(ticket)
  });
  const stats = [
    { title: "Priority", value: ticket.priority },
    { title: "Category", value: ticket.category },
    {
      title: "Activity",
      value: ticket.active === true ? "Active" : "Inactive",
    },
  ];
  console.log("this is ticket: " + ticket.active);
  const star = "⚡";
  const items = stats.map((stat) => (
    <div key={stat.title}>
      <Text size="xs" c="dimmed">
        {stat.title}
      </Text>
      {stat.title == "Priority" ? (
        star.repeat(stat.value)
      ) : (
        <Text fw={500} size="xs">
          {stat.value}
        </Text>
      )}
    </div>
  ));

  let status;
  {
    ticket.status == "Initiated"
      ? (status = 33)
      : ticket.status == "Processing"
      ? (status = 66)
      : (status = 100);
  }

  const formatTimeStamp = () => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    const date = new Date(ticket.createdAt);
    return date.toLocaleDateString("en-IN", options);
  };

  // const DeleteTicket = async () => {
  //   try {
  //     const res = await fetch(`http://localhost:3000/api/ticket/${ticket._id}`, {
  //       method: "DELETE",
  //     });
  //     if (res.status === 200) {
  //       alert("Ticket deleted");
  //       router.refresh();
  //     }
  //     console.log("this is res: " + (res.status));
  //   } catch (error) {
  //     alert(error);
  //   }
  // }
  return (
    <Card
      withBorder
      padding="lg"
      className={`w-72 mx-auto my-2 ${classes.card}`}
    >
      <Group justify="space-between" mt="xl">
        <Text fz="sm" fw={700} className={`capitalize ${classes.title}`}>
          {ticket.title}
        </Text>
        <Group gap={5}>
          <Text fz="xs" c="dimmed">
            {ticket.status}
          </Text>
          {console.log("this is status: " + status)}
          <RingProgress
            size={28}
            thickness={4}
            sections={[{ value: status, color: "blue" }]}
          />
        </Group>
      </Group>
      <Text className="capitalize" mt="sm" mb="xs" c="dimmed" fz="xs">
        {ticket.description}
      </Text>
      <Text className="capitalize" mb="xs" c="dimmed" fz="xs">
        created at: {formatTimeStamp()}
      </Text>
      <Card.Section className={classes.footer}>{items}</Card.Section>
      <Group className="flex ">
        {/* <Button onClick={()=>DeleteTicket()} className="mx-auto" color="red" variant="filled">Delete</Button> */}
        <TicketDelete id={ticket._id} />
        <Button
          onClick={() => {
            router.push(`/components/ticket/modify?${params.toString()}`);
            // params.set("id", ticket._id);
          }}
          className="mx-auto"
          variant="filled"
        >
          Modify
        </Button>
      </Group>
    </Card>
  );
}
