class ChangeColumnFromCourse < ActiveRecord::Migration
  def change
    remove_column :courses, :time
    remove_column :courses, :class_info_id
    add_column :courses, :name, :string
  end
end
