import { Metadata } from 'next';
import { Suspense } from 'react';
import { Container, Header } from '@/components/shared';

export const metadata: Metadata = {
  title: 'WBM pizza checkout',
  description: 'You can doing your order there'
}


export default function CheckOutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <main className='min-h-screen bg-[#F4F1EE]'>
      <Suspense>
        <Header hasCart={false} hasSearch={false} className="border-b-gray-200"  />
      </Suspense>
        <Container>
          {children}
        </Container>
      
    </main>

  );
}