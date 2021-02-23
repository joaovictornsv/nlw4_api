import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsers1614081831979 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "users",
      columns: [
        {
          name: "id",
          type: "int",
          isPrimary: true,
          isNullable: false,
        },
        {
          name: "name",
          type: "string",
          isNullable: false
        },
        {
          name: "email",
          type: "varchar",
          isNullable: false
        },
        {
          name: "create_at",
          type: "timestamp",
          default: "now()",
        }
      ]
    }), true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }

}
