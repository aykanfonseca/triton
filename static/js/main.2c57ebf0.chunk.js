(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{101:function(e,t,a){},171:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(27),l=a.n(s),c=(a(101),a(9)),i=a(10),o=a(12),u=a(11),h=a(13),m=a(176),d=a(175),p=Object(n.createContext)({theme:"",toggleTheme:function(){}}),f=a(174);function v(){return(v=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}var g=r.a.createElement("defs",null,r.a.createElement("linearGradient",{x1:"0%",y1:"0%",y2:"100%",id:"a"},r.a.createElement("stop",{stopColor:"#FC933C",offset:"0%"}),r.a.createElement("stop",{stopColor:"#FFE14B",offset:"100%"}))),E=r.a.createElement("path",{d:"M18.892 36.283V65H13.96V35.873l-.942-2.617.085-.806L0 36.782l6.423-22.948-1.72.55 5.39-9.443-3.785 22.948 7.658-3.687L16.5 0l2.534 24.202 7.658 3.687L22.907 4.94l5.39 9.442-1.72-.549L33 36.782 19.897 32.45l.085.806-1.09 3.027z",fill:"url(#a)"}),b=function(e){return r.a.createElement("svg",v({width:33,height:65},e),g,E)},w=(a.p,Object(n.memo)(function(e){return r.a.createElement("div",{className:"branding"+e.theme,onClick:e.changeTheme,title:"Triton Courses - a convenient way to plan your courses!"},r.a.createElement("h1",null,"Triton"),r.a.createElement(b,null),r.a.createElement("h1",null,"Courses"))})),y=a(69),O=Object(n.memo)(function(e){var t=e.theme;return r.a.createElement("span",{className:"blankcard"+t},r.a.createElement("div",null,r.a.createElement("div",{className:"blankcard-header"+t}),r.a.createElement("div",{className:"blankcard-subtitle"+t})))}),S=a(172);function j(){return(j=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}var x=r.a.createElement("path",{d:"M13.6 9.848H15c.6 0 1 .419 1 1.047v10.057c0 .629-.4 1.048-1 1.048H1c-.552 0-1-.469-1-1.048V10.895c0-.628.4-1.047 1-1.047h1.4v-4.19h2.2v4.19h6.8v-4.19h2.2v4.19zm0-4.19H2.4C2.4 2.513 5 0 8 0c3 0 5.6 2.514 5.6 5.657zm-2.2 0C11.4 3.77 9.9 2.2 8 2.2c-1.84 0-3.346 1.531-3.4 3.457h6.8z"}),C=function(e){return r.a.createElement("svg",j({width:16,height:22},e),x)},k=(a.p,function(e){var t=e.waitlist,a=e.theme;return t?r.a.createElement("div",{className:"card-waitlist"+a,title:"Means there's a waitlist."},r.a.createElement(C,null)):r.a.createElement("div",{className:"card-waitlist-empty-icon"})}),R=function(e){var t=e.item,a=e.theme;return r.a.createElement(S.a,{to:{pathname:"/"+t.code.split(" ").join(""),state:{item:t}},title:"A course card.",className:"card"+a},r.a.createElement("div",{className:"card-width"},r.a.createElement("p",{className:"card-code"},t.code),r.a.createElement("p",{className:"card-title"+a},t.title)),r.a.createElement(k,{waitlist:t.waitlist,theme:a}))},Q=function(e){var t=e.item,a=e.theme;return r.a.createElement(S.a,{to:"/content",title:"A teacher card.",className:"card"+a},r.a.createElement("div",{className:"card-width"},r.a.createElement("p",{className:"card-code"},t.teacher),r.a.createElement("p",{className:"card-title"+a},"teaches ",t.classes.length," ",t.classes.length>1?"classes":"class"," this quarter")))},N=Object(n.memo)(function(e){var t=e.item,a=e.theme;return t.code?r.a.createElement(R,{theme:a,item:t}):r.a.createElement(Q,{theme:a,item:t})}),T=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(o.a)(this,Object(u.a)(t).call(this,e))).rowRenderer=function(e){var t=e.key,n=e.index,s=e.style,l="";if(a.props.loading)l=r.a.createElement(O,{theme:a.context.theme,key:n});else if(0===a.props.searchResults.length)l=r.a.createElement("div",{className:"empty-list"+a.context.theme},r.a.createElement("div",null,r.a.createElement("svg",{width:"85",height:"117",xmlns:"http://www.w3.org/2000/svg"},r.a.createElement("defs",null,r.a.createElement("linearGradient",{x1:"50%",y1:"0%",x2:"50%",y2:"99.073%",id:"a"},r.a.createElement("stop",{"stop-color":"#B0F08C",offset:"0%"}),r.a.createElement("stop",{"stop-color":"#72DCD4",offset:"100%"}))),r.a.createElement("g",{fill:"none","fill-rule":"evenodd"},r.a.createElement("path",{d:"M25.574 99.735c.01.112.014.225.014.34 0 .185-.008.416-.024.683a4.31 4.31 0 0 1-.154 1.673c-.439 3.673-1.71 9.565-4.066 9.565s-3.627-5.892-4.066-9.565a4.26 4.26 0 0 1-.154-1.673 12.61 12.61 0 0 1-.024-.627l-.03.001a4.248 4.248 0 0 0-4.214-3.743 4.248 4.248 0 0 0-4.212 4.773C8.801 105.276 9.31 117 4.37 117c-5.508 0-4.244-14.577-4.244-16.926V37.99h.239C2.624 16.636 20.654 0 42.563 0 64.47 0 82.502 16.636 84.76 37.989H85v48.47c0 5.205-3.625 9.596-8.533 10.72a4.248 4.248 0 0 1-4.198 4.879 4.248 4.248 0 0 1-4.244-4.308l-.37.017a4.244 4.244 0 0 0-3.874-2.512 4.246 4.246 0 0 0-4.018 2.881l-.298.014c-.267 5.663-1.191 12.535-4.171 12.611-2.925.075-3.87-6.574-4.156-12.222l-.196.01a4.247 4.247 0 0 0-4.136-3.294 4.248 4.248 0 0 0-4.206 3.684l-.188.008c.098.36.15.737.15 1.127 0 2.349-1.9 4.253-4.243 4.253a4.248 4.248 0 0 1-4.18-4.993l-.264.013a4.247 4.247 0 0 0-4.044-2.958 4.247 4.247 0 0 0-4.146 3.34l-.11.006z",fill:"url(#a)"}),r.a.createElement("path",{d:"M60 69c0-5.523-7.835-10-17.5-10S25 63.477 25 69",fill:"#FFF"}),r.a.createElement("ellipse",{fill:"#FFF",cx:"60",cy:"36.5",rx:"8",ry:"8.5"}),r.a.createElement("ellipse",{fill:"#FFF",cx:"22",cy:"36.5",rx:"8",ry:"8.5"})))),r.a.createElement("div",null,r.a.createElement("h2",null,"Nothing to display"),r.a.createElement("p",null,"Try these suggestions:")),r.a.createElement("div",null,r.a.createElement("span",{title:"Click here for help and more information!",className:"list-help"+a.props.context},r.a.createElement("p",null,"Or press"),r.a.createElement("div",null,r.a.createElement("svg",{width:"18",height:"27",xmlns:"http://www.w3.org/2000/svg"},r.a.createElement("path",{d:"M7 21h3.4c.6 0 1 .5 1 1v3.3c0 .6-.4 1-1 1H7.1a1 1 0 0 1-1-1V22c0-.5.4-1 1-1zM0 8.3c.2-1.3.4-2.3.7-3 .4-1 1-2 1.7-2.8A8 8 0 0 1 5.2.7a11.3 11.3 0 0 1 7.8 0c1.2.5 2 1 2.8 1.7a6.3 6.3 0 0 1 2 4.5 7 7 0 0 1-3 6.1L13 14.3 12 15.4c-.4.5-.6 1.1-.7 1.8v.4c0 .6-.5 1-1 1H7.3a1 1 0 0 1-1-1V17A7.4 7.4 0 0 1 8 12.6l1.4-1.3 1.3-1c.4-.4.8-.8 1-1.2.3-.5.4-1 .4-1.6 0-1.2-.3-2-.8-2.5A3 3 0 0 0 9 4.2a3.3 3.3 0 0 0-2.8 1.4c-.3.4-.5 1-.7 1.5l-.2 1.3c0 .3-.2.5-.5.5H.6a.5.5 0 0 1-.5-.6z",fill:"#fff"}))),r.a.createElement("p",null,"for help."))));else{var c=a.props.searchResults[n];l=r.a.createElement(N,{key:t.code||c.teacher,item:c,theme:a.context.theme})}return r.a.createElement("div",{key:t,style:s},l)},a.list=Object(n.createRef)(),a}return Object(h.a)(t,e),Object(i.a)(t,[{key:"componentDidUpdate",value:function(e){this.props.context!==e.context&&this.list.current.forceUpdateGrid()}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"list"+this.props.context},r.a.createElement(y.a,null,function(t){var a=t.height,n=t.width;return r.a.createElement(y.b,{ref:e.list,height:a,width:n,rowCount:e.props.loading?100:0===e.props.searchResults.length?1:e.props.searchResults.length,rowHeight:e.props.loading||0!==e.props.searchResults.length?95:a,rowRenderer:e.rowRenderer,loading:e.props.loading})}))}}]),t}(n.Component);T.contextType=p;var W=function(e){var t=e.searchResults,a=e.loading;return r.a.createElement(p.Consumer,null,function(e){var n=e.theme;return r.a.createElement(T,{loading:a,searchResults:t,context:n})})};function F(){return(F=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}var M=r.a.createElement("path",{d:"M14.061 11.045l7.297 7.267a2.087 2.087 0 0 1-.88 3.517 2.107 2.107 0 0 1-2.039-.506l-7.4-7.267-7.298 7.267c-.806.86-2.16.907-3.023.104a2.124 2.124 0 0 1-.104-3.01l7.505-7.372L.718 3.778A2.162 2.162 0 0 1 .562.715 2.184 2.184 0 0 1 3.637.559l7.297 7.58 7.61-7.372a2.091 2.091 0 0 1 2.558.348c.67.691.775 1.75.256 2.559l-7.297 7.267v.104z",fill:"#FFF"}),q=function(e){return r.a.createElement("svg",F({width:22,height:22},e),M)};a.p;function z(){return(z=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}var D=r.a.createElement("path",{d:"M25.638 23.736c.679.678.69 1.766.027 2.43-.663.663-1.75.65-2.43-.028l-6.832-6.833c-3.964 2.796-9.546 2.362-13.168-1.261C-.807 14.003-.88 7.524 3.072 3.572c3.951-3.952 10.43-3.879 14.472.163 3.623 3.622 4.057 9.204 1.261 13.168l6.833 6.833zm-9.588-7.29c3-3 2.944-7.919-.124-10.987C12.858 2.391 7.94 2.336 4.94 5.335c-3 3-2.944 7.919.124 10.987 3.068 3.068 7.986 3.123 10.986.123z",fill:"#fff"}),I=function(e){return r.a.createElement("svg",z({width:27,height:27},e),D)},A=(a.p,Object(n.memo)(function(e){return r.a.createElement("div",{className:"searchbutton"+e.theme,onClick:e.hasTextInput?e.clearSearchBox:null,title:e.hasTextInput?"Clear searchbox":"Search as you type"},e.hasTextInput?r.a.createElement(q,{alt:"clear searchbox"}):r.a.createElement(I,{alt:"search"}))})),P=a(95),L=a.n(P),U=(a(167),L.a.initializeApp({apiKey:"AIzaSyBz9MqHrEh6L_JfowxiohQopK_QInvj0zo",authDomain:"schedule-of-classes-8b222.firebaseapp.com",databaseURL:"https://schedule-of-classes-8b222.firebaseio.com",projectId:"schedule-of-classes-8b222",storageBucket:"schedule-of-classes-8b222.appspot.com",messagingSenderId:"146759229029"})),H={Fall:"FA",Winter:"WI",Spring:"SP","Summer Med School":"SU","Summer Session 1":"S1","Summer Session 2":"S2","Summer Session 3":"S3",Summer:"SA"},B={FA:"Fall",WI:"Winter",SP:"Spring",SU:"Summer Med School",S1:"Summer Session 1",S2:"Summer Session 2",S3:"Summer Session 3",SA:"Summer"},V={SU:0,S1:1,S2:2,S3:3,SA:4,FA:5,WI:6,SP:7},G=function(e,t){var a=parseInt(e.slice(-2),10),n=parseInt(t.slice(-2),10);return a>n?-1:a<n?1:V[e.slice(0,2)]>V[t.slice(0,2)]?-1:1},J=function(e,t){var a=[],n=[];for(e.code.replace(/(\d+)|(\D+)/g,function(e,t,n){a.push([t||1/0,n||""])}),t.code.replace(/(\d+)|(\D+)/g,function(e,t,a){n.push([t||1/0,a||""])});a.length&&n.length;){var r=a.shift(),s=n.shift(),l=r[0]-s[0]||r[1].localeCompare(s[1]);if(l)return l}},K=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(o.a)(this,Object(u.a)(t).call(this,e))).handleWindowResize=function(){window.innerWidth>=1200&&window.innerWidth<1600||window.innerWidth<520?a.setState({showSmall:!0}):a.setState({showSmall:!1})},a.handleQuarterChange=function(e){e.stopPropagation(),a.setState({quarter:e.target.value}),a.props.changeQuarter(e.target.value)},a.state={quarter:"",showSmall:window.innerWidth>=1200&&window.innerWidth<1600||window.innerWidth<520},a}return Object(h.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){window.addEventListener("resize",this.handleWindowResize)}},{key:"componentWillUnmount",value:function(){window.removeEventListener("resize",this.handleWindowResize)}},{key:"render",value:function(){var e=this;return""!==this.props.selectedQuarter?r.a.createElement("select",{title:"Select to change quarter",className:"quarter"+this.context.theme,value:this.state.quarter,onChange:this.handleQuarterChange},r.a.createElement("optgroup",{label:"Other"},r.a.createElement("option",null,"Catalog")),r.a.createElement("optgroup",{label:"Quarters"},this.props.quarters.map(function(t){return r.a.createElement("option",{key:t.abbreviation},e.state.showSmall?t.abbreviation:t.value)}))):r.a.createElement("div",{title:"Select to change quarter",className:"quarter"+this.context.theme},r.a.createElement("div",{className:"quarter"+this.context.theme+"-loading"}))}}],[{key:"getDerivedStateFromProps",value:function(e,t){return""!==e.selectedQuarter?t.showSmall?{quarter:e.selectedQuarter}:{quarter:B[e.selectedQuarter.slice(0,2)]+" "+("20"+e.selectedQuarter.slice(2,4))}:""}}]),t}(n.PureComponent);K.contextType=p;var _=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(o.a)(this,Object(u.a)(t).call(this,e))).clearSearchBox=function(){a.searchbox.value="",a.setState({text:""})},a.state={text:""},a.searchbox=Object(n.createRef)(),a}return Object(h.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"searchbox"+this.context.theme},r.a.createElement("input",{type:"text",title:"Type to search",spellCheck:"false",ref:function(t){e.searchbox=t},placeholder:"Find courses, teachers, units...",onKeyUp:this.props.filterView}),r.a.createElement(K,{quarters:this.props.quarters,changeQuarter:this.props.changeQuarter,selectedQuarter:this.props.selectedQuarter}),r.a.createElement(A,{theme:this.context.theme,hasTextInput:""!==this.state.text,clearSearchBox:this.clearSearchBox}))}}]),t}(n.PureComponent);_.contextType=p;var $=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(o.a)(this,Object(u.a)(t).call(this,e))).setRef=function(e){a.inputRef=e},a.clearTextInput=function(){a.searchbox.value="",a.classes=a.initialClasses,a.teachers=a.initialTeachers,a.setState({displayResults:a.classes})},a.handleFilter=function(e,t){var n=!0===e?a.initialClasses:a.classes,r=!0===e?a.initialTeachers:a.teachers;if(-1!==t.indexOf("pinned"))a.props.pinned.length>0&&a.setState({displayResults:a.initialClasses.filter(function(e){return a.props.pinned.includes(e)})});else if(-1!==t.indexOf("unit")||-1!==t.indexOf("units")){var s=t.match(/\d+/);null!==s&&a.setState({displayResults:a.initialClasses.filter(function(e){return-1!==e.units.indexOf(s)})})}else a.classes=n.filter(function(e){var a=e.code,n=e.title;return-1!==a.toLowerCase().indexOf(t)||-1!==n.toLowerCase().indexOf(t)}),a.classes!==a.state.displayResults&&(a.teachers=r.filter(function(e){return-1!==e.teacher.toLowerCase().replace(",","").indexOf(t)}),a.classes.length<5?a.setState({displayResults:a.classes.concat(a.teachers.slice(0,7))}):a.setState({displayResults:a.classes}))},a.filterView=function(e){if(""!==e.target.value){var t=e.target.value.trim().toLowerCase();" "!==t&&a.handleFilter(8===e.keyCode,t)}else a.setState({displayResults:a.initialClasses}),a.classes=a.initialClasses,a.teachers=a.initialTeachers},a.initialClasses=[],a.initialTeachers=[],a.classes=[],a.teachers=[],a.suggestions=[],a.state={displayResults:[]},console.log("MOUNTED! - SIDEPANE"),a}return Object(h.a)(t,e),Object(i.a)(t,[{key:"componentDidUpdate",value:function(){!0===this.props.loading&&0!==this.state.displayResults.length?(this.setState({displayResults:[]}),this.searchbox.value="",this.initialClasses=this.initialTeachers=this.classes=this.teachers=this.suggestions=[]):0===this.classes.length&&this.state.displayResults.length>0&&(this.classes=this.initialClasses=this.props.classes,this.suggestions=[this.classes[Math.floor(Math.random()*this.classes.length)].code,this.classes[Math.floor(Math.random()*this.classes.length)].code,this.classes[Math.floor(Math.random()*this.classes.length)].code],this.teachers=this.initialTeachers=this.props.teachers)}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(w,this.context),r.a.createElement(_,{quarters:this.props.quarters,changeQuarter:this.props.changeQuarter,selectedQuarter:this.props.selectedQuarter,filterView:this.filterView}),r.a.createElement(W,{searchResults:this.state.displayResults,loading:this.props.loading}))}}],[{key:"getDerivedStateFromProps",value:function(e,t){return 0===t.displayResults.length&&e.classes.length>0?{displayResults:e.classes}:null}}]),t}(n.PureComponent);$.contextType=p;var X=Object(n.memo)(function(e){var t=e.item,a=e.theme;return r.a.createElement("div",{className:"ribbon"+a},r.a.createElement("div",{className:"title"+a},r.a.createElement("h1",null,t.code),r.a.createElement("p",null,t.title)),r.a.createElement(S.a,{to:"/",title:"Click to close",className:"btn-close"+a},r.a.createElement(q,null)))}),Y=Object(n.memo)(function(e){var t=e.item,a=e.theme;return r.a.createElement("div",{className:"content"+a},r.a.createElement("h1",null,"Description"),r.a.createElement("p",null,t.rest.description))}),Z=function(e){function t(){return Object(c.a)(this,t),Object(o.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return console.log(this.props.location.state.item),r.a.createElement("div",{className:"rightpane"+this.context.theme},r.a.createElement(X,{item:this.props.location.state.item,theme:this.context.theme}),r.a.createElement(Y,{item:this.props.location.state.item,theme:this.context.theme}))}}]),t}(n.PureComponent);Z.contextType=p;var ee=function(e){function t(){return Object(c.a)(this,t),Object(o.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"emptypane"+this.context.theme})}}]),t}(n.PureComponent);ee.contextType=p;var te=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(o.a)(this,Object(u.a)(t).call(this,e))).handleWindowResize=function(){a.setState({isMobile:window.innerWidth<1200})},a.state={isMobile:window.innerWidth<1200},a}return Object(h.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){window.addEventListener("resize",this.handleWindowResize)}},{key:"componentWillUnmount",value:function(){window.removeEventListener("resize",this.handleWindowResize)}},{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,this.props.children(this.state.isMobile))}}]),t}(n.PureComponent),ae=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(o.a)(this,Object(u.a)(t).call(this,e))).loadData=function(){var e=U.database().ref("quarter/"+a.selectedQuarter),t=U.database().ref("quarter/"+a.selectedQuarter+" teachers");e.once("value",function(e){var n=e.val(),r=[];for(var s in n)r.push({code:s,title:n[s].title,units:n[s].units,rest:n[s],waitlist:"true"===n[s].waitlist,dei:"true"===n[s].dei});a.classes=r.sort(J),t.once("value",function(e){var t=e.val(),n=[];for(var r in t)n.push({teacher:r,email:t[r][0],classes:t[r][1]});a.teachers=n,localStorage.setItem(a.selectedQuarter,[a.classes,a.teachers]),a.setState({loading:!1})})})},a.loadDataCatalog=function(){U.database().ref("catalog/").once("value",function(e){var t=e.val(),n=[];for(var r in t)n.push({code:r,title:t[r].title,units:t[r].units,rest:t[r]});a.classes=n.sort(J),a.teachers=[],localStorage.setItem("Catalog",[a.classes,a.teachers]),a.setState({loading:!1})})},a.changeQuarter=function(e){if(a.setState({loading:!0}),"Catalog"===e)a.selectedQuarter="Catalog";else{var t=e.split(" ");a.selectedQuarter=H[t[0]]+t[1].substring(2)}var n=localStorage.getItem(a.selectedQuarter);null!==n?(a.classes=n[0],a.teachers=n[1],a.setState({loading:!1})):"Catalog"===a.selectedQuarter?a.loadDataCatalog():a.loadData()},a.selectedQuarter="",a.quarters=[],a.classes=[],a.teachers=[],a.state={loading:!0},console.log("MOUNTED! - HOME"),a}return Object(h.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.quarters=function(){var e=[];return U.database().ref("quarter/").once("value",function(t){Object.keys(t.val()).filter(function(e){return-1===e.indexOf("teacher")}).sort(G).forEach(function(t){return e.push({value:B[t.slice(0,2)]+" 20"+t.slice(-2),abbreviation:t})})}),e}(),U.database().ref("current").once("value",function(t){e.selectedQuarter=t.val(),e.loadData()})}},{key:"render",value:function(){var e=this;return r.a.createElement(te,null,function(t){return t?r.a.createElement(m.a,null,r.a.createElement(d.a,{exact:!0,path:"/",render:function(t){return r.a.createElement($,Object.assign({classes:e.classes,quarters:e.quarters,selectedQuarter:e.selectedQuarter,changeQuarter:e.changeQuarter,teachers:e.teachers,loading:e.state.loading},t))}}),r.a.createElement(d.a,{path:"/:id",component:Z}),r.a.createElement(f.a,{from:"/settings",to:"/"}),r.a.createElement(f.a,{from:"/:id",to:"/"})):r.a.createElement(d.a,{render:function(t){return r.a.createElement("div",{style:{display:"flex"}},r.a.createElement($,Object.assign({classes:e.classes,quarters:e.quarters,selectedQuarter:e.selectedQuarter,changeQuarter:e.changeQuarter,teachers:e.teachers,loading:e.state.loading},t)),r.a.createElement(m.a,null,r.a.createElement(d.a,{path:"/:id",component:Z}),r.a.createElement(d.a,{component:ee})))}})})}}]),t}(n.Component),ne=function(e){function t(e){var a;Object(c.a)(this,t),(a=Object(o.a)(this,Object(u.a)(t).call(this,e))).saveTheme=function(){localStorage.setItem("theme",a.state.theme)},a.changeTheme=function(){a.setState({theme:""===a.state.theme?"-dark":""},a.saveTheme)};var n=localStorage.getItem("theme");return a.state={theme:null!==n?n:"",changeTheme:a.changeTheme},a}return Object(h.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement(p.Provider,{value:this.state},r.a.createElement(m.a,null,r.a.createElement(d.a,{component:ae})))}}]),t}(n.Component),re=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function se(e,t){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var a=e.installing;a.onstatechange=function(){"installed"===a.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See http://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))}}}).catch(function(e){console.error("Error during service worker registration:",e)})}var le=a(173);l.a.render(r.a.createElement(le.a,{basename:"/triton"},r.a.createElement(ne,null)),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/triton",window.location).origin!==window.location.origin)return;window.addEventListener("load",function(){var t="".concat("/triton","/service-worker.js");re?(function(e,t){fetch(e).then(function(a){404===a.status||-1===a.headers.get("content-type").indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):se(e,t)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(t,e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit http://bit.ly/CRA-PWA")})):se(t,e)})}}()},96:function(e,t,a){e.exports=a(171)}},[[96,2,1]]]);
//# sourceMappingURL=main.2c57ebf0.chunk.js.map