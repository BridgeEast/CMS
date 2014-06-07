class CreateCourses < ActiveRecord::Migration
  def change
    create_table :courses do |t|

      t.string :number
      t.string :name
      t.integer :teacher_id
      t.integer :quantity
      t.boolean :multimedia
      t.text :remark
      t.timestamps
    end
  end
end
