import React, { useEffect, useState } from "react";

import Header from "./Components/Header";
import Footer from "./Components/Footer";
import About from "./Components/About";
import Resume from "./Components/Resume";
import Portfolio from "./Components/Portfolio";

import Contact from "./Components/Contact";
import Chatbot from "./Components/ChatbotFriendly";
import Particles from "react-tsparticles";

import "./App.css";
// import TerminalUI from "./Components/Terminal";

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
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
        options={{
          fpsLimit: 60,
          fullScreen: { enable: false },
          interactivity: {
            events: {
              onHover: { enable: true, mode: "repulse" },
              onClick: { enable: true, mode: "push" },
              resize: true,
            },
            modes: {
              repulse: { distance: 150, duration: 0.6 },
              push: { quantity: 4 },
              grab: { distance: 200, links: { opacity: 0.8 } },
            },
            parallax: { enable: true, force: 30, smooth: 10 },
          },
          particles: {
            number: { value: 45, density: { enable: true, area: 900 } },
            color: { value: ["#00b4d8", "#00c8ff", "#64c8ff", "#a0e9ff"] },
            links: {
              enable: true,
              distance: 150,
              color: "#00c8ff",
              opacity: 0.12,
              width: 1,
            },
            move: {
              enable: true,
              speed: 1.2,
              direction: "none",
              random: false,
              straight: false,
              outMode: "out",
            },
            opacity: {
              value: { min: 0.2, max: 0.9 },
              anim: { enable: true, speed: 1, opacity_min: 0.2, sync: false },
            },
            shape: {
              type: ["circle", "image"],
              image: [
                { src: "img/react.svg", width: 20, height: 20 },
                { src: "img/js.svg", width: 20, height: 20 },
                { src: "img/nodejs.svg", width: 20, height: 20 },
                { src: "img/mongodb.svg", width: 20, height: 20 },
                { src: "img/cloud.svg", width: 20, height: 20 },
                { src: "img/c++.svg", width: 20, height: 20 },
                { src: "img/java.svg", width: 20, height: 20 },
                { src: "img/mysql.svg", width: 20, height: 20 },
                { src: "img/spring.svg", width: 20, height: 20 },
                { src: "img/postgresql.svg", width: 20, height: 20 },
                { src: "img/docker.svg", width: 20, height: 20 },
                { src: "img/kubernetes.svg", width: 20, height: 20 },
                { src: "img/kafka.svg", width: 20, height: 20 },
                { src: "img/aws.svg", width: 20, height: 20 },
                { src: "img/css.svg", width: 20, height: 20 },
              ],
            },
            size: { value: { min: 8, max: 20 }, random: true },
            shadow: { enable: true, color: "#00c8ff", blur: 6 },
          },
          detectRetina: true,
        }}
      />

      <div className="App" style={{ position: "relative", zIndex: 1 }}>
        <Header data={resumeData.main} />
        <About data={resumeData.main} />
        {/* <TerminalUI /> */}
        <Resume data={resumeData.resume} />
        <Portfolio data={resumeData.portfolio} />
        <Footer data={resumeData.main} />
        <Chatbot backendUrl="/api/chat" />
      </div>
    </div>
  );
};

export default App;
