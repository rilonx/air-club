import { Plane } from '@app/shared/models';
import { Pilot } from '@app/shared/models';

export interface Airport {
  id?: number;
  code: string;
  name: string;
  address: string;
  planes: Plane[];
  pilots: Pilot[];
}
