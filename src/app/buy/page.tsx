import { Suspense } from 'react';
import TopupModule from './topupModule';

export default function TopupProcessingPage() {
  return (

    <Suspense fallback={
      <div>Cargando modulo...</div>
    }>
      <TopupModule />
    </Suspense>
  )
}