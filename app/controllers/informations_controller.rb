class InformationsController < ApplicationController
  def classes_info
  end
  def course_info

  end

  def query_class_info
    result = ClassTable.search(class_info_address_cont: params[:address], class_info_contain_gt: params[:contain], class_info_multimedia_eq: params[:multimedia], week_s_lteq: params[:week_s], week_e_gt: params[:week_e], date_cont: params[:date], hour_cont: params[:hour]).result
    items = result.collect do |item|
      { 
        :id => item.id,
        :number => item.class_info.number,
        :address => item.class_info.address,
        :contain => item.class_info.contain,
        :multimedia => item.class_info.multimedia,
        :remark => item.class_info.remark
      }
    end
    respond_to do |format|
      format.json{ render :json => { :result => items } }
    end
  end

  def query_course
    result = ClassTable.search(course_name_cont:params[:name], course_teacher_name_cont: params[:teacher], course_quantity_gt: params[:quantity], course_multimedia_eq: params[:multimedia], week_s_lteq: params[:week_s], week_e_gt: params[:week_e], date_cont: params[:date], hour_cont: params[:hour]).result
    items = result.collect do |item|
      { 
        :id => item.id,
        :number => item.course.number,
        :name => item.course.name,
        :teacher => item.course.teacher.name,
        :quantity => item.course.quantity,
        :multimedia => item.course.multimedia,
        :address => item.class_info.number
      }
    end
    respond_to do |format|
      format.json{ render :json => { :result => items } }
    end
  end
end
