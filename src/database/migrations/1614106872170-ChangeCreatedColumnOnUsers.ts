import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class ChangeCreatedColumnOnUsers1614106872170 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.renameColumn('users', 'create_at', 'created_at');
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.renameColumn('users', 'created_at', 'create_at');
	}
}
