import React from 'react';

function iframe() {
  return {
    __html: '<iframe title="playground" src="/projects/js/index.html"  width="1920px" height="650px" frameborder="0"></iframe>'
  }
}

export default function Exercises() {
  return (
    <div>
        <div dangerouslySetInnerHTML={iframe()}/>
    </div>
  );
}