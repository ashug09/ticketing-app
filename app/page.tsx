import Image from 'next/image'
import Nav from "../app/components/navigation/page"

import Ticket from "./components/ticket/page"
export default function Home() {
  return (
    <div>
      <Nav />
      <Ticket />
    </div>
  )
}
