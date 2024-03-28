import "./ProfileCard.css";

const devSkills = [
  {
    skill: "Html+Css",
    level: "advanced",
    color: "#607274",
  },
  {
    skill: "React",
    level: "beginer",
    color: "#FAEED1",
  },
  {
    skill: "Git And GitHub",
    level: "intermedia",
    color: "#DAC0A3",
  },
  {
    skill: "Web Design",
    level: "advanced",
    color: "#B2A59B",
  },
  {
    skill: "Sass",
    level: "beginer",
    color: "#ADC4CE",
  },
];

export default function App() {
  return (
    <div className="card">
      <Avatar />
      <Data />
      <Skilllist />
    </div>
  );
}

function Avatar() {
  return (
    <img
      className="avatar"
      src={"./pexels-realtoughcandycom-11035471.jpg"}
      alt={"react"}
    />
  );
}

function Data() {
  return (
    <div className="data">
      <h1>Edvinas Albužis</h1>
      <p>
        Web Development Student📚 | Seeking Full-Time Web Developer Job🚀 |
        HTML, CSS, JS, REACT💼 | Graduation 04 2024.
      </p>
    </div>
  );
}

function Skilllist() {
  return (
    <ul className="skill-list">
      {devSkills.map((skills) => (
        <Skill
          skill={skills.skill}
          color={skills.color}
          level={skills.level}
          key={skills.color}
        />
      ))}
    </ul>
    // <div className="skill-list">
    //   <Skill skill="React" color="#607274" />
    //   <Skill skill="Html+Css" color="#FAEED1" />
    //   <Skill skill="Web Design" color="#B2A59B" />
    //   <Skill skill="Git And GitHub" color="#DAC0A3" />
    //   <Skill skill="Sass" color="#ADC4CE" />
    // </div>
  );
}

function Skill({ skill, color, level }) {
  return (
    <li className="skill" style={{ backgroundColor: color }}>
      <span>
        {skill}
        {level === "beginer" && "👶"}
        {level === "advanced" && "👍"}
        {level === "intermedia" && "💪"}
      </span>
    </li>
  );
}
