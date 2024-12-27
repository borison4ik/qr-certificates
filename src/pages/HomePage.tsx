import { BookOpen } from 'lucide-react';
import { FC } from 'react';

const HomePage: FC = () => {
  return (
    <div className='h-screen w-full flex flex-col justify-center items-center'>
      <h2 className='text-gray-400 font-light text-center text-2xl mb-5'>CERTIFICATES SERVICE</h2>
      <BookOpen color='#9ca3af' />
    </div>
  );
};

export { HomePage };
