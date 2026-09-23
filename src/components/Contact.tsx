import { useState, type ChangeEvent, type FormEvent } from "react";
import { personalInfo } from "../data/portfolio";
import { MdArrowOutward, MdEmail, MdPhone, MdCheckCircle, MdErrorOutline } from "react-icons/md";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import "./styles/Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const accessKey =
    import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ||
    "5c615fd3-8e55-40da-9303-c9cfa98279d9";

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleMailtoFallback = () => {
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!accessKey) {
      handleMailtoFallback();
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          from_name: "Portfolio Contact Form",
          subject: `New Inquiry from ${formData.name} (Portfolio)`,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
        setErrorMessage(data.message || "Failed to send message. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Could not connect to service.");
    }
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container section-container">
        <div className="contact-layout">
          {/* Left Column: Direct info and invitation */}
          <div className="contact-left">
            <span className="section-eyebrow">CONTACT</span>
            <h2 className="contact-heading">
              Let&apos;s work <span>together.</span>
            </h2>
            <p className="contact-invitation">
              Have a project, opportunity, or collaboration in mind? I&apos;d love to hear from you.
            </p>

            <div className="contact-methods">
              <a
                href={`mailto:${personalInfo.email}`}
                className="contact-method-card"
                data-cursor="disable"
              >
                <div className="method-icon-wrap">
                  <MdEmail />
                </div>
                <div className="method-details">
                  <span className="method-label">Email</span>
                  <span className="method-val">{personalInfo.email}</span>
                </div>
              </a>

              <a
                href={`tel:${personalInfo.phone}`}
                className="contact-method-card"
                data-cursor="disable"
              >
                <div className="method-icon-wrap">
                  <MdPhone />
                </div>
                <div className="method-details">
                  <span className="method-label">Phone</span>
                  <span className="method-val">{personalInfo.phone}</span>
                </div>
              </a>
            </div>

            <div className="contact-social-bar">
              <span className="social-bar-label">Find me on</span>
              <div className="social-bar-links">
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn"
                  aria-label="LinkedIn Profile"
                  data-cursor="disable"
                >
                  <FaLinkedinIn />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn"
                  aria-label="GitHub Profile"
                  data-cursor="disable"
                >
                  <FaGithub />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="contact-right">
            <div className="contact-form-card">
              {status === "success" ? (
                <div className="form-success-state">
                  <div className="success-icon-wrap">
                    <MdCheckCircle />
                  </div>
                  <h3 className="form-title">Message Sent!</h3>
                  <p className="success-desc">
                    Thank you for reaching out. I have received your message and will get back to you shortly.
                  </p>
                  <button
                    type="button"
                    className="contact-submit-btn send-another-btn"
                    onClick={() => setStatus("idle")}
                    data-cursor="disable"
                  >
                    <span>Send Another Message</span>
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="form-title">Send a Message</h3>
                  <form onSubmit={handleSubmit} className="contact-form">
                    <div className="form-group">
                      <label htmlFor="contact-name">Your Name</label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        placeholder="Your name"
                        required
                        disabled={status === "loading"}
                        value={formData.name}
                        onChange={handleChange}
                        autoComplete="name"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="contact-email">Your Email</label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        required
                        disabled={status === "loading"}
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="email"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="contact-message">Message</label>
                      <textarea
                        id="contact-message"
                        name="message"
                        placeholder="Tell me about your project or inquiry..."
                        rows={5}
                        required
                        disabled={status === "loading"}
                        value={formData.message}
                        onChange={handleChange}
                      />
                    </div>

                    {status === "error" && (
                      <div className="form-error-banner">
                        <MdErrorOutline className="error-icon" />
                        <div className="error-content">
                          <span>{errorMessage}</span>
                          <button
                            type="button"
                            onClick={handleMailtoFallback}
                            className="error-mailto-link"
                          >
                            Send via email app instead &rarr;
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="form-footer">
                      <button
                        type="submit"
                        className="contact-submit-btn"
                        disabled={status === "loading"}
                        data-cursor="disable"
                      >
                        <span>{status === "loading" ? "Sending..." : "Send Message"}</span>
                        <MdArrowOutward />
                      </button>
                      <span className="form-note">
                        {accessKey
                          ? "Delivers directly to my inbox."
                          : "Opens your email app to send the message."}
                      </span>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Contact;
