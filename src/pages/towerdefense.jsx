import React from 'react';

function iframe() {
  return {
    __html: '<iframe title="gravity" src="/projects/TowerDefense/index.html" width="100%" height="1150px" frameborder="0"></iframe>'
  }
}

export default function Exercises() {
  return (
    <div>
        <div dangerouslySetInnerHTML={iframe()}/>
    </div>
  );
}