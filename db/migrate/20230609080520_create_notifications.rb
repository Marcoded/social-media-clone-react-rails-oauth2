class CreateNotifications < ActiveRecord::Migration[7.0]
  def change
    create_table :notifications do |t|
      t.references :from_user, null: false, foreign_key: { to_table: :users }
      t.references :to_user, null: false, foreign_key: { to_table: :users }
      t.references :to_post, foreign_key: { to_table: :posts }
      t.text :message
      t.boolean :read
      t.integer :notification_type

      t.timestamps
    end
  end
end
