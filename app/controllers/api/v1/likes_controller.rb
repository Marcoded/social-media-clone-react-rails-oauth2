class Api::V1::LikesController < ApplicationController
  def show
    post = Post.find(params[:id])
    @like = Like.find_by(user: current_user, likeable: post)

    if @like
      json = { likedByCurrentUser: true, likeId: @like.id, likeCount: post.likes.count }
    else
      json = { likedByCurrentUser: false, likeCount: post.likes.count }
    end

    render json: json
  end

  def create
    post = Post.find(params[:post_id])
    @like = Like.new(user: current_user, likeable: post)

    if @like.save
      json = { success: true, likeId: @like.id, likeCount: post.like_count }
    else
      json = { success: false }
    end

    render json: json
  end

  def destroy
    @like = Like.find(params[:id])
    post = @like.likeable

    if @like.destroy
      json = { success: true, likeCount: post.like_count }
    else
      json = { success: false }
    end

    render json: json
  end
end
