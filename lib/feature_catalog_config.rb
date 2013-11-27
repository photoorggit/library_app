require 'yaml'

class FeatureCatalogConfig

  def self.get_config_catalog
    YAML.load_file('config/catalog/feature_catalog.yml')
  end

  def self.isFeatureAvailable(feature_name,website,cobrand)
    config_catalog = get_config_catalog
    feature = config_catalog["#{website}_#{feature_name}"]
    return feature.nil? ? false : feature
  end

end