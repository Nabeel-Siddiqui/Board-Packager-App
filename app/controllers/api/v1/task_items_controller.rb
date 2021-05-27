class Api::V1::TaskItemsController < ApplicationController
    before_action :authenticate_user!
    before_action :set_task_item, only: [:show, :edit, :update, :destroy]

    def index
      @task_items = current_user.task_items.all
    end
  
    def show
      if authorized?
        respond_to do |format|
          format.json { render :show }
        end
      else
        handle_unauthorized
      end
    end    
    
    def create
      @task_item = current_user.task_items.build(task_item_params)

      if authorized?
        respond_to do |format|
          if @task_item.save
            format.json { render :show, status: :created, location: api_v1_task_item_path(@task_item) }
          else
            format.json { render json: @task_item.errors, status: :unprocessable_entity }
          end
        end
      else
        handle_unauthorized
      end
      
    end
    
    def update
      if authorized?
        respond_to do |format|
          if @task_item.update(task_item_params)
            format.json { render :show, status: :ok, location: api_v1_task_item_path(@task_item) }
          else
            format.json { render json: @task_item.errors, status: :unprocessable_entity }
          end
        end
      else
        handle_unauthorized
      end
    end

    def destroy
      if authorized?
        @task_item.destroy
        respond_to do |format|
          format.json { head :no_content }
        end
      else
        handle_unauthorized
      end
    end
  
    private
      
      def set_task_item
        @task_item = TaskItem.find(params[:id])
      end

      def authorized?
         @task_item.user == current_user
      end

      def handle_unauthorized
        unless authorized?
          respond_to do |format|
            format.json { render :unauthorized, status: 401 }
          end
        end
      end
  
      def task_item_params
        params.require(:task_item).permit(:title, :description, :complete)
      end    
end