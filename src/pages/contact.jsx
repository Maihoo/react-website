import React from 'react';

import Youtube    from "../res/icons/youtube.png";
import Instagram  from "../res/icons/instagram.png";
import Facebook   from "../res/icons/facebook.png";
import Twitter    from "../res/icons/twitter.png";
import Deviant    from "../res/icons/deviant.png";
import Mail       from "../res/icons/mail.png";

const AboutPage = () => (
  <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', color: 'white', fontSize: '30px', textAlign: 'left', marginBottom: '800px'}}>
    <div style={{ width: '75%'}}>
      <h3>Contact me</h3>
      <div style={{display: 'flex', position: 'absolute', marginLeft: '200px', height: '500px', flexDirection: 'column-reverse', justifyContent: "center", marginTop: '260px',alignItems: "center"}}>

        <s1>My YouTube channel. Feel free to check it out!</s1>
        <s1>My Instagram profile. Probably the best way to contact me.</s1>
        <s1>My facebook profile. Who needs privacy?</s1>
        <s1>My twitter profile. Not very active here.</s1>
        <s1>My DeviantArt profile, pretty much this website, but in lame ;)</s1>
        <s1>My e-Mail adress, finn.ole.stadtaus@gmail.com</s1>
      </div>
      <div style={{display: 'flex', position: 'absolute', marginTop: '0px', marginLeft: '1px' ,height: '800px', flexDirection: 'column', justifyContent: "center", alignItems: "center"}}>
        <a className={"nextTo"} href={"https://www.youtube.com/channel/UCcUrHwj2Z1kbJj5rwQ8HXng"} style={{marginBottom: '50px'}} rel={"noreferrer"} target={"_blank"}><img className="linkIcon" src={Youtube}   alt="" /></a>
        <a className={"nextTo"} href={"https://www.instagram.com/finn_maihoo/"}                   style={{marginBottom: '50px'}} rel={"noreferrer"} target={"_blank"}><img className="linkIcon" src={Instagram} alt="" /></a>
        <a className={"nextTo"} href={"https://www.facebook.com/finnole.stadtaus/"}               style={{marginBottom: '50px'}} rel={"noreferrer"} target={"_blank"}><img className="linkIcon" src={Facebook}  alt="" /></a>
        <a className={"nextTo"} href={"https://twitter.com/FinnOleStadtaus"}                      style={{marginBottom: '50px'}} rel={"noreferrer"} target={"_blank"}><img className="linkIcon" src={Twitter}   alt="" /></a>
        <a className={"nextTo"} href={"https://www.deviantart.com/finnost"}                       style={{marginBottom: '50px'}} rel={"noreferrer"} target={"_blank"}><img className="linkIcon" src={Deviant}   alt="" /></a>
        <a className={"nextTo"} href={"mailto:finn.ole.stadtaus@gmail.com"}                       style={{marginBottom: '50px'}} rel={"noreferrer"} target={"_blank"}><img className="linkIcon" src={Mail}      alt="" /></a>
      </div>
  

    </div>
  </div>
)

export default AboutPage;