import { ObjectId } from "mongodb";

export default class Meetup {
  constructor(
    public title: string,
    public image: string,
    public address: string,
    public description: string,
    public id?: string
  ) {}
}
