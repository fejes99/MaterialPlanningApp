import { UserRole } from '../../shared/user/types.js';
import { defineAdditionalSignupFields } from '@wasp/auth/index.js';

export const fields = defineAdditionalSignupFields({
  name: async (data) => {
    const name = data.name;
    if (typeof name !== 'string') {
      throw new Error('Name je obavezno');
    }
    if (name.length < 2) {
      throw new Error('Ime mora da sadrži minimum 2 karaktera');
    }
    return name;
  },
  surrname: async (data) => {
    const surrname = data.surrname;
    if (typeof surrname !== 'string') {
      throw new Error('Prezime je obavezno');
    }
    if (surrname.length < 2) {
      throw new Error('Ime mora da sadrži minimum 2 karaktera');
    }
    return surrname;
  },
  role: async (data) => {
    const role = data.role;

    if (typeof role !== 'string') {
      throw new Error('Pozicija je obavezno');
    }
    if (role !== UserRole.Planner && role !== UserRole.Buyer) {
      throw new Error('Ne postoji ta pozicija, izaberite između planera i nabavljača');
    }
    return role;
  },
});
