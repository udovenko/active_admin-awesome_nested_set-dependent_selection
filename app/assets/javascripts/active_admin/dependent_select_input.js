(function() {
  ActiveAdmin.DependentSelects = (function() {
    
      
    function DependentSelects(options, element) {
        this.element = element;
        this.$element = $(this.element);
        this.$selectInputs = this.$element.find('.dependent_select_input');

        this.options = options;
        defaults = {
            url: this.$element.attr('url'),
            valueAttr: this.$element.attr('value_attr'),
            labelAttr: this.$element.attr('label_attr'),
            inputPrompt: this.$element.attr('prompt'),
            inputName: this.$selectInputs.last().attr('name')
        };
        this.options = $.extend(defaults, options);
        
        
        var _this = this;
        this.$selectInputs.each(function() {
            _this._bind($(this));
        });
        
    };


    DependentSelects.prototype.option = function(key, value) {
        if ($.isPlainObject(key)) {
            return this.options = $.extend(true, this.options, key);
        } else if (key != null) {
            return this.options[key];
        } else {
            return this.options[key] = value;
        }
    };


    DependentSelects.prototype._buildChildInput = function(collection) {
        if (collection.length === 0) return;
        
        var $newSelectInput = $('<select class="dependent_select_input"></select>');
        var tempCategory;
        
        $newSelectInput.append('<option value="">'+ this.options.inputPrompt +'</option>');
        
        for (var i = 0; i < collection.length; i++) {
            tempCategory = collection[i];
            $newSelectInput.append(
                '<option value=' + tempCategory[this.options.valueAttr] + '>' 
                    + tempCategory[this.options.labelAttr] + '</option>');
        }
        
        this.$element.append($newSelectInput);
        return $newSelectInput;
    };
    

    DependentSelects.prototype._bind = function($selectInput) {
        var _this = this;

        $selectInput.change(function() {
            $selectInput.nextAll().remove();
            
            if ($selectInput.val() === "") {
                $selectInput.removeAttr("name");
                $selectInput.prev().attr("name", _this.options.inputName);
                return false;
            }    
                        
            $selectInput.prevAll().removeAttr("name");
            $selectInput.attr("name", _this.options.inputName);
            
            $.ajax({
                url: _this.options.url,
                data: function() {
                    var result = {};
                    result[_this.options.valueAttr] = $selectInput.val();
                    return result;
                }()
            }).done(function(collection) {
                var $newSelectInput = _this._buildChildInput(collection);
                if ($newSelectInput) _this._bind($newSelectInput);
            });
                        
            return false;
        });
    };


    return DependentSelects;

  })();

  $.widget.bridge('aaDependentSelects', ActiveAdmin.DependentSelects);

  $(function() {
    $('.dependent_select').aaDependentSelects();

    $(document).on('click', 'a.button.has_many_add', function() {
        $('.dependent_select').aaDependentSelects();
    });
  });
}).call(this);