import React from 'react';

function iframe() {
    return {
      __html: '<iframe title="gravity" src="/projects/gravity/gravity.html"  width="1920px" height="1150px" frameBorder="0" sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-forms allow-pointer-lock"></iframe>'
    }
  }

export default function Exercises() {
  return (
      <div>
          <div dangerouslySetInnerHTML={iframe()} />
      </div>)
}