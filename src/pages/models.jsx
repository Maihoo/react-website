import React from 'react';
import Model from '../components/model';

import Benchie from '../res/3D/results/benchie.jpg';
import Clips from '../res/3D/results/clips.jpg';
import Feels from '../res/3D/results/feels.jpg';
import Loony from '../res/3D/results/loony.jpg';
import Stands from '../res/3D/results/stands.jpg';
import Headset from '../res/3D/results/headset.jpg';
import Magazine from '../res/3D/results/magazine.jpg';
import TieFighter from '../res/3D/results/tiefighter2.jpg';
import CatSkull from '../res/3D/results/catskull.jpg';

import DLBenchie from '../res/3D/stl/benchie.stl';
import DLClips from '../res/3D/stl/benchie.stl';
import DLFeels from '../res/3D/stl/benchie.stl';
import DLLoony from '../res/3D/stl/benchie.stl';
import DLStands from '../res/3D/stl/benchie.stl';
import DLHeadset from '../res/3D/stl/benchie.stl';
import DLMagazine from '../res/3D/stl/benchie.stl';
import DLTieFighter from '../res/3D/stl/tiefighter.zip';
import DLCatSkull from '../res/3D/stl/catskull.zip';

import STLBenchie from '../res/3D/models/STLbenchie.jpg';
import STLClips from '../res/3D/models/STLclips.jpg';
import STLFeels from '../res/3D/models/STLfeels.jpg';
import STLLoony from '../res/3D/models/STLloony.jpg';
import STLStands from '../res/3D/models/STLstands.jpg';
import STLHeadset from '../res/3D/models/STLheadset.jpg';
import STLMagazine from '../res/3D/models/STLmagazine.jpg';
import STLTieFighter from '../res/3D/models/STLtiefighter.jpg';
import STLCatSkull from '../res/3D/models/STLcatskull.jpg';

const ModelPage = () => (
  <div>
    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', height:'40vw', alignItems: 'center', width: '100%', overflow: 'hidden', marginTop: '1vw'}}>
      <Model name={"Cat Skull"}             model={STLCatSkull}   result={CatSkull}   download={DLCatSkull}   ml1={'0.0vw'}  ml2={'0.0vw'}/>
      <Model name={"TieFighter for Alexa"}  model={STLTieFighter} result={TieFighter} download={DLTieFighter} ml1={'0.0vw'}  ml2={'0.0vw'}/>
      <Model name={"Battery Magazine"}      model={STLMagazine}   result={Magazine}   download={DLMagazine}   ml1={'0.0vw'}  ml2={'0.0vw'}/>
      <Model name={"Figure"}                model={STLFeels}      result={Feels}      download={DLFeels}      ml1={'0.0vw'}  ml2={'0.0vw'}/>
      <Model name={"Loony Plaque"}          model={STLLoony}      result={Loony}      download={DLLoony}      ml1={'0.0vw'}  ml2={'0.0vw'}/>
    </div>
    <hr size={1} width={'88%'} style={{marginTop: '1vw', marginBottom: '3vw'}}/>
    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', height:'40vw', alignItems: 'center', width: '100%', overflow: 'hidden', marginTop: '1vw'}}>
      <Model name={"3D Benchie"}            model={STLBenchie}    result={Benchie}    download={DLBenchie}    ml1={'0.0vw'}  ml2={'0.0vw'}/>
      <Model name={"Headset Holder"}        model={STLHeadset}    result={Headset}    download={DLHeadset}    ml1={'0.0vw'}  ml2={'0.0vw'}/>
      <Model name={"Stand"}                 model={STLStands}     result={Stands}     download={DLStands}     ml1={'0.0vw'}  ml2={'0.0vw'}/>
      <Model name={"Clip"}                  model={STLClips}      result={Clips}      download={DLClips}      ml1={'0.0vw'}  ml2={'0.0vw'}/>
    </div>
  </div>
);

export default ModelPage;