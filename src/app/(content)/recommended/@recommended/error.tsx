'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error('Error in SomePage:', error);
  }, [error]);

  return (
    <div className="p-5 text-center">
      <h2 className="text-red-500 text-xl font-bold">Oops! Something went wrong.</h2>
      <p>{error.message}</p>
      <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded" onClick={reset}>
        Try again
      </button>
    </div>
  );
}
