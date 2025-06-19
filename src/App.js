/* eslint-disable */
import React, {useState, useEffect} from 'react';
import Expire from "./components/expire";

import Video from './res/Fullscreen.mp4';
import IntroVideo from './res/intro.mp4';
import Intro from './res/Intro_keyboard.mp4';

import Gallery from './res/Gallery.jpg';

import Annika from './res/Annika.jpg';
import Manni from './res/Manni.jpg';
import Bored from './res/Bored.png';

import Pinup from './res/pinup.jpg';
import JTraining from './res/JTraining.jpg';
import F22 from './res/F22.jpg';
import Haiopei from './res/haiopei.jpg';

import Bismarck from './res/Bismarck.jpg';
import Julia from './res/Julia.jpg';

import Dust2 from './res/dust2.jpg';
import PinoPrinz from './res/PinoPrinz.jpg';

import Mi from './res/Mi.jpg';
import Paps from './res/Paps.jpg';


import Stine from './res/Stine.jpg';
import Timmermann from './res/Timmermann.png';

import Haiopei2 from './res/Haiopei-drawing.jpg';
import Anne from './res/Anne.jpg';

import Baby from './res/Baby.jpg';
import Fresen from './res/Fresen.jpg';

import Thore from './res/Thore.jpg';
import AK47 from './res/ak47-wasteland.jpg';


import JLineart from './res/J-Lineart.jpg';
import LiS from './res/LifeIsStrange_blue_hair5.jpg';
import JI from './res/JI.jpg';
import Praise from './res/Praise-the-Sun.jpg';

import IQ from './res/IQ.jpg';
import KSP from './res/KSP.jpg';
import Nade from './res/Nade.jpg';

import Yuno from './res/Yuno.jpg';
import Yuno2 from './res/Yuno2.jpg';
import Yuno3 from './res/Yuno3.jpg';

import Soldier from './res/safe.jpg';
import Skull from './res/skull.jpg';
import Vale from './res/Vale.png';
import Artstyle3 from './res/Artstyle3.jpg';

//Fullscreen imports

import FSGallery from './res/fullsize/Gallery.jpg';

import FSAnnika from './res/fullsize/Annika.png';
import FSManni from './res/fullsize/Manni.png';
import FSBored from './res/fullsize/Bored.jpg';

import FSPinup from './res/fullsize/pinup.jpg';
import FSJTraining from './res/fullsize/JTraining.jpg';
import FSF22 from './res/fullsize/F22.jpg';
import FSHaiopei from './res/fullsize/haiopei.jpg';

import FSBismarck from './res/fullsize/Bismarck.jpg';
import FSJulia from './res/fullsize/Julia.jpg';

import FSDust2 from './res/fullsize/dust2.jpg';
import FSPinoPrinz from './res/fullsize/PinoPrinz.jpg';

import FSMi from './res/fullsize/Mi.jpg';
import FSPaps from './res/fullsize/Paps.jpg';

import FSStine from './res/fullsize/Stine.jpg';
import FSTimmermann from './res/fullsize/Timmermann.png';

import FSHaiopei2 from './res/fullsize/Haiopei-drawing.jpg';
import FSAnne from './res/fullsize/Anne.jpg';

import FSBaby from './res/fullsize/Baby.jpg';
import FSFresen from './res/fullsize/Fresen.jpg';

import FSThore from './res/fullsize/Thore.jpg';
import FSAK47 from './res/fullsize/ak47-wasteland.jpg';


import FSJLineart from './res/fullsize/J-Lineart.jpg';
import FSLiS from './res/fullsize/LifeIsStrange_blue_hair5.jpg';
//import FSJI from './res/fullsize/JI.jpg';
import FSPraise from './res/fullsize/Praise-the-Sun.jpg';

import FSIQ from './res/fullsize/IQ.jpg';
import FSKSP from './res/fullsize/KSP.jpg';
import FSNade from './res/fullsize/Nade.jpg';

import FSYuno from './res/fullsize/Yuno.jpg';
import FSYuno2 from './res/fullsize/Yuno2.png';
import FSYuno3 from './res/fullsize/Yuno3.jpg';

