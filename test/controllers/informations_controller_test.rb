require 'test_helper'

class InformationsControllerTest < ActionController::TestCase
  test "should get classes_info" do
    get :classes_info
    assert_response :success
  end

end
