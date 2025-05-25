import React from 'react';

import Video      from '../res/Fullscreen.mp4';
import IntroVideo from '../res/intro.mp4';

import Annika from '../res/fullsize/Annika.png';
import Manni from '../res/fullsize/Manni.png';

import Pinup from '../res/fullsize/pinup.jpg';
import JTraining from '../res/fullsize/JTraining.jpg';
import Haiopei from '../res/fullsize/haiopei.jpg';

import Bismarck from '../res/fullsize/Bismarck.jpg';
import Julia from '../res/fullsize/Julia.jpg';

import Dust2 from '../res/fullsize/dust2.jpg';
import PinoPrinz from '../res/fullsize/PinoPrinz.jpg';

import Mi from '../res/fullsize/Mi.jpg';
import Paps from '../res/fullsize/Paps.jpg';

import Stine from '../res/fullsize/Stine.jpg';
import Timmermann from '../res/fullsize/Timmermann.png';

import Haiopei2 from '../res/fullsize/Haiopei-drawing.jpg';
import Anne from '../res/fullsize/Anne.jpg';

import Baby from '../res/fullsize/Baby.jpg';
import Fresen from '../res/fullsize/Fresen.jpg';

import Thore from '../res/fullsize/Thore.jpg';
import AK47 from '../res/fullsize/ak47-wasteland.jpg';


import JLineart from '../res/fullsize/J-Lineart.jpg';
import LiS from '../res/fullsize/LifeIsStrange_blue_hair5.jpg';
//import JI from '../res/fullsize/JI.jpg';
import Praise from '../res/fullsize/Praise-the-Sun.jpg';

import IQ from '../res/fullsize/IQ.jpg';
import KSP from '../res/fullsize/KSP.jpg';
import Nade from '../res/fullsize/Nade.jpg';

import Yuno from '../res/fullsize/Yuno.jpg';
import Yuno2 from '../res/fullsize/Yuno2.png';
import Yuno3 from '../res/fullsize/Yuno3.jpg';

import Soldier from '../res/fullsize/safe.jpg';
import Skull from '../res/fullsize/skull.jpg';
import Artstyle3 from '../res/fullsize/Artstyle3.jpg';
//import Vale from '../res/fullsize/Vale.png';


import ImageHolder from '../components/imageHolder';
import ScrollAnimHolder from '../components/scrollAnimHolder';


