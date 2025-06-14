import ApiKeySetup from "../components/ApiKeySetup";
import PageGenerator from "../components/PageGenerator";

export default function Home() {
  return (
<section className="win95-window max-w-full sm:max-w-5xl mx-auto px-1 sm:px-4 py-2 text-center">
      <div className="welcome-bg mb-8">
  <h2 className="text-3xl font-bold m-0">Welcome to Generative Website</h2>
</div>
      <div className="win95-infobubble mx-auto mb-6">
        <div className="flex items-stretch gap-3">
          {/* Light bulb emoji filling the bubble height */}
          <img
            src="/lightbulb_v2.webp"
            alt="light bulb"
            className="w-[72px] h-[72px] object-contain flex items-center filter brightness-125"
          />
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
