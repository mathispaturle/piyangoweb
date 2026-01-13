import { Suspense } from 'react';
import TopupPage from './success/page';

export default function TopupProcessingPage() {
  return (

    <Suspense fallback={
      <div>Cargando modulo...</div>
    }>
      <TopupPage />
    </Suspense>
  )
}