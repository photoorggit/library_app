require 'rails'

module ApplicationHelper

# sets locale either from url parameter or default locale
  def set_locale
    I18n.locale = get_locale || I18n.default_locale
  end

  # loads view specific locale file based on action
  def set_path
    I18n.load_path += Dir[Rails.root.join('config', 'locales','snapfish',"#{get_website}",'**',"#{get_action}", '*.{rb,yml}').to_s]
    I18n.load_path += Dir[Rails.root.join('config', 'locales','snapfish',"#{get_website}",'**',"defaults", '*.{rb,yml}').to_s]
    I18n.reload!
  end

  # gets locale from URL
  def get_locale
    (params[:locale] != nil && params[:locale] != "")? params[:locale] : "en"
  end

  # gets website from URL
  def get_website
    @user_info = {}
    (@user_info['website'] != nil && @user_info['website'] != "")? @user_info['website'] : "snapfish_us"
  end

  # gets the current action
  def get_action
    self.action_name
  end
end
