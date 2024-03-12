import '../Main.css';
import React from 'react';
import { type User } from 'wasp/entities';
import { Button } from 'flowbite-react';
import { HiAdjustments, HiCloudDownload, HiUserCircle } from 'react-icons/hi';

interface Props {
  user: User;
}

const Main: React.FC<Props> = ({ user }) => {
  return (
    <>
      <h1 className='text-3xl font-bold underline'>Hello world!</h1>
    </>
  );
};

export default Main;
