import { FC } from 'react';

interface PropsModal {
  children: React.ReactNode | string | JSX.Element | JSX.Element[];
  isOpen: boolean;
  toggle: () => void;
}
const Modal: FC<PropsModal> = ({ children, isOpen, toggle }) => {
  return (
    <>
      {isOpen && (
        <div className='modal__owerlay fixed top-0 left-0 right-0 bottom-0 z-50 bg-zinc-900/70 flex justify-center items-center text-white' onClick={toggle}>
          <div className='modal__content max-w-8/12 min-h-24 bg-white text-zinc-950 rounded-md p-3 text-center' onClick={(e) => e.stopPropagation()}>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export { Modal };
