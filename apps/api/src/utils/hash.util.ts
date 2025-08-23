import * as bcrypt from 'bcrypt';

export class HashUtils {
  private static saltRounds = 5;

  static hash(content: string) {
    return bcrypt.hashSync(content, this.saltRounds);
  }

  static compare(content: string, hash: string) {
    return bcrypt.compare(content, hash);
  }
}
