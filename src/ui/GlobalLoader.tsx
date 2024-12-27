import { FC } from 'react';
import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import Loader from './Loader';

const GlobalLoader: FC = () => {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  return isFetching || isMutating ? (
    <div className='flex h-8 w-8 items-center justify-center'>
      <Loader />
    </div>
  ) : null;
};

export { GlobalLoader };
