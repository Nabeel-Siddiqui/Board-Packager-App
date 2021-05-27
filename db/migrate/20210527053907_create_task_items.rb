class CreateTaskItems < ActiveRecord::Migration[6.1]
  def change
    create_table :task_items do |t|
      t.string :title
      t.string :description
      t.references :user, null: false, foreign_key: true
      t.boolean :complete, default: false

      t.timestamps
    end
  end
end
