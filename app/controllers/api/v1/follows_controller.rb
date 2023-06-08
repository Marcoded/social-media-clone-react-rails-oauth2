class Api::V1::FollowsController < ApplicationController
  def index
  end

  def show
    puts "params[:user_id]: #{params[:user_id]}"
    puts "current_user: #{current_user.inspect}"
  
    @follow = Follow.find_by(follower: current_user, followed: params[:user_id])
    @followed_back = Follow.find_by(follower: params[:user_id].to_i, followed: current_user)
  
    puts "@follow: #{@follow&.inspect}"
    puts "@followed_back: #{@followed_back&.inspect}"
  
    render json: {
      follow: {
        exists: @follow.present?,
        id: @follow&.id
      },
      followed_back: {
        exists: @followed_back.present?,
        id: @followed_back&.id
      }
    }
  end
  

  def create
    @follower = current_user
    @followed = User.find(params[:user_id])
  
    @follow_exists = Follow.exists?(follower: @current_user, followed: @followed)
  
    unless @follow_exists
      @new_follow = Follow.create(follower: @current_user, followed: @followed)
    end
  
    render json: { follow: @new_follow }
  end
  
  
  

  def destroy
    @follow = Follow.find_by(follower: current_user, followed: params[:user_id])
    if @follow.destroy
      render json: {status:'Sucess'}
    else
      render json: {status:"There were a problem with deleting that follow"}
    end
  end
end
