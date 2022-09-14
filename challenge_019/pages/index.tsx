import { Fragment } from "react";
import { NextPage, GetStaticProps } from "next";
import Head from "next/head";
import { MongoClient, WithId } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";
import { MeetupSingle } from "../components/meetups/MeetupItem";
import Meetup from "../models/meetup";

interface HomePageProps {
  meetups: MeetupSingle[];
}

function HomePage(props: HomePageProps) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

export async function getStaticProps() {
  // fetch data from an API
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/meetups?retryWrites=true&w=majority`
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = (await meetupsCollection
    .find()
    .toArray()) as WithId<Meetup>[];

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
