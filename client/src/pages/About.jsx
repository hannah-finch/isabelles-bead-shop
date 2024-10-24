import { useQuery } from "@apollo/client";
import { GET_INFO } from "../utils/queries";

function AboutPage() {
  const { data } = useQuery(GET_INFO);
  const about1Title = data?.info[0].about1Title;
  const about1Text = data?.info[0].about1Text;
  const about2Title = data?.info[0].about2Title;
  const about2Text = data?.info[0].about2Text;

  return (
    <>
      <div className="about-grid">
        <div className="about-text-container">
          <h2>{about1Title}</h2>
          <p>{about1Text}</p>
          <img src="/images/icons/cluster-1.svg"></img>
        </div>
        <div className="img-square-1"></div>
        <div className="img-square-2"></div>
        <div className="about-text-container">
          <img src="/images/icons/cluster-2.svg"></img>
          <h2>{about2Title}</h2>
          <p>{about2Text}</p>
        </div>
      </div>
    </>
  );
}

export default AboutPage;
