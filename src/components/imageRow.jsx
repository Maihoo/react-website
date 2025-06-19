import React, { useState, useEffect, useRef } from 'react';

export default function ImageRow({ children }) {
  const [sizes, setSizes] = useState({});
  const wrapperRefs = useRef([]);
  const [visibleSet, setVisibleSet] = useState({});

  const handleLoadDimensions = (index, width, height) => {
    setSizes(prev => {
      if (prev[index]) return prev;
      return { ...prev, [index]: { width, height } };
    });
  };

  const count = React.Children.count(children);
  const allLoaded = count === Object.keys(sizes).length;

  useEffect(() => {
    wrapperRefs.current = wrapperRefs.current.slice(0, count);
  }, [count]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleSet((prev) => {
          const updated = { ...prev };
          entries.forEach(entry => {
            const index = parseInt(entry.target.dataset.index, 10);
            updated[index] = entry.isIntersecting; // ✅ set true or false
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
      <div className="image-row image-row-dynamic limited-width" style={{ display: 'flex', gap: '0.75rem' }}>
        {React.Children.map(children, (child, index) =>
          React.cloneElement(child, {
            onLoadDimensions: (w, h) => handleLoadDimensions(index, w, h),
            ...getPropsForIndex(index),
          })
        )}
      </div>
    );
  }

  const aspectRatios = Object.values(sizes).map(({ width, height }) => width / height);
  const totalTargetWidth = window.innerWidth * 0.65;

  const gapInPx = 0.75 * parseFloat(getComputedStyle(document.documentElement).fontSize || 16);
  const totalGapWidth = gapInPx * (count - 1);
  const availableWidth = totalTargetWidth - totalGapWidth;

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
    <div className="image-row image-row-dynamic limited-width" style={{ display: 'flex', gap: '0.75rem' }}>
      {scaledChildren}
    </div>
  );
}
