import './App.css'
import { Icon } from './components/Icon'
import { Tag } from './components/Tag'
import logo from './assets/react.svg'

function App() {
  return (
    <>
      <div>
        <h1>Task 002</h1>
        <h2>Default tag</h2>
        <Tag>content</Tag>
        <h2>Tag with properties</h2>
        <Tag borderRadius="6px" color="orange">
          content
        </Tag>
        <h2>Icon</h2>
        <Icon src={logo} alt="" />
        <h2>Icon inside tag</h2>
        <Tag color="blue">
          <Icon src={logo} alt="" />
          New
        </Tag>
      </div>
    </>
  )
}

export default App
