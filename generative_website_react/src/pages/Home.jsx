import ApiKeySetup from "../components/ApiKeySetup";
import PageGenerator from "../components/PageGenerator";

export default function Home() {
  return (
    <section className="win95-window max-w-5xl mx-auto px-4 py-12 text-center">
      <h2 className="text-3xl font-bold mb-4">Welcome to Generative Website</h2>
      <div className="win95-infobubble mx-auto mb-6">
        <div className="flex items-stretch gap-3">
          {/* Light bulb emoji filling the bubble height */}
          <span
            role="img"
            aria-label="light bulb"
            className="text-6xl leading-none flex items-center"
          >
            💡
          </span>
          <p className="text-gray-700">
            Generative Website leverages OpenAI's ChatGPT to dynamically
            create HTML pages based on your prompts. Use the generator below to
            craft a new page on the fly.
          </p>
        </div>
      </div>
      <ApiKeySetup className="mb-8" />
      <PageGenerator />
    </section>
  );
}
