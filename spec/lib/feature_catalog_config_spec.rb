require 'spec_helper'
require 'feature_catalog_config'

describe FeatureCatalogConfig do

  it 'should have data in feature_catalog.yml file' do
    feature_config = FeatureCatalogConfig.get_config_catalog
    feature_config.should_not be_nil
    feature_config.length.should == 1
  end

  it 'should return true for redeem field for Snapfish cobrand' do
    feature_config = FeatureCatalogConfig.get_config_catalog
    feature_config['snapfish_us_session_management'].should == false
  end

  it 'should have feature on in feature catalog config yml file' do
    stub(FeatureCatalogConfig).get_config_catalog {{"snapfish_us_session_management"=>false}}
    feature_available = FeatureCatalogConfig.isFeatureAvailable('snapfish_us_session_management','snapfish_us','')
    feature_available.should be_false
  end
end
