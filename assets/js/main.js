var User;


var Router=Backbone.Router.extend({
    routes: {
        "*frag": "defaultRoute"
    },
    loginview: function(){
        delete User;
        this.view = new V_login({model: new M_UserLogin});
    },
    defaultRoute: function(frag){
        console.log(frag);
        if (this.view) this.view.remove();
        if (frag===null)
            this.loginview();
        else {
            this.view=new window["V_"+frag]({model: User});
        }
    }
});

$(function(){
    workspace=new Router();
    Backbone.history.start();

})
