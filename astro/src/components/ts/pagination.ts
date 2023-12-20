import { rows } from '../../../common/fakedata';
import { atom } from 'nanostores';

export const numPages = atom(Math.ceil(14/10));
export const currentPage = atom(2);
export let visibleRows = atom([...rows])
