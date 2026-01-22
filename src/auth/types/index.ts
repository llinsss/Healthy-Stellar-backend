import { JwtPayload } from '../services/auth-token.service';

export interface AuthenticatedRequest {
  user?: JwtPayload;
  sessionId?: string;
}
