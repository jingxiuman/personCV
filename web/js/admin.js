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

ReactDOM.render(
    <Header_nav />,
    document.getElementById("admin_header")
);
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

var Left_nav = React.createClass({
    render: function () {

        var li_node = this.props.data.map(function (value) {
           // console.log(value.child);
            if(value.child.toString() == '[]') {
                return (
                    <li key={value.id}><a href={value.link}><span className={value.icon}/> {value.text}</a></li>
                )
            }else{
                var li_node_child = value.child.map(function (value_child) {
                    return (
                        <li key={value_child.id}>
                            <a  href={value_child.link}>
                                <span className={value_child.icon}/> {value_child.text}
                            </a>
                        </li>
                    )

                });
                return (
                    <li key={value.id} className="parent">
                        <a href={value.link}>
                            <span className={value.icon}/> {value.text}
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
            <ul className="nav menu">
                {li_node}
            </ul>
        )
    }
});
var Left_copy = React.createClass({
    render: function () {
        return (
            <div className="attribution">
                笨笨时光机
            </div>
        )
    }
});


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
var data = [
    {id:1,link:'#',text:'首页',icon:'glyphicon glyphicon-dashboard',child:[]},
    {id:2,link:'#',text:'博客管理',icon:'glyphicon glyphicon-pencil',child:[{id:21,link:'#',text:'发布博客'},{id:22,link:'#',text:'博客列表'}]},
    {id:3,link:'#',text:'项目管理',icon:'glyphicon glyphicon-pencil',child:[{id:31,link:'#',text:'发布项目'},{id:32,link:'#',text:'项目列表'}]},
    {id:4,link:'#',text:'导航设置',icon:'glyphicon glyphicon-info-sign',child:[]},
    {id:5,link:'#',text:'个人设置',icon:'glyphicon glyphicon-dashboard',child:[]},
    {id:6,link:'#',text:'首页',icon:'glyphicon glyphicon-dashboard',child:[]},
    {id:7,link:'#',text:'首页',icon:'glyphicon glyphicon-dashboard',child:[]}
];
ReactDOM.render(
    <Left_main  />,
    document.getElementById("sidebar-collapse")
);
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
            url: 'tables/data1.json',
            columns: [{
                field: 'id',
                title: '文章题目',
                sortable:true,
            }, {
                field: 'name',
                title: 'Item Name',
                sortable:true,
            }, {
                field: 'price',
                title: 'Item Price',
                sortable:true,
            },{
                field: 'blog',
                title: 'Item Price',
                checkbox:'blog'
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
                                    <div className="large">120</div>
                                    <div className="text-muted">New Orders</div>
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
                                    <div className="large">52</div>
                                    <div className="text-muted">Comments</div>
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
                                    <div className="large">24</div>
                                    <div className="text-muted">New Users</div>
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
                                    <div className="large">25.2k</div>
                                    <div className="text-muted">Visitors</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
});
ReactDOM.render(
    <Blog_list />,
    document.getElementById("index_right")
);
