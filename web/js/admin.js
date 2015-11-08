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

/*头部组件*/
var Header_nav = React.createClass({
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
                    <a className="navbar-brand" href="#"><span>笨笨时光机</span>仙保</a>
                    <ul className="user-menu">
                        <li className="dropdown pull-right">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                <span className="glyphicon glyphicon-user"/> User <span className="caret"/>
                            </a>
                            <ul className="dropdown-menu" role="menu">
                                <li><a href="#"><span className="glyphicon glyphicon-user"/>  个人信息修改</a></li>
                                <li><a href="#"><span className="glyphicon glyphicon-cog"/> 设置</a></li>
                                <li><a href="#"><span className="glyphicon glyphicon-log-out"/>登出</a></li>
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
        var name = $(e.target).find(".leftMain_").html() || '';
       var name_value = name.match(/[\u0391-\uFFE5]+/);
        console.log(name_value+'---'+name);
        switch (name_value[0]){
            case '博客管理':
                ReactDOM.render(
                    <Blog_list/>,
                    document.getElementById("index_right")
                );
                break;
            case '博客列表':
                ReactDOM.render(
                    <Blog_list/>,
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
                    <li key={value.id} ><a href={value.link}><span className={value.icon}/> <span className="leftMain_"  >{value.text}</span></a></li>
                )
            }else{
                var li_node_child = value.child.map(function (value_child) {
                    return (
                        <li key={value_child.id}>
                            <a  href={value_child.link}>
                                <span className={value_child.icon}/>
                                <span className="leftMain_">{value_child.text}</span>
                            </a>
                        </li>
                    )

                });
                return (
                    <li key={value.id} className="parent">
                        <a href={value.link}>
                            <span className={value.icon}/><span className="leftMain_"  > {value.text}</span>
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
    {id:3,link:'#',text:'项目管理',icon:'glyphicon glyphicon-pencil',child:[{id:31,link:'#',text:'发布项目'},{id:32,link:'#',text:'项目列表'}]},
    {id:4,link:'#',text:'导航设置',icon:'glyphicon glyphicon-info-sign',child:[]},
    {id:5,link:'#',text:'个人设置',icon:'glyphicon glyphicon-dashboard',child:[]},
    {id:6,link:'#',text:'首页',icon:'glyphicon glyphicon-dashboard',child:[]},
    {id:7,link:'#',text:'首页',icon:'glyphicon glyphicon-dashboard',child:[]}
];

//博客列表

var Blog_list = React.createClass({
    componentDidMount: function () {
        $("#table").bootstrapTable({
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
                field: 'blog',
                title: '选择',
               checkbox:true
            }, {
                field: 'id',
                title: '#',
                sortable:true
            }, {
                field: 'news_title',
                title: '新闻标题',
                sortable:true
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
                sortable:true
            } ,{
                field: 'new_show',
                title: '是否展示',
                sortable:true
            },{
                field: 'manager',
                title: '管理'
            } ]
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
                this.setState({data:value});
                //console.log(this.state.data)
            }.bind(this)
        })

    },
    render: function () {
        return(
            <div>
                <div className="row">
                    <ol className="breadcrumb">
                        <li><a href="#"><span className="glyphicon glyphicon-home"></span></a></li>
                        <li className="active">首页</li>
                    </ol>
                </div>
                <div className="row">
                    <div className="col-xs-12 col-md-6 col-lg-3">
                        <div className="panel panel-blue panel-widget ">
                            <div className="row no-padding">
                                <div className="col-sm-3 col-lg-5 widget-left">
                                    <em className="glyphicon glyphicon-shopping-cart glyphicon-l"></em>
                                </div>
                                <div className="col-sm-9 col-lg-7 widget-right">
                                    <div className="large">{this.state.data.numBlog}</div>
                                    <div className="text-muted">博客数</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12 col-md-6 col-lg-3">
                        <div className="panel panel-orange panel-widget">
                            <div className="row no-padding">
                                <div className="col-sm-3 col-lg-5 widget-left">
                                    <em className="glyphicon glyphicon-comment glyphicon-l"></em>
                                </div>
                                <div className="col-sm-9 col-lg-7 widget-right">
                                    <div className="large">{this.state.data.numProject}</div>
                                    <div className="text-muted">项目数目</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12 col-md-6 col-lg-3">
                        <div className="panel panel-teal panel-widget">
                            <div className="row no-padding">
                                <div className="col-sm-3 col-lg-5 widget-left">
                                    <em className="glyphicon glyphicon-user glyphicon-l"></em>
                                </div>
                                <div className="col-sm-9 col-lg-7 widget-right">
                                    <div className="large">{this.state.data.numUser}</div>
                                    <div className="text-muted">管理人数</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12 col-md-6 col-lg-3">
                        <div className="panel panel-red panel-widget">
                            <div className="row no-padding">
                                <div className="col-sm-3 col-lg-5 widget-left">
                                    <em className="glyphicon glyphicon-stats glyphicon-l"></em>
                                </div>
                                <div className="col-sm-9 col-lg-7 widget-right">
                                    <div className="large">{this.state.data.numSee}</div>
                                    <div className="text-muted">访问数据</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
});


//初始化渲染
ReactDOM.render(
    <Header_nav />,
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
