import React from "react";

const styles = {
   body: {
    fontFamily: "Arial, Helvetica, sans-serif",
    background: "#f5f7fa",
    margin: 0,
    padding: "40px 0",
    lineHeight: 1.6,
    minHeight: "100vh",
    overflowY: "auto"
  },
  container: {
    maxWidth: "1000px",
    margin: "auto",
    background: "white",
    padding: "40px"
  },
  h1: {
    borderBottom: "3px solid #28a745",
    paddingBottom: "10px",
    color: "#222"
  },
  h2: {
    marginTop: "30px",
    color: "#333"
  },
  p: {
    color: "#555"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "15px"
  },
  th: {
    padding: "12px",
    textAlign: "left",
    background: "#28a745",
    color: "white",
    border: "1px solid #ddd"
  },
  td: {
    padding: "12px",
    border: "1px solid #ddd"
  },
  section: {
    marginTop: "25px"
  },
  footer: {
    marginTop: "40px",
    textAlign: "center",
    fontSize: "14px",
    color: "#777"
  }
};

const Documentation = () => {
  return (
    <div style={styles.body}>
      <div style={styles.container}>
        
        <h1 style={styles.h1}>Fitness Tracker Web Application</h1>

        <p style={styles.p}>
          The Fitness Tracker is a web-based application designed to help users
          monitor and manage their daily fitness activities. The platform allows
          users to record workouts, track exercise progress, and maintain a
          healthy lifestyle.
        </p>

        <p style={styles.p}>
          This project demonstrates the use of modern web technologies to create
          an interactive and user-friendly fitness management system.
        </p>

        <div style={styles.section}>
          <h2 style={styles.h2}>Key Features</h2>

          <ul>
            <li>Track daily fitness activities</li>
            <li>Record workouts and exercise details</li>
            <li>Monitor personal fitness progress</li>
            <li>Simple and user-friendly interface</li>
            <li>Responsive design for different devices</li>
            <li>Organized fitness data management</li>
          </ul>
        </div>

        <div style={styles.section}>
          <h2 style={styles.h2}>How the Application Works</h2>

          <ol>
            <li>User opens the fitness tracker application.</li>
            <li>User adds workout or exercise details.</li>
            <li>The system stores the activity information.</li>
            <li>User can view their recorded fitness activities.</li>
            <li>The application helps track progress over time.</li>
          </ol>
        </div>

        <div style={styles.section}>
          <h2 style={styles.h2}>Technologies Used</h2>

          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Technology</th>
                <th style={styles.th}>Purpose</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td style={styles.td}>HTML</td>
                <td style={styles.td}>Provides the structure</td>
              </tr>

              <tr>
                <td style={styles.td}>CSS</td>
                <td style={styles.td}>Used for styling</td>
              </tr>

              <tr>
                <td style={styles.td}>JavaScript</td>
                <td style={styles.td}>Handles functionality</td>
              </tr>

              <tr>
                <td style={styles.td}>React.js</td>
                <td style={styles.td}>Build dynamic UI</td>
              </tr>

              <tr>
                <td style={styles.td}>Node.js</td>
                <td style={styles.td}>Backend server</td>
              </tr>

              <tr>
                <td style={styles.td}>Database</td>
                <td style={styles.td}>Stores fitness data</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={styles.section}>
          <h2 style={styles.h2}>Application Workflow</h2>

          <ul>
            <li>User enters workout data</li>
            <li>Application processes input</li>
            <li>Data is stored in the system</li>
            <li>User reviews activity records</li>
            <li>Progress tracking keeps users motivated</li>
          </ul>
        </div>

        <div style={styles.section}>
          <h2 style={styles.h2}>Installation Guide</h2>

          <ol>
            <li>Clone the project from GitHub</li>
            <li>Install dependencies using npm</li>
            <li>Run the development server</li>
            <li>Open the application in browser</li>
          </ol>
        </div>

        <div style={styles.section}>
          <h2 style={styles.h2}>Future Improvements</h2>

          <ul>
            <li>Add user authentication</li>
            <li>Create personalized dashboards</li>
            <li>Add graphical progress reports</li>
            <li>Integrate calorie tracking</li>
            <li>Add mobile features</li>
          </ul>
        </div>

        <div style={styles.section}>
          <h2 style={styles.h2}>Author</h2>

          <p style={styles.p}>
            This project was developed by <strong>Sam Sam Ali</strong> as a web
            development portfolio project.
          </p>
        </div>

        <div style={styles.footer}>
          <p>© 2026 Fitness Tracker Project</p>
        </div>

      </div>
    </div>
  );
};

export default Documentation;