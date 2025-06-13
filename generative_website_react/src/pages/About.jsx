export default function About() {
  return (
    <section className="win95-window max-w-5xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-4">About Us</h2>
      <p className="text-gray-700 mb-4">
        Generative Website is an innovative project that leverages OpenAI's
        ChatGPT to dynamically create HTML pages. Built with Vite, React and
        Tailwind CSS, it demonstrates how AI can craft complete web pages from a
        single prompt.
      </p>
      <ul className="list-disc list-inside text-gray-700 space-y-1">
        <li>Dynamic page generation based on your prompts</li>
        <li>OpenAI ChatGPT integration</li>
        <li>Modern interface styled with Tailwind</li>
        <li>Dockerized for easy setup</li>
      </ul>
    </section>
  );
}
