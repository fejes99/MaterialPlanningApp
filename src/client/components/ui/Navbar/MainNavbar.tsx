import React from 'react';
import { Avatar, Dropdown, Navbar } from 'flowbite-react';

const MainNavbar: React.FC = () => (
  <Navbar fluid rounded>
    <Navbar.Brand href='/'>
      <img src='/logo.png' className='h-6 sm:h-9' alt='Material Planning App Logo' />
    </Navbar.Brand>
    <div className='flex md:order-2'>
      <Dropdown
        arrowIcon={false}
        inline
        label={<Avatar alt='User settings' placeholderInitials='PL' rounded />}
      >
        <Dropdown.Header>
          <span className='block text-sm'>Ime korisnika</span>
          <span className='block truncate text-sm font-medium'>email@korisnika.com</span>
        </Dropdown.Header>
        <Dropdown.Item>Dashboard</Dropdown.Item>
        <Dropdown.Item>Settings</Dropdown.Item>
        <Dropdown.Item>Earnings</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item>Sign out</Dropdown.Item>
      </Dropdown>
      <Navbar.Toggle />
    </div>
    <Navbar.Collapse>
      <Navbar.Link href='/materials' active className='text-lg'>
        Materijali
      </Navbar.Link>
      <Navbar.Link href='#' className='text-lg'>
        Proizvodi
      </Navbar.Link>
      <Navbar.Link href='#' className='text-lg'>
        Proizvodni planovi
      </Navbar.Link>
    </Navbar.Collapse>
  </Navbar>
);

export default MainNavbar;
