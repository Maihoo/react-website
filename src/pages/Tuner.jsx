import React from 'react';

function iframe() {
  return {
    __html: '<iframe title="Guitar Tuner" src="/projects/Tuner/index.html"  width="1920px" height="1080" frameborder="0"></iframe>'
  }
}

export default function Exercises() {
  return (
    <div>
        <div dangerouslySetInnerHTML={iframe()}/>
    </div>
  );
}