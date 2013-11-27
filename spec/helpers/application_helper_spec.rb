require 'spec_helper'
include ApplicationHelper
require 'i18n'

describe ApplicationHelper do

  it 'set_locale should exist in ApplicationHelper' do
    ApplicationHelper.should respond_to :set_locale
  end

  it 'set_path should exist in ApplicationHelper' do
    ApplicationHelper.should respond_to :set_path
  end

  it 'get_locale should exist in ApplicationHelper' do
    ApplicationHelper.should respond_to :get_locale
  end

  it 'get_website should exist in ApplicationHelper' do
    ApplicationHelper.should respond_to :get_website
  end

  it 'get_action should exist in ApplicationHelper' do
    ApplicationHelper.should respond_to :get_action
  end

  it "set_locale should return given locale" do
    stub(ApplicationHelper).get_locale {'en'}
    ApplicationHelper.set_locale.should_not be_nil
    ApplicationHelper.set_locale.should == "en"
  end

  it "set_locale should return default locale en if we don't pass locale" do
    stub(ApplicationHelper).get_locale {nil}
    ApplicationHelper.set_locale.should_not be_nil
    ApplicationHelper.set_locale.to_s.should eql("en")
  end

  it "set_locale should return default locale en if we don't pass locale" do
    stub(ApplicationHelper).get_locale {}
    ApplicationHelper.set_locale.should_not be_nil
    ApplicationHelper.set_locale.to_s.should eql("en")
  end

  it "set_path should exist in ApplicationController" do
    stub(ApplicationHelper).get_website {"snapfish_us"}
    stub(ApplicationHelper).get_action {"main"}
    ApplicationHelper.set_path.should_not be_nil
  end

end