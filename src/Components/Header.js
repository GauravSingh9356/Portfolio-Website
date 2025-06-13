import React from "react";
import TypeWriter from "react-typewriter";

const Header = ({ data }) => {
  if (data) {
    var name = data.name;
    var occupation = data.occupation;
    var description = data.description;

    var networks = data.social.map(function (network) {
      return (
        <li key={network.name}>
          <a href={network.url}>
            <i className={network.className}></i>
          </a>
        </li>
      );
    });
  }

  return (
    <header id="home">
      <nav id="nav-wrap">
        <a className="mobile-btn" href="#nav-wrap" title="Show navigation">
          Show navigation
        </a>
        <a className="mobile-btn" href="#home" title="Hide navigation">
          Hide navigation
        </a>

        <ul id="nav" className="nav">
          <li className="current">
            <a className="smoothscroll" href="#home">
              Home
            </a>
          </li>
          <li>
            <a className="smoothscroll" href="#about">
              About
            </a>
          </li>
          <li>
            <a className="smoothscroll" href="#resume">
              Experience
            </a>
          </li>
          <li>
            <a className="smoothscroll" href="#projects">
              Projects
            </a>
          </li>

          <li>
            <a href="https://techtalkswithgaurav.blogspot.com/" target="_blank">
              TechTalks
            </a>
          </li>

          <li>
            <a
              href="https://www.linkedin.com/in/gauravsingh9356"
              target="_blank"
            >
              LinkedIn
            </a>
          </li>

          <li>
            <a href="https://github.com/GauravSingh9356" target="_blank">
              GitHub
            </a>
          </li>
          <li>
            <a href="https://leetcode.com/gauravsingh9356_/" target="_blank">
              LeetCode
            </a>
          </li>
          <li>
            <a
              href="https://auth.geeksforgeeks.org/user/gauravsingh9356/practice/"
              target="_blank"
            >
              GFG
            </a>
          </li>
        </ul>
      </nav>

      <div className="row banner">
        <div className="banner-text">
          <h1 className="responsive-headline">
            <TypeWriter typing={0.5}>{name ? `I'm ${name}.` : null}</TypeWriter>
          </h1>
          <h3 style={{ color: "#fff", fontWeight: "bold" }}>
            <span style={{ color: "#fff" }}>{occupation}</span>.
          </h3>
          <h5 style={{ color: "#fff" }}>
            <span style={{ color: "#fff" }}>{description}</span>
          </h5>
          <hr />
          <ul className="social">{networks}</ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
