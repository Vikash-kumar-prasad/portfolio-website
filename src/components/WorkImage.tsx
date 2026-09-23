import { MdArrowOutward } from "react-icons/md";
import "./styles/Work.css";

interface WorkImageProps {
  image: string;
  alt?: string;
  link?: string;
}

const WorkImage = ({ image, alt = "Project Image", link }: WorkImageProps) => {
  const content = (
    <div className="work-image-container">
      <img src={image} alt={alt} className="work-image" />
      {link && (
        <div className="work-image-overlay">
          <MdArrowOutward className="overlay-icon" />
        </div>
      )}
    </div>
  );

  if (link) {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="work-image-wrapper"
        data-cursor="disable"
      >
        {content}
      </a>
    );
  }

  return <div className="work-image-wrapper no-link">{content}</div>;
};

export default WorkImage;
