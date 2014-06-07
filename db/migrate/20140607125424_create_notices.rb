class CreateNotices < ActiveRecord::Migration
  def change
    create_table :notices do |t|

      t.integer :class_info_id
      t.integer :quantity
      t.boolean :multimedia
      t.string :week
      t.string :date
      t.string :hour
      t.timestamps
    end
  end
end
