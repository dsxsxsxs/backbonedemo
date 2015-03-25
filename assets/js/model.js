var M_User = Backbone.Model.extend({
    urlRoot: '/user',
    idAttribute: '_id',
    defaults: {
        account: '',
        password: '',
        name: '',
        description: ''
    }
});
var M_UserLogin = Backbone.Model.extend({
    urlRoot: '/user/login',
    defaults: {
        account: '',
        password: '',
    }
});
