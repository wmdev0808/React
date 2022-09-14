import MeetupItem, { MeetupSingle } from "./MeetupItem";
import classes from "./MeetupList.module.css";

interface MeetupListProps {
  meetups: MeetupSingle[];
}

function MeetupList(props: MeetupListProps) {
  return (
    <ul className={classes.list}>
      {props.meetups.map((meetup) => (
        <MeetupItem
          key={meetup.id}
          id={meetup.id}
          image={meetup.image}
          title={meetup.title}
          address={meetup.address}
        />
      ))}
    </ul>
  );
}

export default MeetupList;
