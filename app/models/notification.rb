class Notification < ApplicationRecord
  after_create :set_content, :set_read_to_false
  

  enum notification_type: { is_following_you: 0, liked_your_post: 1, commented_your_post: 2 }

  belongs_to :from_user, class_name: 'User'
  belongs_to :to_user, class_name: 'User'

  def set_content
    if is_following_you?
      self.message = "#{from_user.full_name.split(' ')[0]} is following you"
    elsif liked_your_post?
      self.message = "#{from_user.full_name.split(' ')[0]} liked your post"
    elsif commented_your_post?
      self.message = "#{from_user.full_name.split(' ')[0]}commented your post"
    end

    save
  end

  def set_read_to_false
    self.read = false
    self.save
  end
end
