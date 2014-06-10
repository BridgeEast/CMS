class Course < ActiveRecord::Base
  belongs_to :teacher
  has_many :class_tables
end
