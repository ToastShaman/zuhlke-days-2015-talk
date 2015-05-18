import Ractive from 'ractive';
const parsleyConfigForBootstrap3 = {
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
    let parsleyForm = $(node).parsley(parsleyConfigForBootstrap3);
    return {
        teardown: function () {
            parsleyForm.destroy();
        }
    }
};

Ractive.decorators.parsley = parsleyDecorator;