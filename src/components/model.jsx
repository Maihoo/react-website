import React from 'react';
import {  } from 'react-router-dom';
import ImageHolder from '../components/imageHolder';

const Model = ({children, name, model, result, download, ml1, ml2}) => (
  
  <div style={{ display: 'flex', overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
    <h1>{name}</h1>

    <div style={{ display: 'flex', width: '15vw', height: '15vw', overflow: 'hidden', marginTop: '1vw', marginLeft: '1vw'}}> 
      <ImageHolder dfu={model}  mL={ml1} src={model}>{model}</ImageHolder> 
    </div>
    <div style={{ display: 'flex', width: '15vw', height: '15vw', overflow: 'hidden', marginTop: '2vw', marginLeft: '1vw'}}> 
      <ImageHolder dfu={result} mL={ml2} src={result}>{result}</ImageHolder> 
    </div>
    <a href={download} style={{marginTop: '1vw', color: 'rgb(100, 100, 255)'}} download>⇓ DOWNLOAD ⇓</a> 
  </div>
)

export default Model;