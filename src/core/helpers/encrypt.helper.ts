import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class EncryptHelper {
  async hash(str: string, saltRounds = 10): Promise<string> {
    return await bcrypt.hash(str, saltRounds);
  }

  async compare(str: string, hash: string): Promise<boolean> {
    return bcrypt.compare(str, hash);
  }

  compareSync(str: string, hash: string): boolean {
    return bcrypt.compareSync(str, hash);
  }

  hashSync(str: string, saltRounds = 10): string {
    return bcrypt.hashSync(str, saltRounds);
  }
}
