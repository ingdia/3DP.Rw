import React from 'react'
import { Navbar } from "@/app/components/Navbar"
import Hero from "@/app/components/Hero"
import { Footer } from './components/Footer'
import Service from './components/Service'
import DataStand from './components/DataStand'
import Help from './components/Help'
function page() {
  return (
    <div>
      {/* <Navbar/> */}
      <Hero/>
      <Service/>
      <DataStand/>
      <Help/>
      {/* <Footer/> */}
    </div>
  )
}

export default page