import FSSoldier from './res/fullsize/safe.jpg';
import FSSkull from './res/fullsize/skull.jpg';
import FSArtstyle3 from './res/fullsize/Artstyle3.jpg';
//import FSVale from './res/fullsize/Vale.png';

import IntroImage from './res/intro.jpg';
import FIntroImage from './res/fullsize/intro.jpg';

import ImageHolder from './components/imageHolder';
import ImageRow from './components/imageRow';
import ScrollAnimHolder from './components/scrollAnimHolder';


import './index.less';

function updateBackgroundPosition() {
  var scrolled = window.pageYOffset;
  document.getElementById("backgroundmain").style.backgroundPositionY = (scrolled * 0.8) + 'px';
}

function onScroll() {
  requestAnimationFrame(updateBackgroundPosition);
}

function App() {

  useEffect(() => {
    // Attach the scroll listener when the component mounts
    window.addEventListener('scroll', onScroll);

    // Clean up the scroll listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  /*
  const [count, setCount] = useState(0); // https://reactjs.org/docs/hooks-reference.html

  useEffect(() => {
    let item = localStorage.getItem("count");
    if (item) {
      setCount(Number(item));
    }
  }, [])

  function buttonClick(e) {
    e.preventDefault();

    localStorage.setItem("count", Number(count + 1));
    setCount(count + 1);
  }


  useEffect(() => {
    window.scrollTo(0, 410)
  }, [])*/

  return (
    <div id={"backgroundmain"} onScroll={(event) => {
      console.log('Scroll position:', event.target.scrollTop);
    }} style={{position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', zIndex: '1', overflow: 'hidden'}}>

      <div style={{width: '100vw', height: '100%', overflow: 'hidden'}}>
        {/*<Expire id={"expire"} delay={3000}>
          <video id={"video"} src={Intro} width={"100%"} height={"100%"} autoPlay muted style={{zIndex: '1000', display: 'flex', overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', marginTop: '0px'}}/>
        </Expire>*/}
        <ImageHolder dfu={FSGallery} wdth={'100%'} style={{position: 'absolute', marginTop: '0%'}}>{Gallery}</ImageHolder>
      </div>

      {/* COPY TO GALLERY FROM HERE (remove FS) */}

      <div className={'limited-width'}>
        <ScrollAnimHolder><h3>Gallery</h3></ScrollAnimHolder>
      </div>

      <div className={'limited-width'}>
        <ScrollAnimHolder><h2>Oil Paintings</h2></ScrollAnimHolder>
      </div>

      <ImageRow>
        <ImageHolder zoom orient='hiddenLef' dfu={FSBored}>{Bored}</ImageHolder>
        <ImageHolder zoom orient='hiddenTop' dfu={FSHaiopei}>{Haiopei}</ImageHolder>
        <ImageHolder zoom orient='hiddenRig' dfu={FSAnnika}>{Annika}</ImageHolder>
      </ImageRow>

      <ImageRow>
        <ImageHolder zoom orient='hiddenLef' dfu={FSJTraining}>{F22}</ImageHolder>
        <ImageHolder zoom orient='hiddenRig' dfu={FSManni}>{Manni}</ImageHolder>
      </ImageRow>

      <ImageRow>
        <ImageHolder zoom orient='hiddenLef' dfu={FSBismarck}>{Bismarck}</ImageHolder>
        <ImageHolder zoom orient='hiddenRig' dfu={FSJulia}>{Julia}</ImageHolder>
      </ImageRow>

      <ImageRow>
        <ImageHolder zoom orient='hiddenLef' dfu={FSDust2}>{Dust2}</ImageHolder>
        <ImageHolder zoom orient='hiddenRig' dfu={FSPinoPrinz}>{PinoPrinz}</ImageHolder>
      </ImageRow>

      <ImageRow>
        <ImageHolder zoom orient='hiddenLef' dfu={FSMi}>{Mi}</ImageHolder>
        <ImageHolder zoom orient='hiddenRig' dfu={FSPaps}>{Paps}</ImageHolder>
      </ImageRow>

      <div className={'limited-width'}>
        <ScrollAnimHolder orient='hiddenLef2'> <h2 style={{paddingTop: '55px'}}>Drawings</h2> </ScrollAnimHolder>
      </div>

      <ImageRow>
        <ImageHolder zoom orient='hiddenLef' dfu={FSStine}>{Stine}</ImageHolder>
        <ImageHolder zoom orient='hiddenRig' dfu={FSTimmermann}>{Timmermann}</ImageHolder>
      </ImageRow>

      <ImageRow>
        <ImageHolder zoom orient='hiddenLef' dfu={FSHaiopei2}>{Haiopei2}</ImageHolder>
        <ImageHolder zoom orient='hiddenRig' dfu={FSAnne} cutoff='30%'>{Anne}</ImageHolder>
      </ImageRow>

      <ImageRow>
        <ImageHolder zoom orient='hiddenLef' dfu={FSBaby}>{Baby}</ImageHolder>
        <ImageHolder zoom orient='hiddenRig' dfu={FSFresen}>{Fresen}</ImageHolder>
      </ImageRow>

      <ImageRow>
        <ImageHolder zoom orient='hiddenLef' dfu={FSThore}>{Thore}</ImageHolder>
        <ImageHolder zoom orient='hiddenRig' dfu={FSAK47}>{AK47}</ImageHolder>
      </ImageRow>

      <div className={'limited-width'}>
        <ScrollAnimHolder orient='hiddenLef2'>
          <h2 style={{paddingTop: '55px'}}>3D-Modelling</h2>
        </ScrollAnimHolder>
      </div>

      <ImageRow>
        <ScrollAnimHolder orient='hiddenLef2'>
          <video src={IntroVideo} width="100% " controls={"controls"} autoPlay loop muted/>
        </ScrollAnimHolder>
      </ImageRow>

      <div className={'limited-width'}>
        <ScrollAnimHolder orient='hiddenLef2'>
          <h2 style={{paddingTop: '55px'}}>Digital</h2>
        </ScrollAnimHolder>
      </div>

      <ImageRow>
        <ScrollAnimHolder orient='hiddenLef2'>
          <video src={Video} width="100%" controls={"controls"} autoPlay loop/>
        </ScrollAnimHolder>
      </ImageRow>

      <ImageRow>
        <ImageHolder zoom orient='hiddenLef' dfu={FSJLineart}>{JLineart}</ImageHolder>
        <ImageHolder zoom orient='hiddenTop' dfu={FSLiS} cutoff='40%'>{LiS}</ImageHolder>
        <ImageHolder zoom orient='hiddenRig' dfu={FSPraise}>{Praise}</ImageHolder>
      </ImageRow>

      <ImageRow>
        <ImageHolder zoom orient='hiddenLef' dfu={FSIQ}>{IQ}</ImageHolder>
        <ImageHolder zoom orient='hiddenMid' dfu={FSNade}>{Nade}</ImageHolder>
        <ImageHolder zoom orient='hiddenRig' dfu={FSSoldier}>{Soldier}</ImageHolder>
      </ImageRow>

      <ImageRow>
        <ImageHolder zoom orient='hiddenLef' dfu={FSKSP}>{KSP}</ImageHolder>
        <ImageHolder zoom orient='hiddenBot' dfu={FSSkull}>{Skull}</ImageHolder>
        <ImageHolder zoom orient='hiddenRig' dfu={FSArtstyle3}>{Artstyle3}</ImageHolder>
      </ImageRow>

      {/*
      <ImageRow>
        <ImageHolder zoom orient='hiddenLef' dfu={FSYuno}>{Yuno}</ImageHolder>
        <ImageHolder zoom orient='hiddenBot' dfu={FSYuno2}>{Yuno2}</ImageHolder>
        <ImageHolder zoom orient='hiddenTop' dfu={FSYuno3}>{Yuno3}</ImageHolder>
      </ImageRow>
      */}

      <div style={{height: '10vh'}}></div>
    </div>
  ) /*COPY TO HERE */;
}

export default App;