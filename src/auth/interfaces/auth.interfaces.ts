import { ROLES } from '../../constants';

export interface TokenPayload {
  sub: string;
  role: ROLES;
}
