(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{34:function(e,t,a){},37:function(e,t,a){e.exports=a(59)},55:function(e,t,a){},56:function(e,t,a){},59:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(23),c=a(17),o=a(25),i=a(3),u=a(4),l=a(8),m=a(7),h=a(31),d=a(15),v=a(9),p=a(21),b=a.n(p);a(46),a(49),a(51);b.a.initializeApp({apiKey:"AIzaSyDhAlJ2kH_ilvTb6FMrnnuRCDCw1MMP7dI",authDomain:"test-baucuatomca.firebaseapp.com",databaseURL:"https://test-baucuatomca-default-rtdb.firebaseio.com",projectId:"test-baucuatomca",storageBucket:"test-baucuatomca.appspot.com",messagingSenderId:"195498228780",appId:"1:195498228780:web:ee787e920bac5fe2786589",measurementId:"G-LWKL028W31"});var f=b.a.auth,g=b.a.database(),E=b.a.firestore();var y=function(){return r.a.createElement("header",null,r.a.createElement("nav",{className:"navbar navbar-expand-sm fixed-top navbar-light bg-light"},r.a.createElement(v.b,{className:"navbar-brand",to:"/"},r.a.createElement("img",{src:"/baucuatomca/img/icon.jfif"})),r.a.createElement("button",{className:"navbar-toggler",type:"button","data-toggle":"collapse","data-target":"#navbarNavAltMarkup","aria-controls":"navbarNavAltMarkup","aria-expanded":"false","aria-label":"Toggle navigation"},r.a.createElement("span",{className:"navbar-toggler-icon"})),r.a.createElement("div",{className:"collapse navbar-collapse justify-content-end",id:"navbarNavAltMarkup"},f().currentUser?r.a.createElement("div",{className:"navbar-nav"},r.a.createElement(v.b,{className:"nav-item nav-link mr-3",to:"/room"},"Ph\xf2ng ch\u01a1i"),r.a.createElement("a",{href:"javascript:;",className:"nav-item nav-link mr-3",onClick:function(){return f().signOut()}},"\u0110\u0103ng xu\u1ea5t")):r.a.createElement("div",{className:"navbar-nav"},r.a.createElement(v.b,{className:"nav-item nav-link mr-3",to:"/login"},"Sign In"),r.a.createElement(v.b,{className:"nav-item nav-link mr-3",to:"/signup"},"Sign Up")))))};var k=function(){return r.a.createElement("footer",null,r.a.createElement("div",{className:"container text-center"},r.a.createElement("p",null,r.a.createElement("a",{href:"http://ledinhhai.github.io/",target:""},"ledinhhai.github.io"),"\xa92021.")))},O=function(e){Object(l.a)(a,e);var t=Object(m.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(u.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{className:"home"},r.a.createElement(y,null),r.a.createElement("section",null,r.a.createElement("div",{className:"jumbotron jumbotron-fluid py-5"},r.a.createElement("div",{className:"container text-center py-5"},r.a.createElement("h1",{className:"display-4"},"Welcome to Chatty"),r.a.createElement("p",{className:"lead"},"A great place to share your thoughts with friends"),r.a.createElement("div",{className:"mt-4"},r.a.createElement(v.b,{className:"btn btn-primary px-5 mr-3",to:"/signup"},"Create New Account"),r.a.createElement(v.b,{className:"btn px-5",to:"/login"},"Login to Your Account"))))),r.a.createElement(k,null))}}]),a}(n.Component),N=a(6),j=a.n(N),w=a(11),C=a(5),S=function(e){Object(l.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).state={user:f().currentUser,chats:[],content:"",readError:null,writeError:null,loadingChats:!1},n.handleChange=n.handleChange.bind(Object(C.a)(n)),n.handleSubmit=n.handleSubmit.bind(Object(C.a)(n)),n.myRef=r.a.createRef(),n}return Object(u.a)(a,[{key:"componentDidMount",value:function(){var e=Object(w.a)(j.a.mark(function e(){var t,a=this;return j.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:this.setState({readError:null,loadingChats:!0}),t=this.myRef.current;try{g.ref("chats").on("value",function(e){var n=[];e.forEach(function(e){n.push(e.val())}),n.sort(function(e,t){return e.timestamp-t.timestamp}),a.setState({chats:n}),t.scrollBy(0,t.scrollHeight),a.setState({loadingChats:!1})})}catch(n){this.setState({readError:n.message,loadingChats:!1})}case 3:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"handleChange",value:function(e){this.setState({content:e.target.value})}},{key:"handleSubmit",value:function(){var e=Object(w.a)(j.a.mark(function e(t){var a;return j.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),this.setState({writeError:null}),a=this.myRef.current,e.prev=3,e.next=6,g.ref("chats").push({content:this.state.content,timestamp:Date.now(),uid:this.state.user.uid});case 6:this.setState({content:""}),a.scrollBy(0,a.scrollHeight),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(3),this.setState({writeError:e.t0.message});case 13:case"end":return e.stop()}},e,this,[[3,10]])}));return function(t){return e.apply(this,arguments)}}()},{key:"formatTime",value:function(e){var t=new Date(e);return"".concat(t.getDate(),"/").concat(t.getMonth()+1,"/").concat(t.getFullYear()," ").concat(t.getHours(),":").concat(t.getMinutes())}},{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement(y,null),r.a.createElement("div",{className:"chat-area",ref:this.myRef},this.state.loadingChats?r.a.createElement("div",{className:"spinner-border text-success",role:"status"},r.a.createElement("span",{className:"sr-only"},"Loading...")):"",this.state.chats.map(function(t){return r.a.createElement("p",{key:t.timestamp,className:"chat-bubble "+(e.state.user.uid===t.uid?"current-user":"")},t.content,r.a.createElement("br",null),r.a.createElement("span",{className:"chat-time float-right"},e.formatTime(t.timestamp)))})),r.a.createElement("form",{onSubmit:this.handleSubmit,className:"mx-3"},r.a.createElement("textarea",{className:"form-control",name:"content",onChange:this.handleChange,value:this.state.content}),this.state.error?r.a.createElement("p",{className:"text-danger"},this.state.error):null,r.a.createElement("button",{type:"submit",className:"btn btn-submit px-5 mt-4"},"Send")),r.a.createElement("div",{className:"py-5 mx-3"},"Login in as: ",r.a.createElement("strong",{className:"text-info"},this.state.user.email)))}}]),a}(n.Component);function x(){var e=new f.GoogleAuthProvider;return f().signInWithPopup(e)}function I(){var e=new f.GithubAuthProvider;return f().signInWithPopup(e)}function D(){var e=new f.FacebookAuthProvider;return f().signInWithPopup(e)}var A=function(e){Object(l.a)(a,e);var t=Object(m.a)(a);function a(){var e;return Object(i.a)(this,a),(e=t.call(this)).state={error:null,email:"",password:""},e.handleChange=e.handleChange.bind(Object(C.a)(e)),e.handleSubmit=e.handleSubmit.bind(Object(C.a)(e)),e.googleSignIn=e.googleSignIn.bind(Object(C.a)(e)),e.githubSignIn=e.githubSignIn.bind(Object(C.a)(e)),e}return Object(u.a)(a,[{key:"handleChange",value:function(e){this.setState({[e.target.name]:e.target.value})}},{key:"handleSubmit",value:function(){var e=Object(w.a)(j.a.mark(function e(t){return j.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),this.setState({error:""}),e.prev=2,e.next=5,a=this.state.email,n=this.state.password,f().createUserWithEmailAndPassword(a,n);case 5:e.next=10;break;case 7:e.prev=7,e.t0=e.catch(2),this.setState({error:e.t0.message});case 10:case"end":return e.stop()}var a,n},e,this,[[2,7]])}));return function(t){return e.apply(this,arguments)}}()},{key:"googleSignIn",value:function(){var e=Object(w.a)(j.a.mark(function e(){return j.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,x();case 3:e.next=8;break;case 5:e.prev=5,e.t0=e.catch(0),this.setState({error:e.t0.message});case 8:case"end":return e.stop()}},e,this,[[0,5]])}));return function(){return e.apply(this,arguments)}}()},{key:"githubSignIn",value:function(){var e=Object(w.a)(j.a.mark(function e(){return j.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,I();case 3:e.next=9;break;case 5:e.prev=5,e.t0=e.catch(0),console.log(e.t0),this.setState({error:e.t0.message});case 9:case"end":return e.stop()}},e,this,[[0,5]])}));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return r.a.createElement("div",{className:"container"},r.a.createElement("form",{className:"mt-5 py-5 px-5",onSubmit:this.handleSubmit},r.a.createElement("h1",null,"Sign Up to",r.a.createElement(v.b,{className:"title ml-2",to:"/"},"Chatty")),r.a.createElement("p",{className:"lead"},"Fill in the form below to create an account."),r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{className:"form-control",placeholder:"Email",name:"email",type:"email",onChange:this.handleChange,value:this.state.email})),r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{className:"form-control",placeholder:"Password",name:"password",onChange:this.handleChange,value:this.state.password,type:"password"})),r.a.createElement("div",{className:"form-group"},this.state.error?r.a.createElement("p",{className:"text-danger"},this.state.error):null,r.a.createElement("button",{className:"btn btn-primary px-5",type:"submit"},"Sign up")),r.a.createElement("p",null,"You can also sign up with any of these services"),r.a.createElement("button",{className:"btn btn-danger mr-2",type:"button",onClick:this.googleSignIn},"Sign up with Google"),r.a.createElement("button",{className:"btn btn-secondary",type:"button",onClick:this.githubSignIn},"Sign up with GitHub"),r.a.createElement("hr",null),r.a.createElement("p",null,"Already have an account? ",r.a.createElement(v.b,{to:"/login"},"Login"))))}}]),a}(n.Component),M=function(e){Object(l.a)(a,e);var t=Object(m.a)(a);function a(){var e;return Object(i.a)(this,a),(e=t.call(this)).state={error:null,email:"",password:""},e.fbSignIn=e.fbSignIn.bind(Object(C.a)(e)),e}return Object(u.a)(a,[{key:"fbSignIn",value:function(){var e=Object(w.a)(j.a.mark(function e(){return j.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,D();case 3:e.next=8;break;case 5:e.prev=5,e.t0=e.catch(0),this.setState({error:e.t0.message});case 8:case"end":return e.stop()}},e,this,[[0,5]])}));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return r.a.createElement("div",{className:"container"},r.a.createElement("button",{className:"btn btn-primary",type:"button",onClick:this.fbSignIn},"Sign in with Facebook"))}}]),a}(n.Component),R=E.collection("/rooms"),B=new(function(){function e(){Object(i.a)(this,e)}return Object(u.a)(e,[{key:"getAll",value:function(){return R}},{key:"getById",value:function(e){return R.doc(e).get()}},{key:"create",value:function(e){return R.add(e)}},{key:"update",value:function(e,t){return R.doc(e).update(t)}},{key:"delete",value:function(e){return R.doc(e).delete()}}]),e}()),L=function(e){Object(l.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).onDataChange=n.onDataChange.bind(Object(C.a)(n)),n.onChangeName=n.onChangeName.bind(Object(C.a)(n)),n.handleSubmit=n.handleSubmit.bind(Object(C.a)(n)),n.state={rooms:[],user:f().currentUser,name:""},n.unsubscribe=void 0,n}return Object(u.a)(a,[{key:"componentDidMount",value:function(){this.unsubscribe=B.getAll().orderBy("name","asc").onSnapshot(this.onDataChange)}},{key:"componentWillUnmount",value:function(){this.unsubscribe()}},{key:"onDataChange",value:function(e){var t=[],a=this.state.user.uid;e.forEach(function(e){var n=e.id,r=e.data();r&&(r.uid===a||r.users[a])&&t.push({id:n,name:r.name,users:r.users})}),this.setState({rooms:t})}},{key:"onChangeName",value:function(e){this.setState({name:e.target.value})}},{key:"handleSubmit",value:function(){var e=Object(w.a)(j.a.mark(function e(t){var a,n=this;return j.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t.preventDefault(),(a={uid:this.state.user.uid,name:this.state.name,users:{}}).users[this.state.user.uid]=0,B.create(a).then(function(){console.log("Created new item successfully!"),n.setState({submitted:!0})}).catch(function(e){console.log(e)});case 4:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this.state,t=e.rooms,a=e.name,n=e.user;return console.log(n),r.a.createElement("div",{className:"home"},r.a.createElement(y,null),r.a.createElement("section",null,r.a.createElement("div",{className:"jumbotron jumbotron-fluid py-5"},r.a.createElement("form",{onSubmit:this.handleSubmit,className:"mx-3"},r.a.createElement("input",{value:a,onChange:this.onChangeName}),r.a.createElement("button",{type:"submit",className:"btn btn-submit px-5 mt-4"},"T\u1ea1o ph\xf2ng m\u1edbi"))),r.a.createElement("ul",null,t.map(function(e,t){return r.a.createElement("li",{key:t},r.a.createElement(v.b,{className:"",to:"/game/".concat(e.id)},e.name))}))),r.a.createElement(k,null))}}]),a}(n.Component),P=new(function(){function e(){Object(i.a)(this,e)}return Object(u.a)(e,[{key:"writeChats",value:function(){var e=Object(w.a)(j.a.mark(function e(t,a){return j.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",g.ref(t+"/list/"+a.uid).set({content:a.content,timestamp:a.timestamp,uid:a.uid}));case 1:case"end":return e.stop()}},e)}));return function(t,a){return e.apply(this,arguments)}}()},{key:"getList",value:function(e){var t=[];return g.ref(e).on("value",function(e){e.forEach(function(e){t.push(e.val()),console.log(e)})}),t}}]),e}()),T=(a(34),function(e){Object(l.a)(a,e);var t=Object(m.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(u.a)(a,[{key:"render",value:function(){var e=this.props,t=e.value,a=e.users,n=e.name;return r.a.createElement("div",{className:"playBox col-xs-12 col-sm-4"},r.a.createElement("div",{className:"playItem ".concat(n)}),a?a.map(function(e){var t={width:e.value,height:e.value,lineHeight:(e.value>150?150:e.value)+"px",backgroundColor:e.color};return r.a.createElement("div",{key:e.uid,className:"userSelect",style:t},e.uid.charAt(0))}):"",r.a.createElement("div",{className:"boxControl"},r.a.createElement("input",{disabled:!0,value:t})))}}]),a}(n.Component)),U=Object(c.b)()(T),G=(a(55),function(e){Object(l.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(i.a)(this,a);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(e=t.call.apply(t,[this].concat(r))).state={className:"open"},e}return Object(u.a)(a,[{key:"componentDidMount",value:function(){var e=this;1===this.props.status&&(setTimeout(function(){return e.setState({className:"closing"})},1e3),setTimeout(function(){return e.setState({className:"closing in"})},3e3))}},{key:"componentDidUpdate",value:function(){var e=this;2===this.props.status&&setTimeout(function(){return e.setState({className:"open"})},1e3)}},{key:"render",value:function(){var e=this.props,t=e.result,a=(e.status,e.onClick);e.onResetGame;return r.a.createElement("div",{className:"snakeModal"},r.a.createElement("div",{className:"boder ".concat(this.state.className)},r.a.createElement("div",{className:"groupItem"},t.map(function(e,t){return r.a.createElement("div",{key:t,className:"item ".concat(e.name)})})),r.a.createElement("div",{className:"cover"},this.props.isOwner?r.a.createElement("button",{onClick:a,className:"btnOpen"},"M\u1edf"):"")))}}]),a}(r.a.Component)),_=function(e){Object(l.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(i.a)(this,a);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(e=t.call.apply(t,[this].concat(r))).handleMinus=function(t){t.preventDefault();var a=e.props.value-10;e.props.onClick(e.props.name,a)},e.handlePlus=function(t){t.preventDefault();var a=e.props.value+10;e.props.onClick(e.props.name,a)},e}return Object(u.a)(a,[{key:"render",value:function(){var e=this.props,t=e.value,a=e.users,n=e.name;return r.a.createElement("div",{className:"playBox col-xs-12 col-sm-4"},r.a.createElement("div",{className:"playItem ".concat(n)}),a?a.map(function(e){var t={width:e.value,height:e.value,lineHeight:(e.value>150?150:e.value)+"px",backgroundColor:e.color};return r.a.createElement("div",{key:e.uid,className:"userSelect",style:t},e.uid.charAt(0))}):"",r.a.createElement("div",{className:"boxControl"},r.a.createElement("button",{onClick:this.handleMinus},r.a.createElement("i",{className:"fa fa-minus"})),r.a.createElement("input",{disabled:!0,value:t}),r.a.createElement("button",{onClick:this.handlePlus},r.a.createElement("i",{className:"fa fa-plus"}))))}}]),a}(n.Component),W=Object(c.b)()(_),H=function(e){Object(l.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).state={isOwner:!1,user:f().currentUser,roomId:e.match.params.roomid,isLoading:!0,items:[{name:"Nai",value:0},{name:"Bau",value:0},{name:"Ga",value:0},{name:"Ca",value:0},{name:"Cua",value:0},{name:"Tom",value:0}],result:[{name:"Bau",value:0},{name:"Bau",value:0},{name:"Bau",value:0}],bets:{},status:0,scores:0,scoresChange:0,gameCount:0},n.shake=n.shake.bind(Object(C.a)(n)),n.getData=n.getData.bind(Object(C.a)(n)),n.getRoomDetal=n.getRoomDetal.bind(Object(C.a)(n)),n.onBetChange=n.onBetChange.bind(Object(C.a)(n)),n.showSnakeModal=n.showSnakeModal.bind(Object(C.a)(n)),n.onResetGame=n.onResetGame.bind(Object(C.a)(n)),n.renderPlayBox=n.renderPlayBox.bind(Object(C.a)(n)),n}return Object(u.a)(a,[{key:"shake",value:function(){var e=this,t=this.state,a=t.roomId,n=t.bets,r=t.user,s=t.result,c={};s=[this.randomItem(),this.randomItem(),this.randomItem()],Object.keys(n).reduce(function(t,a){var r=n[a],o=0;return Object.keys(r).reduce(function(t,a){var n=e.countValue(s,a);return n>0?o+=n*r[a]:o-=r[a],t},{}),c[a]=o,t},{}),B.getById(a).then(function(e){var t=e.data();c[r.uid]=0,Object.keys(c).reduce(function(e,a){return a!==r.uid&&(c[r.uid]-=c[a],t.users[a]+=c[a]),e},{}),t.users[r.uid]+=c[r.uid],B.update(a,t)}),g.ref(a).update({status:2,bets:{},result:s}),setTimeout(function(){return e.onResetGame()},3e3)}},{key:"onResetGame",value:function(){g.ref(this.state.roomId).update({status:0})}},{key:"randomItem",value:function(){var e=this.state.items.length,t=Math.floor(Math.random()*e)+0;return this.state.items[t]}},{key:"countValue",value:function(e,t){var a=0;return e.map(function(e){return e.name===t?a+=1:a}),a}},{key:"componentDidMount",value:function(){this.getRoomDetal(),this.getData()}},{key:"getRoomDetal",value:function(){var e=this,t=this.state,a=t.roomId,n=t.user;B.getAll().doc(a).onSnapshot(function(t){var r=e.state,s=r.scoresChange,c=r.scores,o=t.data();void 0===o.users[n.uid]&&(o.users[n.uid]=0,B.update(a,o)),P.writeChats(a,{content:n.displayName+" \u0111\xe3 v\xe0o ph\xf2ng",timestamp:Date.now(),name:n.displayName,avatar:n.photoURL}),s=o.users[n.uid]-c,e.setState({scores:o.users[n.uid],scoresChange:s,isOwner:o.uid===n.uid})})}},{key:"componentWillUnmount",value:function(){var e=this.state,t=e.roomId,a=e.user;P.writeChats(t,{content:a.email+" \u0111\xe3 tho\xe1t kh\u1ecfi ph\xf2ng",timestamp:Date.now(),uid:a.uid})}},{key:"getData",value:function(){var e=this,t=this.state,a=t.roomId,n=t.status,r=t.result,s=t.bets,c=t.isOwner;t.gameCount;g.ref(a).on("value",function(t){s={},t.forEach(function(e){"bets"===e.key?s=e.val():"status"===e.key?n=e.val():"result"===e.key&&(r=e.val())});var a=e.state,o=a.items,i=a.user;o.forEach(function(t,a){var n=[];t.value=0,t.users=n,Object.keys(s).reduce(function(a,r){return void 0!==s[r][t.name]&&n.push({uid:r,value:s[r][t.name]||0,color:e.onRenderColor(r)}),c?t.value+=s[r][t.name]||0:r===i.uid&&(t.value=s[r][t.name]||0),a},{})}),e.setState({bets:s,items:o,result:r,status:n,isLoading:!1})})}},{key:"showSnakeModal",value:function(){var e=this.state.roomId;g.ref(e).update({status:1})}},{key:"onRenderColor",value:function(e){return"#"+(Number(e.replace(/\D/g,""))+11111111).toString(16).substring(0,6)}},{key:"onBetChange",value:function(e,t){var a=this.state.bets,n=this.state,r=n.roomId,s=n.user,c=a[s.uid]||[];c[e]=t;var o=Object.keys(c).reduce(function(e,t){return c[t]>0&&(e[t]=c[t]),e},{});g.ref(r+"/bets/"+s.uid).set(o)}},{key:"renderPlayBox",value:function(e){if(this.state.isOwner)return e.map(function(e,t){return r.a.createElement(U,{key:t,name:e.name,value:e.value,style:e.style,isActive:e.isActive,users:e.users})});var t=this.onBetChange;return e.map(function(e,a){return r.a.createElement(W,{key:a,name:e.name,value:e.value,style:e.style,isActive:e.isActive,users:e.users,onClick:t})})}},{key:"render",value:function(){var e=this.state,t=e.isLoading,a=e.status,n=e.isOwner,s=e.result,c=e.items,o=e.scores,i=e.scoresChange,u=e.bets;return t?r.a.createElement("div",null,"Is Loading"):r.a.createElement("div",{className:"home"},r.a.createElement(y,null),r.a.createElement("section",null,r.a.createElement("div",{className:"jumbotron jumbotron-fluid py-5"},r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-sm-10"},this.renderPlayBox(c)),r.a.createElement("div",{className:"col-sm-2"},n&&Object.keys(u).length>0?r.a.createElement("button",{onClick:this.showSnakeModal},"L\u1eafc"):"",o))))),r.a.createElement(k,null),0!==a?r.a.createElement(G,{isOwner:n,onClick:this.shake,onResetGame:this.onResetGame,result:s,status:a}):"",2===a?r.a.createElement("div",{className:"updateScore ".concat(i<0?"error":i>0?"success":"")},i):"")}}]),a}(n.Component);a(56);function F(e){var t=e.component,a=e.authenticated,n=Object(h.a)(e,["component","authenticated"]);return r.a.createElement(d.b,Object.assign({basename:"/baucuatomca"},n,{render:function(e){return!0===a?r.a.createElement(t,e):r.a.createElement(d.a,{to:{pathname:"/login",state:{from:e.location}}})}}))}function V(e){var t=e.component,a=e.authenticated,n=Object(h.a)(e,["component","authenticated"]);return r.a.createElement(d.b,Object.assign({basename:"/baucuatomca"},n,{render:function(e){return!1===a?r.a.createElement(t,e):r.a.createElement(d.a,{to:e.location.state?e.location.state.from.pathname:"/"})}}))}var X=function(e){Object(l.a)(a,e);var t=Object(m.a)(a);function a(){var e;return Object(i.a)(this,a),(e=t.call(this)).state={authenticated:!1,loading:!0},e}return Object(u.a)(a,[{key:"componentDidMount",value:function(){var e=this;f().onAuthStateChanged(function(t){t?e.setState({authenticated:!0,loading:!1}):e.setState({authenticated:!1,loading:!1})})}},{key:"render",value:function(){return!0===this.state.loading?r.a.createElement("div",{className:"spinner-border text-success",role:"status"},r.a.createElement("span",{className:"sr-only"},"Loading...")):r.a.createElement(v.a,{basename:"/baucuatomca"},r.a.createElement(d.d,null,r.a.createElement(d.b,{exact:!0,path:"/",component:O,basename:"/baucuatomca"}),r.a.createElement(F,{path:"/chat",authenticated:this.state.authenticated,component:S}),r.a.createElement(F,{exact:!0,path:"/room",authenticated:this.state.authenticated,component:L}),r.a.createElement(F,{exact:!0,path:"/game/:roomid",authenticated:this.state.authenticated,component:H}),r.a.createElement(V,{path:"/signup",authenticated:this.state.authenticated,component:A}),r.a.createElement(V,{path:"/login",authenticated:this.state.authenticated,component:M})))}}]),a}(n.Component);a(57),a(58);var J=Object(o.b)(function(){return{count:42}},window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__()),Y=document.getElementById("root");if(!Y)throw new Error("couldn't find element with id root");Object(s.render)(r.a.createElement(c.a,{store:J},r.a.createElement(X,null)),Y)}},[[37,1,2]]]);
//# sourceMappingURL=main.0ab5c689.chunk.js.map