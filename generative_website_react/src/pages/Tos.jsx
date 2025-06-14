export default function Tos() {
  const floppyIcon =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAB8ElEQVRYhdWXsYrbQBRFjxbDdhJ4qywi9eLWnStXAZX5FTcCfcCAv2DbDaTIH/gLLLzFdi42uLAJwTCGFWi6LYLTeJyRNGOt1xOF3OYh6WnunTvvaTQBgBBiTw3ZzU391kUQLy/V8bMsAOilabqfTCas1+tKwubuzquAz8/PADw+PrHd/gDYA8GVTpBSIqVktVohpWR4uO8r6nHruDIvlFKEYYhSyiv5ECrjOgXopDAMvQvI85zlcqnttwswHRgCT4eXfUSALMvIsuzfOKCRpillWR6vey4HvuMXt7cfeXj4ClBZhooA04FPr69eBXwD+v2QoqgWotOBL9fXXgV8sJA3BPxVBwp1ngNLzw7YyKGlC3T7+IjFwYE6TnaBz2/B9r9z4Nf9fSP5EvTj+LwuiOPYuYGcQmFUuyuacO4FXZA3BNTJdS34IrfVgBcH3kp+Vg2YcT6fv9kJE0mSsNn8PCnC2QUmeRRFrWTmFqvJB4MBSqnLHDBR/5kQQjgFjcdjdrtd6zK0OlCfoRCCsixJkoQ8z4/PoihquAD47wJNZkKT25bKexfYZtqpA1qETVQnDsCfejBn/F4HzuoCgNFoVCE1RdlEaFIbOUAviiIWi8Wxol2YTqekacpsNnPm2ByoH0TqecEhNk7HHSBoT+kAvwFQQf99MahzHwAAAABJRU5ErkJggg==";
  const warnIcon = "/retro_warning_sign.webp";

  return (
    <section className="win95-window max-w-5xl mx-auto px-4 py-12 space-y-4">
      <div className="flex items-center mb-4">
        <img src={floppyIcon} alt="Floppy" className="w-6 h-6 mr-2" />
        <h2 className="text-3xl font-bold">Terms of Service</h2>
      </div>
      <p className="text-gray-700 mb-2">
        By using this site, you agree to the following terms and conditions.
      </p>
      <ul className="text-gray-700 space-y-1">
        <li className="flex items-start">
          <img src={warnIcon} alt="!" className="w-8 h-8 mr-2" />
          <span>This is a demo site intended for educational purposes only.</span>
        </li>
        <li className="flex items-start">
          <img src={warnIcon} alt="!" className="w-8 h-8 mr-2" />
          <span>No personal data is collected or stored.</span>
        </li>
        <li className="flex items-start">
          <img src={warnIcon} alt="!" className="w-8 h-8 mr-2" />
          <span>All content is provided “as-is” without warranty of any kind.</span>
        </li>
        <li className="flex items-start">
          <img src={warnIcon} alt="!" className="w-8 h-8 mr-2" />
          <span>
            We reserve the right to update these terms at any time without
            notice.
          </span>
        </li>
      </ul>
      <div className="text-right mt-6">
        <button className="win95-button px-6">OK</button>
      </div>
    </section>
  );
}
