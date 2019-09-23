class ImagesController < ApplicationController
  def new
    @imagen = Image.new
  end

  def show
    @imagen = Image.find(params[:id])
  end

  def index
    @images = Image.all().limit(10)
  end

  def create
    # @imagen = Image.create(peso_im:80, archivo_im:params.require(:imagen).permit(:archivo_im), nombre_im:'Archivo', ext_im:'exe', user_id:1)
    render json: params.require(:imagen).permit(:archivo_im)
  end
end
