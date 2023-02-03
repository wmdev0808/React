import { FormEvent, useRef } from "react";
import { useFetcher } from "react-router-dom";

import classes from "./NewsletterSignup.module.css";

function NewsletterSignup() {
  const emailEl = useRef<HTMLInputElement>(null);
  const fetcher = useFetcher();

  function signupForNewsletterHandler(event: FormEvent) {
    event.preventDefault();
    const enteredEmail = emailEl.current!.value;
    // could validate input here
    fetcher.submit(
      // better: use fetcher instead of Form
      { email: enteredEmail },
      { method: "post", action: "/newsletter" }
    );
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up for our weekly newsletter</h2>
      <fetcher.Form onSubmit={signupForNewsletterHandler}>
        <input ref={emailEl} id="email" type="email" placeholder="Your email" />
        <button>Submit</button>
      </fetcher.Form>
    </section>
  );
}

export default NewsletterSignup;
