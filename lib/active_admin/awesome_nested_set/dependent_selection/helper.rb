module ActiveAdmin
  module AwesomeNestedSet
    module DependentSelection
      module Helper

        
        # Call this inside your resource definition to add the needed collection 
        # action for depended selects.
        def dependent_selection_collection_actions
          
          
          # Adds collection method which returns children json for root node
          # given in parameters.
          collection_action :children do
            parent_model = resource_class.find(params[:id])
            children = parent_model.children
            respond_to do |format|
              format.json { render json: children }
            end
          end
        end
      end
    end
  end
end
