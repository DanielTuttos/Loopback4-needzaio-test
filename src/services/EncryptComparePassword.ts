import {compare, genSalt, hash} from 'bcryptjs';

export class EncryptComparePassword {

  rounds: number;

  constructor() {
    this.rounds = 10;
  }


  async encryptPassword(password: string) {
    const salt = await genSalt(this.rounds);
    return hash(password, salt);
  }

  async comparePassword(password: string, passwordEncrypt: string): Promise<boolean> {
    const passwordIsMatch = await compare(password, passwordEncrypt);
    return passwordIsMatch;
  }

}
