export default function About() {
  // Re-use the same retro Win95 icons as the new TOS page
  const floppyIcon =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAB8ElEQVRYhdWXsYrbQBRFjxbDdhJ4qywi9eLWnStXAZX5FTcCfcCAv2DbDaTIH/gLLLzFdi42uLAJwTCGFWi6LYLTeJyRNGOt1xOF3OYh6WnunTvvaTQBgBBiTw3ZzU391kUQLy/V8bMsAOilabqfTCas1+tKwubuzquAz8/PADw+PrHd/gDYA8GVTpBSIqVktVohpWR4uO8r6nHruDIvlFKEYYhSyiv5ECrjOgXopDAMvQvI85zlcqnttwswHRgCT4eXfUSALMvIsuzfOKCRpillWR6vey4HvuMXt7cfeXj4ClBZhooA04FPr69eBXwD+v2QoqgWotOBL9fXXgV8sJA3BPxVBwp1ngNLzw7YyKGlC3T7+IjFwYE6TnaBz2/B9r9z4Nf9fSP5EvTj+LwuiOPYuYGcQmFUuyuacO4FXZA3BNTJdS34IrfVgBcH3kp+Vg2YcT6fv9kJE0mSsNn8PCnC2QUmeRRFrWTmFqvJB4MBSqnLHDBR/5kQQjgFjcdjdrtd6zK0OlCfoRCCsixJkoQ8z4/PoihquAD47wJNZkKT25bKexfYZtqpA1qETVQnDsCfejBn/F4HzuoCgNFoVCE1RdlEaFIbOUAviiIWi8Wxol2YTqekacpsNnPm2ByoH0TqecEhNk7HHSBoT+kAvwFQQf99MahzHwAAAABJRU5ErkJggg==";
  const bulletIcon = "/retro_check_mark.webp";

  return (
    <section className="win95-window max-w-5xl mx-auto px-4 py-12 space-y-4">
      {/* Header */}
      <div className="flex items-center mb-4">
        <img src={floppyIcon} alt="Floppy" className="w-6 h-6 mr-2" />
        <h2 className="text-3xl font-bold">About Us</h2>
      </div>

      {/* Intro */}
      <p className="text-gray-700">
        Generative Website is an experimental project demonstrating how OpenAI’s
        ChatGPT can create fully-featured HTML pages from a single prompt. Built
        with Vite, React and Tailwind CSS, and packaged with Docker, it shows
        how AI can streamline web development workflows.
      </p>

      {/* Feature list styled like the new TOS page */}
      <ul className="text-gray-700 space-y-1">
        <li className="flex items-start">
          <img src={bulletIcon} alt="✓" className="w-5 h-5 mr-2" />
          <span>Dynamic page generation driven by your prompts</span>
        </li>
        <li className="flex items-start">
          <img src={bulletIcon} alt="✓" className="w-5 h-5 mr-2" />
          <span>Seamless OpenAI ChatGPT integration</span>
        </li>
        <li className="flex items-start">
          <img src={bulletIcon} alt="✓" className="w-5 h-5 mr-2" />
          <span>Sleek retro interface styled with Tailwind</span>
        </li>
        <li className="flex items-start">
          <img src={bulletIcon} alt="✓" className="w-5 h-5 mr-2" />
          <span>Dockerized for effortless setup & deployment</span>
        </li>
      </ul>

      {/* OK button */}
      <div className="text-right mt-6">
        <button className="win95-button px-6">OK</button>
      </div>
    </section>
  );
}
