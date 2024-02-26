import React from "react";
import { ReactTerminal } from "react-terminal";
import { TerminalContextProvider } from "react-terminal";

// Define commands here
const commands = {
  hi: "Hello",
  Hi: "Hello",
  Hello: "Hi",
  hello: "Hi",
  whoami: "Gaurav",
  help: () => `clear - clears the console.
  change_prompt <PROMPT> - Change the prompt of the terminal.
  change_theme <THEME> - Changes the theme of the terminal. Allowed themes - light, dark, material-light, material-dark, material-ocean, matrix and dracula.
  toggle_control_bar - Hides / Display the top control bar.
  toggle_control_buttons - Hides / Display the top buttons on control bar.
  evaluate_math_expression <EXPR> - Evaluates a mathematical expression (eg, 4*4) by hitting a public API, api.mathjs.org.
  wait <TIME> - Wait for TIME (seconds).
  count_to <NUM> Count from 1 to NUM (integer).`,
  cd: (directory) => `changed path to ${directory}`,
  mkdir: (directory) => `New Directory Created ${directory}`,
  date: () => `${new Date()}`,
};

const welcomeMesage = () => {
  return (
    <>
      <p
        style={{
          color: "#eeee",
        }}
      >
        Welcome to GS Terminal!
      </p>
      <p>Type "help" for all available commands. </p>
    </>
  );
};

const TerminalUI = () => {
  return (
    <div
      className="container"
      style={{
        width: "60%",
        minHeight: "400px",
        margin: "0 auto",
        marginBottom: "-150px",
      }}
    >
      <TerminalContextProvider>
        <ReactTerminal
          welcomeMessage={welcomeMesage()}
          commands={commands}
          theme="material-dark"
          prompt="GS~Pro>>>"
          errorMessage="OOPs! (Aayeein) 🤔!"
          showControlBar={true}
        />
      </TerminalContextProvider>
    </div>
  );
};

export default TerminalUI;
