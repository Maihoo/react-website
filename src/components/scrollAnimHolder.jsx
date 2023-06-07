import React, {useEffect, useState} from 'react';

export default function ScrollAnimHolder({maxWidth, maxHeight, children, mL, padding, orient}) {

  const [hiddenRef2] = useElementOnScreen({
    root: null,
    rootMargin: "0px",
    threshold: 1
  });
 
  return (
    <div style={{marginLeft: mL, width: maxWidth, height: maxHeight, display: 'flex', overflow: 'visible'}}>
      <div ref={hiddenRef2} style={{marginLeft: padding, overflow: 'visible'}}>
        <div className={orient}> {children} </div>
      </div>
    </div>
  );
}


const useElementOnScreen = (options) => {
  const hiddenRef2 = React.createRef();
  const [hidden] = useState(false);

  useEffect(() => {
    if(hiddenRef2.current) observer.observe(hiddenRef2.current)

    return () => {
      if(hiddenRef2.current) {
        // eslint-disable-next-line
        observer.unobserve(hiddenRef2.current);
        console.log("Observer Disconnected.");
      }
    }
  }, [hiddenRef2, options]);

  return [hiddenRef2, hidden];
}


const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    //console.log("observer: " + entry);
    if(entry.isIntersecting) {
      //entry.target.classList.add('show');
      entry.target.firstChild.classList.add('show');
      //console.log('visible');
    } else {
      //entry.target.classList.remove('show');
      entry.target.firstChild.classList.remove('show');
      //console.log('invisible');
    }
  });
});