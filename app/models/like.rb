class Like < ApplicationRecord
  after_create :create_like_notification
  belongs_to :user
  belongs_to :likeable, polymorphic: true

  validates :user_id, uniqueness: { scope: [:likeable_id, :likeable_type], message: "has already liked this element" }

  def create_like_notification
    post = self.likeable
  
    # Find the user who created the post
    creator = post.creator

    return if post.creator == self.user
  
    # Create the notification
    Notification.create(
      from_user: self.user,
      to_user: creator,
      notification_type: :liked_your_post
    )
  end
end
