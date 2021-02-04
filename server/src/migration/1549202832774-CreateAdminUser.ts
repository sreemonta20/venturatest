import { MigrationInterface, QueryRunner, getRepository } from "typeorm";
import { User } from "../entity/User";

export class CreateAdminUser1547919837483 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    let user = new User();
    user.username = "admin";
    user.password = "admin";
    user.hashPassword();
    user.role = "ADMIN";
    const userRepository = getRepository(User);
    await userRepository.save(user);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
//// "start": "set debug=* && ts-node-dev --respawn --transpileOnly ./src/index.ts",

// let user = new User();
//     user.username = "sreemonta";
//     user.password = "sreemonta";
//     user.hashPassword();
//     user.role = "USER";
//     const userRepository = getRepository(User);
//     await userRepository.save(user);