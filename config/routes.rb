Rails.application.routes.draw do
  devise_for :users
  authenticated :user do
    root "pages#task_list_items", as: :authenticated_root
  end
    root :to => redirect('/users/sign_in')
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :task_items, only: [:index, :show, :create, :update, :destroy]
    end
  end
end
