class Api::V1::UsersController < ApplicationController
  def index
  end

  def show
    @user = User.find(params[:id])
    @posts = @user.created_posts

    respond_to do |format|
      format.json { render json: { user: @user.as_json(methods: [:count_followers, :count_followings]), posts: @posts.as_json(methods: :like_count) } }
      format.html { render :show }
    end
    
  end

  def me
    puts "getting current user ------------------------------------------------------------------"
    return unless current_user
    render json: { userId: current_user.id}
  end

end
