import React from 'react';
import { Dropdown } from 'flowbite-react';

type Props = {
  label: string;
  values: string[];
  onClick?: () => void;
};

const DropdownMenu: React.FC<Props> = ({ label, values, onClick }) => (
  <div className='relative inline-block text-left'>
    <div className='flex items-center'>
      <div className='mr-2'>{values.length}</div>
      <div className='border-r border-gray-300 h-6 mr-2' />
      <Dropdown label={label} inline arrowIcon={values.length > 0} disabled={values.length === 0}>
        {values.map((value: String) => (
          <Dropdown.Item key={Math.random()} onClick={onClick}>{value}</Dropdown.Item>
        ))}
      </Dropdown>
    </div>
  </div>
);

export default DropdownMenu;
