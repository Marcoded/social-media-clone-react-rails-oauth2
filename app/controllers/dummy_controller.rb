class DummyController < ApplicationController
    skip_before_action :authenticate_user!, only: [:sign_in]
  
    def sign_in
      user = User.find_by(email: 'dummy@mail.com') 
      if user
        if sign_in(:user, user) 
          redirect_to root_path
        else
          redirect_to new_user_session_path, alert: 'Dummy user sign in failed' 
        end
      else
        redirect_to new_user_session_path, alert: 'Dummy user not found' 
      end
    end
  end