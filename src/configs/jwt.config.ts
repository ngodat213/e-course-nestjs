import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  global: true,
  secretKey: process.env.JWT_SECRET_KEY || 'hydracoder1993744',
  expiresIn: process.env.JWT_EXPIRES_IN || '7d',
}));