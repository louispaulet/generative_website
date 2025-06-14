export default function Tos() {
  const floppyIcon =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAB8ElEQVRYhdWXsYrbQBRFjxbDdhJ4qywi9eLWnStXAZX5FTcCfcCAv2DbDaTIH/gLLLzFdi42uLAJwTCGFWi6LYLTeJyRNGOt1xOF3OYh6WnunTvvaTQBgBBiTw3ZzU391kUQLy/V8bMsAOilabqfTCas1+tKwubuzquAz8/PADw+PrHd/gDYA8GVTpBSIqVktVohpWR4uO8r6nHruDIvlFKEYYhSyiv5ECrjOgXopDAMvQvI85zlcqnttwswHRgCT4eXfUSALMvIsuzfOKCRpillWR6vey4HvuMXt7cfeXj4ClBZhooA04FPr69eBXwD+v2QoqgWotOBL9fXXgV8sJA3BPxVBwp1ngNLzw7YyKGlC3T7+IjFwYE6TnaBz2/B9r9z4Nf9fSP5EvTj+LwuiOPYuYGcQmFUuyuacO4FXZA3BNTJdS34IrfVgBcH3kp+Vg2YcT6fv9kJE0mSsNn8PCnC2QUmeRRFrWTmFqvJB4MBSqnLHDBR/5kQQjgFjcdjdrtd6zK0OlCfoRCCsixJkoQ8z4/PoihquAD47wJNZkKT25bKexfYZtqpA1qETVQnDsCfejBn/F4HzuoCgNFoVCE1RdlEaFIbOUAviiIWi8Wxol2YTqekacpsNnPm2ByoH0TqecEhNk7HHSBoT+kAvwFQQf99MahzHwAAAABJRU5ErkJggg==";
  const warnIcon = "/retro_warning_sign.webp";

  return (
<section className="win95-window max-w-full sm:max-w-5xl mx-auto px-1 sm:px-4 py-12 space-y-4">
      <div className="flex items-center mb-4">
        <img src={floppyIcon} alt="Floppy" className="w-6 h-6 mr-2" />
        <h2 className="text-3xl font-bold">Terms of Service</h2>
      </div>
      <p className="text-gray-700 mb-2">
        Welcome to Generative Website. By using this site, you agree to the following terms and conditions, which are designed to foster a safe, transparent, and innovative environment for exploring the generative web and the latent space of the "dead internet."
      </p>
      <ul className="text-gray-700 space-y-1">
        <li className="flex items-start">
          <img src={warnIcon} alt="!" className="w-8 h-8 mr-2" />
          <span>
            <strong>Experimental Platform:</strong> This is a demonstration site intended for educational and experimental purposes only. The content you see is generated in real time by AI and may not persist or be recoverable after your session ends.
          </span>
        </li>
        <li className="flex items-start">
          <img src={warnIcon} alt="!" className="w-8 h-8 mr-2" />
          <span>
            <strong>No Personal Data Collection:</strong> We do not collect, store, or share any personal data. All prompts and generated content are processed in-memory and are not retained after your session.
          </span>
        </li>
        <li className="flex items-start">
          <img src={warnIcon} alt="!" className="w-8 h-8 mr-2" />
          <span>
            <strong>Content Disclaimer:</strong> All content is provided “as-is” without warranty of any kind. Because the site leverages gpt4.1-nano and other LLMs to generate HTML, CSS, and text, results may be unpredictable, ephemeral, or even nonsensical. Use at your own risk.
          </span>
        </li>
        <li className="flex items-start">
          <img src={warnIcon} alt="!" className="w-8 h-8 mr-2" />
          <span>
            <strong>Generative Latent Space:</strong> The web pages you experience here are conjured in a latent space—sometimes called the "dead internet"—and are not part of the traditional, static web. They exist only for you, in the moment, and are not indexed or archived.
          </span>
        </li>
        <li className="flex items-start">
          <img src={warnIcon} alt="!" className="w-8 h-8 mr-2" />
          <span>
            <strong>LLM Speed and Cost:</strong> We use gpt4.1-nano for its speed and affordability, especially for generating invisible tokens (HTML tags and markup). This allows us to offer a responsive, low-cost generative experience, but also means that content is transient and may not be perfect.
          </span>
        </li>
        <li className="flex items-start">
          <img src={warnIcon} alt="!" className="w-8 h-8 mr-2" />
          <span>
            <strong>Updates and Changes:</strong> We reserve the right to update these terms, the platform, or the underlying technology at any time without notice. Please check back regularly for the latest information.
          </span>
        </li>
      </ul>
      <div className="mt-6 p-4 bg-gray-100 rounded shadow-inner">
        <h3 className="text-xl font-semibold mb-2">A Note on Generative Browsing</h3>
        <p className="text-gray-700">
          Generative Website is a living experiment in what the web can become when powered by AI. By using this site, you acknowledge that you are participating in a new kind of browsing—one that is generative, ephemeral, and exists in a latent space beyond the traditional internet. We encourage you to explore, create, and imagine the possibilities, but please do so responsibly and with an understanding of the limitations and risks inherent in generative AI.
        </p>
      </div>
      <div className="text-right mt-6">
        <button className="win95-button px-6">OK</button>
      </div>
    </section>
  );
}
