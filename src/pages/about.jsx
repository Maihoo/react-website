import React from 'react';
import { Link } from "react-router-dom";

const AboutPage = () => (
  <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
    <div style={{ width: '75%'}}>
      <h3>About me</h3>
      <p style={{width: '1000px', fontSize: '2rem', color: '#fff', lineHeight: '40px', fontStyle: 'normal'}}>
        Hey there!
        <br></br>
        <br></br>
        I'm Finn Ole Stadtaus, a hobby artist, guitar player and <br></br>
        Software engineer from Rostock, Germany.
        <br></br><br></br><br></br>
        I work in the cross-sectional functions Frameworks team of
        <br></br>
        <Link to={'https://www.comdirect.de/'}>
          comdirect.
        </Link>
        <br></br><br></br><br></br>
      </p>
    </div>
  </div>
)

export default AboutPage;