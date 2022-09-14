import { MongoClient } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

import Meetup from "../../models/meetup";

// /api/new-meetup
// POST /api/new-meetup

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const data = req.body as Meetup;

    const client = await MongoClient.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/meetups?retryWrites=true&w=majority`
    );
    const db = client.db();

    const meetupsCollection = db.collection<Meetup>("meetups");

    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ message: "Meetup inserted!" });
  }
}

export default handler;
