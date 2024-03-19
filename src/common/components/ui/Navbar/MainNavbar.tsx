import { Link, NavLink } from 'react-router-dom';
import { Avatar, Button, Dropdown, Navbar } from 'flowbite-react';
import { logout, useAuth } from 'wasp/client/auth';
import { UserRole } from '../../../../user/types/UserRole';
import { isPlanner } from '../../../../user/helpers/isPlanner';
import { isBuyer } from '../../../../user/helpers/isBuyer';

const MainNavbar: React.FC = () => {
  const { data: user } = useAuth();

  return (
    <Navbar fluid rounded>
      <div />
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
            <Dropdown.Item onClick={logout}>Izloguj se</Dropdown.Item>
          </Dropdown>
        ) : (
          <>
            <Link to='/login'>
              <Button>Uloguj se</Button>
            </Link>
          </>
        )}
        <Navbar.Toggle />
      </div>
      {isPlanner(user) && (
        <Navbar.Collapse>
          <NavLink activeClassName='text-blue-500' to='/materials' className='text-lg'>
            Materijali
          </NavLink>
          <NavLink activeClassName='text-blue-500' to='/products' className='text-lg'>
            Proizvodi
          </NavLink>
          <NavLink activeClassName='text-blue-500' to='/production-plans' className='text-lg'>
            Proizvodni planovi
          </NavLink>
          <NavLink activeClassName='text-blue-500' to='/reservations' className='text-lg'>
            Rezervacije
          </NavLink>
          <NavLink activeClassName='text-blue-500' to='/purchase-requests' className='text-lg'>
            Zahtevi
          </NavLink>
        </Navbar.Collapse>
      )}

      {isBuyer(user) && (
        <Navbar.Collapse>
          <NavLink activeClassName='text-blue-500' to='/purchase-requests' className='text-lg'>
            Zahtevi
          </NavLink>
          <NavLink activeClassName='text-blue-500' to='/purchase-orders' className='text-lg'>
            Porudžbine
          </NavLink>
          <NavLink activeClassName='text-blue-500' to='/suppliers' className='text-lg'>
            Dobavljači
          </NavLink>
          <NavLink activeClassName='text-blue-500' to='/supplier-confirmations' className='text-lg'>
            Potvrde
          </NavLink>
          <NavLink activeClassName='text-blue-500' to='/receipts' className='text-lg'>
            Prijemnice
          </NavLink>
        </Navbar.Collapse>
      )}
    </Navbar>
  );
};

export default MainNavbar;
