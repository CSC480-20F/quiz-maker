(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{25:function(e,n,t){e.exports=t.p+"static/media/pexels-anna-shvets-3683107.96ab9e62.jpg"},38:function(e,n,t){e.exports=t(51)},43:function(e,n,t){},44:function(e,n,t){},51:function(e,n,t){"use strict";t.r(n);var a=t(0),i=t.n(a),o=t(13),r=t.n(o),l=(t(43),t(14)),c=t(15),u=t(18),s=t(17),g=(t(44),t(33)),m=t(4),d=t(56),h=t(25),p=t.n(h),f=function(){var e=window.gapi.auth2.getAuthInstance(),n=e.currentUser.get().getBasicProfile(),t=n.getName(),a=n.getEmail(),o=n.getImageUrl();return i.a.createElement(i.a.Fragment,null,i.a.createElement("nav",null,i.a.createElement("img",{className:"home-logo",src:p.a,alt:"=main page"}),i.a.createElement("div",null,"QuizMaker"),i.a.createElement("img",{className:"push",src:o,alt:"Profile"}),i.a.createElement(d.a,null,i.a.createElement(d.a.Toggle,{as:"a"},t),i.a.createElement(d.a.Menu,null,i.a.createElement(d.a.Item,{onClick:e.signOut},"Sign out")))),i.a.createElement("div",{className:"container"},i.a.createElement("h1",null,"DASHBOARD"),i.a.createElement("p",null," Your email: ",a)))},E=function(e){Object(u.a)(t,e);var n=Object(s.a)(t);function t(){return Object(l.a)(this,t),n.apply(this,arguments)}return Object(c.a)(t,[{key:"componentDidMount",value:function(){window.gapi.load("signin2",(function(){window.gapi.signin2.render("login-button")}))}},{key:"render",value:function(){return i.a.createElement("div",{className:"container login"},i.a.createElement("h1",null," QuizMaker "),i.a.createElement("div",{id:"login-button"},"Sign in with Google"))}}]),t}(i.a.Component),v=function(e){Object(u.a)(t,e);var n=Object(s.a)(t);function t(e){var a;return Object(l.a)(this,t),(a=n.call(this,e)).state={isSignedIn:null},a}return Object(c.a)(t,[{key:"initializeGoogleSignIn",value:function(){var e=this;window.gapi.load("auth2",(function(){window.gapi.auth2.init({client_id:"11698435631-cav1if2lia71joo1icee09aik0la3k1n.apps.googleusercontent.com"}).then((function(){var n=window.gapi.auth2.getAuthInstance(),t=n.isSignedIn.get();e.setState({isSignedIn:t}),n.isSignedIn.listen((function(n){e.setState({isSignedIn:n})}))}))}))}},{key:"componentDidMount",value:function(){var e=this,n=document.createElement("script");n.src="https://apis.google.com/js/platform.js",n.onload=function(){return e.initializeGoogleSignIn()},document.body.appendChild(n)}},{key:"ifUserSignedIn",value:function(e){return null===this.state.isSignedIn?i.a.createElement("h1",null,"Loading..."):this.state.isSignedIn?i.a.createElement(e,null):i.a.createElement(E,null)}},{key:"render",value:function(){var e=this;return i.a.createElement(g.a,null,i.a.createElement(m.c,null,i.a.createElement(m.a,{exact:!0,path:"/",render:function(){return e.ifUserSignedIn(f)}}),i.a.createElement(m.a,{path:"/dashboard",render:function(){return e.ifUserSignedIn(f)}})))}}]),t}(i.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(i.a.createElement(i.a.StrictMode,null,i.a.createElement(v,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[38,1,2]]]);
//# sourceMappingURL=main.c1f65bf3.chunk.js.map