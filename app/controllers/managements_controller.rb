# -*- encoding : utf-8 -*-
class ManagementsController < ApplicationController
  def classes_manage
  end
  def course_manage
  end
  def table_manage
  end

  def get_classes_for_grid
    respond_to do |format|
      format.json{ render :json => { :result => ClassInfo.all } }
    end
  end

  def add_class_info
    params.permit!
    ClassInfo.create!(params[:class_info])
    render :json => {}
  end

  def delete_class
    ClassInfo.find(params[:id]).destroy
    render :json => {}
  end

  def get_course_for_grid
    result = Course.all.collect do |item|
      {
        :id => item.id,
        :number => item.number,
        :name => item.name,
        :teacher => item.teacher.try(:name),
        :quantity => item.quantity,
        :multimedia => item.multimedia,
        :remark => item.remark
      }
    end
    respond_to do |format|
      format.json{ render :json => { :result => result } }
    end
  end

  def create_course
    params.permit!
    Course.create!(params[:course])
    render :json => {}
  end

  def delete_course
    Course.find(params[:id]).destroy
    render :json => {}
  end

  def get_teacher_info
    respond_to do |format|
      format.json{ render :json => { :result => Teacher.all } }
    end
  end

  def get_class_table_for_grid
    result = ClassTable.all.collect do |item|
      {
        :id => item.id,
        :number => item.class_info.number,
        :name => item.course.name,
        :time => item.week_s + '-' + item.week_e+ '周 ' + item.date + ' ' + item.hour,
        :teacher => item.course.teacher.try(:name),
        :quantity => item.course.quantity,
        :multimedia => item.course.multimedia,
      }
    end
    respond_to do |format|
      format.json{ render :json => { :result => result } }
    end
  end

  def create_class_table
    params.permit!
    ClassTable.create!(params[:table])
    render :json => {}
  end

  def delete_class_table
    ClassTable.find(params[:id]).destroy
    render :json => {}
  end
end
