import { ReactNode } from "react";

import classes from "./Section.module.css";

interface SectionProps {
  children?: ReactNode;
}

function Section(props: SectionProps) {
  return <section className={classes.section}>{props.children}</section>;
}

export default Section;
