module ActiveAdmin
  module Inputs
    class DependentSelectInput < ::Formtastic::Inputs::SelectInput
   
      
      #
      #
      def wrapper_html_options
        super.tap do |wrapper_options|
          wrapper_options[:label_attr] = label_method
          wrapper_options[:value_attr] = value_method
          wrapper_options[:prompt] = input_options[:prompt]
          wrapper_options[:url] = options[:url]
        end  
      end
      
      
      #
      #
      def input_html_options
        super.tap do |options|
          options[:class] = [options[:class], "dependent_select_input"].compact.join(' ')
        end
      end
      
      
      #
      #
      def to_html
        input_wrapping do
          html = ""
          html << builder.label(method, label_from_options) if render_label?
          
          selected_associated_object = object.send(attributized_method_name)

          if selected_associated_object
            selected_associated_object.ancestors.each { |node| html << build_select(node, false) }
            html << build_select(selected_associated_object, true)
          else
            html << build_select(nil, true)
          end 
          html.html_safe
        end
      end
      
      
      private
      
        
        #
        #
        def build_select(node, active)
          input_collection = [[input_options[:prompt], '']]
          
          if node
            models = node.self_and_siblings
          else
            associated_model_class = Object.const_get(reflection.class_name)
            models = associated_model_class.roots
          end
          
          input_collection += models.map do |model|
            [model.send(label_method), model.send(value_method)]
          end
          
          select_options = {selected: (node ? node.send(value_method) : nil)}
          html_options = input_html_options.dup
          html_options[:name] = nil unless active
          builder.select(input_name, input_collection, select_options, html_options)
        end
    end
  end
end