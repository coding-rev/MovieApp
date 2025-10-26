'use client';

import React from 'react'

export default function useMain() {
    const [innerwidth, setInnerWidth] = React.useState<number>(0);

    React.useEffect(() => {
        function handleResize() {
            setInnerWidth(window.innerWidth);
        }
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);
  return {innerwidth};
}
