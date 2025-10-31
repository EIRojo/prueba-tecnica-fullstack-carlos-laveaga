'use client';

import { useEffect } from 'react';

export default function Home() {
  // TODO: Implement product listing page with fetch from backend
  useEffect(() => {
    fetch('http://localhost:3001/productos')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);
  return <div></div>;
}
