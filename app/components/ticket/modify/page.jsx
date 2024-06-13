"use client";
import {
  Button,
  Group,
  Loader,
  Radio,
  Select,
  SimpleGrid,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Modify() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = useState();
  useEffect(() => {
    getTicketWithId(id);
  }, []);
  const getTicketWithId = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/getTicketWithId/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setData(data.data);
          form.values.title = data.data.title;
          form.values.description = data.data.description;
          form.values.category = data.data.category;
          form.values.status = data.data.status;
          form.values.priority = data.data.priority;
          form.values.active = data.data.active;
          console.log(data);
          setLoading(false);
        });

      console.log("this is res: " + res);
    } catch (error) {
      alert(error);
    }
  };
  const modifyTicket = async (id) => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:3000/api/getTicketWithId/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: form.values.title,
          description: form.values.description,
          category: form.values.category,
          status: form.values.status,
          priority: form.values.priority,
          active: form.values.active,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setLoading(false);
          toast.success("Ticket modified");
          router.push("/");
        });
    } catch (error) {
      alert(error);
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
      // priority: (value) =>
      //   value.trim().length > 0 ? null : "Priority should not be empty",
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
              modifyTicket(data._id);
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
                Update Ticket
              </Button>
            </Group>
          </form>
        )}
      </div>
    </>
  );
}
