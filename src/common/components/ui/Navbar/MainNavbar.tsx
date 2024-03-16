import { Link } from 'react-router-dom';
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
          <Navbar.Link href='/purchase-requests' className='text-lg'>
            Zahtevi
          </Navbar.Link>
        </Navbar.Collapse>
      )}

      {isBuyer(user) && (
        <Navbar.Collapse>
          <Navbar.Link href='/purchase-requests' className='text-lg'>
            Zahtevi
          </Navbar.Link>
          <Navbar.Link href='/purchase-orders' className='text-lg'>
            Porudžbine
          </Navbar.Link>
          <Navbar.Link href='/suppliers' className='text-lg'>
            Dobavljači
          </Navbar.Link>
          <Navbar.Link href='/supplier-confirmations' className='text-lg'>
            Potvrde
          </Navbar.Link>
          <Navbar.Link href='/receipts' className='text-lg'>
            Prijemnice
          </Navbar.Link>
        </Navbar.Collapse>
      )}
    </Navbar>
  );
};

export default MainNavbar;
