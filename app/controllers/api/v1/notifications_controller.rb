class Api::V1::NotificationsController < ApplicationController
  def index
    @notifications = Notification.where(to_user_id: current_user.id,)
    @notifications = @notifications.order(created_at: :desc) 

    notifications_with_user = @notifications.map do |notification|
      notification.as_json.merge(from_user: User.find(notification.from_user_id))
    end

    render json: notifications_with_user
  end


  def set_read
    @notification = Notification.find(params[:id])
    @notification.update(read: true)
  end
end
