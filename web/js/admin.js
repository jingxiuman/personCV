/**
 * Created by knowthis on 15/11/6.
 */
//
!function ($) {
$(document).on("click","ul.nav li.parent > a > span.icon", function(){
    $(this).find('em:first').toggleClass("glyphicon-minus");
});
$(".sidebar span.icon").find('em:first').addClass("glyphicon-plus");
}(window.jQuery);

$(window).on('resize', function () {
    if ($(window).width() > 768) $('#sidebar-collapse').collapse('show')
});
$(window).on('resize', function () {
    if ($(window).width() <= 767) $('#sidebar-collapse').collapse('hide')
});
//界面组件


//公共组件
//cai
var Data_item = React.createClass({
    render: function () {
        return (
            <div className="col-xs-12 col-md-6 col-lg-3">
                <div className="panel panel-red panel-widget">
                    <div className="row no-padding">
                        <div className="col-sm-3 col-lg-5 widget-left">
                            <em className={this.props.data.icon}/>
                        </div>
                        <div className="col-sm-9 col-lg-7 widget-right">
                            <div className="large">{this.props.data.num}</div>
                            <div className="text-muted">{this.props.data.name}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});
//输入框
var Input_item = React.createClass({
    /**
     *  @param String label
     *  @param String inputName
     */
    handleChange: function (e) {
        e.preventDefault();
       // console.log(e.target.value);
        if(!e.target.value.trim()){
            $(e.target).parent().addClass('has-error')
        }else{
            $(e.target).parent().removeClass('has-error')
        }
    },
    render: function () {
        return (
            <div className="form-group">
                <label>{this.props.data.labelName}</label>
                <input className="form-control" name={this.props.data.inputName} onChange={this.handleChange} placeholder={this.props.data.placeholder} />
            </div>
        )
    }
});
//选择框
var Select_item =  React.createClass({
    handleChange: function (e) {
        e.preventDefault();
        // console.log(e.target.value);
        if(!e.target.value.trim()){
            $(e.target).parent().addClass('has-error')
        }else{
            $(e.target).parent().removeClass('has-error')
        }
    },
    render: function () {
        var li_node = this.props.data.item.map(function (value,i) {
            return(
                <option key={i} value={value.value}>{value.name}</option>
            )
        });
        return(
            <div className="form-group">
                <label>{this.props.data.label}</label>
                <select className="form-control" onchange={this.handleChange} name={this.props.data.inputName}>
                    {li_node}
                </select>
            </div>
        )
    }
});
//编辑器
var Edit_item = React.createClass({
    getInitialState: function () {
        var time = new Date();

        return {data:'edit_'+time.getTime()}
    },
    componentDidMount: function () {
      var ue =  UE.getEditor(this.state.data);
        //this.state.ueData.ready(function () {
        //    console.log("ready")
        //})
    },

    render: function () {
        return(
            <script id={this.state.data} name={this.props.data.content} type="text/plain" ></script>
        )
    }
});
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
//全局警告框
var Alert_global = React.createClass({

    render: function () {
        return (
        <div className="alert alert-success" role="alert">
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            <span>,,,</span>
        </div>
        )
    }
});
/*头部组件*/
var Header_nav = React.createClass({
    getInitialState: function () {
        return {data:''}
    },
    componentDidMount: function () {
        $.ajax({
            url:this.props.url,
            type:'post',
            dataType:'text',
            data:{
                type:'admin_user'
            },
            success: function (value) {
                this.setState({data:value});
            }.bind(this)
        })
    },
    handleClick: function (e) {
        e.preventDefault();
        e.stopPropagation();
        var inner_click = ReactDOM.findDOMNode(e.target),data;
        var inner_text = inner_click.innerHTML.match(/[\u0391-\uFFE5]+/)[0];

        switch (inner_text){
            case '个人信息修改':
                break;
            case '登出':
                data = {
                    type:'cancel_login'
                };
                this.sendMsg(data);
                break;
            default:
               // console.log("默认");
                break;
        }

    },
    sendMsg: function (data) {
        $.ajax({
            url:'../server/api.php',
            data:data,
            dataType:'text',
            type:'post',
            success: function (result) {
                if(result == 1) {
                    window.location.href = "login.html"
                }
            }
        })
    },
    render: function () {
        return(
            <div className="container-fluid">

                <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" aria-toggle="collapse" aria-target="#sidebar-collapse">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"/>
                        <span className="icon-bar"/>
                        <span className="icon-bar"/>
                    </button>
                    <a className="navbar-brand" href="#"><span>笨笨时光机</span></a>
                    <ul className="user-menu">
                        <li className="dropdown pull-right">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                <span className="glyphicon glyphicon-user"/>{this.state.data}<span className="caret"/>
                            </a>
                            <ul className="dropdown-menu" role="menu" onClick={this.handleClick}>
                                <li><a href="javascript:void(0)"><span className="glyphicon glyphicon-user" />个人信息修改</a></li>
                                <li><a href="javascript:void(0)"><span className="glyphicon glyphicon-log-out"/>登出</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
});
/*左部搜索*/
var Left_search = React.createClass({
    render: function () {
        return(
            <form role="search">
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Search"/>
                </div>
            </form>
        )
    }
});
/*左部导航*/
var Left_nav = React.createClass({
    handleClick: function (e) {
        var name = ReactDOM.findDOMNode(e.target);
       // console.dir(name);
        //var name = $(e.target).find(".leftMain_").html() || '';
       var name_value = name.innerText.match(/[\u0391-\uFFE5]+/) ||'首页';
       // console.log(name_value+'---'+name);
        switch (name_value[0]){
            case '博客管理':
            case '博客列表':
                ReactDOM.render(
                    <Blog_list/>,
                    document.getElementById("index_right")
                );
                break;
            case '发布博客':
                ReactDOM.render(
                    <Blog_public url="../server/api.php"/>,
                    document.getElementById("index_right")
                );
                break;
            case '首页':
                ReactDOM.render(
                    <Index_right_main url="../server/api.php" />,
                    document.getElementById("index_right")
                );
                break;
            default:
                ReactDOM.render(
                    <Index_right_main url="../server/api.php" />,
                    document.getElementById("index_right")
                );
                break;
        }

    },
    render: function () {

        var li_node = this.props.data.map(function (value) {
            //console.log(value.child.length);
            if(value.child.length == 0) {

                return (
                    <li key={value.id} ><a href={value.link}><span className={value.icon}/> <span ref="leftMain_"  >{value.text}</span></a></li>
                )
            }else{
                var li_node_child = value.child.map(function (value_child) {
                    return (
                        <li key={value_child.id}>
                            <a  href={value_child.link}>
                                <span className={value_child.icon}/>
                                <span ref="leftMain_">{value_child.text}</span>
                            </a>
                        </li>
                    )

                });
                return (
                    <li key={value.id} className="parent">
                        <a href={value.link}>
                            <span className={value.icon}/><span ref="leftMain_"  > {value.text}</span>
                            <span data-toggle="collapse" href={"#left-nav-"+value.id} className="icon pull-right">
                                <em className="glyphicon glyphicon-s glyphicon-plus"/>
                            </span>
                        </a>
                        <ul className="children collapse" id={"left-nav-"+value.id} >
                            {li_node_child}
                        </ul>
                    </li>
                )
            }
        });
        return (
            <ul className="nav menu" onClick={this.handleClick}>
                {li_node}
            </ul>
        )
    }
});
/*左部版权*/
var Left_copy = React.createClass({
    render: function () {
        return (
            <div className="attribution">
                笨笨时光机
            </div>
        )
    }
});
/*左部全部*/
var Left_main = React.createClass({
    render: function () {
        return (
            <div>
                <Left_search />
                <Left_nav data={data} />
                <Left_copy />
            </div>
        )
    }
});
//导航数据
var data = [
    {id:1,link:'#',text:'首页',icon:'glyphicon glyphicon-dashboard',child:[]},
    {id:2,link:'#',text:'博客管理',icon:'glyphicon glyphicon-pencil',child:[{id:21,link:'#',text:'发布博客'},{id:22,link:'#',text:'博客列表'}]},
    {id:3,link:'#',text:'项目管理',icon:'glyphicon glyphicon-pencil',child:[{id:31,link:'#',text:'发布项目'},{id:32,link:'#',text:'项目列表'}]}
];
//博客列表
var Blog_list = React.createClass({
    getInitialState: function () {
        return {data:'0'}
    },
    componentDidMount: function () {
        var that = this;
        var operateEvents = {
            'click .like': function (e, value, row, index) {
                alert('You click like action, row: ' + JSON.stringify(row));
            },
            'click .remove': function (e, value, row, index) {
                if(confirm("确认删除么?")) {
                    var valueSend = {
                        type: 'admin_blog_del',
                        id:row.id
                    };
                    that.ajaxFunc(valueSend);
                    if(that.state.data) {
                        $table.bootstrapTable('remove', {
                            field: 'id',
                            values: [row.id]
                        });
                    }else{
                        alert("删除失败")
                    }
                }
            }
        };
        var $table =  $("#table");
       $table.bootstrapTable({
            showRefresh:true,
            showToggle:true,
            showColumns:true,
            search:true,
            pagination:true,
            checkbox:true,
            sortOrder:'desc',
            sortName:'id',
            selectItemName:'blog',
            url: '../server/api.php?type=admin_blog',
            method:'post',
            columns: [
               {
                field: 'id',
                title: '#',
                sortable:true
            }, {
                field: 'news_pic',
                title: '缩略图'
            },{
                field: 'news_title',
                title: '新闻标题',
                sortable:true,
                align: 'center',
                editable: {
                    type: 'text',
                    title: '新闻标题',
                    validate: function (value) {
                        value = $.trim(value);
                        if (!value) {
                            return 'This field is required';
                        }
                        var data = $table.bootstrapTable('getData'),
                            index = $(this).parents('tr').data('index');
                        var dataMain = data[index];
                        var sendData={
                            type:'admin_change_show',
                            id:dataMain.id,
                            valueType:'title',
                            value:value
                        };
                        var result = that.ajaxFunc(sendData);

                        return result;
                    }
                }
            }, {
                field: 'news_author',
                title: '文章作者',
                sortable:true
            },{
                field: 'news_createTime',
                title: '文章创建时间',
                sortable:true
            } ,{
                field: 'news_changeTime',
                title: '文章修改时间',
                sortable:true
            } ,{
                field: 'newsSee',
                title: '查看',
                sortable:true,

            } ,{
                field: 'news_show',
                title: '是否展示',
                sortable:true,
                align: 'center',
                editable: {
                    type: 'text',
                    title: 'news_show',
                    validate: function (value) {
                        value = $.trim(value);
                        if (!value) {
                            return 'This field is required';
                        }
                        if (!/^\d{1}$/.test(value)) {
                            return '这里填写是:1,否:0'
                        }
                        var data = $table.bootstrapTable('getData'),
                            index = $(this).parents('tr').data('index');
                        var dataMain = data[index];
                        var sendData={
                            type:'admin_change_show',
                            id:dataMain.id,
                            valueType:'show',
                            value:value
                        };
                         that.ajaxFunc(sendData);

                        return '';
                    }
                }
            },{
                field: 'manager',
                title: '管理',
                events: operateEvents,
                formatter: operateFormatter
            } ]
        });
        function operateFormatter(value, row, index) {
            return [
                '<a class="like" href="javascript:void(0)" title="Like">',
                '<i class="glyphicon glyphicon-eye-open"></i>',
                '</a>',
                '<a class="remove" href="javascript:void(0)" title="Remove">',
                '<i class="glyphicon glyphicon-remove"></i>',
                value,
                '</a>'
            ].join('');
        }

    },
    ajaxFunc: function (value) {
        $.ajax({
            url:'../server/api.php',
            type:'post',
            data:value,
            dataType:'json',
            success: function (data) {
                console.log(data);
                if(data){
                    this.setState({data:'1'});
                }else {
                    this.setState({data:'0'});
                }
            }.bind(this)
        });
    },
    render: function () {
        return (
            <div className="row" >
                <div  className="col-lg-12">
                    <div  className="panel panel-default" >
                        <div  className="panel-heading"> 博客列表</div>
                        <div  className="panel-body">
                            <table id="table"  />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

//博客发布
var Blog_public = React.createClass({
    getInitialState: function () {
        return{data:{"show":0,'msg':'','status':'success'}}
    },
    handleSubmit: function (e) {
        e.stopPropagation();
        e.preventDefault();

        //console.dir(e.target);
        var dataMain = $(e.target);
        var newsTitle = dataMain.find("input[name='newsTitle']").val();
        var newsAuthor = dataMain.find("input[name='newsAuthor']").val();
        var newsShow = dataMain.find("select[name='newsShow']").val();
        var newsContent = dataMain.find("textarea[name='newsContent']").val();
       // console.log(dataMain,newsTitle,newsAuthor,newsShow,newsContent)
        var data={
            'type':'add_blog',
            'newsTitle':newsTitle,
            'newsAuthor':newsAuthor,
            'newsShow':newsShow,
            newsContent:newsContent
        };
        this.ajaxFunc(data, dataMain)
    },
    ajaxFunc: function (value,form) {
        $.ajax({
            url:this.props.url,
            data:value,
            dataType:'json',
            type:'post',
            success: function (data) {
                if(data){
                    this.setState({data:{"show":'1',"msg":' 保存成功','status':'success'}});
                   //console.log(form)
                    form[0].reset()
                }else{
                    this.setState({data:{"show":'1',"msg":' 保存失败','status':'danger'}})
                }
            }.bind(this)
        })

    },

    render: function () {
        return (
            <div className="panel panel-default">
                <div className="panel-heading"> 发布博客</div>
                <div className="panel-body">
                    <div className="col-md-12">
                        <Alert_item data={{show:this.state.data.show,msg:this.state.data.msg,status:this.state.data.status}} />
                        <form role="form" onSubmit={this.handleSubmit}>
                            <Input_item data={{'labelName':'文章标题','inputName':'newsTitle','placeholder':'输入文章标题'}}/>
                            <Input_item data={{'labelName':'文章作者','inputName':'newsAuthor','placeholder':'输入文章作者'}}/>
                            <Select_item data={{'label':'是否发布','inputName':'newsShow','item':[{'name':'发布','value':'1'},{'name':'不发布','value':'0'}]}}/>
                            <Edit_item  data={{'content':'newsContent'}} />
                            <button type="submit" className="btn btn-primary">提交</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
});

//项目列表
var Project_list = React.createClass({
    getInitialState: function () {
        return {data:'0'}
    },
    componentDidMount: function () {
        var that = this;
        var operateEvents = {
            'click .like': function (e, value, row, index) {
                alert('You click like action, row: ' + JSON.stringify(row));
            },
            'click .remove': function (e, value, row, index) {
                if(confirm("确认删除么?")) {
                    var valueSend = {
                        type: 'admin_blog_del',
                        id:row.id
                    };
                    that.ajaxFunc(valueSend);
                    if(that.state.data) {
                        $table.bootstrapTable('remove', {
                            field: 'id',
                            values: [row.id]
                        });
                    }else{
                        alert("删除失败")
                    }
                }
            }
        };
        var $table =  $("#table");
       $table.bootstrapTable({
            showRefresh:true,
            showToggle:true,
            showColumns:true,
            search:true,
            pagination:true,
            checkbox:true,
            sortOrder:'desc',
            sortName:'id',
            selectItemName:'blog',
            url: '../server/api.php?type=admin_blog',
            method:'post',
            columns: [
               {
                field: 'id',
                title: '#',
                sortable:true
            }, {
                field: 'news_pic',
                title: '缩略图'
            },{
                field: 'news_title',
                title: '新闻标题',
                sortable:true,
                align: 'center',
                editable: {
                    type: 'text',
                    title: '新闻标题',
                    validate: function (value) {
                        value = $.trim(value);
                        if (!value) {
                            return 'This field is required';
                        }
                        var data = $table.bootstrapTable('getData'),
                            index = $(this).parents('tr').data('index');
                        var dataMain = data[index];
                        var sendData={
                            type:'admin_change_show',
                            id:dataMain.id,
                            valueType:'title',
                            value:value
                        };
                        var result = that.ajaxFunc(sendData);

                        return result;
                    }
                }
            }, {
                field: 'news_author',
                title: '文章作者',
                sortable:true
            },{
                field: 'news_createTime',
                title: '文章创建时间',
                sortable:true
            } ,{
                field: 'news_changeTime',
                title: '文章修改时间',
                sortable:true
            } ,{
                field: 'newsSee',
                title: '查看',
                sortable:true,

            } ,{
                field: 'news_show',
                title: '是否展示',
                sortable:true,
                align: 'center',
                editable: {
                    type: 'text',
                    title: 'news_show',
                    validate: function (value) {
                        value = $.trim(value);
                        if (!value) {
                            return 'This field is required';
                        }
                        if (!/^\d{1}$/.test(value)) {
                            return '这里填写是:1,否:0'
                        }
                        var data = $table.bootstrapTable('getData'),
                            index = $(this).parents('tr').data('index');
                        var dataMain = data[index];
                        var sendData={
                            type:'admin_change_show',
                            id:dataMain.id,
                            valueType:'show',
                            value:value
                        };
                         that.ajaxFunc(sendData);

                        return '';
                    }
                }
            },{
                field: 'manager',
                title: '管理',
                events: operateEvents,
                formatter: operateFormatter
            } ]
        });
        function operateFormatter(value, row, index) {
            return [
                '<a class="like" href="javascript:void(0)" title="Like">',
                '<i class="glyphicon glyphicon-eye-open"></i>',
                '</a>',
                '<a class="remove" href="javascript:void(0)" title="Remove">',
                '<i class="glyphicon glyphicon-remove"></i>',
                value,
                '</a>'
            ].join('');
        }

    },
    ajaxFunc: function (value) {
        $.ajax({
            url:'../server/api.php',
            type:'post',
            data:value,
            dataType:'json',
            success: function (data) {
                console.log(data);
                if(data){
                    this.setState({data:'1'});
                }else {
                    this.setState({data:'0'});
                }
            }.bind(this)
        });
    },
    render: function () {
        return (
            <div className="row" >
                <div  className="col-lg-12">
                    <div  className="panel panel-default" >
                        <div  className="panel-heading"> 博客列表</div>
                        <div  className="panel-body">
                            <table id="table"  />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

//项目发布

var Project_public = React.createClass({
    getInitialState: function () {
        return{data:{"show":0,'msg':'','status':'success'}}
    },
    handleSubmit: function (e) {
        e.stopPropagation();
        e.preventDefault();

        //console.dir(e.target);
        var dataMain = $(e.target);
        var newsTitle = dataMain.find("input[name='newsTitle']").val();
        var newsAuthor = dataMain.find("input[name='newsAuthor']").val();
        var newsShow = dataMain.find("select[name='newsShow']").val();
        var newsContent = dataMain.find("textarea[name='newsContent']").val();
       // console.log(dataMain,newsTitle,newsAuthor,newsShow,newsContent)
        var data={
            'type':'add_blog',
            'newsTitle':newsTitle,
            'newsAuthor':newsAuthor,
            'newsShow':newsShow,
            newsContent:newsContent
        };
        this.ajaxFunc(data, dataMain)
    },
    ajaxFunc: function (value,form) {
        $.ajax({
            url:this.props.url,
            data:value,
            dataType:'json',
            type:'post',
            success: function (data) {
                if(data){
                    this.setState({data:{"show":'1',"msg":' 保存成功','status':'success'}});
                   //console.log(form)
                    form[0].reset()
                }else{
                    this.setState({data:{"show":'1',"msg":' 保存失败','status':'danger'}})
                }
            }.bind(this)
        })

    },

    render: function () {
        return (
            <div className="panel panel-default">
                <div className="panel-heading"> 发布博客</div>
                <div className="panel-body">
                    <div className="col-md-12">
                        <Alert_item data={{show:this.state.data.show,msg:this.state.data.msg,status:this.state.data.status}} />
                        <form role="form" onSubmit={this.handleSubmit}>
                            <Input_item data={{'labelName':'文章标题','inputName':'newsTitle','placeholder':'输入文章标题'}}/>
                            <Input_item data={{'labelName':'文章作者','inputName':'newsAuthor','placeholder':'输入文章作者'}}/>
                            <Select_item data={{'label':'是否发布','inputName':'newsShow','item':[{'name':'发布','value':'1'},{'name':'不发布','value':'0'}]}}/>
                            <Edit_item  data={{'content':'newsContent'}} />
                            <button type="submit" className="btn btn-primary">提交</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
});
//首页
var Index_right_main = React.createClass({
    getInitialState: function () {
        return{
            data: {
                numBlog: '',
                numProject: '',
                numUser: '',
                numSee: ''
            }
        }
    },
    componentDidMount: function () {
        $.ajax({
            url:this.props.url,
            type:'post',
            dataType:'json',
            data:{
                type:'admin_index_num'
            },
            success: function (value) {
                console.log("amdin");
                if(value == 302){
                    window.location.href="login.html";
                    console.log("no")
                }else {
                    console.log("yes");
                    this.setState({data:value});
                }

                //console.log(this.state.data)
            }.bind(this)
        })

    },
    render: function () {
        return(
            <div>
                <div className="row">
                    <ol className="breadcrumb">
                        <li><a href="#"><span className="glyphicon glyphicon-home"/></a></li>
                        <li className="active">首页</li>
                    </ol>
                </div>
                <div className="row">
                    <Data_item data={{num:this.state.data.numBlog,name:'博客数',icon:'glyphicon glyphicon-shopping-cart glyphicon-l'}} />
                    <Data_item data={{num:this.state.data.numProject,name:'项目数目',icon:'glyphicon glyphicon-comment glyphicon-l'}} />
                    <Data_item data={{num:this.state.data.numUser,name:'管理人数',icon:'glyphicon glyphicon-user glyphicon-l'}} />
                    <Data_item data={{num:this.state.data.numSee,name:'访问数据',icon:'glyphicon glyphicon-stats glyphicon-l'}} />
                </div>
            </div>

        )
    }
});


//初始化渲染
ReactDOM.render(
    <Header_nav url="../server/api.php" />,
    document.getElementById("admin_header")
);
ReactDOM.render(
    <Left_main  />,
    document.getElementById("sidebar-collapse")
);
ReactDOM.render(
    <Index_right_main url="../server/api.php" />,
    document.getElementById("index_right")
);
