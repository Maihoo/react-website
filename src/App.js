/* eslint-disable */
import React, {useState, useEffect} from 'react';
import Expire from "./components/expire";

import Video from './res/Fullscreen.mp4';
import IntroVideo from './res/intro.mp4';
import Intro from './res/Intro_keyboard.mp4';

import Gallery from './res/Gallery.jpg';

import Annika from './res/Annika.jpg';
import Manni from './res/Manni.jpg';

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
import ScrollAnimHolder from './components/scrollAnimHolder';


import * as styles from './index.css';

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

      <div className={'Row'} style={{borderBottom: 'none', width: '100%'}}>
        <div style={{width: '100vw', height: '100%', overflow: 'hidden'}}>
          {/*<Expire id={"expire"} delay={3000}>
            <video id={"video"} src={Intro} width={"100%"} height={"100%"} autoPlay muted style={{zIndex: '1000', display: 'flex', overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', marginTop: '0px'}} />
          </Expire>*/}
          <ImageHolder dfu={FSGallery} wdth={'100%'} style={{position: 'absolute', marginTop: '0%'}}>{Gallery}</ImageHolder>
        </div>
      </div>

      // COPY TO GALLERY FROM HERE (remove FS)

      <div className={'seventyfive'}>
        <ScrollAnimHolder><h3>Gallery</h3></ScrollAnimHolder>
      </div>

      <div className={'seventyfive'}>
        <ScrollAnimHolder><h2>Oil Paintings</h2></ScrollAnimHolder>
      </div>

      <div className={'Row seventyfive'}>
        <ImageHolder maxWidth='38%'   maxHeight='30.2vw'  dfu={FSAnnika}      orient='hiddenLef' mL='0.0vw'>{Annika}</ImageHolder>
        <ImageHolder maxWidth='62%'   maxHeight='30.2vw'  dfu={FSManni}       orient='hiddenRig' mL='0.5vw'>{Manni}</ImageHolder>
      </div>

      <div className={'Row seventyfive'} style={{marginTop: '0.5vw'}}>
        <ImageHolder maxWidth='32%'   maxHeight='19.5vw'  dfu={FSPinup}       orient='hiddenLef' mL='0.0vw'>{Pinup}</ImageHolder>
        <ImageHolder maxWidth='40%'   maxHeight='19.5vw'  dfu={FSJTraining}   orient='hiddenTop' mL='0.5vw'>{F22}</ImageHolder>
        <ImageHolder maxWidth='32%'   maxHeight='19.5vw'  dfu={FSHaiopei}     orient='hiddenRig' mL='0.5vw'>{Haiopei}</ImageHolder>
      </div>

      <div className={'Row seventyfive'} style={{marginTop: '0.5vw'}}>
        <ImageHolder maxWidth='58%'   maxHeight='44vw'    dfu={FSBismarck}    orient='hiddenLef' mL='0.0vw'>{Bismarck}</ImageHolder>
        <ImageHolder maxWidth='55%'   maxHeight='44vw'    dfu={FSJulia}       orient='hiddenRig' mL='0.5vw'>{Julia}</ImageHolder>
      </div>

      <div className={'Row seventyfive'} style={{marginTop: '0.5vw'}}>
        <ImageHolder maxWidth='64%'   maxHeight='29.2vw'  dfu={FSDust2}       orient='hiddenLef' mL='0.0vw' >{Dust2}</ImageHolder>
        <ImageHolder maxWidth='37%'   maxHeight='29.2vw'  dfu={FSPinoPrinz}   orient='hiddenRig' mL='0.5vw'>{PinoPrinz}</ImageHolder>
      </div>

      <div className={'Row seventyfive'} style={{marginTop: '0.5vw'}}>
        <ImageHolder maxWidth='40%'   maxHeight='31vw'    dfu={FSMi}          orient='hiddenLef' mL='0.0vw'>{Mi}</ImageHolder>
        <ImageHolder maxWidth='60%'   maxHeight='31vw'    dfu={FSPaps}        orient='hiddenRig' mL='0.5vw'>{Paps}</ImageHolder>
      </div>

      <div className={'seventyfive'}>
        <ScrollAnimHolder orient='hiddenLef2'> <h2 style={{paddingTop: '55px'}}>Drawings</h2> </ScrollAnimHolder>
      </div>

      <div className={'Row seventyfive'} style={{marginTop: '0.5vw'}}>
        <ImageHolder maxWidth='50%' maxHeight='46vw'      dfu={FSStine}       orient='hiddenLef' mL='0.0vw' >{Stine}</ImageHolder>
        <ImageHolder maxWidth='50%' maxHeight='46vw'      dfu={FSTimmermann}  orient='hiddenRig' mL='0.5vw'>{Timmermann}</ImageHolder>
      </div>

      <div className={'Row seventyfive'} style={{marginTop: '0.5vw'}}>
        <ImageHolder maxWidth='50%' maxHeight='24vw'      dfu={FSHaiopei2}      orient='hiddenLef' mL='0.0vw'>{Haiopei2}</ImageHolder>
        <ImageHolder maxWidth='50%' maxHeight='24vw'      dfu={FSAnne} p='-6vw' orient='hiddenRig' mL='0.5vw'>{Anne}</ImageHolder>
      </div>

      <div className={'Row seventyfive'} style={{marginTop: '0.5vw'}}>
        <ImageHolder maxWidth='50%' maxHeight='49vw'      dfu={FSBaby}        orient='hiddenLef' mL='0.0vw' >{Baby}</ImageHolder>
        <ImageHolder maxWidth='50%' maxHeight='49vw'      dfu={FSFresen}      orient='hiddenRig' mL='0.5vw'>{Fresen}</ImageHolder>
      </div>

      <div className={'Row seventyfive'} style={{marginTop: '0.5vw'}}>
        <ImageHolder maxWidth='49%' maxHeight='24vw'    dfu={FSThore}       orient='hiddenLef' mL='0.0vw'>{Thore}</ImageHolder>
        <ImageHolder maxWidth='55%' maxHeight='24vw'    dfu={FSAK47}        orient='hiddenRig' mL='0.5vw'>{AK47}</ImageHolder>
      </div>

      <div className={'seventyfive'}>
        <ScrollAnimHolder orient='hiddenLef2'> <h2 style={{paddingTop: '55px'}}>3D-Modelling</h2> </ScrollAnimHolder>
      </div>

      <ScrollAnimHolder orient='hiddenLef2'>  <video src={IntroVideo} width="900" height="600" controls={"controls"} autoPlay loop muted /> </ScrollAnimHolder>

      <div className={'seventyfive'}>
        <ScrollAnimHolder orient='hiddenLef2'> <h2 style={{paddingTop: '55px'}}>Digital</h2> </ScrollAnimHolder>
      </div>

      <ScrollAnimHolder orient='hiddenLef2'> <video src={Video} width="900" height="600" controls={"controls"} autoPlay loop /> </ScrollAnimHolder>

      <div className={'Row seventyfive'} style={{marginTop: '0.5vw'}}>
        <ImageHolder maxWidth='30%' maxHeight='24vw'      dfu={FSJLineart}    orient='hiddenLef' mL='0.0vw'>{JLineart}</ImageHolder>
        <ImageHolder maxWidth='64%' maxHeight='24vw'      dfu={FSLiS}         orient='hiddenTop' mL='0.5vw' p='-3.5vw'>{LiS}</ImageHolder>
        <ImageHolder maxWidth='26%' maxHeight='24vw'      dfu={FSPraise}      orient='hiddenRig' mL='0.5vw'>{Praise}</ImageHolder>
      </div>

      <div className={'Row seventyfive'} style={{marginTop: '0.5vw'}}>
        <ImageHolder maxWidth='23%' maxHeight='25vw'      dfu={FSIQ}          orient='hiddenLef' mL='0.0vw'>{IQ}</ImageHolder>
        <ImageHolder maxWidth='40%' maxHeight='25vw'      dfu={FSKSP}         orient='hiddenBot' mL='0.5vw'>{KSP}</ImageHolder>
        <ImageHolder maxWidth='40%' maxHeight='25vw'      dfu={FSNade}        orient='hiddenRig' mL='0.5vw'>{Nade}</ImageHolder>
      </div>

      <div className={'Row seventyfive'} style={{marginTop: '0.5vw'}}>
        <ImageHolder maxWidth='34%' maxHeight='21.5vw'      dfu={FSYuno}        orient='hiddenLef' mL='0.0vw'>{Yuno}</ImageHolder>
        <ImageHolder maxWidth='34%' maxHeight='21.5vw'      dfu={FSYuno2}       orient='hiddenBot' mL='0.5vw'>{Yuno2}</ImageHolder>
        <ImageHolder maxWidth='34%' maxHeight='21.5vw'      dfu={FSYuno3}       orient='hiddenTop' mL='0.5vw'>{Yuno3}</ImageHolder>
      </div>

      <div className={'Row seventyfive'} style={{marginTop: '0.5vw'}}>
        <ImageHolder maxWidth='32%' maxHeight='23vw'      dfu={FSSoldier}     orient='hiddenLef' mL='0.0vw'>{Soldier}</ImageHolder>
        <ImageHolder maxWidth='40%' maxHeight='23vw'      dfu={FSSkull}       orient='hiddenBot' mL='0.5vw'>{Skull}</ImageHolder>
        <ImageHolder maxWidth='40%' maxHeight='23vw'      dfu={FSArtstyle3}   orient='hiddenRig' mL='0.5vw'>{Artstyle3}</ImageHolder>
      </div>

      <div style={{height: '10vh'}}></div>
    </div>
  ) /*COPY TO HERE */;
}

export default App;