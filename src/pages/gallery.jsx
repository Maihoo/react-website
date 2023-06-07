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

    <div className={'seventyfive'}>
      <ScrollAnimHolder orient='hiddenLef2'> <h3>Fullsize Image Gallery</h3> </ScrollAnimHolder> 
    </div>

    <div className={'seventyfive'}>
      <ScrollAnimHolder orient='hiddenLef2'> <h2>Oil Paintings</h2> </ScrollAnimHolder> 
    </div>

    <div className={'Row seventyfive'}>
      <ImageHolder maxWidth='38%'   maxHeight='35vw'    dfu={Annika}      orient='hiddenLef' mL='0.0vw' >{Annika}</ImageHolder>
      <ImageHolder maxWidth='62%'   maxHeight='35vw'    dfu={Manni}       orient='hiddenRig' mL='0.5vw'>{Manni}</ImageHolder>
    </div>

    <div className={'Row seventyfive'} style={{marginTop: '0.5vw'}}>
      <ImageHolder maxWidth='30%'   maxHeight='22.2vw'  dfu={Pinup}       orient='hiddenLef' mL='0.0vw'>{Pinup}</ImageHolder>
      <ImageHolder maxWidth='40%'   maxHeight='22.2vw'  dfu={JTraining}   orient='hiddenTop' mL='0.5vw'>{JTraining}</ImageHolder>
      <ImageHolder maxWidth='30%'   maxHeight='22.2vw'  dfu={Haiopei}     orient='hiddenRig' mL='0.5vw'>{Haiopei}</ImageHolder>
    </div>

    <div className={'Row seventyfive'} style={{marginTop: '0.5vw'}}>
      <ImageHolder maxWidth='58%'   maxHeight='51vw'    dfu={Bismarck}    orient='hiddenLef' mL='0.0vw'>{Bismarck}</ImageHolder>
      <ImageHolder maxWidth='55%'   maxHeight='51vw'    dfu={Julia}       orient='hiddenRig' mL='0.5vw'>{Julia}</ImageHolder>
    </div>

    <div className={'Row seventyfive'} style={{marginTop: '0.5vw'}}>
      <ImageHolder maxWidth='64%'   maxHeight='34vw'    dfu={Dust2}       orient='hiddenLef' mL='0.0vw' >{Dust2}</ImageHolder>
      <ImageHolder maxWidth='37%'   maxHeight='34vw'    dfu={PinoPrinz}   orient='hiddenRig' mL='0.5vw'>{PinoPrinz}</ImageHolder>
    </div>

    <div className={'Row seventyfive'} style={{marginTop: '0.5vw'}}>
      <ImageHolder maxWidth='40%'   maxHeight='35.3vw'  dfu={Mi}          orient='hiddenLef' mL='0.0vw'>{Mi}</ImageHolder>
      <ImageHolder maxWidth='60%'   maxHeight='35.3vw'  dfu={Paps}        orient='hiddenRig' mL='0.5vw'>{Paps}</ImageHolder>
    </div>

    <div className={'seventyfive'}>
      <ScrollAnimHolder orient='hiddenLef2'> <h2 style={{paddingTop: '55px'}}>Drawings</h2> </ScrollAnimHolder> 
    </div>

    <div className={'Row seventyfive'} style={{marginTop: '0.5vw'}}>
      <ImageHolder maxWidth='50%' maxHeight='53vw'      dfu={Stine}       orient='hiddenLef' mL='0.0vw' >{Stine}</ImageHolder>
      <ImageHolder maxWidth='50%' maxHeight='53vw'      dfu={Timmermann}  orient='hiddenRig' mL='0.5vw'>{Timmermann}</ImageHolder>
    </div>

    <div className={'Row seventyfive'} style={{marginTop: '0.5vw'}}>
      <ImageHolder maxWidth='50%' maxHeight='28vw'      dfu={Haiopei2}      orient='hiddenLef' mL='0.0vw'>{Haiopei2}</ImageHolder>
      <ImageHolder maxWidth='50%' maxHeight='28vw'      dfu={Anne} p='-6vw' orient='hiddenRig' mL='0.5vw'>{Anne}</ImageHolder>
    </div>

    <div className={'Row seventyfive'} style={{marginTop: '0.5vw'}}>
      <ImageHolder maxWidth='50%' maxHeight='57vw'      dfu={Baby}        orient='hiddenLef' mL='0.0vw' >{Baby}</ImageHolder>
      <ImageHolder maxWidth='50%' maxHeight='57vw'      dfu={Fresen}      orient='hiddenRig' mL='0.5vw'>{Fresen}</ImageHolder>
    </div>

    <div className={'Row seventyfive'} style={{marginTop: '0.5vw'}}>
      <ImageHolder maxWidth='49%' maxHeight='27.5vw'    dfu={Thore}       orient='hiddenLef' mL='0.0vw'>{Thore}</ImageHolder>
      <ImageHolder maxWidth='55%' maxHeight='27.5vw'    dfu={AK47}        orient='hiddenRig' mL='0.5vw'>{AK47}</ImageHolder>
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
      <ImageHolder maxWidth='30%' maxHeight='28vw'      dfu={JLineart}    orient='hiddenLef' mL='0.0vw'>{JLineart}</ImageHolder>
      <ImageHolder maxWidth='64%' maxHeight='28vw'      dfu={LiS}         orient='hiddenTop' mL='0.5vw' p='-3.5vw'>{LiS}</ImageHolder>
      <ImageHolder maxWidth='26%' maxHeight='28vw'      dfu={Praise}      orient='hiddenRig' mL='0.5vw'>{Praise}</ImageHolder>
    </div>

    <div className={'Row seventyfive'} style={{marginTop: '0.5vw'}}>
      <ImageHolder maxWidth='25%' maxHeight='31vw'      dfu={IQ}          orient='hiddenLef' mL='0.0vw'>{IQ}</ImageHolder>
      <ImageHolder maxWidth='40%' maxHeight='31vw'      dfu={KSP}         orient='hiddenBot' mL='0.5vw'>{KSP}</ImageHolder>
      <ImageHolder maxWidth='40%' maxHeight='31vw'      dfu={Nade}        orient='hiddenRig' mL='0.5vw'>{Nade}</ImageHolder>
    </div>

    <div className={'Row seventyfive'} style={{marginTop: '0.5vw'}}>
      <ImageHolder maxWidth='34%' maxHeight='25vw'      dfu={Yuno}        orient='hiddenLef' mL='0.0vw'>{Yuno}</ImageHolder>
      <ImageHolder maxWidth='34%' maxHeight='25vw'      dfu={Yuno2}       orient='hiddenBot' mL='0.5vw'>{Yuno2}</ImageHolder>
      <ImageHolder maxWidth='34%' maxHeight='25vw'      dfu={Yuno3}       orient='hiddenTop' mL='0.5vw'>{Yuno3}</ImageHolder>
    </div>

    <div className={'Row seventyfive'} style={{marginTop: '0.5vw'}}>
      <ImageHolder maxWidth='33%' maxHeight='27vw'      dfu={Soldier}     orient='hiddenLef' mL='0.0vw'>{Soldier}</ImageHolder>
      <ImageHolder maxWidth='40%' maxHeight='27vw'      dfu={Skull}       orient='hiddenBot' mL='0.5vw'>{Skull}</ImageHolder>
      <ImageHolder maxWidth='40%' maxHeight='27vw'      dfu={Artstyle3}   orient='hiddenRig' mL='0.5vw'>{Artstyle3}</ImageHolder>
    </div>

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