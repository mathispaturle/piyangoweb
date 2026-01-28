import { Suspense } from 'react';
import { SignupForm } from '../../../components/signup-form';
import ProcessingModule from './processing';

export default function TopupProcessingPage() {
  return (

    <Suspense fallback={
      <div>Cargando modulo...</div>
    }>
      <ProcessingModule />
    </Suspense>
  )
}