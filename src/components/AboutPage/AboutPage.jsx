import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div>
        <h2>Built by Alina Trukhina</h2>
        <h3>LinkedIn:</h3>
        <a href="https://www.linkedin.com/in/alina-trukhina/">www.linkedin.com/in/alina-trukhina</a>
        <h3>Source Code:</h3>
        <a href="https://github.com/AlinaTrukhina/solo-project-foraging-finds">Foraging Finds on Github</a>
        <h3>Challenges:</h3>
        <ul>
          <li>Integraing GoogleMaps API</li>
          <li>Uploading images</li>
          <li>Uploading entry based on user location</li>
        </ul>
        <h3>Technologies used: </h3>
        <ul>
          <li>React</li>
          <li>Redux</li>
          <li>Node.js</li>
          <li>PostgreSQL</li>
          <li>GoogleMaps API</li>
          <li>Multer</li>
          <li>Material UI</li>
        </ul>
        <h3>Future goals</h3>
        <ul>
          <li>Share button to share your finds</li>
          <li>Search for mushrooms by features – color, cap type, grows on wood or ground</li>
        </ul>
        <p>Thanks to Prime Digital Academy, my classmates in the Ramirez cohort, and my family and friends for their support</p>
      </div>
    </div>
  );
}

export default AboutPage;
