import Ractive from 'ractive';
import _ from 'lodash';

const configurationForBootstrap3 = {
    errorClass: 'has-error',
    successClass: 'has-success',
    classHandler: function (ParsleyField) {
        return ParsleyField.$element.parents('.form-group');
    },
    errorsContainer: function (ParsleyField) {
        return ParsleyField.$element.parents('.form-group');
    },
    errorsWrapper: '<span class="help-block">',
    errorTemplate: '<div></div>'
};

let parsleyDecorator = function (node) {
    let parsleyForm = $(node).parsley(configurationForBootstrap3);
    let inputFields = $(node).children('.form-group').children('input');

    function validate() {
        parsleyForm.validate();
    }

    _.forEach(inputFields, function(elem) {
        elem.blur(validate);
    });

    return {
        teardown: function () {
            _.forEach(inputFields, function(elem) {
                elem.unbind();
            });
            parsleyForm.destroy();
        }
    }
};

Ractive.decorators.parsley = parsleyDecorator;