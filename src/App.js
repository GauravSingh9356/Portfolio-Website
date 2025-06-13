import React, { useEffect, useState } from "react";

import Header from "./Components/Header";
import Footer from "./Components/Footer";
import About from "./Components/About";
import Resume from "./Components/Resume";
import Portfolio from "./Components/Portfolio";

import Contact from "./Components/Contact";
import Particles from "react-tsparticles";

import "./App.css";
import TerminalUI from "./Components/Terminal";

const App = () => {
  const particlesInit = (main) => {
    console.log(main);

    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
  };

  const particlesLoaded = (container) => {
    console.log(container);
  };
  const [resumeData, setResumeData] = useState({});

  useEffect(() => {
    fetch("/resumeData.json")
      .then((res) => res.json())
      .then((data) => {
        setResumeData(data);
      });
  }, []);

  return (
    <div style={{ background: "#0b73a8" }}>
      {/* <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          fpsLimit: 60,
          interactivity: {
            events: {
              resize: true,
            },
            modes: {
              bubble: {
                distance: 2000,
                duration: 2,
                opacity: 0.8,
                size: 40,
              },

              repulse: {
                distance: 1000,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#ffffff",
            },

            collisions: {
              enable: true,
            },
            move: {
              direction: "none",
              enable: true,
              outMode: "bounce",
              random: false,
              speed: 2.5,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 1000,
              },
              value: 10,
            },
            opacity: {
              value: 0.8,
            },
            // shape: {
            //   type: ["image"],
            //   image: [
            //     {
            //       src: "img/react.svg",
            //       height: 20,
            //       width: 20,
            //     },
            //     {
            //       src: "img/js.svg",
            //       height: 20,
            //       width: 20,
            //     },
            //     {
            //       src: "img/nodejs.svg",
            //       height: 20,
            //       width: 20,
            //     },
            //     {
            //       src: "img/mongodb.svg",
            //       height: 20,
            //       width: 20,
            //     },
            //     {
            //       src: "img/cloud.svg",
            //       height: 20,
            //       width: 20,
            //     },
            //     {
            //       src: "img/c++.svg",
            //       height: 20,
            //       width: 20,
            //     },
            //     {
            //       src: "img/java.svg",
            //       height: 20,
            //       width: 20,
            //     },

            //     {
            //       src: "img/mysql.svg",
            //       height: 20,
            //       width: 20,
            //     },
            //     {
            //       src: "img/spring.svg",
            //       height: 20,
            //       width: 20,
            //     },
            //     {
            //       src: "img/postgresql.svg",
            //       height: 20,
            //       width: 20,
            //     },
            //     {
            //       src: "img/docker.svg",
            //       height: 20,
            //       width: 20,
            //     },
            //     {
            //       src: "img/kubernetes.svg",
            //       height: 20,
            //       width: 20,
            //     },
            //     {
            //       src: "img/kafka.svg",
            //       height: 20,
            //       width: 20,
            //     },
            //     {
            //       src: "img/aws.svg",
            //       height: 20,
            //       width: 20,
            //     },
            //   ],
            // },
            size: {
              value: 20,
            },
          },
          detectRetina: true,
        }}
      /> */}

      <div className="App">
        <Header data={resumeData.main} />
        <About data={resumeData.main} />
        <TerminalUI />
        <Resume data={resumeData.resume} />
        <Portfolio data={resumeData.portfolio} />
        <Footer data={resumeData.main} />
      </div>
    </div>
  );
};

export default App;
