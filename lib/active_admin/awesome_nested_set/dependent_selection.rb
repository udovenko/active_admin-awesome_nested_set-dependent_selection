require "active_admin/awesome_nested_set/dependent_selection/version"
require "active_admin/awesome_nested_set/dependent_selection/engine"
require "active_admin/awesome_nested_set/dependent_selection/helper"
require "active_admin/inputs/dependent_select_input"

module ActiveAdmin
  module AwesomeNestedSet
    module DependentSelection
    end
  end
end

ActiveAdmin::ResourceDSL.send :include, ActiveAdmin::AwesomeNestedSet::DependentSelection::Helper