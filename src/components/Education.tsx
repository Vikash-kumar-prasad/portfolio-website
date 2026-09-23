import { education, certifications, leadership } from "../data/portfolio";
import { FaGraduationCap, FaCertificate, FaUsers } from "react-icons/fa6";
import "./styles/Education.css";

const Education = () => {
  return (
    <section className="education-section" id="education">
      <div className="section-container">
        <div className="education-header">
          <span className="section-eyebrow">ACADEMICS &amp; COMMUNITY</span>
          <h2>
            Education &amp; <span>Leadership</span>
          </h2>
        </div>

        <div className="education-grid">
          <div className="card education-card">
            <h3>
              <FaGraduationCap className="icon" /> Education
            </h3>
            <div className="card-content">
              <h4>{education.degree}</h4>
              <p className="institution">{education.institution}</p>
              <span className="duration">{education.duration}</span>
            </div>
          </div>

          <div className="card leadership-card">
            <h3>
              <FaUsers className="icon" /> Leadership
            </h3>
            <div className="card-content">
              <h4>{leadership.role}</h4>
              <p className="organization">
                {leadership.organization} &bull; {leadership.organizationType}
              </p>
              <p className="description">{leadership.description}</p>
            </div>
          </div>

          <div className="card certifications-card">
            <h3>
              <FaCertificate className="icon" /> Certifications
            </h3>
            <ul className="cert-list">
              {certifications.map((cert, index) => (
                <li key={index}>
                  <FaCertificate className="list-icon" />
                  <div>
                    <span className="cert-title">{cert.title}</span>
                    <span className="cert-issuer">{cert.issuer}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
