"use client";
import { useState } from "react";
import { Container, Group, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MantineLogo } from "@mantine/ds";
import classes from "./nav.module.css";
import Link from "next/link";
import { FaTicketAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
const links = [
  { link: "/components/form", label: "Create Ticket" },
  { link: "/pricing", label: "Pricing" },
  { link: "https://www.linkedin.com/in/ashutoshgautam-/", label: "My LinkedIn" },
  { link: "https://github.com/ashug09", label: "My GitHub" },
];

export default function Nav() {
  const router = useRouter()
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);

  const items = links.map((link) => (
    <Link
      key={link.label}
      href={link.link}
      noopener noreferrer
      className={classes.link}
      data-active={active === link.link || undefined}
      // onClick={(event) => {
      //   event.preventDefault();
      //   setActive(link.link);
      // }}
    >
      {link.label}
    </Link>
  ));

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        {/* <MantineLogo size={28} /> */}
        <div className="flex cursor-pointer" onClick={()=>router.push("/")}>
          <FaTicketAlt size={35} color="marine my-auto" />
          <h1 className="mx-1 text-2xl">Tickety</h1>
        </div>
        <Group gap={5} visibleFrom="xs">
          {items}
        </Group>

        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Container>
    </header>
  );
}
