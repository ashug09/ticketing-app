"use client";
import {
  TextInput,
  Textarea,
  SimpleGrid,
  Group,
  Title,
  Button,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { NativeSelect } from "@mantine/core";
import { Radio } from "@mantine/core";
import { Loader } from "@mantine/core";
import { Select } from "@mantine/core";
import React from "react";


export default function TicketForm() {
  const [loading, setLoading] = React.useState(false);
  const ticketCreate = async () => {
    console.log("this is form: " + JSON.stringify(form.values));
    setLoading(true);
    const res = await fetch("/api/ticket", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: form.values.title,
        description: form.values.description,
        category: form.values.category,
        status: form.values.status,
        progress: 0,
        priority: form.values.priority,
        active: true,
      }),
    });

    if (res.status === 201) {
      alert("Ticket created");
      setLoading(false);
      // form.reset();
    } else {
      alert("Ticket not created");
    }
  };
  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      category: "",
      status: "",
      priority: "",
      active: "",
    },
    validate: {
      title: (value) =>
        value.trim().length > 0 ? null : "Title should not be empty",
      description: (value) =>
        value.trim().length > 0 ? null : "Description should not be empty",
      priority: (value) =>
        value.trim().length > 0 ? null : "Priority should not be empty",
      category: (value) =>
        value.trim().length > 0 ? null : "Category should not be empty",
      status: (value) =>
        value.trim().length > 0 ? null : "Status should not be empty",
    },
  });

  return (
    <>
      <div className="relative">
        {loading ? (
          <div className="absolute z-50  bg-white h-screen w-screen">
            <Loader
              className="mx-auto absolute top-[50%]  h-screen w-screen"
              color="blue"
              type="dots"
            />
          </div>
        ) : (
          <form
            className=" lg:mx-20 md:mx-15 min-[120px]:mx-10 my-5"
            onSubmit={form.onSubmit(() => {
              {
                loading ? (
                  <Loader
                    className="z-50 h-screen w-screen"
                    color="blue"
                    type="dots"
                  />
                ) : (
                  <Loader
                    className="z-50 h-screen w-screen"
                    color="blue"
                    type="dots"
                  />
                );
              }
              ticketCreate();
              console.log(
                form.values.title,
                form.values.description,
                form.values.category,
                form.values.status,
                form.values.priority
              );
              console.log("loading state: " + loading);
            })}
          >
            <Title
              order={2}
              size="h1"
              style={{ fontFamily: "Greycliff CF, var(--mantine-font-family)" }}
              fw={900}
              ta="center"
            >
              Create Your Ticket
            </Title>

            <SimpleGrid cols={{ base: 1, sm: 2 }} mt="xl">
              <TextInput
                label="Title"
                placeholder="Your title"
                name="title"
                variant="filled"
                withAsterisk
                {...form.getInputProps("title")}
              />
              <TextInput
                label="Description"
                placeholder="Your description"
                name="description"
                variant="filled"
                withAsterisk
                {...form.getInputProps("description")}
              />
            </SimpleGrid>
            <Select
              label="Category"
              mt="md"
              name="category"
              variant="filled"
              withAsterisk
              data={["Order Status", "Refund Status", "Cancellation", "Other"]}
              {...form.getInputProps("category", { type: "select" })}
            />

            <Radio.Group
              name="priority"
              label="Priority"
              withAsterisk
              {...form.getInputProps("priority")}
            >
              <Group mt="xs">
                <Radio value="1" label="1" />
                <Radio value="2" label="2" />
                <Radio value="3" label="3" />
                <Radio value="4" label="4" />
                <Radio value="5" label="5" />
              </Group>
            </Radio.Group>

            <Select
              label="Status"
              mt="md"
              name="status"
              variant="filled"
              withAsterisk
              data={["Initiated", "Processing", "Completed"]}
              {...form.getInputProps("status", { type: "select" })}
            />

            <Group justify="center" mt="xl">
              <Button type="submit" size="md">
                Send message
              </Button>
            </Group>
          </form>
        )}
      </div>
    </>
  );
}
