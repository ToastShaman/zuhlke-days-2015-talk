import Ractive from 'ractive';
import _ from 'lodash';
import $ from 'jquery';

const defaultConfiguration = {
  isFormValid: 'parsleyValid',
  focus: 'none',
  errorClass: 'has-error',
  successClass: 'has-success',
  classHandler: function(ParsleyField) {
    return ParsleyField.$element.parents('.form-group');
  },
  errorsContainer: function(ParsleyField) {
    return ParsleyField.$element.parents('.form-group');
  },
  errorsWrapper: '<span class="help-block">',
  errorTemplate: '<div></div>'
};

let parsleyDecorator = function(node) {
  let ractive = this;
  ractive.set(parsleyDecorator.config.isFormValid, false);

  let parsleyForm = $(node).parsley(parsleyDecorator.config);
  let inputFields = $(node).children('.form-group').children('input') || [];

  function validate() {
    ractive.set(parsleyDecorator.config.isFormValid, parsleyForm.validate());
  }

  _.forEach(inputFields, elem => {
    $(elem).blur(validate);
    $(elem).keyup(validate);
  });

  return {
    teardown: function() {
      _.forEach(inputFields, elem => $(elem).unbind());
      parsleyForm.destroy();
    }
  }
};

parsleyDecorator.config = defaultConfiguration;
export default parsleyDecorator;