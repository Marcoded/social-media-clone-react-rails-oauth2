class Api::V1::LikesController < ApplicationController



  def show
    post = Post.find(params[:id])
    @like = Like.find_by(user: current_user, likeable: post)
  
    if @like
      json = { likedByCurrentUser: true, likeId: @like.id, likeCount: post.likes.count }
    else
      json = { likedByCurrentUser: false }
    end
  
    respond_to do |format|
      format.json { render json: json }
      format.html { render json: json }
    end
  end
  
  


  def create
    post = Post.find(params[:post_id])
    @like = Like.new(user: current_user, likeable: post)
  
    if @like.save
      json = { success: true, likeId: @like.id }
    else
      json = { success: false }
    end
  
    respond_to do |format|
      format.json { render json: json }
      format.html { render json: json }
    end
  end
  
  
  def destroy
    @like = Like.find(params[:id])
    if @like.destroy
      json = { success: true }
    else
      json = { success: false }
    end

    respond_to do |format|
      format.json { render json: json }
      format.html { render json: json }
    end


  end


end
