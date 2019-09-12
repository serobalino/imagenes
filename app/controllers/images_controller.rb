class ImagesController < ApplicationController
  def new
    @imagen = Image.new
  end

  def create
    @imagen = Image.create(id_im:params[:image][:numero])
    render json: @imagen
  end
end
