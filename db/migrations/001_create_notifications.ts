import type { Knex } from 'knex';
export async function up(knex: Knex) {
  await knex.schema.createTable('notifications', t => {
    t.uuid('id').primary().defaultTo(knex.fn.uuid());
    t.string('user_id').notNullable();
    t.string('topic').notNullable();
    t.string('channel').notNullable();
    t.string('status').notNullable().defaultTo('sent');
    t.jsonb('payload');
    t.timestamps(true, true);
  });
}
export async function down(knex: Knex) { await knex.schema.dropTable('notifications'); }
