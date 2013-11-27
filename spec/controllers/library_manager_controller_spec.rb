require 'spec_helper'

describe LibraryManagerController do

  describe "GET 'index'" do
    it "returns http success" do
      get 'index'
      response.should be_success
    end
  end

  describe "GET 'assets'" do
    it "returns http success" do
      get 'assets'
      response.should be_success
    end
  end

end
