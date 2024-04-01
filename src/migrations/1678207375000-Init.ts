import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1678207375000 implements MigrationInterface {
    name = 'Init1678207375000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`publication_status\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`name\` varchar(255) NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`publication_privacy\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`name\` varchar(255) NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            ALTER TABLE \`post\`
            ADD \`statusId\` int NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`post\`
            ADD \`privacyId\` int NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`user\`
            ADD \`profileImage\` varchar(255) NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`forum\` DROP FOREIGN KEY \`FK_a2e48fe1f94415536523e22d751\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`forum\` CHANGE \`commentsId\` \`commentsId\` varchar(36) NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_94a85bb16d24033a2afdd5df060\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_cfc14dc2cafa339954de748ebf3\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_cb0c4df2811596da3a173de9d0a\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`comment\` CHANGE \`content\` \`content\` longtext NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`comment\` CHANGE \`postId\` \`postId\` varchar(36) NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`comment\` CHANGE \`replyToId\` \`replyToId\` varchar(36) NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`comment\` CHANGE \`forumId\` \`forumId\` varchar(36) NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`message\` DROP FOREIGN KEY \`FK_575b24e003b8881e64fa53cd16d\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`message\` DROP FOREIGN KEY \`FK_bb5f53ce4099aec85c0f8ffd92a\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`message\` DROP FOREIGN KEY \`FK_445b786f516688cf2b81b8981b6\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`message\` DROP FOREIGN KEY \`FK_ab2f4f02c0d29f91e47d02e3b30\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`message\` CHANGE \`content\` \`content\` longtext NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`message\` CHANGE \`parentMessageId\` \`parentMessageId\` varchar(36) NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`message\` CHANGE \`messageTypeId\` \`messageTypeId\` varchar(36) NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`message\` CHANGE \`recipientId\` \`recipientId\` varchar(36) NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`message\` CHANGE \`discussionGroupId\` \`discussionGroupId\` varchar(36) NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`discussion_group\` DROP FOREIGN KEY \`FK_01b56917114e941f938862e9b96\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`discussion_group\` CHANGE \`messagesId\` \`messagesId\` varchar(36) NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`post\`
            ADD CONSTRAINT \`FK_465a7c1cd00c83b42a1fc21cf1b\` FOREIGN KEY (\`statusId\`) REFERENCES \`publication_status\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`post\`
            ADD CONSTRAINT \`FK_6e67c9caa6a0e2d80b15277fb49\` FOREIGN KEY (\`privacyId\`) REFERENCES \`publication_privacy\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`forum\`
            ADD CONSTRAINT \`FK_a2e48fe1f94415536523e22d751\` FOREIGN KEY (\`commentsId\`) REFERENCES \`comment\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`comment\`
            ADD CONSTRAINT \`FK_94a85bb16d24033a2afdd5df060\` FOREIGN KEY (\`postId\`) REFERENCES \`post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`comment\`
            ADD CONSTRAINT \`FK_cfc14dc2cafa339954de748ebf3\` FOREIGN KEY (\`replyToId\`) REFERENCES \`comment\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`comment\`
            ADD CONSTRAINT \`FK_cb0c4df2811596da3a173de9d0a\` FOREIGN KEY (\`forumId\`) REFERENCES \`forum\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`message\`
            ADD CONSTRAINT \`FK_575b24e003b8881e64fa53cd16d\` FOREIGN KEY (\`parentMessageId\`) REFERENCES \`message\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`message\`
            ADD CONSTRAINT \`FK_bb5f53ce4099aec85c0f8ffd92a\` FOREIGN KEY (\`messageTypeId\`) REFERENCES \`message_type\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`message\`
            ADD CONSTRAINT \`FK_445b786f516688cf2b81b8981b6\` FOREIGN KEY (\`recipientId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`message\`
            ADD CONSTRAINT \`FK_ab2f4f02c0d29f91e47d02e3b30\` FOREIGN KEY (\`discussionGroupId\`) REFERENCES \`discussion_group\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`discussion_group\`
            ADD CONSTRAINT \`FK_01b56917114e941f938862e9b96\` FOREIGN KEY (\`messagesId\`) REFERENCES \`message\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`discussion_group\` DROP FOREIGN KEY \`FK_01b56917114e941f938862e9b96\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`message\` DROP FOREIGN KEY \`FK_ab2f4f02c0d29f91e47d02e3b30\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`message\` DROP FOREIGN KEY \`FK_445b786f516688cf2b81b8981b6\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`message\` DROP FOREIGN KEY \`FK_bb5f53ce4099aec85c0f8ffd92a\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`message\` DROP FOREIGN KEY \`FK_575b24e003b8881e64fa53cd16d\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_cb0c4df2811596da3a173de9d0a\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_cfc14dc2cafa339954de748ebf3\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_94a85bb16d24033a2afdd5df060\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`forum\` DROP FOREIGN KEY \`FK_a2e48fe1f94415536523e22d751\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_6e67c9caa6a0e2d80b15277fb49\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_465a7c1cd00c83b42a1fc21cf1b\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`discussion_group\` CHANGE \`messagesId\` \`messagesId\` varchar(36) NULL DEFAULT 'NULL'
        `);
        await queryRunner.query(`
            ALTER TABLE \`discussion_group\`
            ADD CONSTRAINT \`FK_01b56917114e941f938862e9b96\` FOREIGN KEY (\`messagesId\`) REFERENCES \`message\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`message\` CHANGE \`discussionGroupId\` \`discussionGroupId\` varchar(36) NULL DEFAULT 'NULL'
        `);
        await queryRunner.query(`
            ALTER TABLE \`message\` CHANGE \`recipientId\` \`recipientId\` varchar(36) NULL DEFAULT 'NULL'
        `);
        await queryRunner.query(`
            ALTER TABLE \`message\` CHANGE \`messageTypeId\` \`messageTypeId\` varchar(36) NULL DEFAULT 'NULL'
        `);
        await queryRunner.query(`
            ALTER TABLE \`message\` CHANGE \`parentMessageId\` \`parentMessageId\` varchar(36) NULL DEFAULT 'NULL'
        `);
        await queryRunner.query(`
            ALTER TABLE \`message\` CHANGE \`content\` \`content\` longtext NULL DEFAULT 'NULL'
        `);
        await queryRunner.query(`
            ALTER TABLE \`message\`
            ADD CONSTRAINT \`FK_ab2f4f02c0d29f91e47d02e3b30\` FOREIGN KEY (\`discussionGroupId\`) REFERENCES \`discussion_group\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`message\`
            ADD CONSTRAINT \`FK_445b786f516688cf2b81b8981b6\` FOREIGN KEY (\`recipientId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`message\`
            ADD CONSTRAINT \`FK_bb5f53ce4099aec85c0f8ffd92a\` FOREIGN KEY (\`messageTypeId\`) REFERENCES \`message_type\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`message\`
            ADD CONSTRAINT \`FK_575b24e003b8881e64fa53cd16d\` FOREIGN KEY (\`parentMessageId\`) REFERENCES \`message\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`comment\` CHANGE \`forumId\` \`forumId\` varchar(36) NULL DEFAULT 'NULL'
        `);
        await queryRunner.query(`
            ALTER TABLE \`comment\` CHANGE \`replyToId\` \`replyToId\` varchar(36) NULL DEFAULT 'NULL'
        `);
        await queryRunner.query(`
            ALTER TABLE \`comment\` CHANGE \`postId\` \`postId\` varchar(36) NULL DEFAULT 'NULL'
        `);
        await queryRunner.query(`
            ALTER TABLE \`comment\` CHANGE \`content\` \`content\` longtext NULL DEFAULT 'NULL'
        `);
        await queryRunner.query(`
            ALTER TABLE \`comment\`
            ADD CONSTRAINT \`FK_cb0c4df2811596da3a173de9d0a\` FOREIGN KEY (\`forumId\`) REFERENCES \`forum\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`comment\`
            ADD CONSTRAINT \`FK_cfc14dc2cafa339954de748ebf3\` FOREIGN KEY (\`replyToId\`) REFERENCES \`comment\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`comment\`
            ADD CONSTRAINT \`FK_94a85bb16d24033a2afdd5df060\` FOREIGN KEY (\`postId\`) REFERENCES \`post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`forum\` CHANGE \`commentsId\` \`commentsId\` varchar(36) NULL DEFAULT 'NULL'
        `);
        await queryRunner.query(`
            ALTER TABLE \`forum\`
            ADD CONSTRAINT \`FK_a2e48fe1f94415536523e22d751\` FOREIGN KEY (\`commentsId\`) REFERENCES \`comment\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`user\` DROP COLUMN \`profileImage\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`post\` DROP COLUMN \`privacyId\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`post\` DROP COLUMN \`statusId\`
        `);
        await queryRunner.query(`
            DROP TABLE \`publication_privacy\`
        `);
        await queryRunner.query(`
            DROP TABLE \`publication_status\`
        `);
    }

}
