"use client";
import Image from "next/image";
import Nav from "./components/navigation/page";

import Ticket from "./components/ticket/page";
import React, { use } from "react";
export default function Home() {
  React.useEffect(() => {
    getTicket();
  }, []);
  const [data, setData] = React.useState([]);
  const getTicket = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/ticket", {
        method: "GET",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setData(data.ticket);
          console.log(data);
        });

      console.log("this is res: " + res);
    } catch (error) {
      alert(error);
    }
  };

  const uniqueCategories = [...new Set(data.map((item) => item.category))];
  return (
    <div>
      
      <Nav />
      {data &&
        uniqueCategories?.map((uniqueCategory, uniqueIndex) => (
          <div key={uniqueIndex}>
            <h1 className="capitalize mx-12 mt-5 mb-4 text-4xl font-medium">
              {uniqueCategory}
            </h1>
            <div className="lg:grid lg:grid-cols-4 lg:gap-4 md:grid md:grid-cols-2 md:gap-1">
              {data
                .filter((ticket) => ticket.category === uniqueCategory)
                .map((ticket, index) => (
                  <div key={index}>
                    <Ticket key={index} ticket={ticket} />
                  </div>
                ))}
            </div>
          </div>
        ))}
    </div>
  );
}