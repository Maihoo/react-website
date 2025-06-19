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

    {/* PASTE TO HERE (remove FS) */}

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
        <ImageHolder zoom orient='hiddenRig' dfu={FSAnne}>{Anne}</ImageHolder>
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
        <ImageHolder zoom orient='hiddenTop' dfu={FSLiS}>{LiS}</ImageHolder>
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