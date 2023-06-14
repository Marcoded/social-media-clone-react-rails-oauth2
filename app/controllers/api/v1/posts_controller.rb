class Api::V1::PostsController < ApplicationController
  def index
    @posts = Post.all

    respond_to do |format|
      format.html { render json: @posts.as_json(include: :creator) }
      format.json { render json: @posts.as_json(include: :creator) }
    end
  end

  def show
    @post = Post.find(params[:id])

 
    json_response = @post.as_json(include: [:creator, comments: { include: :user }])
    
    render json: json_response
  end
  
end
