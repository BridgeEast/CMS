class ClassTable < ActiveRecord::Base
  belongs_to :course
  belongs_to :class_info
end
