import { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Routes } from '@blubberfish/frontend/routes'

const Empty = () => null

export function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Empty />}>
        <Routes />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
