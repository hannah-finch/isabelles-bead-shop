function AboutPage() {
  /* enhancement request: get this information from the database
  Any time you have data subject to change you want to make it easy to do that.
  Changing code requires an enormous amount of technical energy more than creating
  a CRUD functionality for it especially since you already have the database in 
  your overall architecture
  */
  return (
    <>
      <div className="about-grid">
        <div className="about-text-container">
          <h2>About Me</h2>
          <p>
            My name is Isabelle. I have 12 pets and 1 sister. My sister&apos;s name is Kaylee and my 12 pets are Gemma (dog), Riley (dog), Oats (hamster), 3 snails (no names yet), and 6 chickens (King, Lady, Peanut, Shadow, Queen, and Karen). I love making jewelry, painting, and sewing.
          </p>
          <img src="/images/icons/cluster-1.svg"></img>
        </div>
        <div className="img-square-1"></div>
        <div className="img-square-2"></div>
        <div className="about-text-container">
          <img src="/images/icons/cluster-2.svg"></img>
          <h2>How I Got Started</h2>
          <p>
          I have always loved making jewelry, but I don&apos;t really like to wear it. So I just had a bunch of jewelry and didn&apos;t know what to do with it. One day I had an idea, and that idea was to give it to people, and then my mom said that I should sell it. So I decided to sell it to people, but not penguins.
          </p>
        </div>
      </div>
    </>
  );
}

export default AboutPage;
