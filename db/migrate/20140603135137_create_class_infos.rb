class CreateClassInfos < ActiveRecord::Migration
  def change
    create_table :class_infos do |t|

      t.string :number
      t.integer :contain
      t.boolean :multimedia, :default => true 
      t.timestamps
    end
  end
end
