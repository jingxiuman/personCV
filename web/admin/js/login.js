/**
 * Created by knowthis on 15/11/13.
 */
//警告框
var Alert_item = React.createClass({
    handleClick: function (e) {
        $(e.target).hide();
    },
    render: function () {
        var status ;
        switch (this.props.data.status){
            case 'danger':
                status = 'alert bg-danger';
                break;
            case 'success':
                status ='alert bg-success';
                break;
        }
        return(
            <div className={this.props.data.show?'show':'hidden' } onClick={this.handleClick}>
                <div className={status}  role="alert">
                    <span className="glyphicon glyphicon-exclamation-sign"/> {this.props.data.msg} <a href="#" className="pull-right"><span className="glyphicon glyphicon-remove"/></a>
                </div>
            </div>
        )
    }
});
var Login = React.createClass({
    getInitialState: function () {
        return {data:{show:'',msg:'',status:''}}
    },
    componentDidMount: function () {
        $.getJSON(this.props.url,"", function (data) {
            if(data == 1){
                window.location="index.html"
            }
        })
    },
    handleSubmit: function (e) {
        e.stopPropagation();
        e.preventDefault();
        var that = this;

        var form = $(e.target);

        var username = form.find("input[name='email']").val();
        var password = form.find("input[name='password']").val();
        if(username && password) {
            var data_main = {
                type: 'admin_login',
                username: username,
                password: password
            };

            $.ajax({
                url: "../server/api.php",
                data: data_main,
                type: 'post',
                dataType: 'json',
                success: function (value) {
                    console.log(value);
                    if (value == 1) {
                        that.setState({data: {show: '1', msg: '登录成功', status: 'success'}})
                        window.location="index.html"
                    } else if (value == 0) {
                        that.setState({data: {show: '1', msg: '登录失败', status: 'danger'}})
                    }
                }
            });
        }else {
            that.setState({data: {show: '1', msg: '输入相关的内容', status: 'danger'}})
        }

    },
    render: function () {
        return (
            <form role="form" onSubmit={this.handleSubmit}>
                <Alert_item data={{show:this.state.data.show,msg:this.state.data.msg,status:this.state.data.status}}/>

                <fieldset>
                    <div className="form-group">
                        <input className="form-control" placeholder="E-mail" name="email" type="text" autofocus=""/>
                    </div>
                    <div className="form-group">
                        <input className="form-control" placeholder="Password" name="password" type="password" />
                    </div>

                    <button type="submit" className="btn btn-primary">Login</button>
                </fieldset>
            </form>
        )
    }
});

ReactDOM.render(
    <Login url="../server/login.php"/>,
    document.getElementById("login_main")
);