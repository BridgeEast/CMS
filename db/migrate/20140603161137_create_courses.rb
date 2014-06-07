class CreateCourses < ActiveRecord::Migration
  def change
    create_table :courses do |t|

      t.integer :class_info_id
      t.date :time
      t.integer :teacher_id
      t.integer :quantity
      t.boolean :multimedia
      t.timestamps
    end
  end
end
