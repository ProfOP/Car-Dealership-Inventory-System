import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { userRepository } from '../repositories/userRepository.js';
import type { AuthUser } from '../types.js';

export const authService = {
  async register(email: string, password: string) {
    const normalized = email.toLowerCase();
    if (await userRepository.findByEmail(normalized)) throw Object.assign(new Error('An account with that email already exists'), { status: 409 });
    const user = await userRepository.create({ email: normalized, passwordHash: await bcrypt.hash(password, 12) });
    return issue(user);
  },
  async login(email: string, password: string) {
    const user = await userRepository.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) throw Object.assign(new Error('Invalid email or password'), { status: 401 });
    return issue(user);
  }
};
function issue(user: { id: number; email: string; role: 'USER' | 'ADMIN' }) {
  const payload: AuthUser = { id: user.id, email: user.email, role: user.role };
  return { token: jwt.sign(payload, env.JWT_SECRET, { expiresIn: '8h' }), email: user.email, role: `ROLE_${user.role}` };
}
