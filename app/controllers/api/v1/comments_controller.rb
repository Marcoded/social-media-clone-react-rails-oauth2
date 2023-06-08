class Api::V1::CommentsController < ApplicationController
    def create
      @post = Post.find(params[:post_id])
      @comment = @post.comments.create(
        user_id: current_user.id,
        body: params[:body]
      )
  
      if @comment.save
        render json: { status: "Comment successfully created" }
      else
        render json: { status: "There was a problem commenting on this post" }
      end
    end


    def get_post_comment
      @post = Post.find(params[:post_id])
      @comments = @post.comments
      render json: @comments.as_json(include: :user)
    end

  end
  