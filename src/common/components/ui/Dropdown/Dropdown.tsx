import { Dropdown } from 'flowbite-react';

type Props = {
  label: string;
  values: string[];
  onClick?: () => void;
};

const DropdownMenu: React.FC<Props> = ({ label, values, onClick }) => (
  <div className='relative inline-block text-left h-full'>
    <div className='flex items-center'>
      <div className='mr-2'>{values.length}</div>
      <div className='border-r border-gray-300 h-6 mr-2' />
      <Dropdown
        className='max-h-40 overflow-y-auto'
        label={label}
        inline
        arrowIcon={values.length > 0}
        disabled={values.length === 0}
      >
        <div className='max-h-60 overflow-y-auto'>
          {values.map((value: string) => (
            <Dropdown.Item key={value} onClick={onClick}>
              {value}
            </Dropdown.Item>
          ))}
        </div>
      </Dropdown>
    </div>
  </div>
);

export default DropdownMenu;
