var Router=Backbone.Router.extend({
    routes: {
        "home/:id": "homeView",
        "*frag": "defaultRoute"
    },
    homeView: function(id){
        if (this.view) this.view.remove();
        this.view = new V_home({model: new M_User({"_id": id})});
    },
    loginView: function(){
        this.view = new V_login({model: new M_UserLogin});
    },
    defaultRoute: function(frag){
        if (this.view) this.view.remove();
        if (frag===null)
            this.loginView();
        else
            this.view=new window["V_"+frag]();
    }
});

$(function(){
    window.workspace=new Router();
    Backbone.history.start();
})
