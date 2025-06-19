import React, { useRef } from 'react';

export default function ImageHolder({ children, dfu, mL, wdth, orient, zoom = false, onLoadDimensions, wrapperRef, show }) {
  const imageRef = useRef();

  const handleMouseMove = (event) => {
    if (!zoom) return;
    const container = event.currentTarget;
    const image = imageRef.current;

    const rect = container.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const dx = (x - 0.5) * 2;
    const dy = (y - 0.5) * 2;
    const distanceFromCenter = Math.sqrt(dx * dx + dy * dy) / Math.sqrt(2);

    const zoomLevel = 2.0 - distanceFromCenter * (2.0 - 1.0);
    const clampedZoom = Math.max(1.0, Math.min(2.0, zoomLevel));
    const maxTranslate = (1 - 1 / clampedZoom) * 100 / 2;
    const translateX = -dx * maxTranslate;
    const translateY = -dy * maxTranslate;

    image.style.transform = `translate(-50%, -50%) scale(${clampedZoom}) translate(${translateX}%, ${translateY}%)`;
  };

  const resetZoom = () => {
    if (zoom && imageRef.current) {
      imageRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
    }
  };

  return (
    <div ref={wrapperRef} className={`image-holder-wrapper${show ? ' show' : ''}`}>
      <div className={`image-holder-container ${zoom ? 'cursor-zoom' : ''}`} onMouseMove={handleMouseMove} onMouseLeave={resetZoom}>
        <img className={`image-holder-image show-target ${orient}${zoom ? ' cursor-zoom-image' : ''}`}
          ref={imageRef} style={{width: wdth, marginLeft: mL}} data-full-url={dfu} src={children} alt=""
          onLoad={(e) => {
            if (typeof onLoadDimensions === 'function') {
              onLoadDimensions(e.target.naturalWidth, e.target.naturalHeight);
            }
          }}
        />
      </div>
    </div>
  );
}
