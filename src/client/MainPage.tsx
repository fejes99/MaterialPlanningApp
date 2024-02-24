import './Main.css';
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'

export const Main: React.FC = () => {
  return (
    <div className='container'>
      <main>
        <h1 className='text-3xl font-bold underline'>Hello world!</h1>
      </main>
    </div>
  );
};
export default Main;
