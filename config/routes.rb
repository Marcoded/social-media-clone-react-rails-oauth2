Rails.application.routes.draw do
  get 'follow/index'
  get 'follow/create'
  get 'follow/destroy'

  namespace :api do
    namespace :v1 do
      post "likes/create", to: "likes#create"
      delete "/likes/:id", to: "likes#destroy"
      get "/likes/:id", to: 'likes#show'
      get "/users/me", to: "users#me"
      get "/users/:id", to: "users#show"
      

      get "/follows/show", to: "follows#show"
      post "/follows/create", to:"follows#create"
      delete "follows/destroy", to: "follows#destroy"

      post "comments/create", to:"comments#create"
      get '/comments/get_post_comment', to: "comments#get_post_comment"

      
      get 'posts/:id', to: "posts#show"
      post 'posts/create', to: "posts#create"
      post 'notifications/set_read/:id', to: 'notifications#set_read'

      
     
      get "/notifications/all", to: "notifications#index"
      
      resources :posts, only: [:index,:show]
      resources :likes, only: [:create, :destroy]
    end
  end




  devise_for :users, controllers: {
    registration: 'users/registrations',
    sessions: 'users/sessions',
    omniauth_callbacks: 'users/omniauth_callbacks'
  }
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root 'homepage#index'
  get '/*path' => 'homepage#index'
end


