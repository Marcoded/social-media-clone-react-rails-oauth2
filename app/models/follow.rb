class Follow < ApplicationRecord
  after_create :create_notification

  belongs_to :follower, class_name: 'User'
  belongs_to :followed, class_name: 'User'

  def create_notification
    followed_user = User.find(followed_id)
    notification = Notification.create(
      from_user: follower,
      to_user: followed_user,
      notification_type: :is_following_you
    )
  end
end


