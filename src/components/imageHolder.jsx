import React, {useEffect, useState} from 'react';

export default function ImageHolder({maxWidth, maxHeight, children, dfu, mL, p, wdth, orient}) {

  const [hiddenRef] = useElementOnScreen({
    root: null,
    rootMargin: "0px",
    threshold: 1
  });
 
  return (
    <div style={{marginLeft: mL, width: maxWidth, height: maxHeight, display: 'flex', overflow: 'hidden'}}>
      <div ref={hiddenRef} style={{marginLeft: p, overflow: 'hidden'}}>
        <img className={orient} style={{position: 'relative', height: '100%', width: wdth}} data-full-url={dfu} src={children} alt="" />
      </div>
    </div>
  );
}


const useElementOnScreen = (options) => {
  const hiddenRef = React.createRef();
  const [hidden] = useState(false);

  useEffect(() => {
    if(hiddenRef.current) observer.observe(hiddenRef.current)

    return () => {
      if(hiddenRef.current) {
        // eslint-disable-next-line
        observer.unobserve(hiddenRef.current);
        console.log("Observer Disconnected.");
      }
    }
  }, [hiddenRef, options]);

  return [hiddenRef, hidden];
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