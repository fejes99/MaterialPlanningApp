import './Main.css';
import { User } from '@wasp/entities';

interface Props {
  user: User;
}

const Main: React.FC<Props> = ({ user }) => {
  return <h1>Pocetna stranica</h1>;
};

export default Main;
