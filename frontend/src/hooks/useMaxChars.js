import { useState, useEffect } from 'react';

function useMaxChars(mobileChars = 100, desktopChars = 200, breakpoint = 768) {
  const [maxChars, setMaxChars] = useState(
    window.innerWidth < breakpoint ? mobileChars : desktopChars
  );

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const onChange = e => {
      setMaxChars(e.matches ? mobileChars : desktopChars);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [mobileChars, desktopChars, breakpoint]);

  return maxChars;
}


export default useMaxChars;