Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get "/binvenida", to: "home#Index"
  get "images/new", to: "images#new"
  post "images", to: "images#create"
end
