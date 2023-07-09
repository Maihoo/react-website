import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ScrollToTopButton  from "./scrollToTopButton";
import NavButton  from "./navbtn";
import Logo       from "../res/selficon.jpg";
import Youtube    from "../res/icons/youtube.png";
import Instagram  from "../res/icons/instagram.png";
import Facebook   from "../res/icons/facebook.png";
import Twitter    from "../res/icons/twitter.png";
import Deviant    from "../res/icons/deviant.png";
import Mail       from "../res/icons/mail.png";

//        <NavButton id={'fullsize'}      class={'menubtn'} to="/gallery">Fullsize</NavButton>
//        <NavButton id={'Tuner'}         class={'menubtn'} to="/Tuner">Tuner</NavButton>

export default function PageLayout ({children}) {
  return (
  <>
    <header style={{position: 'relative', backgroundColor: 'black', height: 'auto', zIndex: '1000'}}>
      <div style={{display: 'flex', justifyContent: "center", alignItems: "center"}}>
        <img style={{marginTop: '2vw', width: '15vw', height: '100%'}} src={Logo} alt=""/>
        <h2  style={{marginTop: '100px', marginLeft: '50px', textAlign: 'left'}}>Finn Ole<br></br>Stadtaus</h2>
      </div>
      <hr size={1} width={'75%'}/>
      <div style={{display: 'flex', marginBottom: '0.5rem', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        <NavButton id={'home'}         to="/">Gallery</NavButton>
        <NavButton id={'chess'}        to="/chess">Chess</NavButton>
        <NavButton id={'gravity'}      to="/gravity">Gravity</NavButton>
        <NavButton id={'TowerDefense'} to="/TowerDefense">TowerDefense</NavButton>
        <NavButton id={'GoL'}          to="/GoL">Game of Life</NavButton>
        <NavButton id={'Tetris'}       to="/Tetris">Tetris</NavButton>
        <NavButton id={'playground'}   to="/playground">HTML-Playground</NavButton>
        <NavButton id={'models'}       to="/models">3D Models</NavButton>
        <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
          <DropdownButton menuVariant={"dark"} drop={'end'} id={"dropdown-basic-button"} style={{marginLeft: '1vw'}} title="▼">
            <Dropdown.Item><NavButton id={'about'}   customClass={'menu-vertical'} to="/about">About</NavButton></Dropdown.Item>
            <Dropdown.Item><NavButton id={'contact'} customClass={'menu-vertical'} to="/contact">Contact</NavButton></Dropdown.Item>
            <Dropdown.Item><NavButton id={'privacy'} customClass={'menu-vertical'} to="/privacy">Privacy-Policy</NavButton></Dropdown.Item>
          </DropdownButton>
        </div>
      </div>
      <hr size={1} width={'100%'} style={{marginTop: '0vw', marginBottom: '0vw'}}/>
    </header>
    {children}
    <footer>
      <div id="outPopUp" style={{position: 'absolute', justifyContent: "center", alignItems: "center", flexDirection: 'column', marginLeft: '-60vw', marginTop: '-10px', height: '30vh', marginBottom: '-50vw', width: '120%', overflow: 'hidden', backgroundColor: '#1b1b1b', }}>
        <h2 style={{paddingTop: '50px', justifyContent: "center", alignItems: "center", textAlign: 'center', marginTop: '-20px'}} className="widget-title">contact me :)</h2>
        <div style={{display: 'flex', justifyContent: "center", alignItems: "center"}}>
          <a className={"nextTo"} href={"https://www.youtube.com/channel/UCcUrHwj2Z1kbJj5rwQ8HXng"} rel={"noreferrer"} target={"_blank"}><img className="linkIcon" src={Youtube}   alt="" /></a>
          <a className={"nextTo"} href={"https://www.instagram.com/finn_maihoo/"}                   rel={"noreferrer"} target={"_blank"}><img className="linkIcon" src={Instagram} alt="" /></a>
          <a className={"nextTo"} href={"https://www.facebook.com/finnole.stadtaus/"}               rel={"noreferrer"} target={"_blank"}><img className="linkIcon" src={Facebook}  alt="" /></a>
          <a className={"nextTo"} href={"https://twitter.com/FinnOleStadtaus"}                      rel={"noreferrer"} target={"_blank"}><img className="linkIcon" src={Twitter}   alt="" /></a>
          <a className={"nextTo"} href={"https://www.deviantart.com/finnost"}                       rel={"noreferrer"} target={"_blank"}><img className="linkIcon" src={Deviant}   alt="" /></a>
          <a className={"nextTo"} href={"mailto:finn.ole.stadtaus@gmail.com"}                       rel={"noreferrer"} target={"_blank"}><img className="linkIcon" src={Mail}      alt="" /></a>
        </div>
      </div>
      <ScrollToTopButton class="tessss"/>
    </footer>
  </>
)}

