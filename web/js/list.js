/**
 * Created by knowthis on 15/10/28.
 */
var PersonInfo = React.createClass({
    render: function () {
        return (
            <div>
            <div className="index_left_person">
                <img src={this.props.data.personPic} className="img" alt=""/>
            </div>
            <div className="index_left_name">
                {this.props.data.personName}
            </div>
                </div>
        )
    }
});
var LeftNav = React.createClass({
    render: function () {
        var listNode = this.props.data.map(function (value) {
            return (
                <li key={value.id}><a href={value.link}>{value.text}</a></li>
            )
        });
        return (
        <ul className="index_left_list">
            {listNode}
        </ul>
        )
    }
});
var LeftShare = React.createClass({

    render: function () {
        var shareNode = this.props.data.map(function (value) {
            return (
                <li  key={value.id}><a href={value.link} dangerouslySetInnerHTML={{__html:value.text}}></a></li>
            )
        });
        return (
            <div className="index_left_share" >
                <ul className="index_share_list">
                    {shareNode}
                </ul>
            </div>
        )
    }
});


var LeftCopyright = React.createClass({
    render: function () {
        return (
            <div className="index_left_copyright">
                <LeftShare data={this.props.data.share}/>
                <div className="index_left_info">
                    <span className="index_left_info_span">版权所有：{this.props.data.copyInfo}</span>
                    <span  className="index_left_info_span">备案号：{this.props.data.copyNum}</span>
                </div>
            </div>
        )
    }
});
var LeftNavMain = React.createClass({
    render: function () {
        //console.log(this.props.data.personInfo);
        return (
            <div className="index_leftNav">
                <PersonInfo data={this.props.data.personInfo} />
                <LeftNav data={this.props.data.list} />
                <LeftCopyright

                    data={this.props.data.copyright}/>
            </div>
        )
    }
});
//右部
var RightItem = React.createClass({
    render: function () {
        return (
            <div className="list_item">
                <div className="list_pic"><img src={this.props.data.projectPic} alt="" className="img"/></div>
                <div className="list_info">
                    <h1>{this.props.data.projectTitle}</h1>
                    <div className="list_info_item"> 作者：<span>{this.props.data.projectAuthor}</span> 发布时间：<span>{this.props.data.projectTime}</span></div>
                    <div className="list_body">
                        {this.props.data.projectContent}
                    </div>
                    <div className="list_address">
                        <div className="list_address_item">项目地址：<a href={this.props.data.projectURL}>{this.props.data.projectURL}</a></div>
                        <div className="list_address_item">项目地址：<a href={this.props.data.projectGITHUB}>{this.props.data.projectGITHUB}</a></div>
                    </div>
                </div>
            </div>
        )
    }
});
var RightMain = React.createClass({
    render: function () {
        var itemNode = this.props.data.project.map(function (value) {
            return (
                <RightItem data={value} key={value.id}/>
            )
        });
        return (

            <div className="index_rightMain list_main">
                {itemNode}
            </div>
        )
    }
});


var Main = React.createClass({
    getInitialState: function() {
       // console.log(this.props.url);
        return {
            data: {
                Data: {
                    personInfo: {
                        personPic: 'img/index.png',
                        personName: '笨笨时光机'
                    },
                    list: [
                        {id: 1, link: '#', text: '首页'}
                    ],
                    copyright: {
                        copyInfo: '笨笨时光',
                        copyNum: '鄂ICP备14002646-1',
                        share: [
                            {id: 1, link: '#', text: '&#xe601;'}
                        ]
                    }
                },
                rightDate: {
                    project: [
                        {
                            id:'',
                            projectPic:'',
                            projectTitle:'',
                            projectAuthor:'',
                            projectTime:'',
                            projectContent:'',
                            projectURL:'',
                            projectGITHUB:''
                        }
                    ]
                }
            }
        };
    },
    componentDidMount: function() {
      //  console.log(this.props.url);
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type:'get',
            cache: false,
            success: function(value) {
                //console.log(value[0]);
                this.setState({data:{Data: value.Data,rightDate:value.rightDate}});

            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function () {
       // console.log(this.state.data.Data);
        return (
            <div className="container">
                <LeftNavMain data={this.state.data.Data} />
                <RightMain data={this.state.data.rightDate} />
                <div className="index_bg"></div>
            </div>
        )
    }
});


var data={
   Data:{
       personInfo:{
           personPic:'img/index.png',
           personName:'笨笨时光机'
       },
       list:[
           {id:1,link:'#',text:'首页'},
           {id:2,link:'#',text:'最新内容'},
           {id:3,link:'#',text:'项目列表'},
           {id:4,link:'#',text:'个人简历'}
       ],
       copyright: {
           copyInfo: '笨笨时光',
           copyNum: '鄂ICP备14002646-1',
           share: [
               {id:1,link: '#', text: '&#xe601;'},
               {id:2,link: '#', text: '&#xe600;'},
               {id:3,link: '#', text: '&#xe602;'}
           ]
       }
   },
   rightDate:{
       project:[
           {
               id:'',
               projectImg:'',
               projectTitle:'',
               projectAuthor:'',
               projectTime:'',
               projectContent:'',
               projectURL:'',
               projectGITHUB:''
           }
            ]
   }
};
ReactDOM.render(
    <Main url="server/list.php"  />,
    document.getElementById("contain")
);