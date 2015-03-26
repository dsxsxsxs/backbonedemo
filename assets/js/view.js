var ExtView= Backbone.View.extend({
    el: $("main.container"),
    initialize: function(){
        this.render();
    },
    remove: function(){
        this.$el.empty();
        this.off().undelegateEvents().stopListening();
        return this;
    },
    render: function(){
        var self=this;
        $.get("./layouts/"+this.name+".html", function(rs){
            var template = _.template( rs );
            self.$el.html( template(self.model.attributes || {models: self.model.toJSON()}) );
        });
    }
});

var V_login = ExtView.extend({
    name: "login",
    events:{
        "click #loginBtn":"triggerlogin",
        "change #account":"setValue",
        "change #password":"setValue"
    },
    triggerlogin: function(e){
        var self=this;
        this.model.save({},{success: function(rs){
            workspace.navigate('home/'+self.model.get("_id"), {trigger: true});
        }});
    },
    setValue: function(e){
        this.model.set(e.target.id, e.target.value);
    },
});

var V_register = V_login.extend({
    name: "register",
    initialize: function(){
        this.model=new M_User;
        this.render();
    },
    events:{
        "click #registerBtn":"triggerRegister",
        "change #name":"setValue",
        "change #account":"setValue",
        "change #password":"setValue"
    },
    triggerRegister: function(e){
        var self=this;
        this.model.save({},{success: function(rs){
            workspace.navigate('home/'+self.model.get("_id"), {trigger: true});
        }});
    }
});

var V_home = V_login.extend({
    name: "home",
    initialize: function(){
        var self=this;
        self.model.fetch({success: function(){
            self.render();
        }})
    },
    events:{
        "click #updateBtn":"triggerUpdate",
        "click #deleteBtn":"triggerDelete",
        "input #description":"setText",
    },
    setText: function(e){
        $("#descriptionContent").removeClass('has-success');
        this.setValue(e);
    },
    triggerUpdate: function(e){
        this.model.save({}, {success: function(rs){
            $("#descriptionContent").addClass('has-success');
            $("#message").text('Description has been saved!');
        }});
    },
    triggerDelete: function(e){
        this.model.destroy({ success: function (rs) {
            workspace.navigate('', {trigger: true});
        }});
    }
});

var V_list = ExtView.extend({
    name: "list",
    initialize: function(){
        this.model=new C_Users;
        var self=this;
        this.model.fetch({success: function(){
            self.render();
        }});
    },
    events:{

    },
});
