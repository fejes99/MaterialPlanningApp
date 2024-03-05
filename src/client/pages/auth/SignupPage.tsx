import { Link } from 'react-router-dom';
import { SignupForm } from '@wasp/auth/forms/Signup';

const SignupPage = () => {
  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <SignupForm
        additionalFields={[
          {
            name: 'name',
            label: 'Ime',
            type: 'input',
            validations: { required: 'Ime je obavezno' },
          },
          {
            name: 'surrname',
            label: 'Prezime',
            type: 'input',
            validations: { required: 'Prezime je obavezno' },
          },
          {
            name: 'role',
            label: 'Pozicija',
            type: 'input',
            validations: { required: 'Pozicija je obavezna' },
          },
        ]}
      />
      <br />
      <span>
        I already have an account (<Link to='/login'>go to login</Link>).
      </span>
    </div>
  );
};

export default SignupPage;
