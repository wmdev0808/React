# Task 001

## Problem:

- Your task is to create a simple login form component in React.

- The form should consist of two fields: one for `username` and one for `password`. Each input should update its `value` attribute on input change.

- The `onSubmit` handler is passed through the props to the component and accepts two parameters: `username` and `password` (in that order).

- When the Submit button is clicked, `onSubmit` handler should be called. Use a button click event handler for this purpose.

- The application uses React 16.13.1.

- Requirements:

  - Create an `input` element for the `username` field. It should have its `id` set to `username-input` and `type` attribute set to `text`.

  - The `username` input should update its `value` attribute on being changed with the entered username.

  - Create an `input` element for the `password` field. It should have its `id` set to `password-input` and `type` attribute set to `password`.

  - The `password` input should update its `value` attribute on being changed with the entered password.

  - Create a Submit button with its `id` set to `login-button`.

  - The Submit button should be disabled(`disabled` attribute set to `true`) until both `username` and `password` fields are filled.

  - The `onSubmit` handler should be called when the Submit button is clicked.

  - The `onSubmit` handler should be called with `username` and `password` passed as parameters.

- The styling and layout of the components is not assessed. Place them within the main `div` in the provided starting code. Wrapping inputs and the Submit button in the `form` element is not needed.

- Make sure the login form component is a default export.

```
import React from "react";

// Use functional or class component based on your preference.
// Make it a default export.

export default function LoginForm({ onSubmit }) {
  return (<div>
    Place your components here
  </div>);
}
```
