import confetti from "canvas-confetti";

export default function About() {
  // Re-use the same retro Win95 icons as the new TOS page
  const floppyIcon =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAB8ElEQVRYhdWXsYrbQBRFjxbDdhJ4qywi9eLWnStXAZX5FTcCfcCAv2DbDaTIH/gLLLzFdi42uLAJwTCGFWi6LYLTeJyRNGOt1xOF3OYh6WnunTvvaTQBgBBiTw3ZzU391kUQLy/V8bMsAOilabqfTCas1+tKwubuzquAz8/PADw+PrHd/gDYA8GVTpBSIqVktVohpWR4uO8r6nHruDIvlFKEYYhSyiv5ECrjOgXopDAMvQvI85zlcqnttwswHRgCT4eXfUSALMvIsuzfOKCRpillWR6vey4HvuMXt7cfeXj4ClBZhooA04FPr69eBXwD+v2QoqgWotOBL9fXXgV8sJA3BPxVBwp1ngNLzw7YyKGlC3T7+IjFwYE6TnaBz2/B9r9z4Nf9fSP5EvTj+LwuiOPYuYGcQmFUuyuacO4FXZA3BNTJdS34IrfVgBcH3kp+Vg2YcT6fv9kJE0mSsNn8PCnC2QUmeRRFrWTmFqvJB4MBSqnLHDBR/5kQQjgFjcdjdrtd6zK0OlCfoRCCsixJkoQ8z4/PoihquAD47wJNZkKT25bKexfYZtqpA1qETVQnDsCfejBn/F4HzuoCgNFoVCE1RdlEaFIbOUAviiIWi8Wxol2YTqekacpsNnPm2ByoH0TqecEhNk7HHSBoT+kAvwFQQf99MahzHwAAAABJRU5ErkJggg==";
  const bulletIcon = "/retro_check_mark.webp";

  return (
<section className="win95-window max-w-full sm:max-w-5xl mx-auto px-1 sm:px-4 py-12 space-y-4">
      {/* Header */}
      <div className="flex items-center mb-4">
        <img src={floppyIcon} alt="Floppy" className="w-6 h-6 mr-2" />
        <h2 className="text-3xl font-bold">About Generative Website</h2>
      </div>

      {/* Expanded Intro */}
      <p className="text-gray-700">
        <strong>Generative Website</strong> is an open project that lets you explore and create on the web in new ways. Using artificial intelligence, especially large language models, we generate web experiences in real time based on your input. Here, you can interact with a "dead internet" where content is made just for you and disappears when you leave.
      </p>
      <p className="text-gray-700">
        Powered by <strong>gpt4.1-nano</strong>, a fast and affordable model tuned for HTML and markup, this platform shows how AI can quickly build full web pages from a single prompt. Built with Vite, React, and Tailwind CSS, and packaged with Docker, Generative Website makes web development faster and more approachable for everyone.
      </p>

      {/* Feature list styled like the new TOS page */}
      <ul className="text-gray-700 space-y-1">
        <li className="flex items-start">
          <img src={bulletIcon} alt="✓" className="w-5 h-5 mr-2" />
          <span>
            <strong>Dynamic page generation:</strong> Create unique web pages from your prompts. Each session is different.
          </span>
        </li>
        <li className="flex items-start">
          <img src={bulletIcon} alt="✓" className="w-5 h-5 mr-2" />
          <span>
            <strong>OpenAI ChatGPT integration:</strong> Use the power of language models to generate not just text, but the structure of your web experience.
          </span>
        </li>
        <li className="flex items-start">
          <img src={bulletIcon} alt="✓" className="w-5 h-5 mr-2" />
          <span>
            <strong>Retro interface:</strong> The UI is inspired by Windows 95, styled with modern Tailwind CSS for a crisp, responsive feel.
          </span>
        </li>
        <li className="flex items-start">
          <img src={bulletIcon} alt="✓" className="w-5 h-5 mr-2" />
          <span>
            <strong>Dockerized deployment:</strong> Set up and deploy the project anywhere, from your laptop to the cloud, with a single command.
          </span>
        </li>
        <li className="flex items-start">
          <img src={bulletIcon} alt="✓" className="w-5 h-5 mr-2" />
          <span>
            <strong>Invisible tokens, visible impact:</strong> gpt4.1-nano is tuned for generating the "invisible" tokens (HTML tags and markup) that power the web, making it fast and affordable for large-scale generative applications.
          </span>
        </li>
        <li className="flex items-start">
          <img src={bulletIcon} alt="✓" className="w-5 h-5 mr-2" />
          <span>
            <strong>Latent space browsing:</strong> Try the "dead internet", a generative, ephemeral web where every page is created just for you, in the moment, and disappears when you leave.
          </span>
        </li>
      </ul>

      {/* Vision Statement */}
      <div className="mt-6 p-4 bg-gray-100 rounded shadow-inner">
        <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
        <p className="text-gray-700">
          We think the future of the web is generative, not static. As language models get faster and more affordable, the line between user and creator will blur. The web will become a living, changing space where every experience is unique and personal. Generative Website is our way of exploring this idea, and we invite you to try it and help shape what comes next.
        </p>
      </div>

      {/* OK button */}
      <div className="text-right mt-6">
        <button className="win95-button px-6" onClick={() => confetti({ particleCount: 80, spread: 70 })}>
          OK
        </button>
      </div>
    </section>
  );
}
