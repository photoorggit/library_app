include ApplicationHelper

class ApplicationController < ActionController::Base
  protect_from_forgery
  before_filter :set_locale, :set_path
end
