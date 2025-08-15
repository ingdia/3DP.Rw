// pages/index.tsx
import type { NextPage } from "next";
import Head from "next/head";
import Hero from "@/app/components/Hero";
import Services from "@/app/components/Service";
import DataStand from "@/app/components/DataStand";
import Help from "@/app/components/Help";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Your Company | Professional Web Services</title>
        <meta
          name="description"
          content="A professional webpage with hero, services, and more."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {/* Each section is neatly separated */}
        <section>
          <Hero />
        </section>

        <section>
          <Services />
        </section>

        <section>
          <DataStand />
        </section>

        <section>
          <Help />
        </section>
      </main>
    </div>
  );
};

export default Home;
