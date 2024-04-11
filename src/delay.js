import React, { useState, useEffect } from 'react';

function DelayedRender({ delay, children }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [delay]);

  return isVisible ? children : null;
}

export default DelayedRender;
