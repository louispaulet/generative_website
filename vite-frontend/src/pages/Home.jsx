import Generator from '../components/Generator'

function Home() {
  return (
    <div style={{ padding: '1rem' }}>
      <h2>Welcome to the Generative Website Demo</h2>
      <p>
        Describe any webpage idea and our backend will craft an HTML page for you
        on the fly. Enter a short description below to see it in action.
      </p>
      <Generator />
    </div>
  )
}

export default Home
