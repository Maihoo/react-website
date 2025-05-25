import React, {useEffect, useState, useRef} from 'react';

export default function ImageHolder({maxHeight, maxWidth, children, dfu, mL, wdth, orient, zoom = false}) {

  const handleMouseMove = (event) => {
    if (zoom) {
      const container = event.currentTarget;
      const image = imageRef.current;

      const rect = container.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;

      const dx = (x - 0.5) * 2;
      const dy = (y - 0.5) * 2;

      const distanceFromCenter = Math.sqrt(dx * dx + dy * dy) / Math.sqrt(2);

      const maxZoom = 2.0;
      const minZoom = 1.0;
      const zoomLevel = maxZoom - distanceFromCenter * (maxZoom - minZoom);
      const clampedZoom = Math.max(minZoom, Math.min(maxZoom, zoomLevel));

      const maxTranslate = (1 - 1 / clampedZoom) * 100 / 2;

      const translateX = -dx * maxTranslate;
      const translateY = -dy * maxTranslate;

      image.style.transform = `translate(-50%, -50%) scale(${clampedZoom}) translate(${translateX}%, ${translateY}%)`;
    }
  };

  const resetZoom = () => {
    if (imageRef.current && zoom) {
      imageRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
    }
  };

  const imageRef = useRef();

  const [hiddenRef] = useElementOnScreen({root: null, rootMargin: '0px', threshold: 1});

  return (
    <div className={'image-holder-wrapper'} style={{height: maxHeight, width: maxWidth}}>
      <div className={'image-holder-container ' + (zoom ? 'cursor-zoom' : '')} ref={hiddenRef} onMouseMove={handleMouseMove} onMouseLeave={resetZoom}>
        <img className={'image-holder-image show-target ' + orient + (zoom ? ' cursor-zoom-image' : '')} ref={imageRef} style={{width: wdth, marginLeft: mL}} data-full-url={dfu} src={children} alt=""/>
      </div>
    </div>
  );
}

const useElementOnScreen = (options) => {
  const hiddenRef = React.createRef();
  const [hidden] = useState(false);

  useEffect(() => {
    if (hiddenRef.current) observer.observe(hiddenRef.current)

    return () => {
      if (hiddenRef.current) {
        // eslint-disable-next-line
        observer.unobserve(hiddenRef.current);
        console.log('Observer Disconnected.');
      }
    }
  }, [hiddenRef, options]);

  return [hiddenRef, hidden];
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    let holder = entry.target.closest('.image-holder-wrapper');
    if (holder) {
      if (entry.isIntersecting) {
        holder.classList.add('show');
      } else {
        holder.classList.remove('show');
      }
    }
  });
});