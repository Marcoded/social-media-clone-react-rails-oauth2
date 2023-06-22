class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :omniauthable, omniauth_providers: [:google_oauth2]

  has_many :created_posts, class_name: 'Post', foreign_key: 'creator_id'
  has_many :comments, dependent: :destroy

  has_many :active_follows, class_name: 'Follow', foreign_key: 'follower_id', dependent: :destroy
  has_many :passive_follows, class_name: 'Follow', foreign_key: 'followed_id', dependent: :destroy

  has_many :following, through: :active_follows, source: :followed
  has_many :followers, through: :passive_follows, source: :follower

  has_many :sent_notifications, class_name: 'Notification', foreign_key: 'from_user_id'
  has_many :received_notifications, class_name: 'Notification', foreign_key: 'to_user_id'




  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.email = auth.info.email
      user.password = Devise.friendly_token[0,20]
      user.full_name = auth.info.name 
      user.avatar_url = auth.info.image
    end
  end

  def welcome_follow
    return unless User.find(1)
    Notification.create(from_user_id: 1, to_user_id: self.id, message: "Welcome to the community!")
  end


  def count_followers
    return self.followers.count
  end
  
  def count_followings
    return self.following.count
  end


end
