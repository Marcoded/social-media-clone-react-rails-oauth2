class Comment < ApplicationRecord
  after_create :create_comment_notification
  belongs_to :post, dependent: :destroy
  belongs_to :user
  has_many :likes, as: :likeable


  def create_comment_notification
    commenter = self.user
    receiver = self.post.creator

    return if commenter == receiver

    Notification.create(
      from_user: commenter,
      to_user: receiver,
      notification_type: :commented_your_post
    )
  end
end
