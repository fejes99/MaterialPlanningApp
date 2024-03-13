import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Button, Dropdown, Navbar } from 'flowbite-react';
import { logout, useAuth } from 'wasp/client/auth';
import { UserRole } from '../../../../user/types/UserRole';

const MainNavbar: React.FC = () => {
  const { data: user } = useAuth();

  return (
    <Navbar fluid rounded>
      {/* <Navbar.Brand href='/'>
        <img src='/logo.png' className='h-6 sm:h-9' alt='Material Planning App Logo' />
      </Navbar.Brand> */}
      <div className='flex md:order-2'>
        {user ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt='User settings'
                placeholderInitials={`${user.name?.charAt(0).toUpperCase() || ''}${
                  user.surrname?.charAt(0).toUpperCase() || ''
                }`}
                rounded
              />
            }
          >
            <Dropdown.Header>
              <span className='block text-sm'>
                {user.name} {user.surrname}
              </span>
              <span className='block truncate text-sm font-medium'>{user.role}</span>
            </Dropdown.Header>
            <Dropdown.Item>Dashboard</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={logout}>Izloguj se</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to='/login'>
            <Button>Uloguj se</Button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>
      {user && user.role === UserRole.Planner && (
        <Navbar.Collapse>
          <Navbar.Link href='/materials' className='text-lg'>
            Materijali
          </Navbar.Link>
          <Navbar.Link href='/products' className='text-lg'>
            Proizvodi
          </Navbar.Link>
          <Navbar.Link href='/production-plans' className='text-lg'>
            Proizvodni planovi
          </Navbar.Link>
          <Navbar.Link href='/reservations' className='text-lg'>
            Rezervacije
          </Navbar.Link>
        </Navbar.Collapse>
      )}
    </Navbar>
  );
};

export default MainNavbar;