const GalleryPage = ({children}) => (
  <div id={'backgroundmain'} onScroll={myFunction} style={{position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', zIndex: '1', overflow: 'hidden'}}>

    {//PASTE FROM HERE (remove FS)
    }

      <div className={'limited-width'}>
        <ScrollAnimHolder><h3>Gallery</h3></ScrollAnimHolder>
      </div>

      <div className={'limited-width'}>
        <ScrollAnimHolder><h2>Oil Paintings</h2></ScrollAnimHolder>
      </div>

      <div className={'image-row limited-width'}>
        <ImageHolder zoom maxHeight='24.9vw'   orient='hiddenLef' dfu={Bored}>{Bored}</ImageHolder>
        <ImageHolder zoom maxHeight='24.9vw'   orient='hiddenMid' dfu={Haiopei}>{Haiopei}</ImageHolder>
        <ImageHolder zoom maxHeight='24.9vw'   orient='hiddenRig' dfu={Annika}>{Annika}</ImageHolder>
      </div>

      <div className={'image-row limited-width'}>
        <ImageHolder zoom maxHeight='25vw'   orient='hiddenLef' dfu={JTraining}>{F22}</ImageHolder>
        <ImageHolder zoom maxHeight='25vw'   orient='hiddenRig' dfu={Manni}>{Manni}</ImageHolder>
      </div>

      <div className={'image-row limited-width'}>
        <ImageHolder zoom maxHeight='44vw'   orient='hiddenLef' dfu={Bismarck}>{Bismarck}</ImageHolder>
        <ImageHolder zoom maxHeight='44vw'   orient='hiddenRig' dfu={Julia}>{Julia}</ImageHolder>
      </div>

      <div className={'image-row limited-width'}>
        <ImageHolder zoom maxHeight='29.2vw' orient='hiddenLef' dfu={Dust2}>{Dust2}</ImageHolder>
        <ImageHolder zoom maxHeight='29.2vw' orient='hiddenRig' dfu={PinoPrinz}>{PinoPrinz}</ImageHolder>
      </div>

      <div className={'image-row limited-width'}>
        <ImageHolder zoom maxHeight='30vw'   orient='hiddenLef' dfu={Mi}>{Mi}</ImageHolder>
        <ImageHolder zoom maxHeight='30vw'   orient='hiddenRig' dfu={Paps}>{Paps}</ImageHolder>
      </div>

      <div className={'limited-width'}>
        <ScrollAnimHolder orient='hiddenLef2'> <h2 style={{paddingTop: '55px'}}>Drawings</h2> </ScrollAnimHolder>
      </div>

      <div className={'image-row limited-width'}>
        <ImageHolder zoom maxHeight='45.5vw' orient='hiddenLef' dfu={Stine}>{Stine}</ImageHolder>
        <ImageHolder zoom maxHeight='45.5vw' orient='hiddenRig' dfu={Timmermann}>{Timmermann}</ImageHolder>
      </div>

      <div className={'image-row limited-width'}>
        <ImageHolder zoom maxHeight='21.5vw' orient='hiddenLef' dfu={Haiopei2}>{Haiopei2}</ImageHolder>
        <ImageHolder zoom maxHeight='21.5vw' orient='hiddenRig' dfu={Anne} maxWidth='55%'>{Anne}</ImageHolder>
      </div>

      <div className={'image-row limited-width'}>
        <ImageHolder zoom maxHeight='49.5vw' orient='hiddenLef' dfu={Baby}>{Baby}</ImageHolder>
        <ImageHolder zoom maxHeight='49.5vw' orient='hiddenRig' dfu={Fresen}>{Fresen}</ImageHolder>
      </div>

      <div className={'image-row limited-width'}>
        <ImageHolder zoom maxHeight='23.7vw' orient='hiddenLef' dfu={Thore}>{Thore}</ImageHolder>
        <ImageHolder zoom maxHeight='23.7vw' orient='hiddenRig' dfu={AK47}>{AK47}</ImageHolder>
      </div>

      <div className={'limited-width'}>
        <ScrollAnimHolder orient='hiddenLef2'>
          <h2 style={{paddingTop: '55px'}}>3D-Modelling</h2>
        </ScrollAnimHolder>
      </div>

      <div className={'image-row limited-width'}>
        <ScrollAnimHolder orient='hiddenLef2'>
          <video src={IntroVideo} width="100% " controls={"controls"} autoPlay loop muted/>
        </ScrollAnimHolder>
      </div>

      <div className={'limited-width'}>
        <ScrollAnimHolder orient='hiddenLef2'>
          <h2 style={{paddingTop: '55px'}}>Digital</h2>
        </ScrollAnimHolder>
      </div>

      <div className={'image-row limited-width'}>
        <ScrollAnimHolder orient='hiddenLef2'>
          <video src={Video} width="100%" controls={"controls"} autoPlay loop/>
        </ScrollAnimHolder>
      </div>

      <div className={'image-row limited-width'}>
        <ImageHolder zoom maxHeight='24vw'   orient='hiddenLef' dfu={JLineart}>{JLineart}</ImageHolder>
        <ImageHolder zoom maxHeight='24vw'   orient='hiddenTop' dfu={LiS} maxWidth='52.5%' mL='-10%'>{LiS}</ImageHolder>
        <ImageHolder zoom maxHeight='24vw'   orient='hiddenRig' dfu={Praise}>{Praise}</ImageHolder>
      </div>

      <div className={'image-row limited-width'}>
        <ImageHolder zoom maxHeight='27vw'   orient='hiddenLef' dfu={IQ}>{IQ}</ImageHolder>
        <ImageHolder zoom maxHeight='27vw'   orient='hiddenRig' dfu={Nade}>{Nade}</ImageHolder>
        <ImageHolder zoom maxHeight='27vw'   orient='hiddenLef' dfu={Soldier}>{Soldier}</ImageHolder>
      </div>

      <div className={'image-row limited-width'}>
        <ImageHolder zoom maxHeight='21.5vw'   orient='hiddenBot' dfu={KSP}>{KSP}</ImageHolder>
        <ImageHolder zoom maxHeight='21.5vw'   orient='hiddenRig' dfu={Skull}>{Skull}</ImageHolder>
        <ImageHolder zoom maxHeight='21.5vw'   orient='hiddenRig' dfu={Artstyle3}>{Artstyle3}</ImageHolder>
      </div>

      {/*
      <div className={'image-row limited-width'}>
        <ImageHolder zoom maxHeight='21.5vw' orient='hiddenLef' dfu={Yuno}>{Yuno}</ImageHolder>
        <ImageHolder zoom maxHeight='21.5vw' orient='hiddenBot' dfu={Yuno2}>{Yuno2}</ImageHolder>
        <ImageHolder zoom maxHeight='21.5vw' orient='hiddenTop' dfu={Yuno3}>{Yuno3}</ImageHolder>
      </div>
      */}

      <div style={{height: '10vh'}}></div>
    </div>
)

function myFunction() {  
  var scrolltotop = document.scrollingElement.scrollTop;
  var target = document.getElementById("main1");
  var xvalue = "center";
  var factor = 0.0;
  var yvalue = scrolltotop * factor;
  target.style.backgroundPosition = xvalue + " " + yvalue + "px";
}

export default GalleryPage;