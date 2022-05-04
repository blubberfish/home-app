import { Suspense } from 'react';
import { BrowserRouter, Routes } from 'react-router-dom';

/** @todo */
const Empty = () => null;

export default () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Empty />}>
        <Routes></Routes>
      </Suspense>
    </BrowserRouter>
  );
};
