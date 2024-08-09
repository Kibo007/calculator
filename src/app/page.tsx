import { Calculator } from '../components/Calculator';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Calculator',
  description: 'Just a simple calculator',
  generator: 'Next.js',
  applicationName: 'Calculator',
  referrer: 'origin-when-cross-origin',
  keywords: ['Calculator', 'React', 'Typescript'],
  authors: [
    { name: 'Bojan' },
    { name: 'Bojan', url: 'https://github.com/Kibo007' },
  ],
};

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Calculator />
    </div>
  );
}
