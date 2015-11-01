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
                    <span>版权所有：{this.props.data.copyInfo}</span>
                    <span>备案号：{this.props.data.copyNum}</span>
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
            <div className="index_right_item">
                <div className="index_right_strangle"></div>,
                <div className="index_right_circle"></div>,
                <div className="index_right_pic">
                    <img src={this.props.data.newsPic} alt="" className="img"/>
                </div>,
                <div className="index_right_content">
                    <h2>{this.props.data.newsTitle}</h2>
                    <div className="index_right_info">浏览数：{this.props.data.newsSee}  创建时间：{this.props.data.newsCreateTime} 发布作者：{this.props.data.newsAuthor}</div>
                    <div className="index_right_main">
                        {this.props.data.newsContent}
                    </div>
                </div>
            </div>
        )
    }
});
var RightMain = React.createClass({
    render: function () {
        var itemNode = this.props.data.news.map(function (value) {
            return (
                <RightItem data={value}  key={value.id}/>
            )
        });
        return (

            <div className="index_rightMain">
                <div className="index_right_line"></div>
                <div className="index_rightContent_main">
                    {itemNode}
                </div>
            </div>
        )
    }
});

//博客内容组件
var blog = React.createClass({
    render: function () {
        return (
            <div class="blog_main">
                <div class="blog_header">
                    <h1>{this.props.data.newsTitle}</h1>
                    <div class="blog_info">
                        浏览数：<span>{this.props.data.newsTitle}</span>
                        作者：<span>{this.props.data.newsAdmin}</span>
                        评论数：<span>{this.props.data.newsCommentNum}</span>
                        创建时间：<span>{this.props.data.newsCreateTime}</span>
                        修改时间：<span>{this.props.data.newsChangeTime}</span></div>
                </div>
                <div class="blog_body">
                    {this.props.data.newsContent}
                </div>
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
                    news: [
                        {
                            id: 1,
                            newsPic: 'img/index.png',
                            newsTitle: '我会想你的',
                            newsSee: '000',
                            newsCreateTime: '2015-12-23',
                            newsAuthor: 'admin',
                            newsContent: '在计算机程序或文本编辑中，硬编码是指将可变变量用一个固定值来代替的方法。用这种方法编译后，如果以后需要更改此变量就非常困难了。大部分程序语言里，可以将一个固定数值定义为一个标记，然用这个特殊标记来取代变量名称。当标记名称改变时，变量名不变，这样，当重新编译整个程序时，变量都不再是固定值，这样就更容易的实现了改变变量的目的。'
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
                console.log(value[0]);
                this.setState({data:{Data: value[0].Data,rightDate:value[0].rightDate}});

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
       news:[
           {id:1,newsPic:'img/index.png',newsTitle:'我会想你的',newsSee:'000',newsCreateTime:'2015-12-23',newsAuthor:'admin',newsContent:'在计算机程序或文本编辑中，硬编码是指将可变变量用一个固定值来代替的方法。用这种方法编译后，如果以后需要更改此变量就非常困难了。大部分程序语言里，可以将一个固定数值定义为一个标记，然用这个特殊标记来取代变量名称。当标记名称改变时，变量名不变，这样，当重新编译整个程序时，变量都不再是固定值，这样就更容易的实现了改变变量的目的。'},
           {id:2,newsPic:'img/index.png',newsTitle:'我会想你的',newsSee:'000',newsCreateTime:'2015-12-23',newsAuthor:'admin',newsContent:'在计算机程序或文本编辑中，硬编码是指将可变变量用一个固定值来代替的方法。用这种方法编译后，如果以后需要更改此变量就非常困难了。大部分程序语言里，可以将一个固定数值定义为一个标记，然用这个特殊标记来取代变量名称。当标记名称改变时，变量名不变，这样，当重新编译整个程序时，变量都不再是固定值，这样就更容易的实现了改变变量的目的。'},
           {id:3,newsPic:'img/index.png',newsTitle:'我会想你的',newsSee:'000',newsCreateTime:'2015-12-23',newsAuthor:'admin',newsContent:'在计算机程序或文本编辑中，硬编码是指将可变变量用一个固定值来代替的方法。用这种方法编译后，如果以后需要更改此变量就非常困难了。大部分程序语言里，可以将一个固定数值定义为一个标记，然用这个特殊标记来取代变量名称。当标记名称改变时，变量名不变，这样，当重新编译整个程序时，变量都不再是固定值，这样就更容易的实现了改变变量的目的。'},
           {id:4,newsPic:'img/index.png',newsTitle:'我会想你的',newsSee:'000',newsCreateTime:'2015-12-23',newsAuthor:'admin',newsContent:'在计算机程序或文本编辑中，硬编码是指将可变变量用一个固定值来代替的方法。用这种方法编译后，如果以后需要更改此变量就非常困难了。大部分程序语言里，可以将一个固定数值定义为一个标记，然用这个特殊标记来取代变量名称。当标记名称改变时，变量名不变，这样，当重新编译整个程序时，变量都不再是固定值，这样就更容易的实现了改变变量的目的。'},
           {id:5,newsPic:'img/index.png',newsTitle:'我会想你的',newsSee:'000',newsCreateTime:'2015-12-23',newsAuthor:'admin',newsContent:'在计算机程序或文本编辑中，硬编码是指将可变变量用一个固定值来代替的方法。用这种方法编译后，如果以后需要更改此变量就非常困难了。大部分程序语言里，可以将一个固定数值定义为一个标记，然用这个特殊标记来取代变量名称。当标记名称改变时，变量名不变，这样，当重新编译整个程序时，变量都不再是固定值，这样就更容易的实现了改变变量的目的。'},
           {id:6,newsPic:'img/index.png',newsTitle:'我会想你的',newsSee:'000',newsCreateTime:'2015-12-23',newsAuthor:'admin',newsContent:'在计算机程序或文本编辑中，硬编码是指将可变变量用一个固定值来代替的方法。用这种方法编译后，如果以后需要更改此变量就非常困难了。大部分程序语言里，可以将一个固定数值定义为一个标记，然用这个特殊标记来取代变量名称。当标记名称改变时，变量名不变，这样，当重新编译整个程序时，变量都不再是固定值，这样就更容易的实现了改变变量的目的。'}
       ]
   }
};
ReactDOM.render(
    <Main url="server/hello.json"  />,
    document.getElementById("contain")
);