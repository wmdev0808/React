import { Fragment } from "react";
import Head from "next/head";
import { GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { MongoClient, ObjectId, WithId } from "mongodb";

import MeetupDetail from "../../components/meetups/MeetupDetail";
import Meetup from "../../models/meetup";

interface MeetupData {
  id: string;
  title: string;
  image: string;
  address: string;
  description: string;
}

interface MeetupDetailsProps {
  meetupData: MeetupData;
}

interface Params extends ParsedUrlQuery {
  meetupId: string;
}

function MeetupDetails(props: MeetupDetailsProps) {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/meetups?retryWrites=true&w=majority`
  );

  const db = client.db();

  const meetupsCollection = db.collection<Meetup>("meetups");

  const meetups = (await meetupsCollection
    .find({})
    .project({ _id: 1 })
    .toArray()) as WithId<Meetup>[];

  client.close();

  return {
    fallback: "blocking",
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export const getStaticProps: GetStaticProps<
  MeetupDetailsProps,
  Params
> = async (context) => {
  // fetch data for a single meetup

  const meetupId = context.params!.meetupId;

  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/meetups?retryWrites=true&w=majority`
  );
  const db = client.db();

  const meetupsCollection = db.collection<Meetup>("meetups");

  const selectedMeetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId),
  });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup!._id.toString(),
        title: selectedMeetup!.title,
        address: selectedMeetup!.address,
        image: selectedMeetup!.image,
        description: selectedMeetup!.description,
      },
    },
  };
};

export default MeetupDetails;
