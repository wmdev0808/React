import { ChangeEvent, useState } from 'react'
import styles from './LoginForm.module.css'

export interface LoginFromProps {
  onSubmit: (username: string, password: string) => void
}

function LoginForm({ onSubmit }: LoginFromProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  function changeHandler(updater: typeof setUsername | typeof setPassword) {
    return function (event: ChangeEvent<HTMLInputElement>) {
      updater(event.target.value)
    }
  }

  function submitHandler() {
    onSubmit(username, password)
  }

  return (
    <div className={styles.container}>
      <input
        className={styles.control}
        type="text"
        id="username-input"
        value={username}
        onChange={changeHandler(setUsername)}
      />
      <input
        className={styles.control}
        type="password"
        id="password-input"
        value={password}
        onChange={changeHandler(setPassword)}
      />

      <button type="submit" onClick={submitHandler}>
        Submit
      </button>
    </div>
  )
}

export default LoginForm
