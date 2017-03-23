class HomeController < ApplicationController
  def index
  end
  
  def feed
    redirect_to '/feeder'
  end
end
