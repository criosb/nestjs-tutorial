import { ROLES } from '../../constants';

export interface TokenPayload {
  sub: string;
  role: ROLES;
}

export interface RawDecodedToken {
  sub: string;
  role: string;
  iat: number;
  exp: number;
}

export interface DecodedToken {
  sub: string;
  role: string;
  isExpired: boolean;
}
