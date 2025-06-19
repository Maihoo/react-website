import React, { useState, useEffect, useRef } from 'react';

export default function ImageRow({ children }) {
  const [sizes, setSizes] = useState({});
  const wrapperRefs = useRef([]);
  const [visibleSet, setVisibleSet] = useState({});

  const handleLoadDimensions = (index, width, height, cutoff = '0') => {
    const parsed = typeof cutoff === 'string' && cutoff.trim().endsWith('%') ? parseFloat(cutoff) / 100 : 0;
    const visibleWidth = width * (1 - parsed);
    setSizes(prev => {
      if (prev[index]) return prev;
      return { ...prev, [index]: { width: visibleWidth, height } };
    });
  };

  const count = React.Children.count(children);
  const allLoaded = count === Object.keys(sizes).length;

  useEffect(() => {
    wrapperRefs.current = wrapperRefs.current.slice(0, count);
  }, [count]);

  useEffect(() => {
    const aspectRatio = window.innerWidth / window.innerHeight;
    const minWidth = 20;
    const maxWidth = 90;
    const minAR = 1;
    const maxAR = 2.5;
    const clampedAR = Math.min(Math.max(aspectRatio, minAR), maxAR);
    const width = maxWidth - ((clampedAR - minAR) / (maxAR - minAR)) * (maxWidth - minWidth);
    const widthPercent = width.toFixed(2) + '%';

    // Set CSS variable globally
    document.documentElement.style.setProperty('--dynamic-width', widthPercent);

    // Setup resize listener to update it dynamically
    function updateWidthPercent() {
      const aspectRatio = window.innerWidth / window.innerHeight;
      const clampedAR = Math.min(Math.max(aspectRatio, minAR), maxAR);
      const width = maxWidth - ((clampedAR - minAR) / (maxAR - minAR)) * (maxWidth - minWidth);
      const widthPercent = width.toFixed(2) + '%';
      document.documentElement.style.setProperty('--dynamic-width', widthPercent);
    }

    window.addEventListener('resize', updateWidthPercent);
    return () => window.removeEventListener('resize', updateWidthPercent);
  }, []);

  const [resizeTick, setResizeTick] = useState(0);

  useEffect(() => {
    const handleResize = () => setResizeTick(prev => prev + 1);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleSet((prev) => {
          const updated = { ...prev };
          entries.forEach(entry => {
            const index = parseInt(entry.target.dataset.index, 10);
            updated[index] = entry.isIntersecting;
          });
          return updated;
        });
      },
      { threshold: 0.0 }
    );

    wrapperRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      wrapperRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [allLoaded]);

  const getPropsForIndex = (index) => ({
    wrapperRef: (el) => {
      if (el) {
        el.dataset.index = index;
        wrapperRefs.current[index] = el;
      }
    },
    show: !!visibleSet[index],
  });

  if (!allLoaded) {
    return (
      <div className="image-row image-row-dynamic limited-width">
        {React.Children.map(children, (child, index) =>
          React.cloneElement(child, {
            onLoadDimensions: (w, h) => handleLoadDimensions(index, w, h, child.props.cutoff),
            ...getPropsForIndex(index),
          })
        )}
      </div>
    );
  }

  const aspectRatios = Object.values(sizes).map(({ width, height }) => width / height);
  const computedWidth = getComputedStyle(document.documentElement).getPropertyValue('--dynamic-width').trim();
  const containerPixelWidth = (parseFloat(computedWidth) / 100) * window.innerWidth;

  const gapInPx = 0.75 * parseFloat(getComputedStyle(document.documentElement).fontSize || 16);
  const totalGapWidth = gapInPx * count;
  const availableWidth = containerPixelWidth - totalGapWidth;

  const commonHeight = 200;
  const rawWidths = aspectRatios.map(ar => ar * commonHeight);
  const totalRawWidth = rawWidths.reduce((sum, w) => sum + w, 0);
  const scaleFactor = availableWidth / totalRawWidth;
  const scaledHeight = commonHeight * scaleFactor;

  const scaledChildren = React.Children.map(children, (child, index) => {
    const scaledWidth = rawWidths[index] * scaleFactor;
    return React.cloneElement(child, {
      wdth: `${scaledWidth}px`,
      maxHeight: `${scaledHeight}px`,
      onLoadDimensions: undefined,
      ...getPropsForIndex(index),
    });
  });

  return (
    <div className="image-row image-row-dynamic limited-width">
      {scaledChildren}
    </div>
  );
}
