class CreateClassInfos < ActiveRecord::Migration
  def change
    create_table :class_infos do |t|

      t.string :number
      t.string :address
      t.integer :contain
      t.boolean :multimedia, :default => true
      t.text :remark
      t.timestamps
    end
  end
end
