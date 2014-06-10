class CreateClassTables < ActiveRecord::Migration
  def change
    create_table :class_tables do |t|

      t.integer :class_info_id
      t.integer :course_id
      t.string :week_s
      t.string :week_e
      t.string :date
      t.string :hour
      t.timestamps
    end
  end
end
