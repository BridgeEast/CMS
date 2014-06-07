class CreateTeachers < ActiveRecord::Migration
  def change
    create_table :teachers do |t|

      t.string :number
      t.string :name
      t.timestamps
    end
  end
end
