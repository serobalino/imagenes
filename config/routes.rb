Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get "/binvenida", to: "home#Index"
  root to:"home#index"
  get "images/new", to: "images#new"
  get "images/:id", to: "images#show"
  post "images", to: "images#create"
end
