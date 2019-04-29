import { Pilot } from '@app/shared/models/pilot';

export interface Plane {
  id?: number;
  code: string;
  type: string;
  number: string;
  brand: string;
  model: string;
  pilots: Pilot[];
}
