import ApiKeySetup from "../components/ApiKeySetup";
import PageGenerator from "../components/PageGenerator";

export default function Home() {
  return (
    <section className="win95-window max-w-5xl mx-auto px-4 py-12 text-center">
      <h2 className="text-3xl font-bold mb-4">Welcome to Generative Website</h2>
      <p className="text-gray-700 mb-4">
        Generative Website leverages OpenAI's ChatGPT to dynamically create HTML
        pages based on your prompts. Use the generator below to craft a new page
        on the fly.
      </p>
      <ApiKeySetup className="mb-8" />
      <PageGenerator />
    </section>
  );
}
