class Api::V1::PostsController < ApplicationController
  def index
    @posts = Post.all.order(created_at: :desc)
    render json: @posts.as_json(include: :creator, methods: :like_count)
  end
  

  def show
    @post = Post.find(params[:id])

 
    json_response = @post.as_json(include: [:creator, comments: { include: :user }])
    
    render json: json_response
  end


  def create
    post = current_user.created_posts.create(post_params)
    if post.save
      render json: { status: "success" }
    else
      render json: { status: "failed" }
    end
  end
  
  private
  
  def post_params
    params.require(:post).permit(:image_url, :body)
  end
  
  
end
