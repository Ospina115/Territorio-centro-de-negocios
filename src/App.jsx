import Navbar from './components/navbar/Navbar'
import Hero from './components/home/Hero'
import './App.css'

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
      </main>
    </div>
  )
}

export default App
