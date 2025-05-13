function mE(i,e){for(var n=0;n<e.length;n++){const s=e[n];if(typeof s!="string"&&!Array.isArray(s)){for(const a in s)if(a!=="default"&&!(a in i)){const u=Object.getOwnPropertyDescriptor(s,a);u&&Object.defineProperty(i,a,u.get?u:{enumerable:!0,get:()=>s[a]})}}}return Object.freeze(Object.defineProperty(i,Symbol.toStringTag,{value:"Module"}))}(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const u of a)if(u.type==="childList")for(const h of u.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&s(h)}).observe(document,{childList:!0,subtree:!0});function n(a){const u={};return a.integrity&&(u.integrity=a.integrity),a.referrerPolicy&&(u.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?u.credentials="include":a.crossOrigin==="anonymous"?u.credentials="omit":u.credentials="same-origin",u}function s(a){if(a.ep)return;a.ep=!0;const u=n(a);fetch(a.href,u)}})();function qg(i){return i&&i.__esModule&&Object.prototype.hasOwnProperty.call(i,"default")?i.default:i}var Nh={exports:{}},ca={},Oh={exports:{}},we={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var fm;function gE(){if(fm)return we;fm=1;var i=Symbol.for("react.element"),e=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),s=Symbol.for("react.strict_mode"),a=Symbol.for("react.profiler"),u=Symbol.for("react.provider"),h=Symbol.for("react.context"),m=Symbol.for("react.forward_ref"),g=Symbol.for("react.suspense"),_=Symbol.for("react.memo"),w=Symbol.for("react.lazy"),T=Symbol.iterator;function D(x){return x===null||typeof x!="object"?null:(x=T&&x[T]||x["@@iterator"],typeof x=="function"?x:null)}var B={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},W=Object.assign,q={};function j(x,z,ue){this.props=x,this.context=z,this.refs=q,this.updater=ue||B}j.prototype.isReactComponent={},j.prototype.setState=function(x,z){if(typeof x!="object"&&typeof x!="function"&&x!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,x,z,"setState")},j.prototype.forceUpdate=function(x){this.updater.enqueueForceUpdate(this,x,"forceUpdate")};function ne(){}ne.prototype=j.prototype;function ce(x,z,ue){this.props=x,this.context=z,this.refs=q,this.updater=ue||B}var le=ce.prototype=new ne;le.constructor=ce,W(le,j.prototype),le.isPureReactComponent=!0;var ve=Array.isArray,Ve=Object.prototype.hasOwnProperty,Re={current:null},N={key:!0,ref:!0,__self:!0,__source:!0};function S(x,z,ue){var ye,Ee={},Ce=null,xe=null;if(z!=null)for(ye in z.ref!==void 0&&(xe=z.ref),z.key!==void 0&&(Ce=""+z.key),z)Ve.call(z,ye)&&!N.hasOwnProperty(ye)&&(Ee[ye]=z[ye]);var Le=arguments.length-2;if(Le===1)Ee.children=ue;else if(1<Le){for(var Fe=Array(Le),ht=0;ht<Le;ht++)Fe[ht]=arguments[ht+2];Ee.children=Fe}if(x&&x.defaultProps)for(ye in Le=x.defaultProps,Le)Ee[ye]===void 0&&(Ee[ye]=Le[ye]);return{$$typeof:i,type:x,key:Ce,ref:xe,props:Ee,_owner:Re.current}}function R(x,z){return{$$typeof:i,type:x.type,key:z,ref:x.ref,props:x.props,_owner:x._owner}}function P(x){return typeof x=="object"&&x!==null&&x.$$typeof===i}function O(x){var z={"=":"=0",":":"=2"};return"$"+x.replace(/[=:]/g,function(ue){return z[ue]})}var L=/\/+/g;function A(x,z){return typeof x=="object"&&x!==null&&x.key!=null?O(""+x.key):z.toString(36)}function Je(x,z,ue,ye,Ee){var Ce=typeof x;(Ce==="undefined"||Ce==="boolean")&&(x=null);var xe=!1;if(x===null)xe=!0;else switch(Ce){case"string":case"number":xe=!0;break;case"object":switch(x.$$typeof){case i:case e:xe=!0}}if(xe)return xe=x,Ee=Ee(xe),x=ye===""?"."+A(xe,0):ye,ve(Ee)?(ue="",x!=null&&(ue=x.replace(L,"$&/")+"/"),Je(Ee,z,ue,"",function(ht){return ht})):Ee!=null&&(P(Ee)&&(Ee=R(Ee,ue+(!Ee.key||xe&&xe.key===Ee.key?"":(""+Ee.key).replace(L,"$&/")+"/")+x)),z.push(Ee)),1;if(xe=0,ye=ye===""?".":ye+":",ve(x))for(var Le=0;Le<x.length;Le++){Ce=x[Le];var Fe=ye+A(Ce,Le);xe+=Je(Ce,z,ue,Fe,Ee)}else if(Fe=D(x),typeof Fe=="function")for(x=Fe.call(x),Le=0;!(Ce=x.next()).done;)Ce=Ce.value,Fe=ye+A(Ce,Le++),xe+=Je(Ce,z,ue,Fe,Ee);else if(Ce==="object")throw z=String(x),Error("Objects are not valid as a React child (found: "+(z==="[object Object]"?"object with keys {"+Object.keys(x).join(", ")+"}":z)+"). If you meant to render a collection of children, use an array instead.");return xe}function Ct(x,z,ue){if(x==null)return x;var ye=[],Ee=0;return Je(x,ye,"","",function(Ce){return z.call(ue,Ce,Ee++)}),ye}function Pt(x){if(x._status===-1){var z=x._result;z=z(),z.then(function(ue){(x._status===0||x._status===-1)&&(x._status=1,x._result=ue)},function(ue){(x._status===0||x._status===-1)&&(x._status=2,x._result=ue)}),x._status===-1&&(x._status=0,x._result=z)}if(x._status===1)return x._result.default;throw x._result}var Ue={current:null},Z={transition:null},he={ReactCurrentDispatcher:Ue,ReactCurrentBatchConfig:Z,ReactCurrentOwner:Re};function te(){throw Error("act(...) is not supported in production builds of React.")}return we.Children={map:Ct,forEach:function(x,z,ue){Ct(x,function(){z.apply(this,arguments)},ue)},count:function(x){var z=0;return Ct(x,function(){z++}),z},toArray:function(x){return Ct(x,function(z){return z})||[]},only:function(x){if(!P(x))throw Error("React.Children.only expected to receive a single React element child.");return x}},we.Component=j,we.Fragment=n,we.Profiler=a,we.PureComponent=ce,we.StrictMode=s,we.Suspense=g,we.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=he,we.act=te,we.cloneElement=function(x,z,ue){if(x==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+x+".");var ye=W({},x.props),Ee=x.key,Ce=x.ref,xe=x._owner;if(z!=null){if(z.ref!==void 0&&(Ce=z.ref,xe=Re.current),z.key!==void 0&&(Ee=""+z.key),x.type&&x.type.defaultProps)var Le=x.type.defaultProps;for(Fe in z)Ve.call(z,Fe)&&!N.hasOwnProperty(Fe)&&(ye[Fe]=z[Fe]===void 0&&Le!==void 0?Le[Fe]:z[Fe])}var Fe=arguments.length-2;if(Fe===1)ye.children=ue;else if(1<Fe){Le=Array(Fe);for(var ht=0;ht<Fe;ht++)Le[ht]=arguments[ht+2];ye.children=Le}return{$$typeof:i,type:x.type,key:Ee,ref:Ce,props:ye,_owner:xe}},we.createContext=function(x){return x={$$typeof:h,_currentValue:x,_currentValue2:x,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},x.Provider={$$typeof:u,_context:x},x.Consumer=x},we.createElement=S,we.createFactory=function(x){var z=S.bind(null,x);return z.type=x,z},we.createRef=function(){return{current:null}},we.forwardRef=function(x){return{$$typeof:m,render:x}},we.isValidElement=P,we.lazy=function(x){return{$$typeof:w,_payload:{_status:-1,_result:x},_init:Pt}},we.memo=function(x,z){return{$$typeof:_,type:x,compare:z===void 0?null:z}},we.startTransition=function(x){var z=Z.transition;Z.transition={};try{x()}finally{Z.transition=z}},we.unstable_act=te,we.useCallback=function(x,z){return Ue.current.useCallback(x,z)},we.useContext=function(x){return Ue.current.useContext(x)},we.useDebugValue=function(){},we.useDeferredValue=function(x){return Ue.current.useDeferredValue(x)},we.useEffect=function(x,z){return Ue.current.useEffect(x,z)},we.useId=function(){return Ue.current.useId()},we.useImperativeHandle=function(x,z,ue){return Ue.current.useImperativeHandle(x,z,ue)},we.useInsertionEffect=function(x,z){return Ue.current.useInsertionEffect(x,z)},we.useLayoutEffect=function(x,z){return Ue.current.useLayoutEffect(x,z)},we.useMemo=function(x,z){return Ue.current.useMemo(x,z)},we.useReducer=function(x,z,ue){return Ue.current.useReducer(x,z,ue)},we.useRef=function(x){return Ue.current.useRef(x)},we.useState=function(x){return Ue.current.useState(x)},we.useSyncExternalStore=function(x,z,ue){return Ue.current.useSyncExternalStore(x,z,ue)},we.useTransition=function(){return Ue.current.useTransition()},we.version="18.3.1",we}var pm;function _d(){return pm||(pm=1,Oh.exports=gE()),Oh.exports}/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var mm;function vE(){if(mm)return ca;mm=1;var i=_d(),e=Symbol.for("react.element"),n=Symbol.for("react.fragment"),s=Object.prototype.hasOwnProperty,a=i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,u={key:!0,ref:!0,__self:!0,__source:!0};function h(m,g,_){var w,T={},D=null,B=null;_!==void 0&&(D=""+_),g.key!==void 0&&(D=""+g.key),g.ref!==void 0&&(B=g.ref);for(w in g)s.call(g,w)&&!u.hasOwnProperty(w)&&(T[w]=g[w]);if(m&&m.defaultProps)for(w in g=m.defaultProps,g)T[w]===void 0&&(T[w]=g[w]);return{$$typeof:e,type:m,key:D,ref:B,props:T,_owner:a.current}}return ca.Fragment=n,ca.jsx=h,ca.jsxs=h,ca}var gm;function yE(){return gm||(gm=1,Nh.exports=vE()),Nh.exports}var Ie=yE(),Y=_d();const Qg=qg(Y),_E=mE({__proto__:null,default:Qg},[Y]);var ou={},Dh={exports:{}},Qt={},xh={exports:{}},Lh={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var vm;function EE(){return vm||(vm=1,function(i){function e(Z,he){var te=Z.length;Z.push(he);e:for(;0<te;){var x=te-1>>>1,z=Z[x];if(0<a(z,he))Z[x]=he,Z[te]=z,te=x;else break e}}function n(Z){return Z.length===0?null:Z[0]}function s(Z){if(Z.length===0)return null;var he=Z[0],te=Z.pop();if(te!==he){Z[0]=te;e:for(var x=0,z=Z.length,ue=z>>>1;x<ue;){var ye=2*(x+1)-1,Ee=Z[ye],Ce=ye+1,xe=Z[Ce];if(0>a(Ee,te))Ce<z&&0>a(xe,Ee)?(Z[x]=xe,Z[Ce]=te,x=Ce):(Z[x]=Ee,Z[ye]=te,x=ye);else if(Ce<z&&0>a(xe,te))Z[x]=xe,Z[Ce]=te,x=Ce;else break e}}return he}function a(Z,he){var te=Z.sortIndex-he.sortIndex;return te!==0?te:Z.id-he.id}if(typeof performance=="object"&&typeof performance.now=="function"){var u=performance;i.unstable_now=function(){return u.now()}}else{var h=Date,m=h.now();i.unstable_now=function(){return h.now()-m}}var g=[],_=[],w=1,T=null,D=3,B=!1,W=!1,q=!1,j=typeof setTimeout=="function"?setTimeout:null,ne=typeof clearTimeout=="function"?clearTimeout:null,ce=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function le(Z){for(var he=n(_);he!==null;){if(he.callback===null)s(_);else if(he.startTime<=Z)s(_),he.sortIndex=he.expirationTime,e(g,he);else break;he=n(_)}}function ve(Z){if(q=!1,le(Z),!W)if(n(g)!==null)W=!0,Pt(Ve);else{var he=n(_);he!==null&&Ue(ve,he.startTime-Z)}}function Ve(Z,he){W=!1,q&&(q=!1,ne(S),S=-1),B=!0;var te=D;try{for(le(he),T=n(g);T!==null&&(!(T.expirationTime>he)||Z&&!O());){var x=T.callback;if(typeof x=="function"){T.callback=null,D=T.priorityLevel;var z=x(T.expirationTime<=he);he=i.unstable_now(),typeof z=="function"?T.callback=z:T===n(g)&&s(g),le(he)}else s(g);T=n(g)}if(T!==null)var ue=!0;else{var ye=n(_);ye!==null&&Ue(ve,ye.startTime-he),ue=!1}return ue}finally{T=null,D=te,B=!1}}var Re=!1,N=null,S=-1,R=5,P=-1;function O(){return!(i.unstable_now()-P<R)}function L(){if(N!==null){var Z=i.unstable_now();P=Z;var he=!0;try{he=N(!0,Z)}finally{he?A():(Re=!1,N=null)}}else Re=!1}var A;if(typeof ce=="function")A=function(){ce(L)};else if(typeof MessageChannel<"u"){var Je=new MessageChannel,Ct=Je.port2;Je.port1.onmessage=L,A=function(){Ct.postMessage(null)}}else A=function(){j(L,0)};function Pt(Z){N=Z,Re||(Re=!0,A())}function Ue(Z,he){S=j(function(){Z(i.unstable_now())},he)}i.unstable_IdlePriority=5,i.unstable_ImmediatePriority=1,i.unstable_LowPriority=4,i.unstable_NormalPriority=3,i.unstable_Profiling=null,i.unstable_UserBlockingPriority=2,i.unstable_cancelCallback=function(Z){Z.callback=null},i.unstable_continueExecution=function(){W||B||(W=!0,Pt(Ve))},i.unstable_forceFrameRate=function(Z){0>Z||125<Z?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):R=0<Z?Math.floor(1e3/Z):5},i.unstable_getCurrentPriorityLevel=function(){return D},i.unstable_getFirstCallbackNode=function(){return n(g)},i.unstable_next=function(Z){switch(D){case 1:case 2:case 3:var he=3;break;default:he=D}var te=D;D=he;try{return Z()}finally{D=te}},i.unstable_pauseExecution=function(){},i.unstable_requestPaint=function(){},i.unstable_runWithPriority=function(Z,he){switch(Z){case 1:case 2:case 3:case 4:case 5:break;default:Z=3}var te=D;D=Z;try{return he()}finally{D=te}},i.unstable_scheduleCallback=function(Z,he,te){var x=i.unstable_now();switch(typeof te=="object"&&te!==null?(te=te.delay,te=typeof te=="number"&&0<te?x+te:x):te=x,Z){case 1:var z=-1;break;case 2:z=250;break;case 5:z=1073741823;break;case 4:z=1e4;break;default:z=5e3}return z=te+z,Z={id:w++,callback:he,priorityLevel:Z,startTime:te,expirationTime:z,sortIndex:-1},te>x?(Z.sortIndex=te,e(_,Z),n(g)===null&&Z===n(_)&&(q?(ne(S),S=-1):q=!0,Ue(ve,te-x))):(Z.sortIndex=z,e(g,Z),W||B||(W=!0,Pt(Ve))),Z},i.unstable_shouldYield=O,i.unstable_wrapCallback=function(Z){var he=D;return function(){var te=D;D=he;try{return Z.apply(this,arguments)}finally{D=te}}}}(Lh)),Lh}var ym;function wE(){return ym||(ym=1,xh.exports=EE()),xh.exports}/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var _m;function TE(){if(_m)return Qt;_m=1;var i=_d(),e=wE();function n(t){for(var r="https://reactjs.org/docs/error-decoder.html?invariant="+t,o=1;o<arguments.length;o++)r+="&args[]="+encodeURIComponent(arguments[o]);return"Minified React error #"+t+"; visit "+r+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var s=new Set,a={};function u(t,r){h(t,r),h(t+"Capture",r)}function h(t,r){for(a[t]=r,t=0;t<r.length;t++)s.add(r[t])}var m=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),g=Object.prototype.hasOwnProperty,_=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,w={},T={};function D(t){return g.call(T,t)?!0:g.call(w,t)?!1:_.test(t)?T[t]=!0:(w[t]=!0,!1)}function B(t,r,o,c){if(o!==null&&o.type===0)return!1;switch(typeof r){case"function":case"symbol":return!0;case"boolean":return c?!1:o!==null?!o.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function W(t,r,o,c){if(r===null||typeof r>"u"||B(t,r,o,c))return!0;if(c)return!1;if(o!==null)switch(o.type){case 3:return!r;case 4:return r===!1;case 5:return isNaN(r);case 6:return isNaN(r)||1>r}return!1}function q(t,r,o,c,d,p,y){this.acceptsBooleans=r===2||r===3||r===4,this.attributeName=c,this.attributeNamespace=d,this.mustUseProperty=o,this.propertyName=t,this.type=r,this.sanitizeURL=p,this.removeEmptyString=y}var j={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){j[t]=new q(t,0,!1,t,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var r=t[0];j[r]=new q(r,1,!1,t[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(t){j[t]=new q(t,2,!1,t.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){j[t]=new q(t,2,!1,t,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){j[t]=new q(t,3,!1,t.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(t){j[t]=new q(t,3,!0,t,null,!1,!1)}),["capture","download"].forEach(function(t){j[t]=new q(t,4,!1,t,null,!1,!1)}),["cols","rows","size","span"].forEach(function(t){j[t]=new q(t,6,!1,t,null,!1,!1)}),["rowSpan","start"].forEach(function(t){j[t]=new q(t,5,!1,t.toLowerCase(),null,!1,!1)});var ne=/[\-:]([a-z])/g;function ce(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var r=t.replace(ne,ce);j[r]=new q(r,1,!1,t,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var r=t.replace(ne,ce);j[r]=new q(r,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(t){var r=t.replace(ne,ce);j[r]=new q(r,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(t){j[t]=new q(t,1,!1,t.toLowerCase(),null,!1,!1)}),j.xlinkHref=new q("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(t){j[t]=new q(t,1,!1,t.toLowerCase(),null,!0,!0)});function le(t,r,o,c){var d=j.hasOwnProperty(r)?j[r]:null;(d!==null?d.type!==0:c||!(2<r.length)||r[0]!=="o"&&r[0]!=="O"||r[1]!=="n"&&r[1]!=="N")&&(W(r,o,d,c)&&(o=null),c||d===null?D(r)&&(o===null?t.removeAttribute(r):t.setAttribute(r,""+o)):d.mustUseProperty?t[d.propertyName]=o===null?d.type===3?!1:"":o:(r=d.attributeName,c=d.attributeNamespace,o===null?t.removeAttribute(r):(d=d.type,o=d===3||d===4&&o===!0?"":""+o,c?t.setAttributeNS(c,r,o):t.setAttribute(r,o))))}var ve=i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Ve=Symbol.for("react.element"),Re=Symbol.for("react.portal"),N=Symbol.for("react.fragment"),S=Symbol.for("react.strict_mode"),R=Symbol.for("react.profiler"),P=Symbol.for("react.provider"),O=Symbol.for("react.context"),L=Symbol.for("react.forward_ref"),A=Symbol.for("react.suspense"),Je=Symbol.for("react.suspense_list"),Ct=Symbol.for("react.memo"),Pt=Symbol.for("react.lazy"),Ue=Symbol.for("react.offscreen"),Z=Symbol.iterator;function he(t){return t===null||typeof t!="object"?null:(t=Z&&t[Z]||t["@@iterator"],typeof t=="function"?t:null)}var te=Object.assign,x;function z(t){if(x===void 0)try{throw Error()}catch(o){var r=o.stack.trim().match(/\n( *(at )?)/);x=r&&r[1]||""}return`
`+x+t}var ue=!1;function ye(t,r){if(!t||ue)return"";ue=!0;var o=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(r)if(r=function(){throw Error()},Object.defineProperty(r.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(r,[])}catch(b){var c=b}Reflect.construct(t,[],r)}else{try{r.call()}catch(b){c=b}t.call(r.prototype)}else{try{throw Error()}catch(b){c=b}t()}}catch(b){if(b&&c&&typeof b.stack=="string"){for(var d=b.stack.split(`
`),p=c.stack.split(`
`),y=d.length-1,I=p.length-1;1<=y&&0<=I&&d[y]!==p[I];)I--;for(;1<=y&&0<=I;y--,I--)if(d[y]!==p[I]){if(y!==1||I!==1)do if(y--,I--,0>I||d[y]!==p[I]){var C=`
`+d[y].replace(" at new "," at ");return t.displayName&&C.includes("<anonymous>")&&(C=C.replace("<anonymous>",t.displayName)),C}while(1<=y&&0<=I);break}}}finally{ue=!1,Error.prepareStackTrace=o}return(t=t?t.displayName||t.name:"")?z(t):""}function Ee(t){switch(t.tag){case 5:return z(t.type);case 16:return z("Lazy");case 13:return z("Suspense");case 19:return z("SuspenseList");case 0:case 2:case 15:return t=ye(t.type,!1),t;case 11:return t=ye(t.type.render,!1),t;case 1:return t=ye(t.type,!0),t;default:return""}}function Ce(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case N:return"Fragment";case Re:return"Portal";case R:return"Profiler";case S:return"StrictMode";case A:return"Suspense";case Je:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case O:return(t.displayName||"Context")+".Consumer";case P:return(t._context.displayName||"Context")+".Provider";case L:var r=t.render;return t=t.displayName,t||(t=r.displayName||r.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case Ct:return r=t.displayName||null,r!==null?r:Ce(t.type)||"Memo";case Pt:r=t._payload,t=t._init;try{return Ce(t(r))}catch{}}return null}function xe(t){var r=t.type;switch(t.tag){case 24:return"Cache";case 9:return(r.displayName||"Context")+".Consumer";case 10:return(r._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=r.render,t=t.displayName||t.name||"",r.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return r;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Ce(r);case 8:return r===S?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof r=="function")return r.displayName||r.name||null;if(typeof r=="string")return r}return null}function Le(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function Fe(t){var r=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(r==="checkbox"||r==="radio")}function ht(t){var r=Fe(t)?"checked":"value",o=Object.getOwnPropertyDescriptor(t.constructor.prototype,r),c=""+t[r];if(!t.hasOwnProperty(r)&&typeof o<"u"&&typeof o.get=="function"&&typeof o.set=="function"){var d=o.get,p=o.set;return Object.defineProperty(t,r,{configurable:!0,get:function(){return d.call(this)},set:function(y){c=""+y,p.call(this,y)}}),Object.defineProperty(t,r,{enumerable:o.enumerable}),{getValue:function(){return c},setValue:function(y){c=""+y},stopTracking:function(){t._valueTracker=null,delete t[r]}}}}function rr(t){t._valueTracker||(t._valueTracker=ht(t))}function os(t){if(!t)return!1;var r=t._valueTracker;if(!r)return!0;var o=r.getValue(),c="";return t&&(c=Fe(t)?t.checked?"true":"false":t.value),t=c,t!==o?(r.setValue(t),!0):!1}function Cr(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function mi(t,r){var o=r.checked;return te({},r,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:o??t._wrapperState.initialChecked})}function as(t,r){var o=r.defaultValue==null?"":r.defaultValue,c=r.checked!=null?r.checked:r.defaultChecked;o=Le(r.value!=null?r.value:o),t._wrapperState={initialChecked:c,initialValue:o,controlled:r.type==="checkbox"||r.type==="radio"?r.checked!=null:r.value!=null}}function go(t,r){r=r.checked,r!=null&&le(t,"checked",r,!1)}function vo(t,r){go(t,r);var o=Le(r.value),c=r.type;if(o!=null)c==="number"?(o===0&&t.value===""||t.value!=o)&&(t.value=""+o):t.value!==""+o&&(t.value=""+o);else if(c==="submit"||c==="reset"){t.removeAttribute("value");return}r.hasOwnProperty("value")?ls(t,r.type,o):r.hasOwnProperty("defaultValue")&&ls(t,r.type,Le(r.defaultValue)),r.checked==null&&r.defaultChecked!=null&&(t.defaultChecked=!!r.defaultChecked)}function Wa(t,r,o){if(r.hasOwnProperty("value")||r.hasOwnProperty("defaultValue")){var c=r.type;if(!(c!=="submit"&&c!=="reset"||r.value!==void 0&&r.value!==null))return;r=""+t._wrapperState.initialValue,o||r===t.value||(t.value=r),t.defaultValue=r}o=t.name,o!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,o!==""&&(t.name=o)}function ls(t,r,o){(r!=="number"||Cr(t.ownerDocument)!==t)&&(o==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+o&&(t.defaultValue=""+o))}var ir=Array.isArray;function sr(t,r,o,c){if(t=t.options,r){r={};for(var d=0;d<o.length;d++)r["$"+o[d]]=!0;for(o=0;o<t.length;o++)d=r.hasOwnProperty("$"+t[o].value),t[o].selected!==d&&(t[o].selected=d),d&&c&&(t[o].defaultSelected=!0)}else{for(o=""+Le(o),r=null,d=0;d<t.length;d++){if(t[d].value===o){t[d].selected=!0,c&&(t[d].defaultSelected=!0);return}r!==null||t[d].disabled||(r=t[d])}r!==null&&(r.selected=!0)}}function yo(t,r){if(r.dangerouslySetInnerHTML!=null)throw Error(n(91));return te({},r,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function us(t,r){var o=r.value;if(o==null){if(o=r.children,r=r.defaultValue,o!=null){if(r!=null)throw Error(n(92));if(ir(o)){if(1<o.length)throw Error(n(93));o=o[0]}r=o}r==null&&(r=""),o=r}t._wrapperState={initialValue:Le(o)}}function cs(t,r){var o=Le(r.value),c=Le(r.defaultValue);o!=null&&(o=""+o,o!==t.value&&(t.value=o),r.defaultValue==null&&t.defaultValue!==o&&(t.defaultValue=o)),c!=null&&(t.defaultValue=""+c)}function _o(t){var r=t.textContent;r===t._wrapperState.initialValue&&r!==""&&r!==null&&(t.value=r)}function ot(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function at(t,r){return t==null||t==="http://www.w3.org/1999/xhtml"?ot(r):t==="http://www.w3.org/2000/svg"&&r==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var or,Eo=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(r,o,c,d){MSApp.execUnsafeLocalFunction(function(){return t(r,o,c,d)})}:t}(function(t,r){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=r;else{for(or=or||document.createElement("div"),or.innerHTML="<svg>"+r.valueOf().toString()+"</svg>",r=or.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;r.firstChild;)t.appendChild(r.firstChild)}});function Pr(t,r){if(r){var o=t.firstChild;if(o&&o===t.lastChild&&o.nodeType===3){o.nodeValue=r;return}}t.textContent=r}var gi={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},vi=["Webkit","ms","Moz","O"];Object.keys(gi).forEach(function(t){vi.forEach(function(r){r=r+t.charAt(0).toUpperCase()+t.substring(1),gi[r]=gi[t]})});function wo(t,r,o){return r==null||typeof r=="boolean"||r===""?"":o||typeof r!="number"||r===0||gi.hasOwnProperty(t)&&gi[t]?(""+r).trim():r+"px"}function To(t,r){t=t.style;for(var o in r)if(r.hasOwnProperty(o)){var c=o.indexOf("--")===0,d=wo(o,r[o],c);o==="float"&&(o="cssFloat"),c?t.setProperty(o,d):t[o]=d}}var Io=te({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function So(t,r){if(r){if(Io[t]&&(r.children!=null||r.dangerouslySetInnerHTML!=null))throw Error(n(137,t));if(r.dangerouslySetInnerHTML!=null){if(r.children!=null)throw Error(n(60));if(typeof r.dangerouslySetInnerHTML!="object"||!("__html"in r.dangerouslySetInnerHTML))throw Error(n(61))}if(r.style!=null&&typeof r.style!="object")throw Error(n(62))}}function Ao(t,r){if(t.indexOf("-")===-1)return typeof r.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var yi=null;function hs(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var ds=null,ln=null,Fn=null;function fs(t){if(t=Qo(t)){if(typeof ds!="function")throw Error(n(280));var r=t.stateNode;r&&(r=wl(r),ds(t.stateNode,t.type,r))}}function jn(t){ln?Fn?Fn.push(t):Fn=[t]:ln=t}function Ro(){if(ln){var t=ln,r=Fn;if(Fn=ln=null,fs(t),r)for(t=0;t<r.length;t++)fs(r[t])}}function _i(t,r){return t(r)}function Co(){}var ar=!1;function Po(t,r,o){if(ar)return t(r,o);ar=!0;try{return _i(t,r,o)}finally{ar=!1,(ln!==null||Fn!==null)&&(Co(),Ro())}}function Ze(t,r){var o=t.stateNode;if(o===null)return null;var c=wl(o);if(c===null)return null;o=c[r];e:switch(r){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(c=!c.disabled)||(t=t.type,c=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!c;break e;default:t=!1}if(t)return null;if(o&&typeof o!="function")throw Error(n(231,r,typeof o));return o}var ps=!1;if(m)try{var En={};Object.defineProperty(En,"passive",{get:function(){ps=!0}}),window.addEventListener("test",En,En),window.removeEventListener("test",En,En)}catch{ps=!1}function Ei(t,r,o,c,d,p,y,I,C){var b=Array.prototype.slice.call(arguments,3);try{r.apply(o,b)}catch(G){this.onError(G)}}var wi=!1,ms=null,wn=!1,ko=null,ic={onError:function(t){wi=!0,ms=t}};function gs(t,r,o,c,d,p,y,I,C){wi=!1,ms=null,Ei.apply(ic,arguments)}function Ga(t,r,o,c,d,p,y,I,C){if(gs.apply(this,arguments),wi){if(wi){var b=ms;wi=!1,ms=null}else throw Error(n(198));wn||(wn=!0,ko=b)}}function Tn(t){var r=t,o=t;if(t.alternate)for(;r.return;)r=r.return;else{t=r;do r=t,(r.flags&4098)!==0&&(o=r.return),t=r.return;while(t)}return r.tag===3?o:null}function Ti(t){if(t.tag===13){var r=t.memoizedState;if(r===null&&(t=t.alternate,t!==null&&(r=t.memoizedState)),r!==null)return r.dehydrated}return null}function In(t){if(Tn(t)!==t)throw Error(n(188))}function Ka(t){var r=t.alternate;if(!r){if(r=Tn(t),r===null)throw Error(n(188));return r!==t?null:t}for(var o=t,c=r;;){var d=o.return;if(d===null)break;var p=d.alternate;if(p===null){if(c=d.return,c!==null){o=c;continue}break}if(d.child===p.child){for(p=d.child;p;){if(p===o)return In(d),t;if(p===c)return In(d),r;p=p.sibling}throw Error(n(188))}if(o.return!==c.return)o=d,c=p;else{for(var y=!1,I=d.child;I;){if(I===o){y=!0,o=d,c=p;break}if(I===c){y=!0,c=d,o=p;break}I=I.sibling}if(!y){for(I=p.child;I;){if(I===o){y=!0,o=p,c=d;break}if(I===c){y=!0,c=p,o=d;break}I=I.sibling}if(!y)throw Error(n(189))}}if(o.alternate!==c)throw Error(n(190))}if(o.tag!==3)throw Error(n(188));return o.stateNode.current===o?t:r}function No(t){return t=Ka(t),t!==null?vs(t):null}function vs(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var r=vs(t);if(r!==null)return r;t=t.sibling}return null}var ys=e.unstable_scheduleCallback,Oo=e.unstable_cancelCallback,qa=e.unstable_shouldYield,sc=e.unstable_requestPaint,je=e.unstable_now,Qa=e.unstable_getCurrentPriorityLevel,Ii=e.unstable_ImmediatePriority,kr=e.unstable_UserBlockingPriority,un=e.unstable_NormalPriority,Do=e.unstable_LowPriority,Xa=e.unstable_IdlePriority,Si=null,Jt=null;function Ya(t){if(Jt&&typeof Jt.onCommitFiberRoot=="function")try{Jt.onCommitFiberRoot(Si,t,void 0,(t.current.flags&128)===128)}catch{}}var bt=Math.clz32?Math.clz32:Za,xo=Math.log,Ja=Math.LN2;function Za(t){return t>>>=0,t===0?32:31-(xo(t)/Ja|0)|0}var _s=64,Es=4194304;function Nr(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function Ai(t,r){var o=t.pendingLanes;if(o===0)return 0;var c=0,d=t.suspendedLanes,p=t.pingedLanes,y=o&268435455;if(y!==0){var I=y&~d;I!==0?c=Nr(I):(p&=y,p!==0&&(c=Nr(p)))}else y=o&~d,y!==0?c=Nr(y):p!==0&&(c=Nr(p));if(c===0)return 0;if(r!==0&&r!==c&&(r&d)===0&&(d=c&-c,p=r&-r,d>=p||d===16&&(p&4194240)!==0))return r;if((c&4)!==0&&(c|=o&16),r=t.entangledLanes,r!==0)for(t=t.entanglements,r&=c;0<r;)o=31-bt(r),d=1<<o,c|=t[o],r&=~d;return c}function oc(t,r){switch(t){case 1:case 2:case 4:return r+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return r+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function lr(t,r){for(var o=t.suspendedLanes,c=t.pingedLanes,d=t.expirationTimes,p=t.pendingLanes;0<p;){var y=31-bt(p),I=1<<y,C=d[y];C===-1?((I&o)===0||(I&c)!==0)&&(d[y]=oc(I,r)):C<=r&&(t.expiredLanes|=I),p&=~I}}function Zt(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function Ri(){var t=_s;return _s<<=1,(_s&4194240)===0&&(_s=64),t}function Or(t){for(var r=[],o=0;31>o;o++)r.push(t);return r}function Dr(t,r,o){t.pendingLanes|=r,r!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,r=31-bt(r),t[r]=o}function be(t,r){var o=t.pendingLanes&~r;t.pendingLanes=r,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=r,t.mutableReadLanes&=r,t.entangledLanes&=r,r=t.entanglements;var c=t.eventTimes;for(t=t.expirationTimes;0<o;){var d=31-bt(o),p=1<<d;r[d]=0,c[d]=-1,t[d]=-1,o&=~p}}function xr(t,r){var o=t.entangledLanes|=r;for(t=t.entanglements;o;){var c=31-bt(o),d=1<<c;d&r|t[c]&r&&(t[c]|=r),o&=~d}}var Ae=0;function Lr(t){return t&=-t,1<t?4<t?(t&268435455)!==0?16:536870912:4:1}var el,ws,tl,nl,rl,Lo=!1,zn=[],_t=null,Sn=null,An=null,Vr=new Map,cn=new Map,Bn=[],ac="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function il(t,r){switch(t){case"focusin":case"focusout":_t=null;break;case"dragenter":case"dragleave":Sn=null;break;case"mouseover":case"mouseout":An=null;break;case"pointerover":case"pointerout":Vr.delete(r.pointerId);break;case"gotpointercapture":case"lostpointercapture":cn.delete(r.pointerId)}}function Bt(t,r,o,c,d,p){return t===null||t.nativeEvent!==p?(t={blockedOn:r,domEventName:o,eventSystemFlags:c,nativeEvent:p,targetContainers:[d]},r!==null&&(r=Qo(r),r!==null&&ws(r)),t):(t.eventSystemFlags|=c,r=t.targetContainers,d!==null&&r.indexOf(d)===-1&&r.push(d),t)}function lc(t,r,o,c,d){switch(r){case"focusin":return _t=Bt(_t,t,r,o,c,d),!0;case"dragenter":return Sn=Bt(Sn,t,r,o,c,d),!0;case"mouseover":return An=Bt(An,t,r,o,c,d),!0;case"pointerover":var p=d.pointerId;return Vr.set(p,Bt(Vr.get(p)||null,t,r,o,c,d)),!0;case"gotpointercapture":return p=d.pointerId,cn.set(p,Bt(cn.get(p)||null,t,r,o,c,d)),!0}return!1}function sl(t){var r=Oi(t.target);if(r!==null){var o=Tn(r);if(o!==null){if(r=o.tag,r===13){if(r=Ti(o),r!==null){t.blockedOn=r,rl(t.priority,function(){tl(o)});return}}else if(r===3&&o.stateNode.current.memoizedState.isDehydrated){t.blockedOn=o.tag===3?o.stateNode.containerInfo:null;return}}}t.blockedOn=null}function ur(t){if(t.blockedOn!==null)return!1;for(var r=t.targetContainers;0<r.length;){var o=Ts(t.domEventName,t.eventSystemFlags,r[0],t.nativeEvent);if(o===null){o=t.nativeEvent;var c=new o.constructor(o.type,o);yi=c,o.target.dispatchEvent(c),yi=null}else return r=Qo(o),r!==null&&ws(r),t.blockedOn=o,!1;r.shift()}return!0}function Ci(t,r,o){ur(t)&&o.delete(r)}function ol(){Lo=!1,_t!==null&&ur(_t)&&(_t=null),Sn!==null&&ur(Sn)&&(Sn=null),An!==null&&ur(An)&&(An=null),Vr.forEach(Ci),cn.forEach(Ci)}function Rn(t,r){t.blockedOn===r&&(t.blockedOn=null,Lo||(Lo=!0,e.unstable_scheduleCallback(e.unstable_NormalPriority,ol)))}function Cn(t){function r(d){return Rn(d,t)}if(0<zn.length){Rn(zn[0],t);for(var o=1;o<zn.length;o++){var c=zn[o];c.blockedOn===t&&(c.blockedOn=null)}}for(_t!==null&&Rn(_t,t),Sn!==null&&Rn(Sn,t),An!==null&&Rn(An,t),Vr.forEach(r),cn.forEach(r),o=0;o<Bn.length;o++)c=Bn[o],c.blockedOn===t&&(c.blockedOn=null);for(;0<Bn.length&&(o=Bn[0],o.blockedOn===null);)sl(o),o.blockedOn===null&&Bn.shift()}var cr=ve.ReactCurrentBatchConfig,Mr=!0;function We(t,r,o,c){var d=Ae,p=cr.transition;cr.transition=null;try{Ae=1,Vo(t,r,o,c)}finally{Ae=d,cr.transition=p}}function uc(t,r,o,c){var d=Ae,p=cr.transition;cr.transition=null;try{Ae=4,Vo(t,r,o,c)}finally{Ae=d,cr.transition=p}}function Vo(t,r,o,c){if(Mr){var d=Ts(t,r,o,c);if(d===null)Ec(t,r,c,Pi,o),il(t,c);else if(lc(d,t,r,o,c))c.stopPropagation();else if(il(t,c),r&4&&-1<ac.indexOf(t)){for(;d!==null;){var p=Qo(d);if(p!==null&&el(p),p=Ts(t,r,o,c),p===null&&Ec(t,r,c,Pi,o),p===d)break;d=p}d!==null&&c.stopPropagation()}else Ec(t,r,c,null,o)}}var Pi=null;function Ts(t,r,o,c){if(Pi=null,t=hs(c),t=Oi(t),t!==null)if(r=Tn(t),r===null)t=null;else if(o=r.tag,o===13){if(t=Ti(r),t!==null)return t;t=null}else if(o===3){if(r.stateNode.current.memoizedState.isDehydrated)return r.tag===3?r.stateNode.containerInfo:null;t=null}else r!==t&&(t=null);return Pi=t,null}function Mo(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Qa()){case Ii:return 1;case kr:return 4;case un:case Do:return 16;case Xa:return 536870912;default:return 16}default:return 16}}var en=null,Is=null,$t=null;function Uo(){if($t)return $t;var t,r=Is,o=r.length,c,d="value"in en?en.value:en.textContent,p=d.length;for(t=0;t<o&&r[t]===d[t];t++);var y=o-t;for(c=1;c<=y&&r[o-c]===d[p-c];c++);return $t=d.slice(t,1<c?1-c:void 0)}function Ss(t){var r=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&r===13&&(t=13)):t=r,t===10&&(t=13),32<=t||t===13?t:0}function $n(){return!0}function bo(){return!1}function Et(t){function r(o,c,d,p,y){this._reactName=o,this._targetInst=d,this.type=c,this.nativeEvent=p,this.target=y,this.currentTarget=null;for(var I in t)t.hasOwnProperty(I)&&(o=t[I],this[I]=o?o(p):p[I]);return this.isDefaultPrevented=(p.defaultPrevented!=null?p.defaultPrevented:p.returnValue===!1)?$n:bo,this.isPropagationStopped=bo,this}return te(r.prototype,{preventDefault:function(){this.defaultPrevented=!0;var o=this.nativeEvent;o&&(o.preventDefault?o.preventDefault():typeof o.returnValue!="unknown"&&(o.returnValue=!1),this.isDefaultPrevented=$n)},stopPropagation:function(){var o=this.nativeEvent;o&&(o.stopPropagation?o.stopPropagation():typeof o.cancelBubble!="unknown"&&(o.cancelBubble=!0),this.isPropagationStopped=$n)},persist:function(){},isPersistent:$n}),r}var Pn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},As=Et(Pn),Hn=te({},Pn,{view:0,detail:0}),cc=Et(Hn),Rs,hr,Ur,ki=te({},Hn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Wn,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Ur&&(Ur&&t.type==="mousemove"?(Rs=t.screenX-Ur.screenX,hr=t.screenY-Ur.screenY):hr=Rs=0,Ur=t),Rs)},movementY:function(t){return"movementY"in t?t.movementY:hr}}),Cs=Et(ki),Fo=te({},ki,{dataTransfer:0}),al=Et(Fo),Ps=te({},Hn,{relatedTarget:0}),ks=Et(Ps),ll=te({},Pn,{animationName:0,elapsedTime:0,pseudoElement:0}),dr=Et(ll),ul=te({},Pn,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),cl=Et(ul),hl=te({},Pn,{data:0}),jo=Et(hl),Ns={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Ft={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},dl={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function fl(t){var r=this.nativeEvent;return r.getModifierState?r.getModifierState(t):(t=dl[t])?!!r[t]:!1}function Wn(){return fl}var l=te({},Hn,{key:function(t){if(t.key){var r=Ns[t.key]||t.key;if(r!=="Unidentified")return r}return t.type==="keypress"?(t=Ss(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?Ft[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Wn,charCode:function(t){return t.type==="keypress"?Ss(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Ss(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),f=Et(l),v=te({},ki,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),E=Et(v),V=te({},Hn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Wn}),F=Et(V),J=te({},Pn,{propertyName:0,elapsedTime:0,pseudoElement:0}),Me=Et(J),lt=te({},ki,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),Pe=Et(lt),dt=[9,13,27,32],tt=m&&"CompositionEvent"in window,hn=null;m&&"documentMode"in document&&(hn=document.documentMode);var tn=m&&"TextEvent"in window&&!hn,Ni=m&&(!tt||hn&&8<hn&&11>=hn),Os=" ",af=!1;function lf(t,r){switch(t){case"keyup":return dt.indexOf(r.keyCode)!==-1;case"keydown":return r.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function uf(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var Ds=!1;function d_(t,r){switch(t){case"compositionend":return uf(r);case"keypress":return r.which!==32?null:(af=!0,Os);case"textInput":return t=r.data,t===Os&&af?null:t;default:return null}}function f_(t,r){if(Ds)return t==="compositionend"||!tt&&lf(t,r)?(t=Uo(),$t=Is=en=null,Ds=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(r.ctrlKey||r.altKey||r.metaKey)||r.ctrlKey&&r.altKey){if(r.char&&1<r.char.length)return r.char;if(r.which)return String.fromCharCode(r.which)}return null;case"compositionend":return Ni&&r.locale!=="ko"?null:r.data;default:return null}}var p_={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function cf(t){var r=t&&t.nodeName&&t.nodeName.toLowerCase();return r==="input"?!!p_[t.type]:r==="textarea"}function hf(t,r,o,c){jn(c),r=yl(r,"onChange"),0<r.length&&(o=new As("onChange","change",null,o,c),t.push({event:o,listeners:r}))}var zo=null,Bo=null;function m_(t){kf(t,0)}function pl(t){var r=Us(t);if(os(r))return t}function g_(t,r){if(t==="change")return r}var df=!1;if(m){var hc;if(m){var dc="oninput"in document;if(!dc){var ff=document.createElement("div");ff.setAttribute("oninput","return;"),dc=typeof ff.oninput=="function"}hc=dc}else hc=!1;df=hc&&(!document.documentMode||9<document.documentMode)}function pf(){zo&&(zo.detachEvent("onpropertychange",mf),Bo=zo=null)}function mf(t){if(t.propertyName==="value"&&pl(Bo)){var r=[];hf(r,Bo,t,hs(t)),Po(m_,r)}}function v_(t,r,o){t==="focusin"?(pf(),zo=r,Bo=o,zo.attachEvent("onpropertychange",mf)):t==="focusout"&&pf()}function y_(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return pl(Bo)}function __(t,r){if(t==="click")return pl(r)}function E_(t,r){if(t==="input"||t==="change")return pl(r)}function w_(t,r){return t===r&&(t!==0||1/t===1/r)||t!==t&&r!==r}var kn=typeof Object.is=="function"?Object.is:w_;function $o(t,r){if(kn(t,r))return!0;if(typeof t!="object"||t===null||typeof r!="object"||r===null)return!1;var o=Object.keys(t),c=Object.keys(r);if(o.length!==c.length)return!1;for(c=0;c<o.length;c++){var d=o[c];if(!g.call(r,d)||!kn(t[d],r[d]))return!1}return!0}function gf(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function vf(t,r){var o=gf(t);t=0;for(var c;o;){if(o.nodeType===3){if(c=t+o.textContent.length,t<=r&&c>=r)return{node:o,offset:r-t};t=c}e:{for(;o;){if(o.nextSibling){o=o.nextSibling;break e}o=o.parentNode}o=void 0}o=gf(o)}}function yf(t,r){return t&&r?t===r?!0:t&&t.nodeType===3?!1:r&&r.nodeType===3?yf(t,r.parentNode):"contains"in t?t.contains(r):t.compareDocumentPosition?!!(t.compareDocumentPosition(r)&16):!1:!1}function _f(){for(var t=window,r=Cr();r instanceof t.HTMLIFrameElement;){try{var o=typeof r.contentWindow.location.href=="string"}catch{o=!1}if(o)t=r.contentWindow;else break;r=Cr(t.document)}return r}function fc(t){var r=t&&t.nodeName&&t.nodeName.toLowerCase();return r&&(r==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||r==="textarea"||t.contentEditable==="true")}function T_(t){var r=_f(),o=t.focusedElem,c=t.selectionRange;if(r!==o&&o&&o.ownerDocument&&yf(o.ownerDocument.documentElement,o)){if(c!==null&&fc(o)){if(r=c.start,t=c.end,t===void 0&&(t=r),"selectionStart"in o)o.selectionStart=r,o.selectionEnd=Math.min(t,o.value.length);else if(t=(r=o.ownerDocument||document)&&r.defaultView||window,t.getSelection){t=t.getSelection();var d=o.textContent.length,p=Math.min(c.start,d);c=c.end===void 0?p:Math.min(c.end,d),!t.extend&&p>c&&(d=c,c=p,p=d),d=vf(o,p);var y=vf(o,c);d&&y&&(t.rangeCount!==1||t.anchorNode!==d.node||t.anchorOffset!==d.offset||t.focusNode!==y.node||t.focusOffset!==y.offset)&&(r=r.createRange(),r.setStart(d.node,d.offset),t.removeAllRanges(),p>c?(t.addRange(r),t.extend(y.node,y.offset)):(r.setEnd(y.node,y.offset),t.addRange(r)))}}for(r=[],t=o;t=t.parentNode;)t.nodeType===1&&r.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof o.focus=="function"&&o.focus(),o=0;o<r.length;o++)t=r[o],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var I_=m&&"documentMode"in document&&11>=document.documentMode,xs=null,pc=null,Ho=null,mc=!1;function Ef(t,r,o){var c=o.window===o?o.document:o.nodeType===9?o:o.ownerDocument;mc||xs==null||xs!==Cr(c)||(c=xs,"selectionStart"in c&&fc(c)?c={start:c.selectionStart,end:c.selectionEnd}:(c=(c.ownerDocument&&c.ownerDocument.defaultView||window).getSelection(),c={anchorNode:c.anchorNode,anchorOffset:c.anchorOffset,focusNode:c.focusNode,focusOffset:c.focusOffset}),Ho&&$o(Ho,c)||(Ho=c,c=yl(pc,"onSelect"),0<c.length&&(r=new As("onSelect","select",null,r,o),t.push({event:r,listeners:c}),r.target=xs)))}function ml(t,r){var o={};return o[t.toLowerCase()]=r.toLowerCase(),o["Webkit"+t]="webkit"+r,o["Moz"+t]="moz"+r,o}var Ls={animationend:ml("Animation","AnimationEnd"),animationiteration:ml("Animation","AnimationIteration"),animationstart:ml("Animation","AnimationStart"),transitionend:ml("Transition","TransitionEnd")},gc={},wf={};m&&(wf=document.createElement("div").style,"AnimationEvent"in window||(delete Ls.animationend.animation,delete Ls.animationiteration.animation,delete Ls.animationstart.animation),"TransitionEvent"in window||delete Ls.transitionend.transition);function gl(t){if(gc[t])return gc[t];if(!Ls[t])return t;var r=Ls[t],o;for(o in r)if(r.hasOwnProperty(o)&&o in wf)return gc[t]=r[o];return t}var Tf=gl("animationend"),If=gl("animationiteration"),Sf=gl("animationstart"),Af=gl("transitionend"),Rf=new Map,Cf="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function br(t,r){Rf.set(t,r),u(r,[t])}for(var vc=0;vc<Cf.length;vc++){var yc=Cf[vc],S_=yc.toLowerCase(),A_=yc[0].toUpperCase()+yc.slice(1);br(S_,"on"+A_)}br(Tf,"onAnimationEnd"),br(If,"onAnimationIteration"),br(Sf,"onAnimationStart"),br("dblclick","onDoubleClick"),br("focusin","onFocus"),br("focusout","onBlur"),br(Af,"onTransitionEnd"),h("onMouseEnter",["mouseout","mouseover"]),h("onMouseLeave",["mouseout","mouseover"]),h("onPointerEnter",["pointerout","pointerover"]),h("onPointerLeave",["pointerout","pointerover"]),u("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),u("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),u("onBeforeInput",["compositionend","keypress","textInput","paste"]),u("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),u("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),u("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Wo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),R_=new Set("cancel close invalid load scroll toggle".split(" ").concat(Wo));function Pf(t,r,o){var c=t.type||"unknown-event";t.currentTarget=o,Ga(c,r,void 0,t),t.currentTarget=null}function kf(t,r){r=(r&4)!==0;for(var o=0;o<t.length;o++){var c=t[o],d=c.event;c=c.listeners;e:{var p=void 0;if(r)for(var y=c.length-1;0<=y;y--){var I=c[y],C=I.instance,b=I.currentTarget;if(I=I.listener,C!==p&&d.isPropagationStopped())break e;Pf(d,I,b),p=C}else for(y=0;y<c.length;y++){if(I=c[y],C=I.instance,b=I.currentTarget,I=I.listener,C!==p&&d.isPropagationStopped())break e;Pf(d,I,b),p=C}}}if(wn)throw t=ko,wn=!1,ko=null,t}function $e(t,r){var o=r[Rc];o===void 0&&(o=r[Rc]=new Set);var c=t+"__bubble";o.has(c)||(Nf(r,t,2,!1),o.add(c))}function _c(t,r,o){var c=0;r&&(c|=4),Nf(o,t,c,r)}var vl="_reactListening"+Math.random().toString(36).slice(2);function Go(t){if(!t[vl]){t[vl]=!0,s.forEach(function(o){o!=="selectionchange"&&(R_.has(o)||_c(o,!1,t),_c(o,!0,t))});var r=t.nodeType===9?t:t.ownerDocument;r===null||r[vl]||(r[vl]=!0,_c("selectionchange",!1,r))}}function Nf(t,r,o,c){switch(Mo(r)){case 1:var d=We;break;case 4:d=uc;break;default:d=Vo}o=d.bind(null,r,o,t),d=void 0,!ps||r!=="touchstart"&&r!=="touchmove"&&r!=="wheel"||(d=!0),c?d!==void 0?t.addEventListener(r,o,{capture:!0,passive:d}):t.addEventListener(r,o,!0):d!==void 0?t.addEventListener(r,o,{passive:d}):t.addEventListener(r,o,!1)}function Ec(t,r,o,c,d){var p=c;if((r&1)===0&&(r&2)===0&&c!==null)e:for(;;){if(c===null)return;var y=c.tag;if(y===3||y===4){var I=c.stateNode.containerInfo;if(I===d||I.nodeType===8&&I.parentNode===d)break;if(y===4)for(y=c.return;y!==null;){var C=y.tag;if((C===3||C===4)&&(C=y.stateNode.containerInfo,C===d||C.nodeType===8&&C.parentNode===d))return;y=y.return}for(;I!==null;){if(y=Oi(I),y===null)return;if(C=y.tag,C===5||C===6){c=p=y;continue e}I=I.parentNode}}c=c.return}Po(function(){var b=p,G=hs(o),K=[];e:{var H=Rf.get(t);if(H!==void 0){var ee=As,ie=t;switch(t){case"keypress":if(Ss(o)===0)break e;case"keydown":case"keyup":ee=f;break;case"focusin":ie="focus",ee=ks;break;case"focusout":ie="blur",ee=ks;break;case"beforeblur":case"afterblur":ee=ks;break;case"click":if(o.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":ee=Cs;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":ee=al;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":ee=F;break;case Tf:case If:case Sf:ee=dr;break;case Af:ee=Me;break;case"scroll":ee=cc;break;case"wheel":ee=Pe;break;case"copy":case"cut":case"paste":ee=cl;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":ee=E}var se=(r&4)!==0,et=!se&&t==="scroll",M=se?H!==null?H+"Capture":null:H;se=[];for(var k=b,U;k!==null;){U=k;var X=U.stateNode;if(U.tag===5&&X!==null&&(U=X,M!==null&&(X=Ze(k,M),X!=null&&se.push(Ko(k,X,U)))),et)break;k=k.return}0<se.length&&(H=new ee(H,ie,null,o,G),K.push({event:H,listeners:se}))}}if((r&7)===0){e:{if(H=t==="mouseover"||t==="pointerover",ee=t==="mouseout"||t==="pointerout",H&&o!==yi&&(ie=o.relatedTarget||o.fromElement)&&(Oi(ie)||ie[fr]))break e;if((ee||H)&&(H=G.window===G?G:(H=G.ownerDocument)?H.defaultView||H.parentWindow:window,ee?(ie=o.relatedTarget||o.toElement,ee=b,ie=ie?Oi(ie):null,ie!==null&&(et=Tn(ie),ie!==et||ie.tag!==5&&ie.tag!==6)&&(ie=null)):(ee=null,ie=b),ee!==ie)){if(se=Cs,X="onMouseLeave",M="onMouseEnter",k="mouse",(t==="pointerout"||t==="pointerover")&&(se=E,X="onPointerLeave",M="onPointerEnter",k="pointer"),et=ee==null?H:Us(ee),U=ie==null?H:Us(ie),H=new se(X,k+"leave",ee,o,G),H.target=et,H.relatedTarget=U,X=null,Oi(G)===b&&(se=new se(M,k+"enter",ie,o,G),se.target=U,se.relatedTarget=et,X=se),et=X,ee&&ie)t:{for(se=ee,M=ie,k=0,U=se;U;U=Vs(U))k++;for(U=0,X=M;X;X=Vs(X))U++;for(;0<k-U;)se=Vs(se),k--;for(;0<U-k;)M=Vs(M),U--;for(;k--;){if(se===M||M!==null&&se===M.alternate)break t;se=Vs(se),M=Vs(M)}se=null}else se=null;ee!==null&&Of(K,H,ee,se,!1),ie!==null&&et!==null&&Of(K,et,ie,se,!0)}}e:{if(H=b?Us(b):window,ee=H.nodeName&&H.nodeName.toLowerCase(),ee==="select"||ee==="input"&&H.type==="file")var ae=g_;else if(cf(H))if(df)ae=E_;else{ae=y_;var de=v_}else(ee=H.nodeName)&&ee.toLowerCase()==="input"&&(H.type==="checkbox"||H.type==="radio")&&(ae=__);if(ae&&(ae=ae(t,b))){hf(K,ae,o,G);break e}de&&de(t,H,b),t==="focusout"&&(de=H._wrapperState)&&de.controlled&&H.type==="number"&&ls(H,"number",H.value)}switch(de=b?Us(b):window,t){case"focusin":(cf(de)||de.contentEditable==="true")&&(xs=de,pc=b,Ho=null);break;case"focusout":Ho=pc=xs=null;break;case"mousedown":mc=!0;break;case"contextmenu":case"mouseup":case"dragend":mc=!1,Ef(K,o,G);break;case"selectionchange":if(I_)break;case"keydown":case"keyup":Ef(K,o,G)}var fe;if(tt)e:{switch(t){case"compositionstart":var me="onCompositionStart";break e;case"compositionend":me="onCompositionEnd";break e;case"compositionupdate":me="onCompositionUpdate";break e}me=void 0}else Ds?lf(t,o)&&(me="onCompositionEnd"):t==="keydown"&&o.keyCode===229&&(me="onCompositionStart");me&&(Ni&&o.locale!=="ko"&&(Ds||me!=="onCompositionStart"?me==="onCompositionEnd"&&Ds&&(fe=Uo()):(en=G,Is="value"in en?en.value:en.textContent,Ds=!0)),de=yl(b,me),0<de.length&&(me=new jo(me,t,null,o,G),K.push({event:me,listeners:de}),fe?me.data=fe:(fe=uf(o),fe!==null&&(me.data=fe)))),(fe=tn?d_(t,o):f_(t,o))&&(b=yl(b,"onBeforeInput"),0<b.length&&(G=new jo("onBeforeInput","beforeinput",null,o,G),K.push({event:G,listeners:b}),G.data=fe))}kf(K,r)})}function Ko(t,r,o){return{instance:t,listener:r,currentTarget:o}}function yl(t,r){for(var o=r+"Capture",c=[];t!==null;){var d=t,p=d.stateNode;d.tag===5&&p!==null&&(d=p,p=Ze(t,o),p!=null&&c.unshift(Ko(t,p,d)),p=Ze(t,r),p!=null&&c.push(Ko(t,p,d))),t=t.return}return c}function Vs(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function Of(t,r,o,c,d){for(var p=r._reactName,y=[];o!==null&&o!==c;){var I=o,C=I.alternate,b=I.stateNode;if(C!==null&&C===c)break;I.tag===5&&b!==null&&(I=b,d?(C=Ze(o,p),C!=null&&y.unshift(Ko(o,C,I))):d||(C=Ze(o,p),C!=null&&y.push(Ko(o,C,I)))),o=o.return}y.length!==0&&t.push({event:r,listeners:y})}var C_=/\r\n?/g,P_=/\u0000|\uFFFD/g;function Df(t){return(typeof t=="string"?t:""+t).replace(C_,`
`).replace(P_,"")}function _l(t,r,o){if(r=Df(r),Df(t)!==r&&o)throw Error(n(425))}function El(){}var wc=null,Tc=null;function Ic(t,r){return t==="textarea"||t==="noscript"||typeof r.children=="string"||typeof r.children=="number"||typeof r.dangerouslySetInnerHTML=="object"&&r.dangerouslySetInnerHTML!==null&&r.dangerouslySetInnerHTML.__html!=null}var Sc=typeof setTimeout=="function"?setTimeout:void 0,k_=typeof clearTimeout=="function"?clearTimeout:void 0,xf=typeof Promise=="function"?Promise:void 0,N_=typeof queueMicrotask=="function"?queueMicrotask:typeof xf<"u"?function(t){return xf.resolve(null).then(t).catch(O_)}:Sc;function O_(t){setTimeout(function(){throw t})}function Ac(t,r){var o=r,c=0;do{var d=o.nextSibling;if(t.removeChild(o),d&&d.nodeType===8)if(o=d.data,o==="/$"){if(c===0){t.removeChild(d),Cn(r);return}c--}else o!=="$"&&o!=="$?"&&o!=="$!"||c++;o=d}while(o);Cn(r)}function Fr(t){for(;t!=null;t=t.nextSibling){var r=t.nodeType;if(r===1||r===3)break;if(r===8){if(r=t.data,r==="$"||r==="$!"||r==="$?")break;if(r==="/$")return null}}return t}function Lf(t){t=t.previousSibling;for(var r=0;t;){if(t.nodeType===8){var o=t.data;if(o==="$"||o==="$!"||o==="$?"){if(r===0)return t;r--}else o==="/$"&&r++}t=t.previousSibling}return null}var Ms=Math.random().toString(36).slice(2),Gn="__reactFiber$"+Ms,qo="__reactProps$"+Ms,fr="__reactContainer$"+Ms,Rc="__reactEvents$"+Ms,D_="__reactListeners$"+Ms,x_="__reactHandles$"+Ms;function Oi(t){var r=t[Gn];if(r)return r;for(var o=t.parentNode;o;){if(r=o[fr]||o[Gn]){if(o=r.alternate,r.child!==null||o!==null&&o.child!==null)for(t=Lf(t);t!==null;){if(o=t[Gn])return o;t=Lf(t)}return r}t=o,o=t.parentNode}return null}function Qo(t){return t=t[Gn]||t[fr],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function Us(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(n(33))}function wl(t){return t[qo]||null}var Cc=[],bs=-1;function jr(t){return{current:t}}function He(t){0>bs||(t.current=Cc[bs],Cc[bs]=null,bs--)}function ze(t,r){bs++,Cc[bs]=t.current,t.current=r}var zr={},kt=jr(zr),Ht=jr(!1),Di=zr;function Fs(t,r){var o=t.type.contextTypes;if(!o)return zr;var c=t.stateNode;if(c&&c.__reactInternalMemoizedUnmaskedChildContext===r)return c.__reactInternalMemoizedMaskedChildContext;var d={},p;for(p in o)d[p]=r[p];return c&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=r,t.__reactInternalMemoizedMaskedChildContext=d),d}function Wt(t){return t=t.childContextTypes,t!=null}function Tl(){He(Ht),He(kt)}function Vf(t,r,o){if(kt.current!==zr)throw Error(n(168));ze(kt,r),ze(Ht,o)}function Mf(t,r,o){var c=t.stateNode;if(r=r.childContextTypes,typeof c.getChildContext!="function")return o;c=c.getChildContext();for(var d in c)if(!(d in r))throw Error(n(108,xe(t)||"Unknown",d));return te({},o,c)}function Il(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||zr,Di=kt.current,ze(kt,t),ze(Ht,Ht.current),!0}function Uf(t,r,o){var c=t.stateNode;if(!c)throw Error(n(169));o?(t=Mf(t,r,Di),c.__reactInternalMemoizedMergedChildContext=t,He(Ht),He(kt),ze(kt,t)):He(Ht),ze(Ht,o)}var pr=null,Sl=!1,Pc=!1;function bf(t){pr===null?pr=[t]:pr.push(t)}function L_(t){Sl=!0,bf(t)}function Br(){if(!Pc&&pr!==null){Pc=!0;var t=0,r=Ae;try{var o=pr;for(Ae=1;t<o.length;t++){var c=o[t];do c=c(!0);while(c!==null)}pr=null,Sl=!1}catch(d){throw pr!==null&&(pr=pr.slice(t+1)),ys(Ii,Br),d}finally{Ae=r,Pc=!1}}return null}var js=[],zs=0,Al=null,Rl=0,dn=[],fn=0,xi=null,mr=1,gr="";function Li(t,r){js[zs++]=Rl,js[zs++]=Al,Al=t,Rl=r}function Ff(t,r,o){dn[fn++]=mr,dn[fn++]=gr,dn[fn++]=xi,xi=t;var c=mr;t=gr;var d=32-bt(c)-1;c&=~(1<<d),o+=1;var p=32-bt(r)+d;if(30<p){var y=d-d%5;p=(c&(1<<y)-1).toString(32),c>>=y,d-=y,mr=1<<32-bt(r)+d|o<<d|c,gr=p+t}else mr=1<<p|o<<d|c,gr=t}function kc(t){t.return!==null&&(Li(t,1),Ff(t,1,0))}function Nc(t){for(;t===Al;)Al=js[--zs],js[zs]=null,Rl=js[--zs],js[zs]=null;for(;t===xi;)xi=dn[--fn],dn[fn]=null,gr=dn[--fn],dn[fn]=null,mr=dn[--fn],dn[fn]=null}var nn=null,rn=null,Ge=!1,Nn=null;function jf(t,r){var o=vn(5,null,null,0);o.elementType="DELETED",o.stateNode=r,o.return=t,r=t.deletions,r===null?(t.deletions=[o],t.flags|=16):r.push(o)}function zf(t,r){switch(t.tag){case 5:var o=t.type;return r=r.nodeType!==1||o.toLowerCase()!==r.nodeName.toLowerCase()?null:r,r!==null?(t.stateNode=r,nn=t,rn=Fr(r.firstChild),!0):!1;case 6:return r=t.pendingProps===""||r.nodeType!==3?null:r,r!==null?(t.stateNode=r,nn=t,rn=null,!0):!1;case 13:return r=r.nodeType!==8?null:r,r!==null?(o=xi!==null?{id:mr,overflow:gr}:null,t.memoizedState={dehydrated:r,treeContext:o,retryLane:1073741824},o=vn(18,null,null,0),o.stateNode=r,o.return=t,t.child=o,nn=t,rn=null,!0):!1;default:return!1}}function Oc(t){return(t.mode&1)!==0&&(t.flags&128)===0}function Dc(t){if(Ge){var r=rn;if(r){var o=r;if(!zf(t,r)){if(Oc(t))throw Error(n(418));r=Fr(o.nextSibling);var c=nn;r&&zf(t,r)?jf(c,o):(t.flags=t.flags&-4097|2,Ge=!1,nn=t)}}else{if(Oc(t))throw Error(n(418));t.flags=t.flags&-4097|2,Ge=!1,nn=t}}}function Bf(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;nn=t}function Cl(t){if(t!==nn)return!1;if(!Ge)return Bf(t),Ge=!0,!1;var r;if((r=t.tag!==3)&&!(r=t.tag!==5)&&(r=t.type,r=r!=="head"&&r!=="body"&&!Ic(t.type,t.memoizedProps)),r&&(r=rn)){if(Oc(t))throw $f(),Error(n(418));for(;r;)jf(t,r),r=Fr(r.nextSibling)}if(Bf(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(n(317));e:{for(t=t.nextSibling,r=0;t;){if(t.nodeType===8){var o=t.data;if(o==="/$"){if(r===0){rn=Fr(t.nextSibling);break e}r--}else o!=="$"&&o!=="$!"&&o!=="$?"||r++}t=t.nextSibling}rn=null}}else rn=nn?Fr(t.stateNode.nextSibling):null;return!0}function $f(){for(var t=rn;t;)t=Fr(t.nextSibling)}function Bs(){rn=nn=null,Ge=!1}function xc(t){Nn===null?Nn=[t]:Nn.push(t)}var V_=ve.ReactCurrentBatchConfig;function Xo(t,r,o){if(t=o.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(o._owner){if(o=o._owner,o){if(o.tag!==1)throw Error(n(309));var c=o.stateNode}if(!c)throw Error(n(147,t));var d=c,p=""+t;return r!==null&&r.ref!==null&&typeof r.ref=="function"&&r.ref._stringRef===p?r.ref:(r=function(y){var I=d.refs;y===null?delete I[p]:I[p]=y},r._stringRef=p,r)}if(typeof t!="string")throw Error(n(284));if(!o._owner)throw Error(n(290,t))}return t}function Pl(t,r){throw t=Object.prototype.toString.call(r),Error(n(31,t==="[object Object]"?"object with keys {"+Object.keys(r).join(", ")+"}":t))}function Hf(t){var r=t._init;return r(t._payload)}function Wf(t){function r(M,k){if(t){var U=M.deletions;U===null?(M.deletions=[k],M.flags|=16):U.push(k)}}function o(M,k){if(!t)return null;for(;k!==null;)r(M,k),k=k.sibling;return null}function c(M,k){for(M=new Map;k!==null;)k.key!==null?M.set(k.key,k):M.set(k.index,k),k=k.sibling;return M}function d(M,k){return M=Xr(M,k),M.index=0,M.sibling=null,M}function p(M,k,U){return M.index=U,t?(U=M.alternate,U!==null?(U=U.index,U<k?(M.flags|=2,k):U):(M.flags|=2,k)):(M.flags|=1048576,k)}function y(M){return t&&M.alternate===null&&(M.flags|=2),M}function I(M,k,U,X){return k===null||k.tag!==6?(k=Sh(U,M.mode,X),k.return=M,k):(k=d(k,U),k.return=M,k)}function C(M,k,U,X){var ae=U.type;return ae===N?G(M,k,U.props.children,X,U.key):k!==null&&(k.elementType===ae||typeof ae=="object"&&ae!==null&&ae.$$typeof===Pt&&Hf(ae)===k.type)?(X=d(k,U.props),X.ref=Xo(M,k,U),X.return=M,X):(X=Jl(U.type,U.key,U.props,null,M.mode,X),X.ref=Xo(M,k,U),X.return=M,X)}function b(M,k,U,X){return k===null||k.tag!==4||k.stateNode.containerInfo!==U.containerInfo||k.stateNode.implementation!==U.implementation?(k=Ah(U,M.mode,X),k.return=M,k):(k=d(k,U.children||[]),k.return=M,k)}function G(M,k,U,X,ae){return k===null||k.tag!==7?(k=Bi(U,M.mode,X,ae),k.return=M,k):(k=d(k,U),k.return=M,k)}function K(M,k,U){if(typeof k=="string"&&k!==""||typeof k=="number")return k=Sh(""+k,M.mode,U),k.return=M,k;if(typeof k=="object"&&k!==null){switch(k.$$typeof){case Ve:return U=Jl(k.type,k.key,k.props,null,M.mode,U),U.ref=Xo(M,null,k),U.return=M,U;case Re:return k=Ah(k,M.mode,U),k.return=M,k;case Pt:var X=k._init;return K(M,X(k._payload),U)}if(ir(k)||he(k))return k=Bi(k,M.mode,U,null),k.return=M,k;Pl(M,k)}return null}function H(M,k,U,X){var ae=k!==null?k.key:null;if(typeof U=="string"&&U!==""||typeof U=="number")return ae!==null?null:I(M,k,""+U,X);if(typeof U=="object"&&U!==null){switch(U.$$typeof){case Ve:return U.key===ae?C(M,k,U,X):null;case Re:return U.key===ae?b(M,k,U,X):null;case Pt:return ae=U._init,H(M,k,ae(U._payload),X)}if(ir(U)||he(U))return ae!==null?null:G(M,k,U,X,null);Pl(M,U)}return null}function ee(M,k,U,X,ae){if(typeof X=="string"&&X!==""||typeof X=="number")return M=M.get(U)||null,I(k,M,""+X,ae);if(typeof X=="object"&&X!==null){switch(X.$$typeof){case Ve:return M=M.get(X.key===null?U:X.key)||null,C(k,M,X,ae);case Re:return M=M.get(X.key===null?U:X.key)||null,b(k,M,X,ae);case Pt:var de=X._init;return ee(M,k,U,de(X._payload),ae)}if(ir(X)||he(X))return M=M.get(U)||null,G(k,M,X,ae,null);Pl(k,X)}return null}function ie(M,k,U,X){for(var ae=null,de=null,fe=k,me=k=0,mt=null;fe!==null&&me<U.length;me++){fe.index>me?(mt=fe,fe=null):mt=fe.sibling;var De=H(M,fe,U[me],X);if(De===null){fe===null&&(fe=mt);break}t&&fe&&De.alternate===null&&r(M,fe),k=p(De,k,me),de===null?ae=De:de.sibling=De,de=De,fe=mt}if(me===U.length)return o(M,fe),Ge&&Li(M,me),ae;if(fe===null){for(;me<U.length;me++)fe=K(M,U[me],X),fe!==null&&(k=p(fe,k,me),de===null?ae=fe:de.sibling=fe,de=fe);return Ge&&Li(M,me),ae}for(fe=c(M,fe);me<U.length;me++)mt=ee(fe,M,me,U[me],X),mt!==null&&(t&&mt.alternate!==null&&fe.delete(mt.key===null?me:mt.key),k=p(mt,k,me),de===null?ae=mt:de.sibling=mt,de=mt);return t&&fe.forEach(function(Yr){return r(M,Yr)}),Ge&&Li(M,me),ae}function se(M,k,U,X){var ae=he(U);if(typeof ae!="function")throw Error(n(150));if(U=ae.call(U),U==null)throw Error(n(151));for(var de=ae=null,fe=k,me=k=0,mt=null,De=U.next();fe!==null&&!De.done;me++,De=U.next()){fe.index>me?(mt=fe,fe=null):mt=fe.sibling;var Yr=H(M,fe,De.value,X);if(Yr===null){fe===null&&(fe=mt);break}t&&fe&&Yr.alternate===null&&r(M,fe),k=p(Yr,k,me),de===null?ae=Yr:de.sibling=Yr,de=Yr,fe=mt}if(De.done)return o(M,fe),Ge&&Li(M,me),ae;if(fe===null){for(;!De.done;me++,De=U.next())De=K(M,De.value,X),De!==null&&(k=p(De,k,me),de===null?ae=De:de.sibling=De,de=De);return Ge&&Li(M,me),ae}for(fe=c(M,fe);!De.done;me++,De=U.next())De=ee(fe,M,me,De.value,X),De!==null&&(t&&De.alternate!==null&&fe.delete(De.key===null?me:De.key),k=p(De,k,me),de===null?ae=De:de.sibling=De,de=De);return t&&fe.forEach(function(pE){return r(M,pE)}),Ge&&Li(M,me),ae}function et(M,k,U,X){if(typeof U=="object"&&U!==null&&U.type===N&&U.key===null&&(U=U.props.children),typeof U=="object"&&U!==null){switch(U.$$typeof){case Ve:e:{for(var ae=U.key,de=k;de!==null;){if(de.key===ae){if(ae=U.type,ae===N){if(de.tag===7){o(M,de.sibling),k=d(de,U.props.children),k.return=M,M=k;break e}}else if(de.elementType===ae||typeof ae=="object"&&ae!==null&&ae.$$typeof===Pt&&Hf(ae)===de.type){o(M,de.sibling),k=d(de,U.props),k.ref=Xo(M,de,U),k.return=M,M=k;break e}o(M,de);break}else r(M,de);de=de.sibling}U.type===N?(k=Bi(U.props.children,M.mode,X,U.key),k.return=M,M=k):(X=Jl(U.type,U.key,U.props,null,M.mode,X),X.ref=Xo(M,k,U),X.return=M,M=X)}return y(M);case Re:e:{for(de=U.key;k!==null;){if(k.key===de)if(k.tag===4&&k.stateNode.containerInfo===U.containerInfo&&k.stateNode.implementation===U.implementation){o(M,k.sibling),k=d(k,U.children||[]),k.return=M,M=k;break e}else{o(M,k);break}else r(M,k);k=k.sibling}k=Ah(U,M.mode,X),k.return=M,M=k}return y(M);case Pt:return de=U._init,et(M,k,de(U._payload),X)}if(ir(U))return ie(M,k,U,X);if(he(U))return se(M,k,U,X);Pl(M,U)}return typeof U=="string"&&U!==""||typeof U=="number"?(U=""+U,k!==null&&k.tag===6?(o(M,k.sibling),k=d(k,U),k.return=M,M=k):(o(M,k),k=Sh(U,M.mode,X),k.return=M,M=k),y(M)):o(M,k)}return et}var $s=Wf(!0),Gf=Wf(!1),kl=jr(null),Nl=null,Hs=null,Lc=null;function Vc(){Lc=Hs=Nl=null}function Mc(t){var r=kl.current;He(kl),t._currentValue=r}function Uc(t,r,o){for(;t!==null;){var c=t.alternate;if((t.childLanes&r)!==r?(t.childLanes|=r,c!==null&&(c.childLanes|=r)):c!==null&&(c.childLanes&r)!==r&&(c.childLanes|=r),t===o)break;t=t.return}}function Ws(t,r){Nl=t,Lc=Hs=null,t=t.dependencies,t!==null&&t.firstContext!==null&&((t.lanes&r)!==0&&(Gt=!0),t.firstContext=null)}function pn(t){var r=t._currentValue;if(Lc!==t)if(t={context:t,memoizedValue:r,next:null},Hs===null){if(Nl===null)throw Error(n(308));Hs=t,Nl.dependencies={lanes:0,firstContext:t}}else Hs=Hs.next=t;return r}var Vi=null;function bc(t){Vi===null?Vi=[t]:Vi.push(t)}function Kf(t,r,o,c){var d=r.interleaved;return d===null?(o.next=o,bc(r)):(o.next=d.next,d.next=o),r.interleaved=o,vr(t,c)}function vr(t,r){t.lanes|=r;var o=t.alternate;for(o!==null&&(o.lanes|=r),o=t,t=t.return;t!==null;)t.childLanes|=r,o=t.alternate,o!==null&&(o.childLanes|=r),o=t,t=t.return;return o.tag===3?o.stateNode:null}var $r=!1;function Fc(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function qf(t,r){t=t.updateQueue,r.updateQueue===t&&(r.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function yr(t,r){return{eventTime:t,lane:r,tag:0,payload:null,callback:null,next:null}}function Hr(t,r,o){var c=t.updateQueue;if(c===null)return null;if(c=c.shared,(Ne&2)!==0){var d=c.pending;return d===null?r.next=r:(r.next=d.next,d.next=r),c.pending=r,vr(t,o)}return d=c.interleaved,d===null?(r.next=r,bc(c)):(r.next=d.next,d.next=r),c.interleaved=r,vr(t,o)}function Ol(t,r,o){if(r=r.updateQueue,r!==null&&(r=r.shared,(o&4194240)!==0)){var c=r.lanes;c&=t.pendingLanes,o|=c,r.lanes=o,xr(t,o)}}function Qf(t,r){var o=t.updateQueue,c=t.alternate;if(c!==null&&(c=c.updateQueue,o===c)){var d=null,p=null;if(o=o.firstBaseUpdate,o!==null){do{var y={eventTime:o.eventTime,lane:o.lane,tag:o.tag,payload:o.payload,callback:o.callback,next:null};p===null?d=p=y:p=p.next=y,o=o.next}while(o!==null);p===null?d=p=r:p=p.next=r}else d=p=r;o={baseState:c.baseState,firstBaseUpdate:d,lastBaseUpdate:p,shared:c.shared,effects:c.effects},t.updateQueue=o;return}t=o.lastBaseUpdate,t===null?o.firstBaseUpdate=r:t.next=r,o.lastBaseUpdate=r}function Dl(t,r,o,c){var d=t.updateQueue;$r=!1;var p=d.firstBaseUpdate,y=d.lastBaseUpdate,I=d.shared.pending;if(I!==null){d.shared.pending=null;var C=I,b=C.next;C.next=null,y===null?p=b:y.next=b,y=C;var G=t.alternate;G!==null&&(G=G.updateQueue,I=G.lastBaseUpdate,I!==y&&(I===null?G.firstBaseUpdate=b:I.next=b,G.lastBaseUpdate=C))}if(p!==null){var K=d.baseState;y=0,G=b=C=null,I=p;do{var H=I.lane,ee=I.eventTime;if((c&H)===H){G!==null&&(G=G.next={eventTime:ee,lane:0,tag:I.tag,payload:I.payload,callback:I.callback,next:null});e:{var ie=t,se=I;switch(H=r,ee=o,se.tag){case 1:if(ie=se.payload,typeof ie=="function"){K=ie.call(ee,K,H);break e}K=ie;break e;case 3:ie.flags=ie.flags&-65537|128;case 0:if(ie=se.payload,H=typeof ie=="function"?ie.call(ee,K,H):ie,H==null)break e;K=te({},K,H);break e;case 2:$r=!0}}I.callback!==null&&I.lane!==0&&(t.flags|=64,H=d.effects,H===null?d.effects=[I]:H.push(I))}else ee={eventTime:ee,lane:H,tag:I.tag,payload:I.payload,callback:I.callback,next:null},G===null?(b=G=ee,C=K):G=G.next=ee,y|=H;if(I=I.next,I===null){if(I=d.shared.pending,I===null)break;H=I,I=H.next,H.next=null,d.lastBaseUpdate=H,d.shared.pending=null}}while(!0);if(G===null&&(C=K),d.baseState=C,d.firstBaseUpdate=b,d.lastBaseUpdate=G,r=d.shared.interleaved,r!==null){d=r;do y|=d.lane,d=d.next;while(d!==r)}else p===null&&(d.shared.lanes=0);bi|=y,t.lanes=y,t.memoizedState=K}}function Xf(t,r,o){if(t=r.effects,r.effects=null,t!==null)for(r=0;r<t.length;r++){var c=t[r],d=c.callback;if(d!==null){if(c.callback=null,c=o,typeof d!="function")throw Error(n(191,d));d.call(c)}}}var Yo={},Kn=jr(Yo),Jo=jr(Yo),Zo=jr(Yo);function Mi(t){if(t===Yo)throw Error(n(174));return t}function jc(t,r){switch(ze(Zo,r),ze(Jo,t),ze(Kn,Yo),t=r.nodeType,t){case 9:case 11:r=(r=r.documentElement)?r.namespaceURI:at(null,"");break;default:t=t===8?r.parentNode:r,r=t.namespaceURI||null,t=t.tagName,r=at(r,t)}He(Kn),ze(Kn,r)}function Gs(){He(Kn),He(Jo),He(Zo)}function Yf(t){Mi(Zo.current);var r=Mi(Kn.current),o=at(r,t.type);r!==o&&(ze(Jo,t),ze(Kn,o))}function zc(t){Jo.current===t&&(He(Kn),He(Jo))}var qe=jr(0);function xl(t){for(var r=t;r!==null;){if(r.tag===13){var o=r.memoizedState;if(o!==null&&(o=o.dehydrated,o===null||o.data==="$?"||o.data==="$!"))return r}else if(r.tag===19&&r.memoizedProps.revealOrder!==void 0){if((r.flags&128)!==0)return r}else if(r.child!==null){r.child.return=r,r=r.child;continue}if(r===t)break;for(;r.sibling===null;){if(r.return===null||r.return===t)return null;r=r.return}r.sibling.return=r.return,r=r.sibling}return null}var Bc=[];function $c(){for(var t=0;t<Bc.length;t++)Bc[t]._workInProgressVersionPrimary=null;Bc.length=0}var Ll=ve.ReactCurrentDispatcher,Hc=ve.ReactCurrentBatchConfig,Ui=0,Qe=null,ut=null,ft=null,Vl=!1,ea=!1,ta=0,M_=0;function Nt(){throw Error(n(321))}function Wc(t,r){if(r===null)return!1;for(var o=0;o<r.length&&o<t.length;o++)if(!kn(t[o],r[o]))return!1;return!0}function Gc(t,r,o,c,d,p){if(Ui=p,Qe=r,r.memoizedState=null,r.updateQueue=null,r.lanes=0,Ll.current=t===null||t.memoizedState===null?j_:z_,t=o(c,d),ea){p=0;do{if(ea=!1,ta=0,25<=p)throw Error(n(301));p+=1,ft=ut=null,r.updateQueue=null,Ll.current=B_,t=o(c,d)}while(ea)}if(Ll.current=bl,r=ut!==null&&ut.next!==null,Ui=0,ft=ut=Qe=null,Vl=!1,r)throw Error(n(300));return t}function Kc(){var t=ta!==0;return ta=0,t}function qn(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return ft===null?Qe.memoizedState=ft=t:ft=ft.next=t,ft}function mn(){if(ut===null){var t=Qe.alternate;t=t!==null?t.memoizedState:null}else t=ut.next;var r=ft===null?Qe.memoizedState:ft.next;if(r!==null)ft=r,ut=t;else{if(t===null)throw Error(n(310));ut=t,t={memoizedState:ut.memoizedState,baseState:ut.baseState,baseQueue:ut.baseQueue,queue:ut.queue,next:null},ft===null?Qe.memoizedState=ft=t:ft=ft.next=t}return ft}function na(t,r){return typeof r=="function"?r(t):r}function qc(t){var r=mn(),o=r.queue;if(o===null)throw Error(n(311));o.lastRenderedReducer=t;var c=ut,d=c.baseQueue,p=o.pending;if(p!==null){if(d!==null){var y=d.next;d.next=p.next,p.next=y}c.baseQueue=d=p,o.pending=null}if(d!==null){p=d.next,c=c.baseState;var I=y=null,C=null,b=p;do{var G=b.lane;if((Ui&G)===G)C!==null&&(C=C.next={lane:0,action:b.action,hasEagerState:b.hasEagerState,eagerState:b.eagerState,next:null}),c=b.hasEagerState?b.eagerState:t(c,b.action);else{var K={lane:G,action:b.action,hasEagerState:b.hasEagerState,eagerState:b.eagerState,next:null};C===null?(I=C=K,y=c):C=C.next=K,Qe.lanes|=G,bi|=G}b=b.next}while(b!==null&&b!==p);C===null?y=c:C.next=I,kn(c,r.memoizedState)||(Gt=!0),r.memoizedState=c,r.baseState=y,r.baseQueue=C,o.lastRenderedState=c}if(t=o.interleaved,t!==null){d=t;do p=d.lane,Qe.lanes|=p,bi|=p,d=d.next;while(d!==t)}else d===null&&(o.lanes=0);return[r.memoizedState,o.dispatch]}function Qc(t){var r=mn(),o=r.queue;if(o===null)throw Error(n(311));o.lastRenderedReducer=t;var c=o.dispatch,d=o.pending,p=r.memoizedState;if(d!==null){o.pending=null;var y=d=d.next;do p=t(p,y.action),y=y.next;while(y!==d);kn(p,r.memoizedState)||(Gt=!0),r.memoizedState=p,r.baseQueue===null&&(r.baseState=p),o.lastRenderedState=p}return[p,c]}function Jf(){}function Zf(t,r){var o=Qe,c=mn(),d=r(),p=!kn(c.memoizedState,d);if(p&&(c.memoizedState=d,Gt=!0),c=c.queue,Xc(np.bind(null,o,c,t),[t]),c.getSnapshot!==r||p||ft!==null&&ft.memoizedState.tag&1){if(o.flags|=2048,ra(9,tp.bind(null,o,c,d,r),void 0,null),pt===null)throw Error(n(349));(Ui&30)!==0||ep(o,r,d)}return d}function ep(t,r,o){t.flags|=16384,t={getSnapshot:r,value:o},r=Qe.updateQueue,r===null?(r={lastEffect:null,stores:null},Qe.updateQueue=r,r.stores=[t]):(o=r.stores,o===null?r.stores=[t]:o.push(t))}function tp(t,r,o,c){r.value=o,r.getSnapshot=c,rp(r)&&ip(t)}function np(t,r,o){return o(function(){rp(r)&&ip(t)})}function rp(t){var r=t.getSnapshot;t=t.value;try{var o=r();return!kn(t,o)}catch{return!0}}function ip(t){var r=vr(t,1);r!==null&&Ln(r,t,1,-1)}function sp(t){var r=qn();return typeof t=="function"&&(t=t()),r.memoizedState=r.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:na,lastRenderedState:t},r.queue=t,t=t.dispatch=F_.bind(null,Qe,t),[r.memoizedState,t]}function ra(t,r,o,c){return t={tag:t,create:r,destroy:o,deps:c,next:null},r=Qe.updateQueue,r===null?(r={lastEffect:null,stores:null},Qe.updateQueue=r,r.lastEffect=t.next=t):(o=r.lastEffect,o===null?r.lastEffect=t.next=t:(c=o.next,o.next=t,t.next=c,r.lastEffect=t)),t}function op(){return mn().memoizedState}function Ml(t,r,o,c){var d=qn();Qe.flags|=t,d.memoizedState=ra(1|r,o,void 0,c===void 0?null:c)}function Ul(t,r,o,c){var d=mn();c=c===void 0?null:c;var p=void 0;if(ut!==null){var y=ut.memoizedState;if(p=y.destroy,c!==null&&Wc(c,y.deps)){d.memoizedState=ra(r,o,p,c);return}}Qe.flags|=t,d.memoizedState=ra(1|r,o,p,c)}function ap(t,r){return Ml(8390656,8,t,r)}function Xc(t,r){return Ul(2048,8,t,r)}function lp(t,r){return Ul(4,2,t,r)}function up(t,r){return Ul(4,4,t,r)}function cp(t,r){if(typeof r=="function")return t=t(),r(t),function(){r(null)};if(r!=null)return t=t(),r.current=t,function(){r.current=null}}function hp(t,r,o){return o=o!=null?o.concat([t]):null,Ul(4,4,cp.bind(null,r,t),o)}function Yc(){}function dp(t,r){var o=mn();r=r===void 0?null:r;var c=o.memoizedState;return c!==null&&r!==null&&Wc(r,c[1])?c[0]:(o.memoizedState=[t,r],t)}function fp(t,r){var o=mn();r=r===void 0?null:r;var c=o.memoizedState;return c!==null&&r!==null&&Wc(r,c[1])?c[0]:(t=t(),o.memoizedState=[t,r],t)}function pp(t,r,o){return(Ui&21)===0?(t.baseState&&(t.baseState=!1,Gt=!0),t.memoizedState=o):(kn(o,r)||(o=Ri(),Qe.lanes|=o,bi|=o,t.baseState=!0),r)}function U_(t,r){var o=Ae;Ae=o!==0&&4>o?o:4,t(!0);var c=Hc.transition;Hc.transition={};try{t(!1),r()}finally{Ae=o,Hc.transition=c}}function mp(){return mn().memoizedState}function b_(t,r,o){var c=qr(t);if(o={lane:c,action:o,hasEagerState:!1,eagerState:null,next:null},gp(t))vp(r,o);else if(o=Kf(t,r,o,c),o!==null){var d=zt();Ln(o,t,c,d),yp(o,r,c)}}function F_(t,r,o){var c=qr(t),d={lane:c,action:o,hasEagerState:!1,eagerState:null,next:null};if(gp(t))vp(r,d);else{var p=t.alternate;if(t.lanes===0&&(p===null||p.lanes===0)&&(p=r.lastRenderedReducer,p!==null))try{var y=r.lastRenderedState,I=p(y,o);if(d.hasEagerState=!0,d.eagerState=I,kn(I,y)){var C=r.interleaved;C===null?(d.next=d,bc(r)):(d.next=C.next,C.next=d),r.interleaved=d;return}}catch{}finally{}o=Kf(t,r,d,c),o!==null&&(d=zt(),Ln(o,t,c,d),yp(o,r,c))}}function gp(t){var r=t.alternate;return t===Qe||r!==null&&r===Qe}function vp(t,r){ea=Vl=!0;var o=t.pending;o===null?r.next=r:(r.next=o.next,o.next=r),t.pending=r}function yp(t,r,o){if((o&4194240)!==0){var c=r.lanes;c&=t.pendingLanes,o|=c,r.lanes=o,xr(t,o)}}var bl={readContext:pn,useCallback:Nt,useContext:Nt,useEffect:Nt,useImperativeHandle:Nt,useInsertionEffect:Nt,useLayoutEffect:Nt,useMemo:Nt,useReducer:Nt,useRef:Nt,useState:Nt,useDebugValue:Nt,useDeferredValue:Nt,useTransition:Nt,useMutableSource:Nt,useSyncExternalStore:Nt,useId:Nt,unstable_isNewReconciler:!1},j_={readContext:pn,useCallback:function(t,r){return qn().memoizedState=[t,r===void 0?null:r],t},useContext:pn,useEffect:ap,useImperativeHandle:function(t,r,o){return o=o!=null?o.concat([t]):null,Ml(4194308,4,cp.bind(null,r,t),o)},useLayoutEffect:function(t,r){return Ml(4194308,4,t,r)},useInsertionEffect:function(t,r){return Ml(4,2,t,r)},useMemo:function(t,r){var o=qn();return r=r===void 0?null:r,t=t(),o.memoizedState=[t,r],t},useReducer:function(t,r,o){var c=qn();return r=o!==void 0?o(r):r,c.memoizedState=c.baseState=r,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:r},c.queue=t,t=t.dispatch=b_.bind(null,Qe,t),[c.memoizedState,t]},useRef:function(t){var r=qn();return t={current:t},r.memoizedState=t},useState:sp,useDebugValue:Yc,useDeferredValue:function(t){return qn().memoizedState=t},useTransition:function(){var t=sp(!1),r=t[0];return t=U_.bind(null,t[1]),qn().memoizedState=t,[r,t]},useMutableSource:function(){},useSyncExternalStore:function(t,r,o){var c=Qe,d=qn();if(Ge){if(o===void 0)throw Error(n(407));o=o()}else{if(o=r(),pt===null)throw Error(n(349));(Ui&30)!==0||ep(c,r,o)}d.memoizedState=o;var p={value:o,getSnapshot:r};return d.queue=p,ap(np.bind(null,c,p,t),[t]),c.flags|=2048,ra(9,tp.bind(null,c,p,o,r),void 0,null),o},useId:function(){var t=qn(),r=pt.identifierPrefix;if(Ge){var o=gr,c=mr;o=(c&~(1<<32-bt(c)-1)).toString(32)+o,r=":"+r+"R"+o,o=ta++,0<o&&(r+="H"+o.toString(32)),r+=":"}else o=M_++,r=":"+r+"r"+o.toString(32)+":";return t.memoizedState=r},unstable_isNewReconciler:!1},z_={readContext:pn,useCallback:dp,useContext:pn,useEffect:Xc,useImperativeHandle:hp,useInsertionEffect:lp,useLayoutEffect:up,useMemo:fp,useReducer:qc,useRef:op,useState:function(){return qc(na)},useDebugValue:Yc,useDeferredValue:function(t){var r=mn();return pp(r,ut.memoizedState,t)},useTransition:function(){var t=qc(na)[0],r=mn().memoizedState;return[t,r]},useMutableSource:Jf,useSyncExternalStore:Zf,useId:mp,unstable_isNewReconciler:!1},B_={readContext:pn,useCallback:dp,useContext:pn,useEffect:Xc,useImperativeHandle:hp,useInsertionEffect:lp,useLayoutEffect:up,useMemo:fp,useReducer:Qc,useRef:op,useState:function(){return Qc(na)},useDebugValue:Yc,useDeferredValue:function(t){var r=mn();return ut===null?r.memoizedState=t:pp(r,ut.memoizedState,t)},useTransition:function(){var t=Qc(na)[0],r=mn().memoizedState;return[t,r]},useMutableSource:Jf,useSyncExternalStore:Zf,useId:mp,unstable_isNewReconciler:!1};function On(t,r){if(t&&t.defaultProps){r=te({},r),t=t.defaultProps;for(var o in t)r[o]===void 0&&(r[o]=t[o]);return r}return r}function Jc(t,r,o,c){r=t.memoizedState,o=o(c,r),o=o==null?r:te({},r,o),t.memoizedState=o,t.lanes===0&&(t.updateQueue.baseState=o)}var Fl={isMounted:function(t){return(t=t._reactInternals)?Tn(t)===t:!1},enqueueSetState:function(t,r,o){t=t._reactInternals;var c=zt(),d=qr(t),p=yr(c,d);p.payload=r,o!=null&&(p.callback=o),r=Hr(t,p,d),r!==null&&(Ln(r,t,d,c),Ol(r,t,d))},enqueueReplaceState:function(t,r,o){t=t._reactInternals;var c=zt(),d=qr(t),p=yr(c,d);p.tag=1,p.payload=r,o!=null&&(p.callback=o),r=Hr(t,p,d),r!==null&&(Ln(r,t,d,c),Ol(r,t,d))},enqueueForceUpdate:function(t,r){t=t._reactInternals;var o=zt(),c=qr(t),d=yr(o,c);d.tag=2,r!=null&&(d.callback=r),r=Hr(t,d,c),r!==null&&(Ln(r,t,c,o),Ol(r,t,c))}};function _p(t,r,o,c,d,p,y){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(c,p,y):r.prototype&&r.prototype.isPureReactComponent?!$o(o,c)||!$o(d,p):!0}function Ep(t,r,o){var c=!1,d=zr,p=r.contextType;return typeof p=="object"&&p!==null?p=pn(p):(d=Wt(r)?Di:kt.current,c=r.contextTypes,p=(c=c!=null)?Fs(t,d):zr),r=new r(o,p),t.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,r.updater=Fl,t.stateNode=r,r._reactInternals=t,c&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=d,t.__reactInternalMemoizedMaskedChildContext=p),r}function wp(t,r,o,c){t=r.state,typeof r.componentWillReceiveProps=="function"&&r.componentWillReceiveProps(o,c),typeof r.UNSAFE_componentWillReceiveProps=="function"&&r.UNSAFE_componentWillReceiveProps(o,c),r.state!==t&&Fl.enqueueReplaceState(r,r.state,null)}function Zc(t,r,o,c){var d=t.stateNode;d.props=o,d.state=t.memoizedState,d.refs={},Fc(t);var p=r.contextType;typeof p=="object"&&p!==null?d.context=pn(p):(p=Wt(r)?Di:kt.current,d.context=Fs(t,p)),d.state=t.memoizedState,p=r.getDerivedStateFromProps,typeof p=="function"&&(Jc(t,r,p,o),d.state=t.memoizedState),typeof r.getDerivedStateFromProps=="function"||typeof d.getSnapshotBeforeUpdate=="function"||typeof d.UNSAFE_componentWillMount!="function"&&typeof d.componentWillMount!="function"||(r=d.state,typeof d.componentWillMount=="function"&&d.componentWillMount(),typeof d.UNSAFE_componentWillMount=="function"&&d.UNSAFE_componentWillMount(),r!==d.state&&Fl.enqueueReplaceState(d,d.state,null),Dl(t,o,d,c),d.state=t.memoizedState),typeof d.componentDidMount=="function"&&(t.flags|=4194308)}function Ks(t,r){try{var o="",c=r;do o+=Ee(c),c=c.return;while(c);var d=o}catch(p){d=`
Error generating stack: `+p.message+`
`+p.stack}return{value:t,source:r,stack:d,digest:null}}function eh(t,r,o){return{value:t,source:null,stack:o??null,digest:r??null}}function th(t,r){try{console.error(r.value)}catch(o){setTimeout(function(){throw o})}}var $_=typeof WeakMap=="function"?WeakMap:Map;function Tp(t,r,o){o=yr(-1,o),o.tag=3,o.payload={element:null};var c=r.value;return o.callback=function(){Gl||(Gl=!0,gh=c),th(t,r)},o}function Ip(t,r,o){o=yr(-1,o),o.tag=3;var c=t.type.getDerivedStateFromError;if(typeof c=="function"){var d=r.value;o.payload=function(){return c(d)},o.callback=function(){th(t,r)}}var p=t.stateNode;return p!==null&&typeof p.componentDidCatch=="function"&&(o.callback=function(){th(t,r),typeof c!="function"&&(Gr===null?Gr=new Set([this]):Gr.add(this));var y=r.stack;this.componentDidCatch(r.value,{componentStack:y!==null?y:""})}),o}function Sp(t,r,o){var c=t.pingCache;if(c===null){c=t.pingCache=new $_;var d=new Set;c.set(r,d)}else d=c.get(r),d===void 0&&(d=new Set,c.set(r,d));d.has(o)||(d.add(o),t=rE.bind(null,t,r,o),r.then(t,t))}function Ap(t){do{var r;if((r=t.tag===13)&&(r=t.memoizedState,r=r!==null?r.dehydrated!==null:!0),r)return t;t=t.return}while(t!==null);return null}function Rp(t,r,o,c,d){return(t.mode&1)===0?(t===r?t.flags|=65536:(t.flags|=128,o.flags|=131072,o.flags&=-52805,o.tag===1&&(o.alternate===null?o.tag=17:(r=yr(-1,1),r.tag=2,Hr(o,r,1))),o.lanes|=1),t):(t.flags|=65536,t.lanes=d,t)}var H_=ve.ReactCurrentOwner,Gt=!1;function jt(t,r,o,c){r.child=t===null?Gf(r,null,o,c):$s(r,t.child,o,c)}function Cp(t,r,o,c,d){o=o.render;var p=r.ref;return Ws(r,d),c=Gc(t,r,o,c,p,d),o=Kc(),t!==null&&!Gt?(r.updateQueue=t.updateQueue,r.flags&=-2053,t.lanes&=~d,_r(t,r,d)):(Ge&&o&&kc(r),r.flags|=1,jt(t,r,c,d),r.child)}function Pp(t,r,o,c,d){if(t===null){var p=o.type;return typeof p=="function"&&!Ih(p)&&p.defaultProps===void 0&&o.compare===null&&o.defaultProps===void 0?(r.tag=15,r.type=p,kp(t,r,p,c,d)):(t=Jl(o.type,null,c,r,r.mode,d),t.ref=r.ref,t.return=r,r.child=t)}if(p=t.child,(t.lanes&d)===0){var y=p.memoizedProps;if(o=o.compare,o=o!==null?o:$o,o(y,c)&&t.ref===r.ref)return _r(t,r,d)}return r.flags|=1,t=Xr(p,c),t.ref=r.ref,t.return=r,r.child=t}function kp(t,r,o,c,d){if(t!==null){var p=t.memoizedProps;if($o(p,c)&&t.ref===r.ref)if(Gt=!1,r.pendingProps=c=p,(t.lanes&d)!==0)(t.flags&131072)!==0&&(Gt=!0);else return r.lanes=t.lanes,_r(t,r,d)}return nh(t,r,o,c,d)}function Np(t,r,o){var c=r.pendingProps,d=c.children,p=t!==null?t.memoizedState:null;if(c.mode==="hidden")if((r.mode&1)===0)r.memoizedState={baseLanes:0,cachePool:null,transitions:null},ze(Qs,sn),sn|=o;else{if((o&1073741824)===0)return t=p!==null?p.baseLanes|o:o,r.lanes=r.childLanes=1073741824,r.memoizedState={baseLanes:t,cachePool:null,transitions:null},r.updateQueue=null,ze(Qs,sn),sn|=t,null;r.memoizedState={baseLanes:0,cachePool:null,transitions:null},c=p!==null?p.baseLanes:o,ze(Qs,sn),sn|=c}else p!==null?(c=p.baseLanes|o,r.memoizedState=null):c=o,ze(Qs,sn),sn|=c;return jt(t,r,d,o),r.child}function Op(t,r){var o=r.ref;(t===null&&o!==null||t!==null&&t.ref!==o)&&(r.flags|=512,r.flags|=2097152)}function nh(t,r,o,c,d){var p=Wt(o)?Di:kt.current;return p=Fs(r,p),Ws(r,d),o=Gc(t,r,o,c,p,d),c=Kc(),t!==null&&!Gt?(r.updateQueue=t.updateQueue,r.flags&=-2053,t.lanes&=~d,_r(t,r,d)):(Ge&&c&&kc(r),r.flags|=1,jt(t,r,o,d),r.child)}function Dp(t,r,o,c,d){if(Wt(o)){var p=!0;Il(r)}else p=!1;if(Ws(r,d),r.stateNode===null)zl(t,r),Ep(r,o,c),Zc(r,o,c,d),c=!0;else if(t===null){var y=r.stateNode,I=r.memoizedProps;y.props=I;var C=y.context,b=o.contextType;typeof b=="object"&&b!==null?b=pn(b):(b=Wt(o)?Di:kt.current,b=Fs(r,b));var G=o.getDerivedStateFromProps,K=typeof G=="function"||typeof y.getSnapshotBeforeUpdate=="function";K||typeof y.UNSAFE_componentWillReceiveProps!="function"&&typeof y.componentWillReceiveProps!="function"||(I!==c||C!==b)&&wp(r,y,c,b),$r=!1;var H=r.memoizedState;y.state=H,Dl(r,c,y,d),C=r.memoizedState,I!==c||H!==C||Ht.current||$r?(typeof G=="function"&&(Jc(r,o,G,c),C=r.memoizedState),(I=$r||_p(r,o,I,c,H,C,b))?(K||typeof y.UNSAFE_componentWillMount!="function"&&typeof y.componentWillMount!="function"||(typeof y.componentWillMount=="function"&&y.componentWillMount(),typeof y.UNSAFE_componentWillMount=="function"&&y.UNSAFE_componentWillMount()),typeof y.componentDidMount=="function"&&(r.flags|=4194308)):(typeof y.componentDidMount=="function"&&(r.flags|=4194308),r.memoizedProps=c,r.memoizedState=C),y.props=c,y.state=C,y.context=b,c=I):(typeof y.componentDidMount=="function"&&(r.flags|=4194308),c=!1)}else{y=r.stateNode,qf(t,r),I=r.memoizedProps,b=r.type===r.elementType?I:On(r.type,I),y.props=b,K=r.pendingProps,H=y.context,C=o.contextType,typeof C=="object"&&C!==null?C=pn(C):(C=Wt(o)?Di:kt.current,C=Fs(r,C));var ee=o.getDerivedStateFromProps;(G=typeof ee=="function"||typeof y.getSnapshotBeforeUpdate=="function")||typeof y.UNSAFE_componentWillReceiveProps!="function"&&typeof y.componentWillReceiveProps!="function"||(I!==K||H!==C)&&wp(r,y,c,C),$r=!1,H=r.memoizedState,y.state=H,Dl(r,c,y,d);var ie=r.memoizedState;I!==K||H!==ie||Ht.current||$r?(typeof ee=="function"&&(Jc(r,o,ee,c),ie=r.memoizedState),(b=$r||_p(r,o,b,c,H,ie,C)||!1)?(G||typeof y.UNSAFE_componentWillUpdate!="function"&&typeof y.componentWillUpdate!="function"||(typeof y.componentWillUpdate=="function"&&y.componentWillUpdate(c,ie,C),typeof y.UNSAFE_componentWillUpdate=="function"&&y.UNSAFE_componentWillUpdate(c,ie,C)),typeof y.componentDidUpdate=="function"&&(r.flags|=4),typeof y.getSnapshotBeforeUpdate=="function"&&(r.flags|=1024)):(typeof y.componentDidUpdate!="function"||I===t.memoizedProps&&H===t.memoizedState||(r.flags|=4),typeof y.getSnapshotBeforeUpdate!="function"||I===t.memoizedProps&&H===t.memoizedState||(r.flags|=1024),r.memoizedProps=c,r.memoizedState=ie),y.props=c,y.state=ie,y.context=C,c=b):(typeof y.componentDidUpdate!="function"||I===t.memoizedProps&&H===t.memoizedState||(r.flags|=4),typeof y.getSnapshotBeforeUpdate!="function"||I===t.memoizedProps&&H===t.memoizedState||(r.flags|=1024),c=!1)}return rh(t,r,o,c,p,d)}function rh(t,r,o,c,d,p){Op(t,r);var y=(r.flags&128)!==0;if(!c&&!y)return d&&Uf(r,o,!1),_r(t,r,p);c=r.stateNode,H_.current=r;var I=y&&typeof o.getDerivedStateFromError!="function"?null:c.render();return r.flags|=1,t!==null&&y?(r.child=$s(r,t.child,null,p),r.child=$s(r,null,I,p)):jt(t,r,I,p),r.memoizedState=c.state,d&&Uf(r,o,!0),r.child}function xp(t){var r=t.stateNode;r.pendingContext?Vf(t,r.pendingContext,r.pendingContext!==r.context):r.context&&Vf(t,r.context,!1),jc(t,r.containerInfo)}function Lp(t,r,o,c,d){return Bs(),xc(d),r.flags|=256,jt(t,r,o,c),r.child}var ih={dehydrated:null,treeContext:null,retryLane:0};function sh(t){return{baseLanes:t,cachePool:null,transitions:null}}function Vp(t,r,o){var c=r.pendingProps,d=qe.current,p=!1,y=(r.flags&128)!==0,I;if((I=y)||(I=t!==null&&t.memoizedState===null?!1:(d&2)!==0),I?(p=!0,r.flags&=-129):(t===null||t.memoizedState!==null)&&(d|=1),ze(qe,d&1),t===null)return Dc(r),t=r.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?((r.mode&1)===0?r.lanes=1:t.data==="$!"?r.lanes=8:r.lanes=1073741824,null):(y=c.children,t=c.fallback,p?(c=r.mode,p=r.child,y={mode:"hidden",children:y},(c&1)===0&&p!==null?(p.childLanes=0,p.pendingProps=y):p=Zl(y,c,0,null),t=Bi(t,c,o,null),p.return=r,t.return=r,p.sibling=t,r.child=p,r.child.memoizedState=sh(o),r.memoizedState=ih,t):oh(r,y));if(d=t.memoizedState,d!==null&&(I=d.dehydrated,I!==null))return W_(t,r,y,c,I,d,o);if(p){p=c.fallback,y=r.mode,d=t.child,I=d.sibling;var C={mode:"hidden",children:c.children};return(y&1)===0&&r.child!==d?(c=r.child,c.childLanes=0,c.pendingProps=C,r.deletions=null):(c=Xr(d,C),c.subtreeFlags=d.subtreeFlags&14680064),I!==null?p=Xr(I,p):(p=Bi(p,y,o,null),p.flags|=2),p.return=r,c.return=r,c.sibling=p,r.child=c,c=p,p=r.child,y=t.child.memoizedState,y=y===null?sh(o):{baseLanes:y.baseLanes|o,cachePool:null,transitions:y.transitions},p.memoizedState=y,p.childLanes=t.childLanes&~o,r.memoizedState=ih,c}return p=t.child,t=p.sibling,c=Xr(p,{mode:"visible",children:c.children}),(r.mode&1)===0&&(c.lanes=o),c.return=r,c.sibling=null,t!==null&&(o=r.deletions,o===null?(r.deletions=[t],r.flags|=16):o.push(t)),r.child=c,r.memoizedState=null,c}function oh(t,r){return r=Zl({mode:"visible",children:r},t.mode,0,null),r.return=t,t.child=r}function jl(t,r,o,c){return c!==null&&xc(c),$s(r,t.child,null,o),t=oh(r,r.pendingProps.children),t.flags|=2,r.memoizedState=null,t}function W_(t,r,o,c,d,p,y){if(o)return r.flags&256?(r.flags&=-257,c=eh(Error(n(422))),jl(t,r,y,c)):r.memoizedState!==null?(r.child=t.child,r.flags|=128,null):(p=c.fallback,d=r.mode,c=Zl({mode:"visible",children:c.children},d,0,null),p=Bi(p,d,y,null),p.flags|=2,c.return=r,p.return=r,c.sibling=p,r.child=c,(r.mode&1)!==0&&$s(r,t.child,null,y),r.child.memoizedState=sh(y),r.memoizedState=ih,p);if((r.mode&1)===0)return jl(t,r,y,null);if(d.data==="$!"){if(c=d.nextSibling&&d.nextSibling.dataset,c)var I=c.dgst;return c=I,p=Error(n(419)),c=eh(p,c,void 0),jl(t,r,y,c)}if(I=(y&t.childLanes)!==0,Gt||I){if(c=pt,c!==null){switch(y&-y){case 4:d=2;break;case 16:d=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:d=32;break;case 536870912:d=268435456;break;default:d=0}d=(d&(c.suspendedLanes|y))!==0?0:d,d!==0&&d!==p.retryLane&&(p.retryLane=d,vr(t,d),Ln(c,t,d,-1))}return Th(),c=eh(Error(n(421))),jl(t,r,y,c)}return d.data==="$?"?(r.flags|=128,r.child=t.child,r=iE.bind(null,t),d._reactRetry=r,null):(t=p.treeContext,rn=Fr(d.nextSibling),nn=r,Ge=!0,Nn=null,t!==null&&(dn[fn++]=mr,dn[fn++]=gr,dn[fn++]=xi,mr=t.id,gr=t.overflow,xi=r),r=oh(r,c.children),r.flags|=4096,r)}function Mp(t,r,o){t.lanes|=r;var c=t.alternate;c!==null&&(c.lanes|=r),Uc(t.return,r,o)}function ah(t,r,o,c,d){var p=t.memoizedState;p===null?t.memoizedState={isBackwards:r,rendering:null,renderingStartTime:0,last:c,tail:o,tailMode:d}:(p.isBackwards=r,p.rendering=null,p.renderingStartTime=0,p.last=c,p.tail=o,p.tailMode=d)}function Up(t,r,o){var c=r.pendingProps,d=c.revealOrder,p=c.tail;if(jt(t,r,c.children,o),c=qe.current,(c&2)!==0)c=c&1|2,r.flags|=128;else{if(t!==null&&(t.flags&128)!==0)e:for(t=r.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&Mp(t,o,r);else if(t.tag===19)Mp(t,o,r);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===r)break e;for(;t.sibling===null;){if(t.return===null||t.return===r)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}c&=1}if(ze(qe,c),(r.mode&1)===0)r.memoizedState=null;else switch(d){case"forwards":for(o=r.child,d=null;o!==null;)t=o.alternate,t!==null&&xl(t)===null&&(d=o),o=o.sibling;o=d,o===null?(d=r.child,r.child=null):(d=o.sibling,o.sibling=null),ah(r,!1,d,o,p);break;case"backwards":for(o=null,d=r.child,r.child=null;d!==null;){if(t=d.alternate,t!==null&&xl(t)===null){r.child=d;break}t=d.sibling,d.sibling=o,o=d,d=t}ah(r,!0,o,null,p);break;case"together":ah(r,!1,null,null,void 0);break;default:r.memoizedState=null}return r.child}function zl(t,r){(r.mode&1)===0&&t!==null&&(t.alternate=null,r.alternate=null,r.flags|=2)}function _r(t,r,o){if(t!==null&&(r.dependencies=t.dependencies),bi|=r.lanes,(o&r.childLanes)===0)return null;if(t!==null&&r.child!==t.child)throw Error(n(153));if(r.child!==null){for(t=r.child,o=Xr(t,t.pendingProps),r.child=o,o.return=r;t.sibling!==null;)t=t.sibling,o=o.sibling=Xr(t,t.pendingProps),o.return=r;o.sibling=null}return r.child}function G_(t,r,o){switch(r.tag){case 3:xp(r),Bs();break;case 5:Yf(r);break;case 1:Wt(r.type)&&Il(r);break;case 4:jc(r,r.stateNode.containerInfo);break;case 10:var c=r.type._context,d=r.memoizedProps.value;ze(kl,c._currentValue),c._currentValue=d;break;case 13:if(c=r.memoizedState,c!==null)return c.dehydrated!==null?(ze(qe,qe.current&1),r.flags|=128,null):(o&r.child.childLanes)!==0?Vp(t,r,o):(ze(qe,qe.current&1),t=_r(t,r,o),t!==null?t.sibling:null);ze(qe,qe.current&1);break;case 19:if(c=(o&r.childLanes)!==0,(t.flags&128)!==0){if(c)return Up(t,r,o);r.flags|=128}if(d=r.memoizedState,d!==null&&(d.rendering=null,d.tail=null,d.lastEffect=null),ze(qe,qe.current),c)break;return null;case 22:case 23:return r.lanes=0,Np(t,r,o)}return _r(t,r,o)}var bp,lh,Fp,jp;bp=function(t,r){for(var o=r.child;o!==null;){if(o.tag===5||o.tag===6)t.appendChild(o.stateNode);else if(o.tag!==4&&o.child!==null){o.child.return=o,o=o.child;continue}if(o===r)break;for(;o.sibling===null;){if(o.return===null||o.return===r)return;o=o.return}o.sibling.return=o.return,o=o.sibling}},lh=function(){},Fp=function(t,r,o,c){var d=t.memoizedProps;if(d!==c){t=r.stateNode,Mi(Kn.current);var p=null;switch(o){case"input":d=mi(t,d),c=mi(t,c),p=[];break;case"select":d=te({},d,{value:void 0}),c=te({},c,{value:void 0}),p=[];break;case"textarea":d=yo(t,d),c=yo(t,c),p=[];break;default:typeof d.onClick!="function"&&typeof c.onClick=="function"&&(t.onclick=El)}So(o,c);var y;o=null;for(b in d)if(!c.hasOwnProperty(b)&&d.hasOwnProperty(b)&&d[b]!=null)if(b==="style"){var I=d[b];for(y in I)I.hasOwnProperty(y)&&(o||(o={}),o[y]="")}else b!=="dangerouslySetInnerHTML"&&b!=="children"&&b!=="suppressContentEditableWarning"&&b!=="suppressHydrationWarning"&&b!=="autoFocus"&&(a.hasOwnProperty(b)?p||(p=[]):(p=p||[]).push(b,null));for(b in c){var C=c[b];if(I=d!=null?d[b]:void 0,c.hasOwnProperty(b)&&C!==I&&(C!=null||I!=null))if(b==="style")if(I){for(y in I)!I.hasOwnProperty(y)||C&&C.hasOwnProperty(y)||(o||(o={}),o[y]="");for(y in C)C.hasOwnProperty(y)&&I[y]!==C[y]&&(o||(o={}),o[y]=C[y])}else o||(p||(p=[]),p.push(b,o)),o=C;else b==="dangerouslySetInnerHTML"?(C=C?C.__html:void 0,I=I?I.__html:void 0,C!=null&&I!==C&&(p=p||[]).push(b,C)):b==="children"?typeof C!="string"&&typeof C!="number"||(p=p||[]).push(b,""+C):b!=="suppressContentEditableWarning"&&b!=="suppressHydrationWarning"&&(a.hasOwnProperty(b)?(C!=null&&b==="onScroll"&&$e("scroll",t),p||I===C||(p=[])):(p=p||[]).push(b,C))}o&&(p=p||[]).push("style",o);var b=p;(r.updateQueue=b)&&(r.flags|=4)}},jp=function(t,r,o,c){o!==c&&(r.flags|=4)};function ia(t,r){if(!Ge)switch(t.tailMode){case"hidden":r=t.tail;for(var o=null;r!==null;)r.alternate!==null&&(o=r),r=r.sibling;o===null?t.tail=null:o.sibling=null;break;case"collapsed":o=t.tail;for(var c=null;o!==null;)o.alternate!==null&&(c=o),o=o.sibling;c===null?r||t.tail===null?t.tail=null:t.tail.sibling=null:c.sibling=null}}function Ot(t){var r=t.alternate!==null&&t.alternate.child===t.child,o=0,c=0;if(r)for(var d=t.child;d!==null;)o|=d.lanes|d.childLanes,c|=d.subtreeFlags&14680064,c|=d.flags&14680064,d.return=t,d=d.sibling;else for(d=t.child;d!==null;)o|=d.lanes|d.childLanes,c|=d.subtreeFlags,c|=d.flags,d.return=t,d=d.sibling;return t.subtreeFlags|=c,t.childLanes=o,r}function K_(t,r,o){var c=r.pendingProps;switch(Nc(r),r.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ot(r),null;case 1:return Wt(r.type)&&Tl(),Ot(r),null;case 3:return c=r.stateNode,Gs(),He(Ht),He(kt),$c(),c.pendingContext&&(c.context=c.pendingContext,c.pendingContext=null),(t===null||t.child===null)&&(Cl(r)?r.flags|=4:t===null||t.memoizedState.isDehydrated&&(r.flags&256)===0||(r.flags|=1024,Nn!==null&&(_h(Nn),Nn=null))),lh(t,r),Ot(r),null;case 5:zc(r);var d=Mi(Zo.current);if(o=r.type,t!==null&&r.stateNode!=null)Fp(t,r,o,c,d),t.ref!==r.ref&&(r.flags|=512,r.flags|=2097152);else{if(!c){if(r.stateNode===null)throw Error(n(166));return Ot(r),null}if(t=Mi(Kn.current),Cl(r)){c=r.stateNode,o=r.type;var p=r.memoizedProps;switch(c[Gn]=r,c[qo]=p,t=(r.mode&1)!==0,o){case"dialog":$e("cancel",c),$e("close",c);break;case"iframe":case"object":case"embed":$e("load",c);break;case"video":case"audio":for(d=0;d<Wo.length;d++)$e(Wo[d],c);break;case"source":$e("error",c);break;case"img":case"image":case"link":$e("error",c),$e("load",c);break;case"details":$e("toggle",c);break;case"input":as(c,p),$e("invalid",c);break;case"select":c._wrapperState={wasMultiple:!!p.multiple},$e("invalid",c);break;case"textarea":us(c,p),$e("invalid",c)}So(o,p),d=null;for(var y in p)if(p.hasOwnProperty(y)){var I=p[y];y==="children"?typeof I=="string"?c.textContent!==I&&(p.suppressHydrationWarning!==!0&&_l(c.textContent,I,t),d=["children",I]):typeof I=="number"&&c.textContent!==""+I&&(p.suppressHydrationWarning!==!0&&_l(c.textContent,I,t),d=["children",""+I]):a.hasOwnProperty(y)&&I!=null&&y==="onScroll"&&$e("scroll",c)}switch(o){case"input":rr(c),Wa(c,p,!0);break;case"textarea":rr(c),_o(c);break;case"select":case"option":break;default:typeof p.onClick=="function"&&(c.onclick=El)}c=d,r.updateQueue=c,c!==null&&(r.flags|=4)}else{y=d.nodeType===9?d:d.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=ot(o)),t==="http://www.w3.org/1999/xhtml"?o==="script"?(t=y.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof c.is=="string"?t=y.createElement(o,{is:c.is}):(t=y.createElement(o),o==="select"&&(y=t,c.multiple?y.multiple=!0:c.size&&(y.size=c.size))):t=y.createElementNS(t,o),t[Gn]=r,t[qo]=c,bp(t,r,!1,!1),r.stateNode=t;e:{switch(y=Ao(o,c),o){case"dialog":$e("cancel",t),$e("close",t),d=c;break;case"iframe":case"object":case"embed":$e("load",t),d=c;break;case"video":case"audio":for(d=0;d<Wo.length;d++)$e(Wo[d],t);d=c;break;case"source":$e("error",t),d=c;break;case"img":case"image":case"link":$e("error",t),$e("load",t),d=c;break;case"details":$e("toggle",t),d=c;break;case"input":as(t,c),d=mi(t,c),$e("invalid",t);break;case"option":d=c;break;case"select":t._wrapperState={wasMultiple:!!c.multiple},d=te({},c,{value:void 0}),$e("invalid",t);break;case"textarea":us(t,c),d=yo(t,c),$e("invalid",t);break;default:d=c}So(o,d),I=d;for(p in I)if(I.hasOwnProperty(p)){var C=I[p];p==="style"?To(t,C):p==="dangerouslySetInnerHTML"?(C=C?C.__html:void 0,C!=null&&Eo(t,C)):p==="children"?typeof C=="string"?(o!=="textarea"||C!=="")&&Pr(t,C):typeof C=="number"&&Pr(t,""+C):p!=="suppressContentEditableWarning"&&p!=="suppressHydrationWarning"&&p!=="autoFocus"&&(a.hasOwnProperty(p)?C!=null&&p==="onScroll"&&$e("scroll",t):C!=null&&le(t,p,C,y))}switch(o){case"input":rr(t),Wa(t,c,!1);break;case"textarea":rr(t),_o(t);break;case"option":c.value!=null&&t.setAttribute("value",""+Le(c.value));break;case"select":t.multiple=!!c.multiple,p=c.value,p!=null?sr(t,!!c.multiple,p,!1):c.defaultValue!=null&&sr(t,!!c.multiple,c.defaultValue,!0);break;default:typeof d.onClick=="function"&&(t.onclick=El)}switch(o){case"button":case"input":case"select":case"textarea":c=!!c.autoFocus;break e;case"img":c=!0;break e;default:c=!1}}c&&(r.flags|=4)}r.ref!==null&&(r.flags|=512,r.flags|=2097152)}return Ot(r),null;case 6:if(t&&r.stateNode!=null)jp(t,r,t.memoizedProps,c);else{if(typeof c!="string"&&r.stateNode===null)throw Error(n(166));if(o=Mi(Zo.current),Mi(Kn.current),Cl(r)){if(c=r.stateNode,o=r.memoizedProps,c[Gn]=r,(p=c.nodeValue!==o)&&(t=nn,t!==null))switch(t.tag){case 3:_l(c.nodeValue,o,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&_l(c.nodeValue,o,(t.mode&1)!==0)}p&&(r.flags|=4)}else c=(o.nodeType===9?o:o.ownerDocument).createTextNode(c),c[Gn]=r,r.stateNode=c}return Ot(r),null;case 13:if(He(qe),c=r.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(Ge&&rn!==null&&(r.mode&1)!==0&&(r.flags&128)===0)$f(),Bs(),r.flags|=98560,p=!1;else if(p=Cl(r),c!==null&&c.dehydrated!==null){if(t===null){if(!p)throw Error(n(318));if(p=r.memoizedState,p=p!==null?p.dehydrated:null,!p)throw Error(n(317));p[Gn]=r}else Bs(),(r.flags&128)===0&&(r.memoizedState=null),r.flags|=4;Ot(r),p=!1}else Nn!==null&&(_h(Nn),Nn=null),p=!0;if(!p)return r.flags&65536?r:null}return(r.flags&128)!==0?(r.lanes=o,r):(c=c!==null,c!==(t!==null&&t.memoizedState!==null)&&c&&(r.child.flags|=8192,(r.mode&1)!==0&&(t===null||(qe.current&1)!==0?ct===0&&(ct=3):Th())),r.updateQueue!==null&&(r.flags|=4),Ot(r),null);case 4:return Gs(),lh(t,r),t===null&&Go(r.stateNode.containerInfo),Ot(r),null;case 10:return Mc(r.type._context),Ot(r),null;case 17:return Wt(r.type)&&Tl(),Ot(r),null;case 19:if(He(qe),p=r.memoizedState,p===null)return Ot(r),null;if(c=(r.flags&128)!==0,y=p.rendering,y===null)if(c)ia(p,!1);else{if(ct!==0||t!==null&&(t.flags&128)!==0)for(t=r.child;t!==null;){if(y=xl(t),y!==null){for(r.flags|=128,ia(p,!1),c=y.updateQueue,c!==null&&(r.updateQueue=c,r.flags|=4),r.subtreeFlags=0,c=o,o=r.child;o!==null;)p=o,t=c,p.flags&=14680066,y=p.alternate,y===null?(p.childLanes=0,p.lanes=t,p.child=null,p.subtreeFlags=0,p.memoizedProps=null,p.memoizedState=null,p.updateQueue=null,p.dependencies=null,p.stateNode=null):(p.childLanes=y.childLanes,p.lanes=y.lanes,p.child=y.child,p.subtreeFlags=0,p.deletions=null,p.memoizedProps=y.memoizedProps,p.memoizedState=y.memoizedState,p.updateQueue=y.updateQueue,p.type=y.type,t=y.dependencies,p.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),o=o.sibling;return ze(qe,qe.current&1|2),r.child}t=t.sibling}p.tail!==null&&je()>Xs&&(r.flags|=128,c=!0,ia(p,!1),r.lanes=4194304)}else{if(!c)if(t=xl(y),t!==null){if(r.flags|=128,c=!0,o=t.updateQueue,o!==null&&(r.updateQueue=o,r.flags|=4),ia(p,!0),p.tail===null&&p.tailMode==="hidden"&&!y.alternate&&!Ge)return Ot(r),null}else 2*je()-p.renderingStartTime>Xs&&o!==1073741824&&(r.flags|=128,c=!0,ia(p,!1),r.lanes=4194304);p.isBackwards?(y.sibling=r.child,r.child=y):(o=p.last,o!==null?o.sibling=y:r.child=y,p.last=y)}return p.tail!==null?(r=p.tail,p.rendering=r,p.tail=r.sibling,p.renderingStartTime=je(),r.sibling=null,o=qe.current,ze(qe,c?o&1|2:o&1),r):(Ot(r),null);case 22:case 23:return wh(),c=r.memoizedState!==null,t!==null&&t.memoizedState!==null!==c&&(r.flags|=8192),c&&(r.mode&1)!==0?(sn&1073741824)!==0&&(Ot(r),r.subtreeFlags&6&&(r.flags|=8192)):Ot(r),null;case 24:return null;case 25:return null}throw Error(n(156,r.tag))}function q_(t,r){switch(Nc(r),r.tag){case 1:return Wt(r.type)&&Tl(),t=r.flags,t&65536?(r.flags=t&-65537|128,r):null;case 3:return Gs(),He(Ht),He(kt),$c(),t=r.flags,(t&65536)!==0&&(t&128)===0?(r.flags=t&-65537|128,r):null;case 5:return zc(r),null;case 13:if(He(qe),t=r.memoizedState,t!==null&&t.dehydrated!==null){if(r.alternate===null)throw Error(n(340));Bs()}return t=r.flags,t&65536?(r.flags=t&-65537|128,r):null;case 19:return He(qe),null;case 4:return Gs(),null;case 10:return Mc(r.type._context),null;case 22:case 23:return wh(),null;case 24:return null;default:return null}}var Bl=!1,Dt=!1,Q_=typeof WeakSet=="function"?WeakSet:Set,re=null;function qs(t,r){var o=t.ref;if(o!==null)if(typeof o=="function")try{o(null)}catch(c){Xe(t,r,c)}else o.current=null}function uh(t,r,o){try{o()}catch(c){Xe(t,r,c)}}var zp=!1;function X_(t,r){if(wc=Mr,t=_f(),fc(t)){if("selectionStart"in t)var o={start:t.selectionStart,end:t.selectionEnd};else e:{o=(o=t.ownerDocument)&&o.defaultView||window;var c=o.getSelection&&o.getSelection();if(c&&c.rangeCount!==0){o=c.anchorNode;var d=c.anchorOffset,p=c.focusNode;c=c.focusOffset;try{o.nodeType,p.nodeType}catch{o=null;break e}var y=0,I=-1,C=-1,b=0,G=0,K=t,H=null;t:for(;;){for(var ee;K!==o||d!==0&&K.nodeType!==3||(I=y+d),K!==p||c!==0&&K.nodeType!==3||(C=y+c),K.nodeType===3&&(y+=K.nodeValue.length),(ee=K.firstChild)!==null;)H=K,K=ee;for(;;){if(K===t)break t;if(H===o&&++b===d&&(I=y),H===p&&++G===c&&(C=y),(ee=K.nextSibling)!==null)break;K=H,H=K.parentNode}K=ee}o=I===-1||C===-1?null:{start:I,end:C}}else o=null}o=o||{start:0,end:0}}else o=null;for(Tc={focusedElem:t,selectionRange:o},Mr=!1,re=r;re!==null;)if(r=re,t=r.child,(r.subtreeFlags&1028)!==0&&t!==null)t.return=r,re=t;else for(;re!==null;){r=re;try{var ie=r.alternate;if((r.flags&1024)!==0)switch(r.tag){case 0:case 11:case 15:break;case 1:if(ie!==null){var se=ie.memoizedProps,et=ie.memoizedState,M=r.stateNode,k=M.getSnapshotBeforeUpdate(r.elementType===r.type?se:On(r.type,se),et);M.__reactInternalSnapshotBeforeUpdate=k}break;case 3:var U=r.stateNode.containerInfo;U.nodeType===1?U.textContent="":U.nodeType===9&&U.documentElement&&U.removeChild(U.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(n(163))}}catch(X){Xe(r,r.return,X)}if(t=r.sibling,t!==null){t.return=r.return,re=t;break}re=r.return}return ie=zp,zp=!1,ie}function sa(t,r,o){var c=r.updateQueue;if(c=c!==null?c.lastEffect:null,c!==null){var d=c=c.next;do{if((d.tag&t)===t){var p=d.destroy;d.destroy=void 0,p!==void 0&&uh(r,o,p)}d=d.next}while(d!==c)}}function $l(t,r){if(r=r.updateQueue,r=r!==null?r.lastEffect:null,r!==null){var o=r=r.next;do{if((o.tag&t)===t){var c=o.create;o.destroy=c()}o=o.next}while(o!==r)}}function ch(t){var r=t.ref;if(r!==null){var o=t.stateNode;switch(t.tag){case 5:t=o;break;default:t=o}typeof r=="function"?r(t):r.current=t}}function Bp(t){var r=t.alternate;r!==null&&(t.alternate=null,Bp(r)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(r=t.stateNode,r!==null&&(delete r[Gn],delete r[qo],delete r[Rc],delete r[D_],delete r[x_])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function $p(t){return t.tag===5||t.tag===3||t.tag===4}function Hp(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||$p(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function hh(t,r,o){var c=t.tag;if(c===5||c===6)t=t.stateNode,r?o.nodeType===8?o.parentNode.insertBefore(t,r):o.insertBefore(t,r):(o.nodeType===8?(r=o.parentNode,r.insertBefore(t,o)):(r=o,r.appendChild(t)),o=o._reactRootContainer,o!=null||r.onclick!==null||(r.onclick=El));else if(c!==4&&(t=t.child,t!==null))for(hh(t,r,o),t=t.sibling;t!==null;)hh(t,r,o),t=t.sibling}function dh(t,r,o){var c=t.tag;if(c===5||c===6)t=t.stateNode,r?o.insertBefore(t,r):o.appendChild(t);else if(c!==4&&(t=t.child,t!==null))for(dh(t,r,o),t=t.sibling;t!==null;)dh(t,r,o),t=t.sibling}var wt=null,Dn=!1;function Wr(t,r,o){for(o=o.child;o!==null;)Wp(t,r,o),o=o.sibling}function Wp(t,r,o){if(Jt&&typeof Jt.onCommitFiberUnmount=="function")try{Jt.onCommitFiberUnmount(Si,o)}catch{}switch(o.tag){case 5:Dt||qs(o,r);case 6:var c=wt,d=Dn;wt=null,Wr(t,r,o),wt=c,Dn=d,wt!==null&&(Dn?(t=wt,o=o.stateNode,t.nodeType===8?t.parentNode.removeChild(o):t.removeChild(o)):wt.removeChild(o.stateNode));break;case 18:wt!==null&&(Dn?(t=wt,o=o.stateNode,t.nodeType===8?Ac(t.parentNode,o):t.nodeType===1&&Ac(t,o),Cn(t)):Ac(wt,o.stateNode));break;case 4:c=wt,d=Dn,wt=o.stateNode.containerInfo,Dn=!0,Wr(t,r,o),wt=c,Dn=d;break;case 0:case 11:case 14:case 15:if(!Dt&&(c=o.updateQueue,c!==null&&(c=c.lastEffect,c!==null))){d=c=c.next;do{var p=d,y=p.destroy;p=p.tag,y!==void 0&&((p&2)!==0||(p&4)!==0)&&uh(o,r,y),d=d.next}while(d!==c)}Wr(t,r,o);break;case 1:if(!Dt&&(qs(o,r),c=o.stateNode,typeof c.componentWillUnmount=="function"))try{c.props=o.memoizedProps,c.state=o.memoizedState,c.componentWillUnmount()}catch(I){Xe(o,r,I)}Wr(t,r,o);break;case 21:Wr(t,r,o);break;case 22:o.mode&1?(Dt=(c=Dt)||o.memoizedState!==null,Wr(t,r,o),Dt=c):Wr(t,r,o);break;default:Wr(t,r,o)}}function Gp(t){var r=t.updateQueue;if(r!==null){t.updateQueue=null;var o=t.stateNode;o===null&&(o=t.stateNode=new Q_),r.forEach(function(c){var d=sE.bind(null,t,c);o.has(c)||(o.add(c),c.then(d,d))})}}function xn(t,r){var o=r.deletions;if(o!==null)for(var c=0;c<o.length;c++){var d=o[c];try{var p=t,y=r,I=y;e:for(;I!==null;){switch(I.tag){case 5:wt=I.stateNode,Dn=!1;break e;case 3:wt=I.stateNode.containerInfo,Dn=!0;break e;case 4:wt=I.stateNode.containerInfo,Dn=!0;break e}I=I.return}if(wt===null)throw Error(n(160));Wp(p,y,d),wt=null,Dn=!1;var C=d.alternate;C!==null&&(C.return=null),d.return=null}catch(b){Xe(d,r,b)}}if(r.subtreeFlags&12854)for(r=r.child;r!==null;)Kp(r,t),r=r.sibling}function Kp(t,r){var o=t.alternate,c=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(xn(r,t),Qn(t),c&4){try{sa(3,t,t.return),$l(3,t)}catch(se){Xe(t,t.return,se)}try{sa(5,t,t.return)}catch(se){Xe(t,t.return,se)}}break;case 1:xn(r,t),Qn(t),c&512&&o!==null&&qs(o,o.return);break;case 5:if(xn(r,t),Qn(t),c&512&&o!==null&&qs(o,o.return),t.flags&32){var d=t.stateNode;try{Pr(d,"")}catch(se){Xe(t,t.return,se)}}if(c&4&&(d=t.stateNode,d!=null)){var p=t.memoizedProps,y=o!==null?o.memoizedProps:p,I=t.type,C=t.updateQueue;if(t.updateQueue=null,C!==null)try{I==="input"&&p.type==="radio"&&p.name!=null&&go(d,p),Ao(I,y);var b=Ao(I,p);for(y=0;y<C.length;y+=2){var G=C[y],K=C[y+1];G==="style"?To(d,K):G==="dangerouslySetInnerHTML"?Eo(d,K):G==="children"?Pr(d,K):le(d,G,K,b)}switch(I){case"input":vo(d,p);break;case"textarea":cs(d,p);break;case"select":var H=d._wrapperState.wasMultiple;d._wrapperState.wasMultiple=!!p.multiple;var ee=p.value;ee!=null?sr(d,!!p.multiple,ee,!1):H!==!!p.multiple&&(p.defaultValue!=null?sr(d,!!p.multiple,p.defaultValue,!0):sr(d,!!p.multiple,p.multiple?[]:"",!1))}d[qo]=p}catch(se){Xe(t,t.return,se)}}break;case 6:if(xn(r,t),Qn(t),c&4){if(t.stateNode===null)throw Error(n(162));d=t.stateNode,p=t.memoizedProps;try{d.nodeValue=p}catch(se){Xe(t,t.return,se)}}break;case 3:if(xn(r,t),Qn(t),c&4&&o!==null&&o.memoizedState.isDehydrated)try{Cn(r.containerInfo)}catch(se){Xe(t,t.return,se)}break;case 4:xn(r,t),Qn(t);break;case 13:xn(r,t),Qn(t),d=t.child,d.flags&8192&&(p=d.memoizedState!==null,d.stateNode.isHidden=p,!p||d.alternate!==null&&d.alternate.memoizedState!==null||(mh=je())),c&4&&Gp(t);break;case 22:if(G=o!==null&&o.memoizedState!==null,t.mode&1?(Dt=(b=Dt)||G,xn(r,t),Dt=b):xn(r,t),Qn(t),c&8192){if(b=t.memoizedState!==null,(t.stateNode.isHidden=b)&&!G&&(t.mode&1)!==0)for(re=t,G=t.child;G!==null;){for(K=re=G;re!==null;){switch(H=re,ee=H.child,H.tag){case 0:case 11:case 14:case 15:sa(4,H,H.return);break;case 1:qs(H,H.return);var ie=H.stateNode;if(typeof ie.componentWillUnmount=="function"){c=H,o=H.return;try{r=c,ie.props=r.memoizedProps,ie.state=r.memoizedState,ie.componentWillUnmount()}catch(se){Xe(c,o,se)}}break;case 5:qs(H,H.return);break;case 22:if(H.memoizedState!==null){Xp(K);continue}}ee!==null?(ee.return=H,re=ee):Xp(K)}G=G.sibling}e:for(G=null,K=t;;){if(K.tag===5){if(G===null){G=K;try{d=K.stateNode,b?(p=d.style,typeof p.setProperty=="function"?p.setProperty("display","none","important"):p.display="none"):(I=K.stateNode,C=K.memoizedProps.style,y=C!=null&&C.hasOwnProperty("display")?C.display:null,I.style.display=wo("display",y))}catch(se){Xe(t,t.return,se)}}}else if(K.tag===6){if(G===null)try{K.stateNode.nodeValue=b?"":K.memoizedProps}catch(se){Xe(t,t.return,se)}}else if((K.tag!==22&&K.tag!==23||K.memoizedState===null||K===t)&&K.child!==null){K.child.return=K,K=K.child;continue}if(K===t)break e;for(;K.sibling===null;){if(K.return===null||K.return===t)break e;G===K&&(G=null),K=K.return}G===K&&(G=null),K.sibling.return=K.return,K=K.sibling}}break;case 19:xn(r,t),Qn(t),c&4&&Gp(t);break;case 21:break;default:xn(r,t),Qn(t)}}function Qn(t){var r=t.flags;if(r&2){try{e:{for(var o=t.return;o!==null;){if($p(o)){var c=o;break e}o=o.return}throw Error(n(160))}switch(c.tag){case 5:var d=c.stateNode;c.flags&32&&(Pr(d,""),c.flags&=-33);var p=Hp(t);dh(t,p,d);break;case 3:case 4:var y=c.stateNode.containerInfo,I=Hp(t);hh(t,I,y);break;default:throw Error(n(161))}}catch(C){Xe(t,t.return,C)}t.flags&=-3}r&4096&&(t.flags&=-4097)}function Y_(t,r,o){re=t,qp(t)}function qp(t,r,o){for(var c=(t.mode&1)!==0;re!==null;){var d=re,p=d.child;if(d.tag===22&&c){var y=d.memoizedState!==null||Bl;if(!y){var I=d.alternate,C=I!==null&&I.memoizedState!==null||Dt;I=Bl;var b=Dt;if(Bl=y,(Dt=C)&&!b)for(re=d;re!==null;)y=re,C=y.child,y.tag===22&&y.memoizedState!==null?Yp(d):C!==null?(C.return=y,re=C):Yp(d);for(;p!==null;)re=p,qp(p),p=p.sibling;re=d,Bl=I,Dt=b}Qp(t)}else(d.subtreeFlags&8772)!==0&&p!==null?(p.return=d,re=p):Qp(t)}}function Qp(t){for(;re!==null;){var r=re;if((r.flags&8772)!==0){var o=r.alternate;try{if((r.flags&8772)!==0)switch(r.tag){case 0:case 11:case 15:Dt||$l(5,r);break;case 1:var c=r.stateNode;if(r.flags&4&&!Dt)if(o===null)c.componentDidMount();else{var d=r.elementType===r.type?o.memoizedProps:On(r.type,o.memoizedProps);c.componentDidUpdate(d,o.memoizedState,c.__reactInternalSnapshotBeforeUpdate)}var p=r.updateQueue;p!==null&&Xf(r,p,c);break;case 3:var y=r.updateQueue;if(y!==null){if(o=null,r.child!==null)switch(r.child.tag){case 5:o=r.child.stateNode;break;case 1:o=r.child.stateNode}Xf(r,y,o)}break;case 5:var I=r.stateNode;if(o===null&&r.flags&4){o=I;var C=r.memoizedProps;switch(r.type){case"button":case"input":case"select":case"textarea":C.autoFocus&&o.focus();break;case"img":C.src&&(o.src=C.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(r.memoizedState===null){var b=r.alternate;if(b!==null){var G=b.memoizedState;if(G!==null){var K=G.dehydrated;K!==null&&Cn(K)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(n(163))}Dt||r.flags&512&&ch(r)}catch(H){Xe(r,r.return,H)}}if(r===t){re=null;break}if(o=r.sibling,o!==null){o.return=r.return,re=o;break}re=r.return}}function Xp(t){for(;re!==null;){var r=re;if(r===t){re=null;break}var o=r.sibling;if(o!==null){o.return=r.return,re=o;break}re=r.return}}function Yp(t){for(;re!==null;){var r=re;try{switch(r.tag){case 0:case 11:case 15:var o=r.return;try{$l(4,r)}catch(C){Xe(r,o,C)}break;case 1:var c=r.stateNode;if(typeof c.componentDidMount=="function"){var d=r.return;try{c.componentDidMount()}catch(C){Xe(r,d,C)}}var p=r.return;try{ch(r)}catch(C){Xe(r,p,C)}break;case 5:var y=r.return;try{ch(r)}catch(C){Xe(r,y,C)}}}catch(C){Xe(r,r.return,C)}if(r===t){re=null;break}var I=r.sibling;if(I!==null){I.return=r.return,re=I;break}re=r.return}}var J_=Math.ceil,Hl=ve.ReactCurrentDispatcher,fh=ve.ReactCurrentOwner,gn=ve.ReactCurrentBatchConfig,Ne=0,pt=null,nt=null,Tt=0,sn=0,Qs=jr(0),ct=0,oa=null,bi=0,Wl=0,ph=0,aa=null,Kt=null,mh=0,Xs=1/0,Er=null,Gl=!1,gh=null,Gr=null,Kl=!1,Kr=null,ql=0,la=0,vh=null,Ql=-1,Xl=0;function zt(){return(Ne&6)!==0?je():Ql!==-1?Ql:Ql=je()}function qr(t){return(t.mode&1)===0?1:(Ne&2)!==0&&Tt!==0?Tt&-Tt:V_.transition!==null?(Xl===0&&(Xl=Ri()),Xl):(t=Ae,t!==0||(t=window.event,t=t===void 0?16:Mo(t.type)),t)}function Ln(t,r,o,c){if(50<la)throw la=0,vh=null,Error(n(185));Dr(t,o,c),((Ne&2)===0||t!==pt)&&(t===pt&&((Ne&2)===0&&(Wl|=o),ct===4&&Qr(t,Tt)),qt(t,c),o===1&&Ne===0&&(r.mode&1)===0&&(Xs=je()+500,Sl&&Br()))}function qt(t,r){var o=t.callbackNode;lr(t,r);var c=Ai(t,t===pt?Tt:0);if(c===0)o!==null&&Oo(o),t.callbackNode=null,t.callbackPriority=0;else if(r=c&-c,t.callbackPriority!==r){if(o!=null&&Oo(o),r===1)t.tag===0?L_(Zp.bind(null,t)):bf(Zp.bind(null,t)),N_(function(){(Ne&6)===0&&Br()}),o=null;else{switch(Lr(c)){case 1:o=Ii;break;case 4:o=kr;break;case 16:o=un;break;case 536870912:o=Xa;break;default:o=un}o=am(o,Jp.bind(null,t))}t.callbackPriority=r,t.callbackNode=o}}function Jp(t,r){if(Ql=-1,Xl=0,(Ne&6)!==0)throw Error(n(327));var o=t.callbackNode;if(Ys()&&t.callbackNode!==o)return null;var c=Ai(t,t===pt?Tt:0);if(c===0)return null;if((c&30)!==0||(c&t.expiredLanes)!==0||r)r=Yl(t,c);else{r=c;var d=Ne;Ne|=2;var p=tm();(pt!==t||Tt!==r)&&(Er=null,Xs=je()+500,ji(t,r));do try{tE();break}catch(I){em(t,I)}while(!0);Vc(),Hl.current=p,Ne=d,nt!==null?r=0:(pt=null,Tt=0,r=ct)}if(r!==0){if(r===2&&(d=Zt(t),d!==0&&(c=d,r=yh(t,d))),r===1)throw o=oa,ji(t,0),Qr(t,c),qt(t,je()),o;if(r===6)Qr(t,c);else{if(d=t.current.alternate,(c&30)===0&&!Z_(d)&&(r=Yl(t,c),r===2&&(p=Zt(t),p!==0&&(c=p,r=yh(t,p))),r===1))throw o=oa,ji(t,0),Qr(t,c),qt(t,je()),o;switch(t.finishedWork=d,t.finishedLanes=c,r){case 0:case 1:throw Error(n(345));case 2:zi(t,Kt,Er);break;case 3:if(Qr(t,c),(c&130023424)===c&&(r=mh+500-je(),10<r)){if(Ai(t,0)!==0)break;if(d=t.suspendedLanes,(d&c)!==c){zt(),t.pingedLanes|=t.suspendedLanes&d;break}t.timeoutHandle=Sc(zi.bind(null,t,Kt,Er),r);break}zi(t,Kt,Er);break;case 4:if(Qr(t,c),(c&4194240)===c)break;for(r=t.eventTimes,d=-1;0<c;){var y=31-bt(c);p=1<<y,y=r[y],y>d&&(d=y),c&=~p}if(c=d,c=je()-c,c=(120>c?120:480>c?480:1080>c?1080:1920>c?1920:3e3>c?3e3:4320>c?4320:1960*J_(c/1960))-c,10<c){t.timeoutHandle=Sc(zi.bind(null,t,Kt,Er),c);break}zi(t,Kt,Er);break;case 5:zi(t,Kt,Er);break;default:throw Error(n(329))}}}return qt(t,je()),t.callbackNode===o?Jp.bind(null,t):null}function yh(t,r){var o=aa;return t.current.memoizedState.isDehydrated&&(ji(t,r).flags|=256),t=Yl(t,r),t!==2&&(r=Kt,Kt=o,r!==null&&_h(r)),t}function _h(t){Kt===null?Kt=t:Kt.push.apply(Kt,t)}function Z_(t){for(var r=t;;){if(r.flags&16384){var o=r.updateQueue;if(o!==null&&(o=o.stores,o!==null))for(var c=0;c<o.length;c++){var d=o[c],p=d.getSnapshot;d=d.value;try{if(!kn(p(),d))return!1}catch{return!1}}}if(o=r.child,r.subtreeFlags&16384&&o!==null)o.return=r,r=o;else{if(r===t)break;for(;r.sibling===null;){if(r.return===null||r.return===t)return!0;r=r.return}r.sibling.return=r.return,r=r.sibling}}return!0}function Qr(t,r){for(r&=~ph,r&=~Wl,t.suspendedLanes|=r,t.pingedLanes&=~r,t=t.expirationTimes;0<r;){var o=31-bt(r),c=1<<o;t[o]=-1,r&=~c}}function Zp(t){if((Ne&6)!==0)throw Error(n(327));Ys();var r=Ai(t,0);if((r&1)===0)return qt(t,je()),null;var o=Yl(t,r);if(t.tag!==0&&o===2){var c=Zt(t);c!==0&&(r=c,o=yh(t,c))}if(o===1)throw o=oa,ji(t,0),Qr(t,r),qt(t,je()),o;if(o===6)throw Error(n(345));return t.finishedWork=t.current.alternate,t.finishedLanes=r,zi(t,Kt,Er),qt(t,je()),null}function Eh(t,r){var o=Ne;Ne|=1;try{return t(r)}finally{Ne=o,Ne===0&&(Xs=je()+500,Sl&&Br())}}function Fi(t){Kr!==null&&Kr.tag===0&&(Ne&6)===0&&Ys();var r=Ne;Ne|=1;var o=gn.transition,c=Ae;try{if(gn.transition=null,Ae=1,t)return t()}finally{Ae=c,gn.transition=o,Ne=r,(Ne&6)===0&&Br()}}function wh(){sn=Qs.current,He(Qs)}function ji(t,r){t.finishedWork=null,t.finishedLanes=0;var o=t.timeoutHandle;if(o!==-1&&(t.timeoutHandle=-1,k_(o)),nt!==null)for(o=nt.return;o!==null;){var c=o;switch(Nc(c),c.tag){case 1:c=c.type.childContextTypes,c!=null&&Tl();break;case 3:Gs(),He(Ht),He(kt),$c();break;case 5:zc(c);break;case 4:Gs();break;case 13:He(qe);break;case 19:He(qe);break;case 10:Mc(c.type._context);break;case 22:case 23:wh()}o=o.return}if(pt=t,nt=t=Xr(t.current,null),Tt=sn=r,ct=0,oa=null,ph=Wl=bi=0,Kt=aa=null,Vi!==null){for(r=0;r<Vi.length;r++)if(o=Vi[r],c=o.interleaved,c!==null){o.interleaved=null;var d=c.next,p=o.pending;if(p!==null){var y=p.next;p.next=d,c.next=y}o.pending=c}Vi=null}return t}function em(t,r){do{var o=nt;try{if(Vc(),Ll.current=bl,Vl){for(var c=Qe.memoizedState;c!==null;){var d=c.queue;d!==null&&(d.pending=null),c=c.next}Vl=!1}if(Ui=0,ft=ut=Qe=null,ea=!1,ta=0,fh.current=null,o===null||o.return===null){ct=1,oa=r,nt=null;break}e:{var p=t,y=o.return,I=o,C=r;if(r=Tt,I.flags|=32768,C!==null&&typeof C=="object"&&typeof C.then=="function"){var b=C,G=I,K=G.tag;if((G.mode&1)===0&&(K===0||K===11||K===15)){var H=G.alternate;H?(G.updateQueue=H.updateQueue,G.memoizedState=H.memoizedState,G.lanes=H.lanes):(G.updateQueue=null,G.memoizedState=null)}var ee=Ap(y);if(ee!==null){ee.flags&=-257,Rp(ee,y,I,p,r),ee.mode&1&&Sp(p,b,r),r=ee,C=b;var ie=r.updateQueue;if(ie===null){var se=new Set;se.add(C),r.updateQueue=se}else ie.add(C);break e}else{if((r&1)===0){Sp(p,b,r),Th();break e}C=Error(n(426))}}else if(Ge&&I.mode&1){var et=Ap(y);if(et!==null){(et.flags&65536)===0&&(et.flags|=256),Rp(et,y,I,p,r),xc(Ks(C,I));break e}}p=C=Ks(C,I),ct!==4&&(ct=2),aa===null?aa=[p]:aa.push(p),p=y;do{switch(p.tag){case 3:p.flags|=65536,r&=-r,p.lanes|=r;var M=Tp(p,C,r);Qf(p,M);break e;case 1:I=C;var k=p.type,U=p.stateNode;if((p.flags&128)===0&&(typeof k.getDerivedStateFromError=="function"||U!==null&&typeof U.componentDidCatch=="function"&&(Gr===null||!Gr.has(U)))){p.flags|=65536,r&=-r,p.lanes|=r;var X=Ip(p,I,r);Qf(p,X);break e}}p=p.return}while(p!==null)}rm(o)}catch(ae){r=ae,nt===o&&o!==null&&(nt=o=o.return);continue}break}while(!0)}function tm(){var t=Hl.current;return Hl.current=bl,t===null?bl:t}function Th(){(ct===0||ct===3||ct===2)&&(ct=4),pt===null||(bi&268435455)===0&&(Wl&268435455)===0||Qr(pt,Tt)}function Yl(t,r){var o=Ne;Ne|=2;var c=tm();(pt!==t||Tt!==r)&&(Er=null,ji(t,r));do try{eE();break}catch(d){em(t,d)}while(!0);if(Vc(),Ne=o,Hl.current=c,nt!==null)throw Error(n(261));return pt=null,Tt=0,ct}function eE(){for(;nt!==null;)nm(nt)}function tE(){for(;nt!==null&&!qa();)nm(nt)}function nm(t){var r=om(t.alternate,t,sn);t.memoizedProps=t.pendingProps,r===null?rm(t):nt=r,fh.current=null}function rm(t){var r=t;do{var o=r.alternate;if(t=r.return,(r.flags&32768)===0){if(o=K_(o,r,sn),o!==null){nt=o;return}}else{if(o=q_(o,r),o!==null){o.flags&=32767,nt=o;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{ct=6,nt=null;return}}if(r=r.sibling,r!==null){nt=r;return}nt=r=t}while(r!==null);ct===0&&(ct=5)}function zi(t,r,o){var c=Ae,d=gn.transition;try{gn.transition=null,Ae=1,nE(t,r,o,c)}finally{gn.transition=d,Ae=c}return null}function nE(t,r,o,c){do Ys();while(Kr!==null);if((Ne&6)!==0)throw Error(n(327));o=t.finishedWork;var d=t.finishedLanes;if(o===null)return null;if(t.finishedWork=null,t.finishedLanes=0,o===t.current)throw Error(n(177));t.callbackNode=null,t.callbackPriority=0;var p=o.lanes|o.childLanes;if(be(t,p),t===pt&&(nt=pt=null,Tt=0),(o.subtreeFlags&2064)===0&&(o.flags&2064)===0||Kl||(Kl=!0,am(un,function(){return Ys(),null})),p=(o.flags&15990)!==0,(o.subtreeFlags&15990)!==0||p){p=gn.transition,gn.transition=null;var y=Ae;Ae=1;var I=Ne;Ne|=4,fh.current=null,X_(t,o),Kp(o,t),T_(Tc),Mr=!!wc,Tc=wc=null,t.current=o,Y_(o),sc(),Ne=I,Ae=y,gn.transition=p}else t.current=o;if(Kl&&(Kl=!1,Kr=t,ql=d),p=t.pendingLanes,p===0&&(Gr=null),Ya(o.stateNode),qt(t,je()),r!==null)for(c=t.onRecoverableError,o=0;o<r.length;o++)d=r[o],c(d.value,{componentStack:d.stack,digest:d.digest});if(Gl)throw Gl=!1,t=gh,gh=null,t;return(ql&1)!==0&&t.tag!==0&&Ys(),p=t.pendingLanes,(p&1)!==0?t===vh?la++:(la=0,vh=t):la=0,Br(),null}function Ys(){if(Kr!==null){var t=Lr(ql),r=gn.transition,o=Ae;try{if(gn.transition=null,Ae=16>t?16:t,Kr===null)var c=!1;else{if(t=Kr,Kr=null,ql=0,(Ne&6)!==0)throw Error(n(331));var d=Ne;for(Ne|=4,re=t.current;re!==null;){var p=re,y=p.child;if((re.flags&16)!==0){var I=p.deletions;if(I!==null){for(var C=0;C<I.length;C++){var b=I[C];for(re=b;re!==null;){var G=re;switch(G.tag){case 0:case 11:case 15:sa(8,G,p)}var K=G.child;if(K!==null)K.return=G,re=K;else for(;re!==null;){G=re;var H=G.sibling,ee=G.return;if(Bp(G),G===b){re=null;break}if(H!==null){H.return=ee,re=H;break}re=ee}}}var ie=p.alternate;if(ie!==null){var se=ie.child;if(se!==null){ie.child=null;do{var et=se.sibling;se.sibling=null,se=et}while(se!==null)}}re=p}}if((p.subtreeFlags&2064)!==0&&y!==null)y.return=p,re=y;else e:for(;re!==null;){if(p=re,(p.flags&2048)!==0)switch(p.tag){case 0:case 11:case 15:sa(9,p,p.return)}var M=p.sibling;if(M!==null){M.return=p.return,re=M;break e}re=p.return}}var k=t.current;for(re=k;re!==null;){y=re;var U=y.child;if((y.subtreeFlags&2064)!==0&&U!==null)U.return=y,re=U;else e:for(y=k;re!==null;){if(I=re,(I.flags&2048)!==0)try{switch(I.tag){case 0:case 11:case 15:$l(9,I)}}catch(ae){Xe(I,I.return,ae)}if(I===y){re=null;break e}var X=I.sibling;if(X!==null){X.return=I.return,re=X;break e}re=I.return}}if(Ne=d,Br(),Jt&&typeof Jt.onPostCommitFiberRoot=="function")try{Jt.onPostCommitFiberRoot(Si,t)}catch{}c=!0}return c}finally{Ae=o,gn.transition=r}}return!1}function im(t,r,o){r=Ks(o,r),r=Tp(t,r,1),t=Hr(t,r,1),r=zt(),t!==null&&(Dr(t,1,r),qt(t,r))}function Xe(t,r,o){if(t.tag===3)im(t,t,o);else for(;r!==null;){if(r.tag===3){im(r,t,o);break}else if(r.tag===1){var c=r.stateNode;if(typeof r.type.getDerivedStateFromError=="function"||typeof c.componentDidCatch=="function"&&(Gr===null||!Gr.has(c))){t=Ks(o,t),t=Ip(r,t,1),r=Hr(r,t,1),t=zt(),r!==null&&(Dr(r,1,t),qt(r,t));break}}r=r.return}}function rE(t,r,o){var c=t.pingCache;c!==null&&c.delete(r),r=zt(),t.pingedLanes|=t.suspendedLanes&o,pt===t&&(Tt&o)===o&&(ct===4||ct===3&&(Tt&130023424)===Tt&&500>je()-mh?ji(t,0):ph|=o),qt(t,r)}function sm(t,r){r===0&&((t.mode&1)===0?r=1:(r=Es,Es<<=1,(Es&130023424)===0&&(Es=4194304)));var o=zt();t=vr(t,r),t!==null&&(Dr(t,r,o),qt(t,o))}function iE(t){var r=t.memoizedState,o=0;r!==null&&(o=r.retryLane),sm(t,o)}function sE(t,r){var o=0;switch(t.tag){case 13:var c=t.stateNode,d=t.memoizedState;d!==null&&(o=d.retryLane);break;case 19:c=t.stateNode;break;default:throw Error(n(314))}c!==null&&c.delete(r),sm(t,o)}var om;om=function(t,r,o){if(t!==null)if(t.memoizedProps!==r.pendingProps||Ht.current)Gt=!0;else{if((t.lanes&o)===0&&(r.flags&128)===0)return Gt=!1,G_(t,r,o);Gt=(t.flags&131072)!==0}else Gt=!1,Ge&&(r.flags&1048576)!==0&&Ff(r,Rl,r.index);switch(r.lanes=0,r.tag){case 2:var c=r.type;zl(t,r),t=r.pendingProps;var d=Fs(r,kt.current);Ws(r,o),d=Gc(null,r,c,t,d,o);var p=Kc();return r.flags|=1,typeof d=="object"&&d!==null&&typeof d.render=="function"&&d.$$typeof===void 0?(r.tag=1,r.memoizedState=null,r.updateQueue=null,Wt(c)?(p=!0,Il(r)):p=!1,r.memoizedState=d.state!==null&&d.state!==void 0?d.state:null,Fc(r),d.updater=Fl,r.stateNode=d,d._reactInternals=r,Zc(r,c,t,o),r=rh(null,r,c,!0,p,o)):(r.tag=0,Ge&&p&&kc(r),jt(null,r,d,o),r=r.child),r;case 16:c=r.elementType;e:{switch(zl(t,r),t=r.pendingProps,d=c._init,c=d(c._payload),r.type=c,d=r.tag=aE(c),t=On(c,t),d){case 0:r=nh(null,r,c,t,o);break e;case 1:r=Dp(null,r,c,t,o);break e;case 11:r=Cp(null,r,c,t,o);break e;case 14:r=Pp(null,r,c,On(c.type,t),o);break e}throw Error(n(306,c,""))}return r;case 0:return c=r.type,d=r.pendingProps,d=r.elementType===c?d:On(c,d),nh(t,r,c,d,o);case 1:return c=r.type,d=r.pendingProps,d=r.elementType===c?d:On(c,d),Dp(t,r,c,d,o);case 3:e:{if(xp(r),t===null)throw Error(n(387));c=r.pendingProps,p=r.memoizedState,d=p.element,qf(t,r),Dl(r,c,null,o);var y=r.memoizedState;if(c=y.element,p.isDehydrated)if(p={element:c,isDehydrated:!1,cache:y.cache,pendingSuspenseBoundaries:y.pendingSuspenseBoundaries,transitions:y.transitions},r.updateQueue.baseState=p,r.memoizedState=p,r.flags&256){d=Ks(Error(n(423)),r),r=Lp(t,r,c,o,d);break e}else if(c!==d){d=Ks(Error(n(424)),r),r=Lp(t,r,c,o,d);break e}else for(rn=Fr(r.stateNode.containerInfo.firstChild),nn=r,Ge=!0,Nn=null,o=Gf(r,null,c,o),r.child=o;o;)o.flags=o.flags&-3|4096,o=o.sibling;else{if(Bs(),c===d){r=_r(t,r,o);break e}jt(t,r,c,o)}r=r.child}return r;case 5:return Yf(r),t===null&&Dc(r),c=r.type,d=r.pendingProps,p=t!==null?t.memoizedProps:null,y=d.children,Ic(c,d)?y=null:p!==null&&Ic(c,p)&&(r.flags|=32),Op(t,r),jt(t,r,y,o),r.child;case 6:return t===null&&Dc(r),null;case 13:return Vp(t,r,o);case 4:return jc(r,r.stateNode.containerInfo),c=r.pendingProps,t===null?r.child=$s(r,null,c,o):jt(t,r,c,o),r.child;case 11:return c=r.type,d=r.pendingProps,d=r.elementType===c?d:On(c,d),Cp(t,r,c,d,o);case 7:return jt(t,r,r.pendingProps,o),r.child;case 8:return jt(t,r,r.pendingProps.children,o),r.child;case 12:return jt(t,r,r.pendingProps.children,o),r.child;case 10:e:{if(c=r.type._context,d=r.pendingProps,p=r.memoizedProps,y=d.value,ze(kl,c._currentValue),c._currentValue=y,p!==null)if(kn(p.value,y)){if(p.children===d.children&&!Ht.current){r=_r(t,r,o);break e}}else for(p=r.child,p!==null&&(p.return=r);p!==null;){var I=p.dependencies;if(I!==null){y=p.child;for(var C=I.firstContext;C!==null;){if(C.context===c){if(p.tag===1){C=yr(-1,o&-o),C.tag=2;var b=p.updateQueue;if(b!==null){b=b.shared;var G=b.pending;G===null?C.next=C:(C.next=G.next,G.next=C),b.pending=C}}p.lanes|=o,C=p.alternate,C!==null&&(C.lanes|=o),Uc(p.return,o,r),I.lanes|=o;break}C=C.next}}else if(p.tag===10)y=p.type===r.type?null:p.child;else if(p.tag===18){if(y=p.return,y===null)throw Error(n(341));y.lanes|=o,I=y.alternate,I!==null&&(I.lanes|=o),Uc(y,o,r),y=p.sibling}else y=p.child;if(y!==null)y.return=p;else for(y=p;y!==null;){if(y===r){y=null;break}if(p=y.sibling,p!==null){p.return=y.return,y=p;break}y=y.return}p=y}jt(t,r,d.children,o),r=r.child}return r;case 9:return d=r.type,c=r.pendingProps.children,Ws(r,o),d=pn(d),c=c(d),r.flags|=1,jt(t,r,c,o),r.child;case 14:return c=r.type,d=On(c,r.pendingProps),d=On(c.type,d),Pp(t,r,c,d,o);case 15:return kp(t,r,r.type,r.pendingProps,o);case 17:return c=r.type,d=r.pendingProps,d=r.elementType===c?d:On(c,d),zl(t,r),r.tag=1,Wt(c)?(t=!0,Il(r)):t=!1,Ws(r,o),Ep(r,c,d),Zc(r,c,d,o),rh(null,r,c,!0,t,o);case 19:return Up(t,r,o);case 22:return Np(t,r,o)}throw Error(n(156,r.tag))};function am(t,r){return ys(t,r)}function oE(t,r,o,c){this.tag=t,this.key=o,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=r,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=c,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function vn(t,r,o,c){return new oE(t,r,o,c)}function Ih(t){return t=t.prototype,!(!t||!t.isReactComponent)}function aE(t){if(typeof t=="function")return Ih(t)?1:0;if(t!=null){if(t=t.$$typeof,t===L)return 11;if(t===Ct)return 14}return 2}function Xr(t,r){var o=t.alternate;return o===null?(o=vn(t.tag,r,t.key,t.mode),o.elementType=t.elementType,o.type=t.type,o.stateNode=t.stateNode,o.alternate=t,t.alternate=o):(o.pendingProps=r,o.type=t.type,o.flags=0,o.subtreeFlags=0,o.deletions=null),o.flags=t.flags&14680064,o.childLanes=t.childLanes,o.lanes=t.lanes,o.child=t.child,o.memoizedProps=t.memoizedProps,o.memoizedState=t.memoizedState,o.updateQueue=t.updateQueue,r=t.dependencies,o.dependencies=r===null?null:{lanes:r.lanes,firstContext:r.firstContext},o.sibling=t.sibling,o.index=t.index,o.ref=t.ref,o}function Jl(t,r,o,c,d,p){var y=2;if(c=t,typeof t=="function")Ih(t)&&(y=1);else if(typeof t=="string")y=5;else e:switch(t){case N:return Bi(o.children,d,p,r);case S:y=8,d|=8;break;case R:return t=vn(12,o,r,d|2),t.elementType=R,t.lanes=p,t;case A:return t=vn(13,o,r,d),t.elementType=A,t.lanes=p,t;case Je:return t=vn(19,o,r,d),t.elementType=Je,t.lanes=p,t;case Ue:return Zl(o,d,p,r);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case P:y=10;break e;case O:y=9;break e;case L:y=11;break e;case Ct:y=14;break e;case Pt:y=16,c=null;break e}throw Error(n(130,t==null?t:typeof t,""))}return r=vn(y,o,r,d),r.elementType=t,r.type=c,r.lanes=p,r}function Bi(t,r,o,c){return t=vn(7,t,c,r),t.lanes=o,t}function Zl(t,r,o,c){return t=vn(22,t,c,r),t.elementType=Ue,t.lanes=o,t.stateNode={isHidden:!1},t}function Sh(t,r,o){return t=vn(6,t,null,r),t.lanes=o,t}function Ah(t,r,o){return r=vn(4,t.children!==null?t.children:[],t.key,r),r.lanes=o,r.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},r}function lE(t,r,o,c,d){this.tag=r,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Or(0),this.expirationTimes=Or(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Or(0),this.identifierPrefix=c,this.onRecoverableError=d,this.mutableSourceEagerHydrationData=null}function Rh(t,r,o,c,d,p,y,I,C){return t=new lE(t,r,o,I,C),r===1?(r=1,p===!0&&(r|=8)):r=0,p=vn(3,null,null,r),t.current=p,p.stateNode=t,p.memoizedState={element:c,isDehydrated:o,cache:null,transitions:null,pendingSuspenseBoundaries:null},Fc(p),t}function uE(t,r,o){var c=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Re,key:c==null?null:""+c,children:t,containerInfo:r,implementation:o}}function lm(t){if(!t)return zr;t=t._reactInternals;e:{if(Tn(t)!==t||t.tag!==1)throw Error(n(170));var r=t;do{switch(r.tag){case 3:r=r.stateNode.context;break e;case 1:if(Wt(r.type)){r=r.stateNode.__reactInternalMemoizedMergedChildContext;break e}}r=r.return}while(r!==null);throw Error(n(171))}if(t.tag===1){var o=t.type;if(Wt(o))return Mf(t,o,r)}return r}function um(t,r,o,c,d,p,y,I,C){return t=Rh(o,c,!0,t,d,p,y,I,C),t.context=lm(null),o=t.current,c=zt(),d=qr(o),p=yr(c,d),p.callback=r??null,Hr(o,p,d),t.current.lanes=d,Dr(t,d,c),qt(t,c),t}function eu(t,r,o,c){var d=r.current,p=zt(),y=qr(d);return o=lm(o),r.context===null?r.context=o:r.pendingContext=o,r=yr(p,y),r.payload={element:t},c=c===void 0?null:c,c!==null&&(r.callback=c),t=Hr(d,r,y),t!==null&&(Ln(t,d,y,p),Ol(t,d,y)),y}function tu(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function cm(t,r){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var o=t.retryLane;t.retryLane=o!==0&&o<r?o:r}}function Ch(t,r){cm(t,r),(t=t.alternate)&&cm(t,r)}function cE(){return null}var hm=typeof reportError=="function"?reportError:function(t){console.error(t)};function Ph(t){this._internalRoot=t}nu.prototype.render=Ph.prototype.render=function(t){var r=this._internalRoot;if(r===null)throw Error(n(409));eu(t,r,null,null)},nu.prototype.unmount=Ph.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var r=t.containerInfo;Fi(function(){eu(null,t,null,null)}),r[fr]=null}};function nu(t){this._internalRoot=t}nu.prototype.unstable_scheduleHydration=function(t){if(t){var r=nl();t={blockedOn:null,target:t,priority:r};for(var o=0;o<Bn.length&&r!==0&&r<Bn[o].priority;o++);Bn.splice(o,0,t),o===0&&sl(t)}};function kh(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function ru(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function dm(){}function hE(t,r,o,c,d){if(d){if(typeof c=="function"){var p=c;c=function(){var b=tu(y);p.call(b)}}var y=um(r,c,t,0,null,!1,!1,"",dm);return t._reactRootContainer=y,t[fr]=y.current,Go(t.nodeType===8?t.parentNode:t),Fi(),y}for(;d=t.lastChild;)t.removeChild(d);if(typeof c=="function"){var I=c;c=function(){var b=tu(C);I.call(b)}}var C=Rh(t,0,!1,null,null,!1,!1,"",dm);return t._reactRootContainer=C,t[fr]=C.current,Go(t.nodeType===8?t.parentNode:t),Fi(function(){eu(r,C,o,c)}),C}function iu(t,r,o,c,d){var p=o._reactRootContainer;if(p){var y=p;if(typeof d=="function"){var I=d;d=function(){var C=tu(y);I.call(C)}}eu(r,y,t,d)}else y=hE(o,r,t,d,c);return tu(y)}el=function(t){switch(t.tag){case 3:var r=t.stateNode;if(r.current.memoizedState.isDehydrated){var o=Nr(r.pendingLanes);o!==0&&(xr(r,o|1),qt(r,je()),(Ne&6)===0&&(Xs=je()+500,Br()))}break;case 13:Fi(function(){var c=vr(t,1);if(c!==null){var d=zt();Ln(c,t,1,d)}}),Ch(t,1)}},ws=function(t){if(t.tag===13){var r=vr(t,134217728);if(r!==null){var o=zt();Ln(r,t,134217728,o)}Ch(t,134217728)}},tl=function(t){if(t.tag===13){var r=qr(t),o=vr(t,r);if(o!==null){var c=zt();Ln(o,t,r,c)}Ch(t,r)}},nl=function(){return Ae},rl=function(t,r){var o=Ae;try{return Ae=t,r()}finally{Ae=o}},ds=function(t,r,o){switch(r){case"input":if(vo(t,o),r=o.name,o.type==="radio"&&r!=null){for(o=t;o.parentNode;)o=o.parentNode;for(o=o.querySelectorAll("input[name="+JSON.stringify(""+r)+'][type="radio"]'),r=0;r<o.length;r++){var c=o[r];if(c!==t&&c.form===t.form){var d=wl(c);if(!d)throw Error(n(90));os(c),vo(c,d)}}}break;case"textarea":cs(t,o);break;case"select":r=o.value,r!=null&&sr(t,!!o.multiple,r,!1)}},_i=Eh,Co=Fi;var dE={usingClientEntryPoint:!1,Events:[Qo,Us,wl,jn,Ro,Eh]},ua={findFiberByHostInstance:Oi,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},fE={bundleType:ua.bundleType,version:ua.version,rendererPackageName:ua.rendererPackageName,rendererConfig:ua.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:ve.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=No(t),t===null?null:t.stateNode},findFiberByHostInstance:ua.findFiberByHostInstance||cE,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var su=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!su.isDisabled&&su.supportsFiber)try{Si=su.inject(fE),Jt=su}catch{}}return Qt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=dE,Qt.createPortal=function(t,r){var o=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!kh(r))throw Error(n(200));return uE(t,r,null,o)},Qt.createRoot=function(t,r){if(!kh(t))throw Error(n(299));var o=!1,c="",d=hm;return r!=null&&(r.unstable_strictMode===!0&&(o=!0),r.identifierPrefix!==void 0&&(c=r.identifierPrefix),r.onRecoverableError!==void 0&&(d=r.onRecoverableError)),r=Rh(t,1,!1,null,null,o,!1,c,d),t[fr]=r.current,Go(t.nodeType===8?t.parentNode:t),new Ph(r)},Qt.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var r=t._reactInternals;if(r===void 0)throw typeof t.render=="function"?Error(n(188)):(t=Object.keys(t).join(","),Error(n(268,t)));return t=No(r),t=t===null?null:t.stateNode,t},Qt.flushSync=function(t){return Fi(t)},Qt.hydrate=function(t,r,o){if(!ru(r))throw Error(n(200));return iu(null,t,r,!0,o)},Qt.hydrateRoot=function(t,r,o){if(!kh(t))throw Error(n(405));var c=o!=null&&o.hydratedSources||null,d=!1,p="",y=hm;if(o!=null&&(o.unstable_strictMode===!0&&(d=!0),o.identifierPrefix!==void 0&&(p=o.identifierPrefix),o.onRecoverableError!==void 0&&(y=o.onRecoverableError)),r=um(r,null,t,1,o??null,d,!1,p,y),t[fr]=r.current,Go(t),c)for(t=0;t<c.length;t++)o=c[t],d=o._getVersion,d=d(o._source),r.mutableSourceEagerHydrationData==null?r.mutableSourceEagerHydrationData=[o,d]:r.mutableSourceEagerHydrationData.push(o,d);return new nu(r)},Qt.render=function(t,r,o){if(!ru(r))throw Error(n(200));return iu(null,t,r,!1,o)},Qt.unmountComponentAtNode=function(t){if(!ru(t))throw Error(n(40));return t._reactRootContainer?(Fi(function(){iu(null,null,t,!1,function(){t._reactRootContainer=null,t[fr]=null})}),!0):!1},Qt.unstable_batchedUpdates=Eh,Qt.unstable_renderSubtreeIntoContainer=function(t,r,o,c){if(!ru(o))throw Error(n(200));if(t==null||t._reactInternals===void 0)throw Error(n(38));return iu(t,r,o,!1,c)},Qt.version="18.3.1-next-f1338f8080-20240426",Qt}var Em;function Xg(){if(Em)return Dh.exports;Em=1;function i(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(i)}catch(e){console.error(e)}}return i(),Dh.exports=TE(),Dh.exports}var wm;function IE(){if(wm)return ou;wm=1;var i=Xg();return ou.createRoot=i.createRoot,ou.hydrateRoot=i.hydrateRoot,ou}var SE=IE();const AE=qg(SE),RE="modulepreload",CE=function(i){return"/"+i},Tm={},bn=function(e,n,s){let a=Promise.resolve();if(n&&n.length>0){let h=function(_){return Promise.all(_.map(w=>Promise.resolve(w).then(T=>({status:"fulfilled",value:T}),T=>({status:"rejected",reason:T}))))};document.getElementsByTagName("link");const m=document.querySelector("meta[property=csp-nonce]"),g=(m==null?void 0:m.nonce)||(m==null?void 0:m.getAttribute("nonce"));a=h(n.map(_=>{if(_=CE(_),_ in Tm)return;Tm[_]=!0;const w=_.endsWith(".css"),T=w?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${_}"]${T}`))return;const D=document.createElement("link");if(D.rel=w?"stylesheet":RE,w||(D.as="script"),D.crossOrigin="",D.href=_,g&&D.setAttribute("nonce",g),document.head.appendChild(D),w)return new Promise((B,W)=>{D.addEventListener("load",B),D.addEventListener("error",()=>W(new Error(`Unable to preload CSS for ${_}`)))})}))}function u(h){const m=new Event("vite:preloadError",{cancelable:!0});if(m.payload=h,window.dispatchEvent(m),!m.defaultPrevented)throw h}return a.then(h=>{for(const m of h||[])m.status==="rejected"&&u(m.reason);return e().catch(u)})};Xg();/**
 * @remix-run/router v1.23.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Ea(){return Ea=Object.assign?Object.assign.bind():function(i){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var s in n)Object.prototype.hasOwnProperty.call(n,s)&&(i[s]=n[s])}return i},Ea.apply(this,arguments)}var ri;(function(i){i.Pop="POP",i.Push="PUSH",i.Replace="REPLACE"})(ri||(ri={}));const Im="popstate";function PE(i){i===void 0&&(i={});function e(s,a){let{pathname:u,search:h,hash:m}=s.location;return qh("",{pathname:u,search:h,hash:m},a.state&&a.state.usr||null,a.state&&a.state.key||"default")}function n(s,a){return typeof a=="string"?a:wu(a)}return NE(e,n,null,i)}function st(i,e){if(i===!1||i===null||typeof i>"u")throw new Error(e)}function Yg(i,e){if(!i){typeof console<"u"&&console.warn(e);try{throw new Error(e)}catch{}}}function kE(){return Math.random().toString(36).substr(2,8)}function Sm(i,e){return{usr:i.state,key:i.key,idx:e}}function qh(i,e,n,s){return n===void 0&&(n=null),Ea({pathname:typeof i=="string"?i:i.pathname,search:"",hash:""},typeof e=="string"?ho(e):e,{state:n,key:e&&e.key||s||kE()})}function wu(i){let{pathname:e="/",search:n="",hash:s=""}=i;return n&&n!=="?"&&(e+=n.charAt(0)==="?"?n:"?"+n),s&&s!=="#"&&(e+=s.charAt(0)==="#"?s:"#"+s),e}function ho(i){let e={};if(i){let n=i.indexOf("#");n>=0&&(e.hash=i.substr(n),i=i.substr(0,n));let s=i.indexOf("?");s>=0&&(e.search=i.substr(s),i=i.substr(0,s)),i&&(e.pathname=i)}return e}function NE(i,e,n,s){s===void 0&&(s={});let{window:a=document.defaultView,v5Compat:u=!1}=s,h=a.history,m=ri.Pop,g=null,_=w();_==null&&(_=0,h.replaceState(Ea({},h.state,{idx:_}),""));function w(){return(h.state||{idx:null}).idx}function T(){m=ri.Pop;let j=w(),ne=j==null?null:j-_;_=j,g&&g({action:m,location:q.location,delta:ne})}function D(j,ne){m=ri.Push;let ce=qh(q.location,j,ne);_=w()+1;let le=Sm(ce,_),ve=q.createHref(ce);try{h.pushState(le,"",ve)}catch(Ve){if(Ve instanceof DOMException&&Ve.name==="DataCloneError")throw Ve;a.location.assign(ve)}u&&g&&g({action:m,location:q.location,delta:1})}function B(j,ne){m=ri.Replace;let ce=qh(q.location,j,ne);_=w();let le=Sm(ce,_),ve=q.createHref(ce);h.replaceState(le,"",ve),u&&g&&g({action:m,location:q.location,delta:0})}function W(j){let ne=a.location.origin!=="null"?a.location.origin:a.location.href,ce=typeof j=="string"?j:wu(j);return ce=ce.replace(/ $/,"%20"),st(ne,"No window.location.(origin|href) available to create URL for href: "+ce),new URL(ce,ne)}let q={get action(){return m},get location(){return i(a,h)},listen(j){if(g)throw new Error("A history only accepts one active listener");return a.addEventListener(Im,T),g=j,()=>{a.removeEventListener(Im,T),g=null}},createHref(j){return e(a,j)},createURL:W,encodeLocation(j){let ne=W(j);return{pathname:ne.pathname,search:ne.search,hash:ne.hash}},push:D,replace:B,go(j){return h.go(j)}};return q}var Am;(function(i){i.data="data",i.deferred="deferred",i.redirect="redirect",i.error="error"})(Am||(Am={}));function OE(i,e,n){return n===void 0&&(n="/"),DE(i,e,n)}function DE(i,e,n,s){let a=typeof e=="string"?ho(e):e,u=Ed(a.pathname||"/",n);if(u==null)return null;let h=Jg(i);xE(h);let m=null;for(let g=0;m==null&&g<h.length;++g){let _=WE(u);m=BE(h[g],_)}return m}function Jg(i,e,n,s){e===void 0&&(e=[]),n===void 0&&(n=[]),s===void 0&&(s="");let a=(u,h,m)=>{let g={relativePath:m===void 0?u.path||"":m,caseSensitive:u.caseSensitive===!0,childrenIndex:h,route:u};g.relativePath.startsWith("/")&&(st(g.relativePath.startsWith(s),'Absolute route path "'+g.relativePath+'" nested under path '+('"'+s+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),g.relativePath=g.relativePath.slice(s.length));let _=ii([s,g.relativePath]),w=n.concat(g);u.children&&u.children.length>0&&(st(u.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+_+'".')),Jg(u.children,e,w,_)),!(u.path==null&&!u.index)&&e.push({path:_,score:jE(_,u.index),routesMeta:w})};return i.forEach((u,h)=>{var m;if(u.path===""||!((m=u.path)!=null&&m.includes("?")))a(u,h);else for(let g of Zg(u.path))a(u,h,g)}),e}function Zg(i){let e=i.split("/");if(e.length===0)return[];let[n,...s]=e,a=n.endsWith("?"),u=n.replace(/\?$/,"");if(s.length===0)return a?[u,""]:[u];let h=Zg(s.join("/")),m=[];return m.push(...h.map(g=>g===""?u:[u,g].join("/"))),a&&m.push(...h),m.map(g=>i.startsWith("/")&&g===""?"/":g)}function xE(i){i.sort((e,n)=>e.score!==n.score?n.score-e.score:zE(e.routesMeta.map(s=>s.childrenIndex),n.routesMeta.map(s=>s.childrenIndex)))}const LE=/^:[\w-]+$/,VE=3,ME=2,UE=1,bE=10,FE=-2,Rm=i=>i==="*";function jE(i,e){let n=i.split("/"),s=n.length;return n.some(Rm)&&(s+=FE),e&&(s+=ME),n.filter(a=>!Rm(a)).reduce((a,u)=>a+(LE.test(u)?VE:u===""?UE:bE),s)}function zE(i,e){return i.length===e.length&&i.slice(0,-1).every((s,a)=>s===e[a])?i[i.length-1]-e[e.length-1]:0}function BE(i,e,n){let{routesMeta:s}=i,a={},u="/",h=[];for(let m=0;m<s.length;++m){let g=s[m],_=m===s.length-1,w=u==="/"?e:e.slice(u.length)||"/",T=$E({path:g.relativePath,caseSensitive:g.caseSensitive,end:_},w),D=g.route;if(!T)return null;Object.assign(a,T.params),h.push({params:a,pathname:ii([u,T.pathname]),pathnameBase:QE(ii([u,T.pathnameBase])),route:D}),T.pathnameBase!=="/"&&(u=ii([u,T.pathnameBase]))}return h}function $E(i,e){typeof i=="string"&&(i={path:i,caseSensitive:!1,end:!0});let[n,s]=HE(i.path,i.caseSensitive,i.end),a=e.match(n);if(!a)return null;let u=a[0],h=u.replace(/(.)\/+$/,"$1"),m=a.slice(1);return{params:s.reduce((_,w,T)=>{let{paramName:D,isOptional:B}=w;if(D==="*"){let q=m[T]||"";h=u.slice(0,u.length-q.length).replace(/(.)\/+$/,"$1")}const W=m[T];return B&&!W?_[D]=void 0:_[D]=(W||"").replace(/%2F/g,"/"),_},{}),pathname:u,pathnameBase:h,pattern:i}}function HE(i,e,n){e===void 0&&(e=!1),n===void 0&&(n=!0),Yg(i==="*"||!i.endsWith("*")||i.endsWith("/*"),'Route path "'+i+'" will be treated as if it were '+('"'+i.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+i.replace(/\*$/,"/*")+'".'));let s=[],a="^"+i.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(h,m,g)=>(s.push({paramName:m,isOptional:g!=null}),g?"/?([^\\/]+)?":"/([^\\/]+)"));return i.endsWith("*")?(s.push({paramName:"*"}),a+=i==="*"||i==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?a+="\\/*$":i!==""&&i!=="/"&&(a+="(?:(?=\\/|$))"),[new RegExp(a,e?void 0:"i"),s]}function WE(i){try{return i.split("/").map(e=>decodeURIComponent(e).replace(/\//g,"%2F")).join("/")}catch(e){return Yg(!1,'The URL path "'+i+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+e+").")),i}}function Ed(i,e){if(e==="/")return i;if(!i.toLowerCase().startsWith(e.toLowerCase()))return null;let n=e.endsWith("/")?e.length-1:e.length,s=i.charAt(n);return s&&s!=="/"?null:i.slice(n)||"/"}function GE(i,e){e===void 0&&(e="/");let{pathname:n,search:s="",hash:a=""}=typeof i=="string"?ho(i):i;return{pathname:n?n.startsWith("/")?n:KE(n,e):e,search:XE(s),hash:YE(a)}}function KE(i,e){let n=e.replace(/\/+$/,"").split("/");return i.split("/").forEach(a=>{a===".."?n.length>1&&n.pop():a!=="."&&n.push(a)}),n.length>1?n.join("/"):"/"}function Vh(i,e,n,s){return"Cannot include a '"+i+"' character in a manually specified "+("`to."+e+"` field ["+JSON.stringify(s)+"].  Please separate it out to the ")+("`to."+n+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function qE(i){return i.filter((e,n)=>n===0||e.route.path&&e.route.path.length>0)}function ev(i,e){let n=qE(i);return e?n.map((s,a)=>a===n.length-1?s.pathname:s.pathnameBase):n.map(s=>s.pathnameBase)}function tv(i,e,n,s){s===void 0&&(s=!1);let a;typeof i=="string"?a=ho(i):(a=Ea({},i),st(!a.pathname||!a.pathname.includes("?"),Vh("?","pathname","search",a)),st(!a.pathname||!a.pathname.includes("#"),Vh("#","pathname","hash",a)),st(!a.search||!a.search.includes("#"),Vh("#","search","hash",a)));let u=i===""||a.pathname==="",h=u?"/":a.pathname,m;if(h==null)m=n;else{let T=e.length-1;if(!s&&h.startsWith("..")){let D=h.split("/");for(;D[0]==="..";)D.shift(),T-=1;a.pathname=D.join("/")}m=T>=0?e[T]:"/"}let g=GE(a,m),_=h&&h!=="/"&&h.endsWith("/"),w=(u||h===".")&&n.endsWith("/");return!g.pathname.endsWith("/")&&(_||w)&&(g.pathname+="/"),g}const ii=i=>i.join("/").replace(/\/\/+/g,"/"),QE=i=>i.replace(/\/+$/,"").replace(/^\/*/,"/"),XE=i=>!i||i==="?"?"":i.startsWith("?")?i:"?"+i,YE=i=>!i||i==="#"?"":i.startsWith("#")?i:"#"+i;function JE(i){return i!=null&&typeof i.status=="number"&&typeof i.statusText=="string"&&typeof i.internal=="boolean"&&"data"in i}const nv=["post","put","patch","delete"];new Set(nv);const ZE=["get",...nv];new Set(ZE);/**
 * React Router v6.30.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function wa(){return wa=Object.assign?Object.assign.bind():function(i){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var s in n)Object.prototype.hasOwnProperty.call(n,s)&&(i[s]=n[s])}return i},wa.apply(this,arguments)}const wd=Y.createContext(null),e0=Y.createContext(null),ts=Y.createContext(null),zu=Y.createContext(null),ns=Y.createContext({outlet:null,matches:[],isDataRoute:!1}),rv=Y.createContext(null);function t0(i,e){let{relative:n}=e===void 0?{}:e;xa()||st(!1);let{basename:s,navigator:a}=Y.useContext(ts),{hash:u,pathname:h,search:m}=sv(i,{relative:n}),g=h;return s!=="/"&&(g=h==="/"?s:ii([s,h])),a.createHref({pathname:g,search:m,hash:u})}function xa(){return Y.useContext(zu)!=null}function Bu(){return xa()||st(!1),Y.useContext(zu).location}function iv(i){Y.useContext(ts).static||Y.useLayoutEffect(i)}function n0(){let{isDataRoute:i}=Y.useContext(ns);return i?m0():r0()}function r0(){xa()||st(!1);let i=Y.useContext(wd),{basename:e,future:n,navigator:s}=Y.useContext(ts),{matches:a}=Y.useContext(ns),{pathname:u}=Bu(),h=JSON.stringify(ev(a,n.v7_relativeSplatPath)),m=Y.useRef(!1);return iv(()=>{m.current=!0}),Y.useCallback(function(_,w){if(w===void 0&&(w={}),!m.current)return;if(typeof _=="number"){s.go(_);return}let T=tv(_,JSON.parse(h),u,w.relative==="path");i==null&&e!=="/"&&(T.pathname=T.pathname==="/"?e:ii([e,T.pathname])),(w.replace?s.replace:s.push)(T,w.state,w)},[e,s,h,u,i])}function sv(i,e){let{relative:n}=e===void 0?{}:e,{future:s}=Y.useContext(ts),{matches:a}=Y.useContext(ns),{pathname:u}=Bu(),h=JSON.stringify(ev(a,s.v7_relativeSplatPath));return Y.useMemo(()=>tv(i,JSON.parse(h),u,n==="path"),[i,h,u,n])}function i0(i,e){return s0(i,e)}function s0(i,e,n,s){xa()||st(!1);let{navigator:a,static:u}=Y.useContext(ts),{matches:h}=Y.useContext(ns),m=h[h.length-1],g=m?m.params:{};m&&m.pathname;let _=m?m.pathnameBase:"/";m&&m.route;let w=Bu(),T;if(e){var D;let ne=typeof e=="string"?ho(e):e;_==="/"||(D=ne.pathname)!=null&&D.startsWith(_)||st(!1),T=ne}else T=w;let B=T.pathname||"/",W=B;if(_!=="/"){let ne=_.replace(/^\//,"").split("/");W="/"+B.replace(/^\//,"").split("/").slice(ne.length).join("/")}let q=OE(i,{pathname:W}),j=c0(q&&q.map(ne=>Object.assign({},ne,{params:Object.assign({},g,ne.params),pathname:ii([_,a.encodeLocation?a.encodeLocation(ne.pathname).pathname:ne.pathname]),pathnameBase:ne.pathnameBase==="/"?_:ii([_,a.encodeLocation?a.encodeLocation(ne.pathnameBase).pathname:ne.pathnameBase])})),h,n,s);return e&&j?Y.createElement(zu.Provider,{value:{location:wa({pathname:"/",search:"",hash:"",state:null,key:"default"},T),navigationType:ri.Pop}},j):j}function o0(){let i=p0(),e=JE(i)?i.status+" "+i.statusText:i instanceof Error?i.message:JSON.stringify(i),n=i instanceof Error?i.stack:null,a={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return Y.createElement(Y.Fragment,null,Y.createElement("h2",null,"Unexpected Application Error!"),Y.createElement("h3",{style:{fontStyle:"italic"}},e),n?Y.createElement("pre",{style:a},n):null,null)}const a0=Y.createElement(o0,null);class l0 extends Y.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,n){return n.location!==e.location||n.revalidation!=="idle"&&e.revalidation==="idle"?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error!==void 0?e.error:n.error,location:n.location,revalidation:e.revalidation||n.revalidation}}componentDidCatch(e,n){console.error("React Router caught the following error during render",e,n)}render(){return this.state.error!==void 0?Y.createElement(ns.Provider,{value:this.props.routeContext},Y.createElement(rv.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function u0(i){let{routeContext:e,match:n,children:s}=i,a=Y.useContext(wd);return a&&a.static&&a.staticContext&&(n.route.errorElement||n.route.ErrorBoundary)&&(a.staticContext._deepestRenderedBoundaryId=n.route.id),Y.createElement(ns.Provider,{value:e},s)}function c0(i,e,n,s){var a;if(e===void 0&&(e=[]),n===void 0&&(n=null),s===void 0&&(s=null),i==null){var u;if(!n)return null;if(n.errors)i=n.matches;else if((u=s)!=null&&u.v7_partialHydration&&e.length===0&&!n.initialized&&n.matches.length>0)i=n.matches;else return null}let h=i,m=(a=n)==null?void 0:a.errors;if(m!=null){let w=h.findIndex(T=>T.route.id&&(m==null?void 0:m[T.route.id])!==void 0);w>=0||st(!1),h=h.slice(0,Math.min(h.length,w+1))}let g=!1,_=-1;if(n&&s&&s.v7_partialHydration)for(let w=0;w<h.length;w++){let T=h[w];if((T.route.HydrateFallback||T.route.hydrateFallbackElement)&&(_=w),T.route.id){let{loaderData:D,errors:B}=n,W=T.route.loader&&D[T.route.id]===void 0&&(!B||B[T.route.id]===void 0);if(T.route.lazy||W){g=!0,_>=0?h=h.slice(0,_+1):h=[h[0]];break}}}return h.reduceRight((w,T,D)=>{let B,W=!1,q=null,j=null;n&&(B=m&&T.route.id?m[T.route.id]:void 0,q=T.route.errorElement||a0,g&&(_<0&&D===0?(g0("route-fallback"),W=!0,j=null):_===D&&(W=!0,j=T.route.hydrateFallbackElement||null)));let ne=e.concat(h.slice(0,D+1)),ce=()=>{let le;return B?le=q:W?le=j:T.route.Component?le=Y.createElement(T.route.Component,null):T.route.element?le=T.route.element:le=w,Y.createElement(u0,{match:T,routeContext:{outlet:w,matches:ne,isDataRoute:n!=null},children:le})};return n&&(T.route.ErrorBoundary||T.route.errorElement||D===0)?Y.createElement(l0,{location:n.location,revalidation:n.revalidation,component:q,error:B,children:ce(),routeContext:{outlet:null,matches:ne,isDataRoute:!0}}):ce()},null)}var ov=function(i){return i.UseBlocker="useBlocker",i.UseRevalidator="useRevalidator",i.UseNavigateStable="useNavigate",i}(ov||{}),av=function(i){return i.UseBlocker="useBlocker",i.UseLoaderData="useLoaderData",i.UseActionData="useActionData",i.UseRouteError="useRouteError",i.UseNavigation="useNavigation",i.UseRouteLoaderData="useRouteLoaderData",i.UseMatches="useMatches",i.UseRevalidator="useRevalidator",i.UseNavigateStable="useNavigate",i.UseRouteId="useRouteId",i}(av||{});function h0(i){let e=Y.useContext(wd);return e||st(!1),e}function d0(i){let e=Y.useContext(e0);return e||st(!1),e}function f0(i){let e=Y.useContext(ns);return e||st(!1),e}function lv(i){let e=f0(),n=e.matches[e.matches.length-1];return n.route.id||st(!1),n.route.id}function p0(){var i;let e=Y.useContext(rv),n=d0(),s=lv();return e!==void 0?e:(i=n.errors)==null?void 0:i[s]}function m0(){let{router:i}=h0(ov.UseNavigateStable),e=lv(av.UseNavigateStable),n=Y.useRef(!1);return iv(()=>{n.current=!0}),Y.useCallback(function(a,u){u===void 0&&(u={}),n.current&&(typeof a=="number"?i.navigate(a):i.navigate(a,wa({fromRouteId:e},u)))},[i,e])}const Cm={};function g0(i,e,n){Cm[i]||(Cm[i]=!0)}function v0(i,e){i==null||i.v7_startTransition,i==null||i.v7_relativeSplatPath}function yn(i){st(!1)}function y0(i){let{basename:e="/",children:n=null,location:s,navigationType:a=ri.Pop,navigator:u,static:h=!1,future:m}=i;xa()&&st(!1);let g=e.replace(/^\/*/,"/"),_=Y.useMemo(()=>({basename:g,navigator:u,static:h,future:wa({v7_relativeSplatPath:!1},m)}),[g,m,u,h]);typeof s=="string"&&(s=ho(s));let{pathname:w="/",search:T="",hash:D="",state:B=null,key:W="default"}=s,q=Y.useMemo(()=>{let j=Ed(w,g);return j==null?null:{location:{pathname:j,search:T,hash:D,state:B,key:W},navigationType:a}},[g,w,T,D,B,W,a]);return q==null?null:Y.createElement(ts.Provider,{value:_},Y.createElement(zu.Provider,{children:n,value:q}))}function _0(i){let{children:e,location:n}=i;return i0(Qh(e),n)}new Promise(()=>{});function Qh(i,e){e===void 0&&(e=[]);let n=[];return Y.Children.forEach(i,(s,a)=>{if(!Y.isValidElement(s))return;let u=[...e,a];if(s.type===Y.Fragment){n.push.apply(n,Qh(s.props.children,u));return}s.type!==yn&&st(!1),!s.props.index||!s.props.children||st(!1);let h={id:s.props.id||u.join("-"),caseSensitive:s.props.caseSensitive,element:s.props.element,Component:s.props.Component,index:s.props.index,path:s.props.path,loader:s.props.loader,action:s.props.action,errorElement:s.props.errorElement,ErrorBoundary:s.props.ErrorBoundary,hasErrorBoundary:s.props.ErrorBoundary!=null||s.props.errorElement!=null,shouldRevalidate:s.props.shouldRevalidate,handle:s.props.handle,lazy:s.props.lazy};s.props.children&&(h.children=Qh(s.props.children,u)),n.push(h)}),n}/**
 * React Router DOM v6.30.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Xh(){return Xh=Object.assign?Object.assign.bind():function(i){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var s in n)Object.prototype.hasOwnProperty.call(n,s)&&(i[s]=n[s])}return i},Xh.apply(this,arguments)}function E0(i,e){if(i==null)return{};var n={},s=Object.keys(i),a,u;for(u=0;u<s.length;u++)a=s[u],!(e.indexOf(a)>=0)&&(n[a]=i[a]);return n}function w0(i){return!!(i.metaKey||i.altKey||i.ctrlKey||i.shiftKey)}function T0(i,e){return i.button===0&&(!e||e==="_self")&&!w0(i)}const I0=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"],S0="6";try{window.__reactRouterVersion=S0}catch{}const A0="startTransition",Pm=_E[A0];function R0(i){let{basename:e,children:n,future:s,window:a}=i,u=Y.useRef();u.current==null&&(u.current=PE({window:a,v5Compat:!0}));let h=u.current,[m,g]=Y.useState({action:h.action,location:h.location}),{v7_startTransition:_}=s||{},w=Y.useCallback(T=>{_&&Pm?Pm(()=>g(T)):g(T)},[g,_]);return Y.useLayoutEffect(()=>h.listen(w),[h,w]),Y.useEffect(()=>v0(s),[s]),Y.createElement(y0,{basename:e,children:n,location:m.location,navigationType:m.action,navigator:h,future:s})}const C0=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",P0=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,kC=Y.forwardRef(function(e,n){let{onClick:s,relative:a,reloadDocument:u,replace:h,state:m,target:g,to:_,preventScrollReset:w,viewTransition:T}=e,D=E0(e,I0),{basename:B}=Y.useContext(ts),W,q=!1;if(typeof _=="string"&&P0.test(_)&&(W=_,C0))try{let le=new URL(window.location.href),ve=_.startsWith("//")?new URL(le.protocol+_):new URL(_),Ve=Ed(ve.pathname,B);ve.origin===le.origin&&Ve!=null?_=Ve+ve.search+ve.hash:q=!0}catch{}let j=t0(_,{relative:a}),ne=k0(_,{replace:h,state:m,target:g,preventScrollReset:w,relative:a,viewTransition:T});function ce(le){s&&s(le),le.defaultPrevented||ne(le)}return Y.createElement("a",Xh({},D,{href:W||j,onClick:q||u?s:ce,ref:n,target:g}))});var km;(function(i){i.UseScrollRestoration="useScrollRestoration",i.UseSubmit="useSubmit",i.UseSubmitFetcher="useSubmitFetcher",i.UseFetcher="useFetcher",i.useViewTransitionState="useViewTransitionState"})(km||(km={}));var Nm;(function(i){i.UseFetcher="useFetcher",i.UseFetchers="useFetchers",i.UseScrollRestoration="useScrollRestoration"})(Nm||(Nm={}));function k0(i,e){let{target:n,replace:s,state:a,preventScrollReset:u,relative:h,viewTransition:m}=e===void 0?{}:e,g=n0(),_=Bu(),w=sv(i,{relative:h});return Y.useCallback(T=>{if(T0(T,n)){T.preventDefault();let D=s!==void 0?s:wu(_)===wu(w);g(i,{replace:D,state:a,preventScrollReset:u,relative:h,viewTransition:m})}},[_,g,w,s,a,n,i,u,h,m])}const N0=Y.createContext(null),Mh={didCatch:!1,error:null};class O0 extends Y.Component{constructor(e){super(e),this.resetErrorBoundary=this.resetErrorBoundary.bind(this),this.state=Mh}static getDerivedStateFromError(e){return{didCatch:!0,error:e}}resetErrorBoundary(){const{error:e}=this.state;if(e!==null){for(var n,s,a=arguments.length,u=new Array(a),h=0;h<a;h++)u[h]=arguments[h];(n=(s=this.props).onReset)===null||n===void 0||n.call(s,{args:u,reason:"imperative-api"}),this.setState(Mh)}}componentDidCatch(e,n){var s,a;(s=(a=this.props).onError)===null||s===void 0||s.call(a,e,n)}componentDidUpdate(e,n){const{didCatch:s}=this.state,{resetKeys:a}=this.props;if(s&&n.error!==null&&D0(e.resetKeys,a)){var u,h;(u=(h=this.props).onReset)===null||u===void 0||u.call(h,{next:a,prev:e.resetKeys,reason:"keys"}),this.setState(Mh)}}render(){const{children:e,fallbackRender:n,FallbackComponent:s,fallback:a}=this.props,{didCatch:u,error:h}=this.state;let m=e;if(u){const g={error:h,resetErrorBoundary:this.resetErrorBoundary};if(typeof n=="function")m=n(g);else if(s)m=Y.createElement(s,g);else if(a!==void 0)m=a;else throw h}return Y.createElement(N0.Provider,{value:{didCatch:u,error:h,resetErrorBoundary:this.resetErrorBoundary}},m)}}function D0(){let i=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:[];return i.length!==e.length||i.some((n,s)=>!Object.is(n,e[s]))}function x0({error:i}){return Ie.jsxs("div",{role:"alert",className:"p-4 bg-red-100 text-red-800 rounded",children:[Ie.jsx("p",{children:Ie.jsx("strong",{children:"⚠️ Something went wrong rendering this page:"})}),Ie.jsx("pre",{className:"text-xs whitespace-pre-wrap",children:i.message})]})}const L0=Y.lazy(()=>bn(()=>import("./LandingPage-CBQO61rF.js"),[])),V0=Y.lazy(()=>bn(()=>import("./Signup-BKcTPmiF.js"),[])),M0=Y.lazy(()=>bn(()=>import("./Login-C58NTWZk.js"),[])),U0=Y.lazy(()=>bn(()=>import("./Dashboard-DzPppyoo.js"),[])),b0=Y.lazy(()=>bn(()=>import("./OnboardingChat-B71CcmSE.js"),[])),F0=Y.lazy(()=>bn(()=>import("./OnboardingSummary-DyR7TBEl.js"),[])),j0=Y.lazy(()=>bn(()=>import("./CampaignBuilder-YSCHIWP5.js"),[])),z0=Y.lazy(()=>bn(()=>import("./CampaignNextSteps-BSVHVrDm.js"),[])),B0=Y.lazy(()=>bn(()=>import("./EditCampaignClassification-C317NpJA.js"),[])),$0=Y.lazy(()=>bn(()=>import("./MessagingAssistant-BCHggGyc.js"),[])),H0=Y.lazy(()=>bn(()=>import("./MessagingForm-DZ29Ay_d.js"),[]));function W0(){return Ie.jsx(O0,{FallbackComponent:x0,children:Ie.jsx(Y.Suspense,{fallback:Ie.jsx("div",{className:"p-4 text-gray-600",children:"Loading…"}),children:Ie.jsxs(_0,{children:[Ie.jsx(yn,{path:"/",element:Ie.jsx(L0,{})}),Ie.jsx(yn,{path:"/signup",element:Ie.jsx(V0,{})}),Ie.jsx(yn,{path:"/login",element:Ie.jsx(M0,{})}),Ie.jsx(yn,{path:"/dashboard",element:Ie.jsx(U0,{})}),Ie.jsx(yn,{path:"/onboarding",element:Ie.jsx(b0,{})}),Ie.jsx(yn,{path:"/onboarding/summary",element:Ie.jsx(F0,{})}),Ie.jsx(yn,{path:"/campaign-builder",element:Ie.jsx(j0,{})}),Ie.jsx(yn,{path:"/campaign/next-steps",element:Ie.jsx(z0,{})}),Ie.jsx(yn,{path:"/campaign/classification-review/:campaignId",element:Ie.jsx(B0,{})}),Ie.jsx(yn,{path:"/app/campaign/message",element:Ie.jsx($0,{})}),Ie.jsx(yn,{path:"/app/campaign/message-form",element:Ie.jsx(H0,{})})]})})})}const G0=()=>{};var Om={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uv=function(i){const e=[];let n=0;for(let s=0;s<i.length;s++){let a=i.charCodeAt(s);a<128?e[n++]=a:a<2048?(e[n++]=a>>6|192,e[n++]=a&63|128):(a&64512)===55296&&s+1<i.length&&(i.charCodeAt(s+1)&64512)===56320?(a=65536+((a&1023)<<10)+(i.charCodeAt(++s)&1023),e[n++]=a>>18|240,e[n++]=a>>12&63|128,e[n++]=a>>6&63|128,e[n++]=a&63|128):(e[n++]=a>>12|224,e[n++]=a>>6&63|128,e[n++]=a&63|128)}return e},K0=function(i){const e=[];let n=0,s=0;for(;n<i.length;){const a=i[n++];if(a<128)e[s++]=String.fromCharCode(a);else if(a>191&&a<224){const u=i[n++];e[s++]=String.fromCharCode((a&31)<<6|u&63)}else if(a>239&&a<365){const u=i[n++],h=i[n++],m=i[n++],g=((a&7)<<18|(u&63)<<12|(h&63)<<6|m&63)-65536;e[s++]=String.fromCharCode(55296+(g>>10)),e[s++]=String.fromCharCode(56320+(g&1023))}else{const u=i[n++],h=i[n++];e[s++]=String.fromCharCode((a&15)<<12|(u&63)<<6|h&63)}}return e.join("")},cv={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(i,e){if(!Array.isArray(i))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let a=0;a<i.length;a+=3){const u=i[a],h=a+1<i.length,m=h?i[a+1]:0,g=a+2<i.length,_=g?i[a+2]:0,w=u>>2,T=(u&3)<<4|m>>4;let D=(m&15)<<2|_>>6,B=_&63;g||(B=64,h||(D=64)),s.push(n[w],n[T],n[D],n[B])}return s.join("")},encodeString(i,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(i):this.encodeByteArray(uv(i),e)},decodeString(i,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(i):K0(this.decodeStringToByteArray(i,e))},decodeStringToByteArray(i,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let a=0;a<i.length;){const u=n[i.charAt(a++)],m=a<i.length?n[i.charAt(a)]:0;++a;const _=a<i.length?n[i.charAt(a)]:64;++a;const T=a<i.length?n[i.charAt(a)]:64;if(++a,u==null||m==null||_==null||T==null)throw new q0;const D=u<<2|m>>4;if(s.push(D),_!==64){const B=m<<4&240|_>>2;if(s.push(B),T!==64){const W=_<<6&192|T;s.push(W)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let i=0;i<this.ENCODED_VALS.length;i++)this.byteToCharMap_[i]=this.ENCODED_VALS.charAt(i),this.charToByteMap_[this.byteToCharMap_[i]]=i,this.byteToCharMapWebSafe_[i]=this.ENCODED_VALS_WEBSAFE.charAt(i),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[i]]=i,i>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(i)]=i,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(i)]=i)}}};class q0 extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Q0=function(i){const e=uv(i);return cv.encodeByteArray(e,!0)},Tu=function(i){return Q0(i).replace(/\./g,"")},hv=function(i){try{return cv.decodeString(i,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function X0(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Y0=()=>X0().__FIREBASE_DEFAULTS__,J0=()=>{if(typeof process>"u"||typeof Om>"u")return;const i=Om.__FIREBASE_DEFAULTS__;if(i)return JSON.parse(i)},Z0=()=>{if(typeof document>"u")return;let i;try{i=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=i&&hv(i[1]);return e&&JSON.parse(e)},$u=()=>{try{return G0()||Y0()||J0()||Z0()}catch(i){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${i}`);return}},dv=i=>{var e,n;return(n=(e=$u())===null||e===void 0?void 0:e.emulatorHosts)===null||n===void 0?void 0:n[i]},ew=i=>{const e=dv(i);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const s=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),s]:[e.substring(0,n),s]},fv=()=>{var i;return(i=$u())===null||i===void 0?void 0:i.config},pv=i=>{var e;return(e=$u())===null||e===void 0?void 0:e[`_${i}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tw{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,s)=>{n?this.reject(n):this.resolve(s),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,s))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nw(i,e){if(i.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},s=e||"demo-project",a=i.iat||0,u=i.sub||i.user_id;if(!u)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const h=Object.assign({iss:`https://securetoken.google.com/${s}`,aud:s,iat:a,exp:a+3600,auth_time:a,sub:u,user_id:u,firebase:{sign_in_provider:"custom",identities:{}}},i);return[Tu(JSON.stringify(n)),Tu(JSON.stringify(h)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mt(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function rw(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Mt())}function iw(){var i;const e=(i=$u())===null||i===void 0?void 0:i.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function sw(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function ow(){const i=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof i=="object"&&i.id!==void 0}function aw(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function lw(){const i=Mt();return i.indexOf("MSIE ")>=0||i.indexOf("Trident/")>=0}function uw(){return!iw()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function cw(){try{return typeof indexedDB=="object"}catch{return!1}}function hw(){return new Promise((i,e)=>{try{let n=!0;const s="validate-browser-context-for-indexeddb-analytics-module",a=self.indexedDB.open(s);a.onsuccess=()=>{a.result.close(),n||self.indexedDB.deleteDatabase(s),i(!0)},a.onupgradeneeded=()=>{n=!1},a.onerror=()=>{var u;e(((u=a.error)===null||u===void 0?void 0:u.message)||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dw="FirebaseError";class Rr extends Error{constructor(e,n,s){super(n),this.code=e,this.customData=s,this.name=dw,Object.setPrototypeOf(this,Rr.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,La.prototype.create)}}class La{constructor(e,n,s){this.service=e,this.serviceName=n,this.errors=s}create(e,...n){const s=n[0]||{},a=`${this.service}/${e}`,u=this.errors[e],h=u?fw(u,s):"Error",m=`${this.serviceName}: ${h} (${a}).`;return new Rr(a,m,s)}}function fw(i,e){return i.replace(pw,(n,s)=>{const a=e[s];return a!=null?String(a):`<${s}?>`})}const pw=/\{\$([^}]+)}/g;function mw(i){for(const e in i)if(Object.prototype.hasOwnProperty.call(i,e))return!1;return!0}function Ki(i,e){if(i===e)return!0;const n=Object.keys(i),s=Object.keys(e);for(const a of n){if(!s.includes(a))return!1;const u=i[a],h=e[a];if(Dm(u)&&Dm(h)){if(!Ki(u,h))return!1}else if(u!==h)return!1}for(const a of s)if(!n.includes(a))return!1;return!0}function Dm(i){return i!==null&&typeof i=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Va(i){const e=[];for(const[n,s]of Object.entries(i))Array.isArray(s)?s.forEach(a=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(a))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(s));return e.length?"&"+e.join("&"):""}function da(i){const e={};return i.replace(/^\?/,"").split("&").forEach(s=>{if(s){const[a,u]=s.split("=");e[decodeURIComponent(a)]=decodeURIComponent(u)}}),e}function fa(i){const e=i.indexOf("?");if(!e)return"";const n=i.indexOf("#",e);return i.substring(e,n>0?n:void 0)}function gw(i,e){const n=new vw(i,e);return n.subscribe.bind(n)}class vw{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(s=>{this.error(s)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,s){let a;if(e===void 0&&n===void 0&&s===void 0)throw new Error("Missing Observer.");yw(e,["next","error","complete"])?a=e:a={next:e,error:n,complete:s},a.next===void 0&&(a.next=Uh),a.error===void 0&&(a.error=Uh),a.complete===void 0&&(a.complete=Uh);const u=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?a.error(this.finalError):a.complete()}catch{}}),this.observers.push(a),u}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(s){typeof console<"u"&&console.error&&console.error(s)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function yw(i,e){if(typeof i!="object"||i===null)return!1;for(const n of e)if(n in i&&typeof i[n]=="function")return!0;return!1}function Uh(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ut(i){return i&&i._delegate?i._delegate:i}class qi{constructor(e,n,s){this.name=e,this.instanceFactory=n,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $i="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _w{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const s=new tw;if(this.instancesDeferred.set(n,s),this.isInitialized(n)||this.shouldAutoInitialize())try{const a=this.getOrInitializeService({instanceIdentifier:n});a&&s.resolve(a)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const s=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),a=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(s)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:s})}catch(u){if(a)return null;throw u}else{if(a)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(ww(e))try{this.getOrInitializeService({instanceIdentifier:$i})}catch{}for(const[n,s]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(n);try{const u=this.getOrInitializeService({instanceIdentifier:a});s.resolve(u)}catch{}}}}clearInstance(e=$i){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=$i){return this.instances.has(e)}getOptions(e=$i){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,s=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(s))throw Error(`${this.name}(${s}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const a=this.getOrInitializeService({instanceIdentifier:s,options:n});for(const[u,h]of this.instancesDeferred.entries()){const m=this.normalizeInstanceIdentifier(u);s===m&&h.resolve(a)}return a}onInit(e,n){var s;const a=this.normalizeInstanceIdentifier(n),u=(s=this.onInitCallbacks.get(a))!==null&&s!==void 0?s:new Set;u.add(e),this.onInitCallbacks.set(a,u);const h=this.instances.get(a);return h&&e(h,a),()=>{u.delete(e)}}invokeOnInitCallbacks(e,n){const s=this.onInitCallbacks.get(n);if(s)for(const a of s)try{a(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let s=this.instances.get(e);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:Ew(e),options:n}),this.instances.set(e,s),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(s,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,s)}catch{}return s||null}normalizeInstanceIdentifier(e=$i){return this.component?this.component.multipleInstances?e:$i:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Ew(i){return i===$i?void 0:i}function ww(i){return i.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tw{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new _w(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Se;(function(i){i[i.DEBUG=0]="DEBUG",i[i.VERBOSE=1]="VERBOSE",i[i.INFO=2]="INFO",i[i.WARN=3]="WARN",i[i.ERROR=4]="ERROR",i[i.SILENT=5]="SILENT"})(Se||(Se={}));const Iw={debug:Se.DEBUG,verbose:Se.VERBOSE,info:Se.INFO,warn:Se.WARN,error:Se.ERROR,silent:Se.SILENT},Sw=Se.INFO,Aw={[Se.DEBUG]:"log",[Se.VERBOSE]:"log",[Se.INFO]:"info",[Se.WARN]:"warn",[Se.ERROR]:"error"},Rw=(i,e,...n)=>{if(e<i.logLevel)return;const s=new Date().toISOString(),a=Aw[e];if(a)console[a](`[${s}]  ${i.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Td{constructor(e){this.name=e,this._logLevel=Sw,this._logHandler=Rw,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in Se))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Iw[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,Se.DEBUG,...e),this._logHandler(this,Se.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,Se.VERBOSE,...e),this._logHandler(this,Se.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,Se.INFO,...e),this._logHandler(this,Se.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,Se.WARN,...e),this._logHandler(this,Se.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,Se.ERROR,...e),this._logHandler(this,Se.ERROR,...e)}}const Cw=(i,e)=>e.some(n=>i instanceof n);let xm,Lm;function Pw(){return xm||(xm=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function kw(){return Lm||(Lm=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const mv=new WeakMap,Yh=new WeakMap,gv=new WeakMap,bh=new WeakMap,Id=new WeakMap;function Nw(i){const e=new Promise((n,s)=>{const a=()=>{i.removeEventListener("success",u),i.removeEventListener("error",h)},u=()=>{n(si(i.result)),a()},h=()=>{s(i.error),a()};i.addEventListener("success",u),i.addEventListener("error",h)});return e.then(n=>{n instanceof IDBCursor&&mv.set(n,i)}).catch(()=>{}),Id.set(e,i),e}function Ow(i){if(Yh.has(i))return;const e=new Promise((n,s)=>{const a=()=>{i.removeEventListener("complete",u),i.removeEventListener("error",h),i.removeEventListener("abort",h)},u=()=>{n(),a()},h=()=>{s(i.error||new DOMException("AbortError","AbortError")),a()};i.addEventListener("complete",u),i.addEventListener("error",h),i.addEventListener("abort",h)});Yh.set(i,e)}let Jh={get(i,e,n){if(i instanceof IDBTransaction){if(e==="done")return Yh.get(i);if(e==="objectStoreNames")return i.objectStoreNames||gv.get(i);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return si(i[e])},set(i,e,n){return i[e]=n,!0},has(i,e){return i instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in i}};function Dw(i){Jh=i(Jh)}function xw(i){return i===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const s=i.call(Fh(this),e,...n);return gv.set(s,e.sort?e.sort():[e]),si(s)}:kw().includes(i)?function(...e){return i.apply(Fh(this),e),si(mv.get(this))}:function(...e){return si(i.apply(Fh(this),e))}}function Lw(i){return typeof i=="function"?xw(i):(i instanceof IDBTransaction&&Ow(i),Cw(i,Pw())?new Proxy(i,Jh):i)}function si(i){if(i instanceof IDBRequest)return Nw(i);if(bh.has(i))return bh.get(i);const e=Lw(i);return e!==i&&(bh.set(i,e),Id.set(e,i)),e}const Fh=i=>Id.get(i);function Vw(i,e,{blocked:n,upgrade:s,blocking:a,terminated:u}={}){const h=indexedDB.open(i,e),m=si(h);return s&&h.addEventListener("upgradeneeded",g=>{s(si(h.result),g.oldVersion,g.newVersion,si(h.transaction),g)}),n&&h.addEventListener("blocked",g=>n(g.oldVersion,g.newVersion,g)),m.then(g=>{u&&g.addEventListener("close",()=>u()),a&&g.addEventListener("versionchange",_=>a(_.oldVersion,_.newVersion,_))}).catch(()=>{}),m}const Mw=["get","getKey","getAll","getAllKeys","count"],Uw=["put","add","delete","clear"],jh=new Map;function Vm(i,e){if(!(i instanceof IDBDatabase&&!(e in i)&&typeof e=="string"))return;if(jh.get(e))return jh.get(e);const n=e.replace(/FromIndex$/,""),s=e!==n,a=Uw.includes(n);if(!(n in(s?IDBIndex:IDBObjectStore).prototype)||!(a||Mw.includes(n)))return;const u=async function(h,...m){const g=this.transaction(h,a?"readwrite":"readonly");let _=g.store;return s&&(_=_.index(m.shift())),(await Promise.all([_[n](...m),a&&g.done]))[0]};return jh.set(e,u),u}Dw(i=>({...i,get:(e,n,s)=>Vm(e,n)||i.get(e,n,s),has:(e,n)=>!!Vm(e,n)||i.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bw{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(Fw(n)){const s=n.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(n=>n).join(" ")}}function Fw(i){const e=i.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Zh="@firebase/app",Mm="0.11.5";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sr=new Td("@firebase/app"),jw="@firebase/app-compat",zw="@firebase/analytics-compat",Bw="@firebase/analytics",$w="@firebase/app-check-compat",Hw="@firebase/app-check",Ww="@firebase/auth",Gw="@firebase/auth-compat",Kw="@firebase/database",qw="@firebase/data-connect",Qw="@firebase/database-compat",Xw="@firebase/functions",Yw="@firebase/functions-compat",Jw="@firebase/installations",Zw="@firebase/installations-compat",eT="@firebase/messaging",tT="@firebase/messaging-compat",nT="@firebase/performance",rT="@firebase/performance-compat",iT="@firebase/remote-config",sT="@firebase/remote-config-compat",oT="@firebase/storage",aT="@firebase/storage-compat",lT="@firebase/firestore",uT="@firebase/vertexai",cT="@firebase/firestore-compat",hT="firebase",dT="11.6.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ed="[DEFAULT]",fT={[Zh]:"fire-core",[jw]:"fire-core-compat",[Bw]:"fire-analytics",[zw]:"fire-analytics-compat",[Hw]:"fire-app-check",[$w]:"fire-app-check-compat",[Ww]:"fire-auth",[Gw]:"fire-auth-compat",[Kw]:"fire-rtdb",[qw]:"fire-data-connect",[Qw]:"fire-rtdb-compat",[Xw]:"fire-fn",[Yw]:"fire-fn-compat",[Jw]:"fire-iid",[Zw]:"fire-iid-compat",[eT]:"fire-fcm",[tT]:"fire-fcm-compat",[nT]:"fire-perf",[rT]:"fire-perf-compat",[iT]:"fire-rc",[sT]:"fire-rc-compat",[oT]:"fire-gcs",[aT]:"fire-gcs-compat",[lT]:"fire-fst",[cT]:"fire-fst-compat",[uT]:"fire-vertex","fire-js":"fire-js",[hT]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Iu=new Map,pT=new Map,td=new Map;function Um(i,e){try{i.container.addComponent(e)}catch(n){Sr.debug(`Component ${e.name} failed to register with FirebaseApp ${i.name}`,n)}}function so(i){const e=i.name;if(td.has(e))return Sr.debug(`There were multiple attempts to register component ${e}.`),!1;td.set(e,i);for(const n of Iu.values())Um(n,i);for(const n of pT.values())Um(n,i);return!0}function Sd(i,e){const n=i.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),i.container.getProvider(e)}function _n(i){return i==null?!1:i.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mT={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},oi=new La("app","Firebase",mT);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gT{constructor(e,n,s){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=s,this.container.addComponent(new qi("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw oi.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fo=dT;function vv(i,e={}){let n=i;typeof e!="object"&&(e={name:e});const s=Object.assign({name:ed,automaticDataCollectionEnabled:!1},e),a=s.name;if(typeof a!="string"||!a)throw oi.create("bad-app-name",{appName:String(a)});if(n||(n=fv()),!n)throw oi.create("no-options");const u=Iu.get(a);if(u){if(Ki(n,u.options)&&Ki(s,u.config))return u;throw oi.create("duplicate-app",{appName:a})}const h=new Tw(a);for(const g of td.values())h.addComponent(g);const m=new gT(n,s,h);return Iu.set(a,m),m}function yv(i=ed){const e=Iu.get(i);if(!e&&i===ed&&fv())return vv();if(!e)throw oi.create("no-app",{appName:i});return e}function ai(i,e,n){var s;let a=(s=fT[i])!==null&&s!==void 0?s:i;n&&(a+=`-${n}`);const u=a.match(/\s|\//),h=e.match(/\s|\//);if(u||h){const m=[`Unable to register library "${a}" with version "${e}":`];u&&m.push(`library name "${a}" contains illegal characters (whitespace or "/")`),u&&h&&m.push("and"),h&&m.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Sr.warn(m.join(" "));return}so(new qi(`${a}-version`,()=>({library:a,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vT="firebase-heartbeat-database",yT=1,Ta="firebase-heartbeat-store";let zh=null;function _v(){return zh||(zh=Vw(vT,yT,{upgrade:(i,e)=>{switch(e){case 0:try{i.createObjectStore(Ta)}catch(n){console.warn(n)}}}}).catch(i=>{throw oi.create("idb-open",{originalErrorMessage:i.message})})),zh}async function _T(i){try{const n=(await _v()).transaction(Ta),s=await n.objectStore(Ta).get(Ev(i));return await n.done,s}catch(e){if(e instanceof Rr)Sr.warn(e.message);else{const n=oi.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Sr.warn(n.message)}}}async function bm(i,e){try{const s=(await _v()).transaction(Ta,"readwrite");await s.objectStore(Ta).put(e,Ev(i)),await s.done}catch(n){if(n instanceof Rr)Sr.warn(n.message);else{const s=oi.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});Sr.warn(s.message)}}}function Ev(i){return`${i.name}!${i.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ET=1024,wT=30;class TT{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new ST(n),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}async triggerHeartbeat(){var e,n;try{const a=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),u=Fm();if(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===u||this._heartbeatsCache.heartbeats.some(h=>h.date===u))return;if(this._heartbeatsCache.heartbeats.push({date:u,agent:a}),this._heartbeatsCache.heartbeats.length>wT){const h=AT(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(h,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(s){Sr.warn(s)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=Fm(),{heartbeatsToSend:s,unsentEntries:a}=IT(this._heartbeatsCache.heartbeats),u=Tu(JSON.stringify({version:2,heartbeats:s}));return this._heartbeatsCache.lastSentHeartbeatDate=n,a.length>0?(this._heartbeatsCache.heartbeats=a,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),u}catch(n){return Sr.warn(n),""}}}function Fm(){return new Date().toISOString().substring(0,10)}function IT(i,e=ET){const n=[];let s=i.slice();for(const a of i){const u=n.find(h=>h.agent===a.agent);if(u){if(u.dates.push(a.date),jm(n)>e){u.dates.pop();break}}else if(n.push({agent:a.agent,dates:[a.date]}),jm(n)>e){n.pop();break}s=s.slice(1)}return{heartbeatsToSend:n,unsentEntries:s}}class ST{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return cw()?hw().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await _T(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const a=await this.read();return bm(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:a.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const a=await this.read();return bm(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:a.lastSentHeartbeatDate,heartbeats:[...a.heartbeats,...e.heartbeats]})}else return}}function jm(i){return Tu(JSON.stringify({version:2,heartbeats:i})).length}function AT(i){if(i.length===0)return-1;let e=0,n=i[0].date;for(let s=1;s<i.length;s++)i[s].date<n&&(n=i[s].date,e=s);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function RT(i){so(new qi("platform-logger",e=>new bw(e),"PRIVATE")),so(new qi("heartbeat",e=>new TT(e),"PRIVATE")),ai(Zh,Mm,i),ai(Zh,Mm,"esm2017"),ai("fire-js","")}RT("");function Ad(i,e){var n={};for(var s in i)Object.prototype.hasOwnProperty.call(i,s)&&e.indexOf(s)<0&&(n[s]=i[s]);if(i!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,s=Object.getOwnPropertySymbols(i);a<s.length;a++)e.indexOf(s[a])<0&&Object.prototype.propertyIsEnumerable.call(i,s[a])&&(n[s[a]]=i[s[a]]);return n}function wv(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const CT=wv,Tv=new La("auth","Firebase",wv());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Su=new Td("@firebase/auth");function PT(i,...e){Su.logLevel<=Se.WARN&&Su.warn(`Auth (${fo}): ${i}`,...e)}function fu(i,...e){Su.logLevel<=Se.ERROR&&Su.error(`Auth (${fo}): ${i}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Un(i,...e){throw Rd(i,...e)}function Yn(i,...e){return Rd(i,...e)}function Iv(i,e,n){const s=Object.assign(Object.assign({},CT()),{[e]:n});return new La("auth","Firebase",s).create(e,{appName:i.name})}function Ir(i){return Iv(i,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Rd(i,...e){if(typeof i!="string"){const n=e[0],s=[...e.slice(1)];return s[0]&&(s[0].appName=i.name),i._errorFactory.create(n,...s)}return Tv.create(i,...e)}function pe(i,e,...n){if(!i)throw Rd(e,...n)}function wr(i){const e="INTERNAL ASSERTION FAILED: "+i;throw fu(e),new Error(e)}function Ar(i,e){i||wr(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nd(){var i;return typeof self<"u"&&((i=self.location)===null||i===void 0?void 0:i.href)||""}function kT(){return zm()==="http:"||zm()==="https:"}function zm(){var i;return typeof self<"u"&&((i=self.location)===null||i===void 0?void 0:i.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function NT(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(kT()||ow()||"connection"in navigator)?navigator.onLine:!0}function OT(){if(typeof navigator>"u")return null;const i=navigator;return i.languages&&i.languages[0]||i.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ma{constructor(e,n){this.shortDelay=e,this.longDelay=n,Ar(n>e,"Short delay should be less than long delay!"),this.isMobile=rw()||aw()}get(){return NT()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cd(i,e){Ar(i.emulator,"Emulator should always be set here");const{url:n}=i.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sv{static initialize(e,n,s){this.fetchImpl=e,n&&(this.headersImpl=n),s&&(this.responseImpl=s)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;wr("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;wr("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;wr("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const DT={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xT=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],LT=new Ma(3e4,6e4);function di(i,e){return i.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:i.tenantId}):e}async function fi(i,e,n,s,a={}){return Av(i,a,async()=>{let u={},h={};s&&(e==="GET"?h=s:u={body:JSON.stringify(s)});const m=Va(Object.assign({key:i.config.apiKey},h)).slice(1),g=await i._getAdditionalHeaders();g["Content-Type"]="application/json",i.languageCode&&(g["X-Firebase-Locale"]=i.languageCode);const _=Object.assign({method:e,headers:g},u);return sw()||(_.referrerPolicy="no-referrer"),Sv.fetch()(await Rv(i,i.config.apiHost,n,m),_)})}async function Av(i,e,n){i._canInitEmulator=!1;const s=Object.assign(Object.assign({},DT),e);try{const a=new MT(i),u=await Promise.race([n(),a.promise]);a.clearNetworkTimeout();const h=await u.json();if("needConfirmation"in h)throw au(i,"account-exists-with-different-credential",h);if(u.ok&&!("errorMessage"in h))return h;{const m=u.ok?h.errorMessage:h.error.message,[g,_]=m.split(" : ");if(g==="FEDERATED_USER_ID_ALREADY_LINKED")throw au(i,"credential-already-in-use",h);if(g==="EMAIL_EXISTS")throw au(i,"email-already-in-use",h);if(g==="USER_DISABLED")throw au(i,"user-disabled",h);const w=s[g]||g.toLowerCase().replace(/[_\s]+/g,"-");if(_)throw Iv(i,w,_);Un(i,w)}}catch(a){if(a instanceof Rr)throw a;Un(i,"network-request-failed",{message:String(a)})}}async function Ua(i,e,n,s,a={}){const u=await fi(i,e,n,s,a);return"mfaPendingCredential"in u&&Un(i,"multi-factor-auth-required",{_serverResponse:u}),u}async function Rv(i,e,n,s){const a=`${e}${n}?${s}`,u=i,h=u.config.emulator?Cd(i.config,a):`${i.config.apiScheme}://${a}`;return xT.includes(n)&&(await u._persistenceManagerAvailable,u._getPersistenceType()==="COOKIE")?u._getPersistence()._getFinalTarget(h).toString():h}function VT(i){switch(i){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class MT{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,s)=>{this.timer=setTimeout(()=>s(Yn(this.auth,"network-request-failed")),LT.get())})}}function au(i,e,n){const s={appName:i.name};n.email&&(s.email=n.email),n.phoneNumber&&(s.phoneNumber=n.phoneNumber);const a=Yn(i,e,s);return a.customData._tokenResponse=n,a}function Bm(i){return i!==void 0&&i.enterprise!==void 0}class UT{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const n of this.recaptchaEnforcementState)if(n.provider&&n.provider===e)return VT(n.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function bT(i,e){return fi(i,"GET","/v2/recaptchaConfig",di(i,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function FT(i,e){return fi(i,"POST","/v1/accounts:delete",e)}async function Au(i,e){return fi(i,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ma(i){if(i)try{const e=new Date(Number(i));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function jT(i,e=!1){const n=Ut(i),s=await n.getIdToken(e),a=Pd(s);pe(a&&a.exp&&a.auth_time&&a.iat,n.auth,"internal-error");const u=typeof a.firebase=="object"?a.firebase:void 0,h=u==null?void 0:u.sign_in_provider;return{claims:a,token:s,authTime:ma(Bh(a.auth_time)),issuedAtTime:ma(Bh(a.iat)),expirationTime:ma(Bh(a.exp)),signInProvider:h||null,signInSecondFactor:(u==null?void 0:u.sign_in_second_factor)||null}}function Bh(i){return Number(i)*1e3}function Pd(i){const[e,n,s]=i.split(".");if(e===void 0||n===void 0||s===void 0)return fu("JWT malformed, contained fewer than 3 sections"),null;try{const a=hv(n);return a?JSON.parse(a):(fu("Failed to decode base64 JWT payload"),null)}catch(a){return fu("Caught error parsing JWT payload as JSON",a==null?void 0:a.toString()),null}}function $m(i){const e=Pd(i);return pe(e,"internal-error"),pe(typeof e.exp<"u","internal-error"),pe(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ia(i,e,n=!1){if(n)return e;try{return await e}catch(s){throw s instanceof Rr&&zT(s)&&i.auth.currentUser===i&&await i.auth.signOut(),s}}function zT({code:i}){return i==="auth/user-disabled"||i==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class BT{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var n;if(e){const s=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),s}else{this.errorBackoff=3e4;const a=((n=this.user.stsTokenManager.expirationTime)!==null&&n!==void 0?n:0)-Date.now()-3e5;return Math.max(0,a)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rd{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=ma(this.lastLoginAt),this.creationTime=ma(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ru(i){var e;const n=i.auth,s=await i.getIdToken(),a=await Ia(i,Au(n,{idToken:s}));pe(a==null?void 0:a.users.length,n,"internal-error");const u=a.users[0];i._notifyReloadListener(u);const h=!((e=u.providerUserInfo)===null||e===void 0)&&e.length?Cv(u.providerUserInfo):[],m=HT(i.providerData,h),g=i.isAnonymous,_=!(i.email&&u.passwordHash)&&!(m!=null&&m.length),w=g?_:!1,T={uid:u.localId,displayName:u.displayName||null,photoURL:u.photoUrl||null,email:u.email||null,emailVerified:u.emailVerified||!1,phoneNumber:u.phoneNumber||null,tenantId:u.tenantId||null,providerData:m,metadata:new rd(u.createdAt,u.lastLoginAt),isAnonymous:w};Object.assign(i,T)}async function $T(i){const e=Ut(i);await Ru(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function HT(i,e){return[...i.filter(s=>!e.some(a=>a.providerId===s.providerId)),...e]}function Cv(i){return i.map(e=>{var{providerId:n}=e,s=Ad(e,["providerId"]);return{providerId:n,uid:s.rawId||"",displayName:s.displayName||null,email:s.email||null,phoneNumber:s.phoneNumber||null,photoURL:s.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function WT(i,e){const n=await Av(i,{},async()=>{const s=Va({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:a,apiKey:u}=i.config,h=await Rv(i,a,"/v1/token",`key=${u}`),m=await i._getAdditionalHeaders();return m["Content-Type"]="application/x-www-form-urlencoded",Sv.fetch()(h,{method:"POST",headers:m,body:s})});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function GT(i,e){return fi(i,"POST","/v2/accounts:revokeToken",di(i,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class to{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){pe(e.idToken,"internal-error"),pe(typeof e.idToken<"u","internal-error"),pe(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):$m(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){pe(e.length!==0,"internal-error");const n=$m(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(pe(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:s,refreshToken:a,expiresIn:u}=await WT(e,n);this.updateTokensAndExpiration(s,a,Number(u))}updateTokensAndExpiration(e,n,s){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+s*1e3}static fromJSON(e,n){const{refreshToken:s,accessToken:a,expirationTime:u}=n,h=new to;return s&&(pe(typeof s=="string","internal-error",{appName:e}),h.refreshToken=s),a&&(pe(typeof a=="string","internal-error",{appName:e}),h.accessToken=a),u&&(pe(typeof u=="number","internal-error",{appName:e}),h.expirationTime=u),h}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new to,this.toJSON())}_performRefresh(){return wr("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jr(i,e){pe(typeof i=="string"||typeof i>"u","internal-error",{appName:e})}class Mn{constructor(e){var{uid:n,auth:s,stsTokenManager:a}=e,u=Ad(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new BT(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=n,this.auth=s,this.stsTokenManager=a,this.accessToken=a.accessToken,this.displayName=u.displayName||null,this.email=u.email||null,this.emailVerified=u.emailVerified||!1,this.phoneNumber=u.phoneNumber||null,this.photoURL=u.photoURL||null,this.isAnonymous=u.isAnonymous||!1,this.tenantId=u.tenantId||null,this.providerData=u.providerData?[...u.providerData]:[],this.metadata=new rd(u.createdAt||void 0,u.lastLoginAt||void 0)}async getIdToken(e){const n=await Ia(this,this.stsTokenManager.getToken(this.auth,e));return pe(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return jT(this,e)}reload(){return $T(this)}_assign(e){this!==e&&(pe(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>Object.assign({},n)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new Mn(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return n.metadata._copy(this.metadata),n}_onReload(e){pe(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let s=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),s=!0),n&&await Ru(this),await this.auth._persistUserIfCurrent(this),s&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(_n(this.auth.app))return Promise.reject(Ir(this.auth));const e=await this.getIdToken();return await Ia(this,FT(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){var s,a,u,h,m,g,_,w;const T=(s=n.displayName)!==null&&s!==void 0?s:void 0,D=(a=n.email)!==null&&a!==void 0?a:void 0,B=(u=n.phoneNumber)!==null&&u!==void 0?u:void 0,W=(h=n.photoURL)!==null&&h!==void 0?h:void 0,q=(m=n.tenantId)!==null&&m!==void 0?m:void 0,j=(g=n._redirectEventId)!==null&&g!==void 0?g:void 0,ne=(_=n.createdAt)!==null&&_!==void 0?_:void 0,ce=(w=n.lastLoginAt)!==null&&w!==void 0?w:void 0,{uid:le,emailVerified:ve,isAnonymous:Ve,providerData:Re,stsTokenManager:N}=n;pe(le&&N,e,"internal-error");const S=to.fromJSON(this.name,N);pe(typeof le=="string",e,"internal-error"),Jr(T,e.name),Jr(D,e.name),pe(typeof ve=="boolean",e,"internal-error"),pe(typeof Ve=="boolean",e,"internal-error"),Jr(B,e.name),Jr(W,e.name),Jr(q,e.name),Jr(j,e.name),Jr(ne,e.name),Jr(ce,e.name);const R=new Mn({uid:le,auth:e,email:D,emailVerified:ve,displayName:T,isAnonymous:Ve,photoURL:W,phoneNumber:B,tenantId:q,stsTokenManager:S,createdAt:ne,lastLoginAt:ce});return Re&&Array.isArray(Re)&&(R.providerData=Re.map(P=>Object.assign({},P))),j&&(R._redirectEventId=j),R}static async _fromIdTokenResponse(e,n,s=!1){const a=new to;a.updateFromServerResponse(n);const u=new Mn({uid:n.localId,auth:e,stsTokenManager:a,isAnonymous:s});return await Ru(u),u}static async _fromGetAccountInfoResponse(e,n,s){const a=n.users[0];pe(a.localId!==void 0,"internal-error");const u=a.providerUserInfo!==void 0?Cv(a.providerUserInfo):[],h=!(a.email&&a.passwordHash)&&!(u!=null&&u.length),m=new to;m.updateFromIdToken(s);const g=new Mn({uid:a.localId,auth:e,stsTokenManager:m,isAnonymous:h}),_={uid:a.localId,displayName:a.displayName||null,photoURL:a.photoUrl||null,email:a.email||null,emailVerified:a.emailVerified||!1,phoneNumber:a.phoneNumber||null,tenantId:a.tenantId||null,providerData:u,metadata:new rd(a.createdAt,a.lastLoginAt),isAnonymous:!(a.email&&a.passwordHash)&&!(u!=null&&u.length)};return Object.assign(g,_),g}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hm=new Map;function Tr(i){Ar(i instanceof Function,"Expected a class definition");let e=Hm.get(i);return e?(Ar(e instanceof i,"Instance stored in cache mismatched with class"),e):(e=new i,Hm.set(i,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pv{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}Pv.type="NONE";const Wm=Pv;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pu(i,e,n){return`firebase:${i}:${e}:${n}`}class no{constructor(e,n,s){this.persistence=e,this.auth=n,this.userKey=s;const{config:a,name:u}=this.auth;this.fullUserKey=pu(this.userKey,a.apiKey,u),this.fullPersistenceKey=pu("persistence",a.apiKey,u),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const n=await Au(this.auth,{idToken:e}).catch(()=>{});return n?Mn._fromGetAccountInfoResponse(this.auth,n,e):null}return Mn._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,s="authUser"){if(!n.length)return new no(Tr(Wm),e,s);const a=(await Promise.all(n.map(async _=>{if(await _._isAvailable())return _}))).filter(_=>_);let u=a[0]||Tr(Wm);const h=pu(s,e.config.apiKey,e.name);let m=null;for(const _ of n)try{const w=await _._get(h);if(w){let T;if(typeof w=="string"){const D=await Au(e,{idToken:w}).catch(()=>{});if(!D)break;T=await Mn._fromGetAccountInfoResponse(e,D,w)}else T=Mn._fromJSON(e,w);_!==u&&(m=T),u=_;break}}catch{}const g=a.filter(_=>_._shouldAllowMigration);return!u._shouldAllowMigration||!g.length?new no(u,e,s):(u=g[0],m&&await u._set(h,m.toJSON()),await Promise.all(n.map(async _=>{if(_!==u)try{await _._remove(h)}catch{}})),new no(u,e,s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gm(i){const e=i.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Dv(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(kv(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Lv(e))return"Blackberry";if(Vv(e))return"Webos";if(Nv(e))return"Safari";if((e.includes("chrome/")||Ov(e))&&!e.includes("edge/"))return"Chrome";if(xv(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,s=i.match(n);if((s==null?void 0:s.length)===2)return s[1]}return"Other"}function kv(i=Mt()){return/firefox\//i.test(i)}function Nv(i=Mt()){const e=i.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Ov(i=Mt()){return/crios\//i.test(i)}function Dv(i=Mt()){return/iemobile/i.test(i)}function xv(i=Mt()){return/android/i.test(i)}function Lv(i=Mt()){return/blackberry/i.test(i)}function Vv(i=Mt()){return/webos/i.test(i)}function kd(i=Mt()){return/iphone|ipad|ipod/i.test(i)||/macintosh/i.test(i)&&/mobile/i.test(i)}function KT(i=Mt()){var e;return kd(i)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function qT(){return lw()&&document.documentMode===10}function Mv(i=Mt()){return kd(i)||xv(i)||Vv(i)||Lv(i)||/windows phone/i.test(i)||Dv(i)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Uv(i,e=[]){let n;switch(i){case"Browser":n=Gm(Mt());break;case"Worker":n=`${Gm(Mt())}-${i}`;break;default:n=i}const s=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${fo}/${s}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class QT{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const s=u=>new Promise((h,m)=>{try{const g=e(u);h(g)}catch(g){m(g)}});s.onAbort=n,this.queue.push(s);const a=this.queue.length-1;return()=>{this.queue[a]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const s of this.queue)await s(e),s.onAbort&&n.push(s.onAbort)}catch(s){n.reverse();for(const a of n)try{a()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:s==null?void 0:s.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function XT(i,e={}){return fi(i,"GET","/v2/passwordPolicy",di(i,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const YT=6;class JT{constructor(e){var n,s,a,u;const h=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(n=h.minPasswordLength)!==null&&n!==void 0?n:YT,h.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=h.maxPasswordLength),h.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=h.containsLowercaseCharacter),h.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=h.containsUppercaseCharacter),h.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=h.containsNumericCharacter),h.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=h.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(a=(s=e.allowedNonAlphanumericCharacters)===null||s===void 0?void 0:s.join(""))!==null&&a!==void 0?a:"",this.forceUpgradeOnSignin=(u=e.forceUpgradeOnSignin)!==null&&u!==void 0?u:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var n,s,a,u,h,m;const g={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,g),this.validatePasswordCharacterOptions(e,g),g.isValid&&(g.isValid=(n=g.meetsMinPasswordLength)!==null&&n!==void 0?n:!0),g.isValid&&(g.isValid=(s=g.meetsMaxPasswordLength)!==null&&s!==void 0?s:!0),g.isValid&&(g.isValid=(a=g.containsLowercaseLetter)!==null&&a!==void 0?a:!0),g.isValid&&(g.isValid=(u=g.containsUppercaseLetter)!==null&&u!==void 0?u:!0),g.isValid&&(g.isValid=(h=g.containsNumericCharacter)!==null&&h!==void 0?h:!0),g.isValid&&(g.isValid=(m=g.containsNonAlphanumericCharacter)!==null&&m!==void 0?m:!0),g}validatePasswordLengthOptions(e,n){const s=this.customStrengthOptions.minPasswordLength,a=this.customStrengthOptions.maxPasswordLength;s&&(n.meetsMinPasswordLength=e.length>=s),a&&(n.meetsMaxPasswordLength=e.length<=a)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let s;for(let a=0;a<e.length;a++)s=e.charAt(a),this.updatePasswordCharacterOptionsStatuses(n,s>="a"&&s<="z",s>="A"&&s<="Z",s>="0"&&s<="9",this.allowedNonAlphanumericCharacters.includes(s))}updatePasswordCharacterOptionsStatuses(e,n,s,a,u){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=s)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=a)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=u))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ZT{constructor(e,n,s,a){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=s,this.config=a,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Km(this),this.idTokenSubscription=new Km(this),this.beforeStateQueue=new QT(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Tv,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=a.sdkClientVersion,this._persistenceManagerAvailable=new Promise(u=>this._resolvePersistenceManagerAvailable=u)}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=Tr(n)),this._initializationPromise=this.queue(async()=>{var s,a,u;if(!this._deleted&&(this.persistenceManager=await no.create(this,e),(s=this._resolvePersistenceManagerAvailable)===null||s===void 0||s.call(this),!this._deleted)){if(!((a=this._popupRedirectResolver)===null||a===void 0)&&a._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((u=this.currentUser)===null||u===void 0?void 0:u.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await Au(this,{idToken:e}),s=await Mn._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(s)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var n;if(_n(this.app)){const h=this.app.settings.authIdToken;return h?new Promise(m=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(h).then(m,m))}):this.directlySetCurrentUser(null)}const s=await this.assertedPersistence.getCurrentUser();let a=s,u=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const h=(n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId,m=a==null?void 0:a._redirectEventId,g=await this.tryRedirectSignIn(e);(!h||h===m)&&(g!=null&&g.user)&&(a=g.user,u=!0)}if(!a)return this.directlySetCurrentUser(null);if(!a._redirectEventId){if(u)try{await this.beforeStateQueue.runMiddleware(a)}catch(h){a=s,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(h))}return a?this.reloadAndSetCurrentUserOrClear(a):this.directlySetCurrentUser(null)}return pe(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===a._redirectEventId?this.directlySetCurrentUser(a):this.reloadAndSetCurrentUserOrClear(a)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await Ru(e)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=OT()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(_n(this.app))return Promise.reject(Ir(this));const n=e?Ut(e):null;return n&&pe(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&pe(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return _n(this.app)?Promise.reject(Ir(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return _n(this.app)?Promise.reject(Ir(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Tr(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await XT(this),n=new JT(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new La("auth","Firebase",e())}onAuthStateChanged(e,n,s){return this.registerStateListener(this.authStateSubscription,e,n,s)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,s){return this.registerStateListener(this.idTokenSubscription,e,n,s)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const s=this.onAuthStateChanged(()=>{s(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),s={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(s.tenantId=this.tenantId),await GT(this,s)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,n){const s=await this.getOrInitRedirectPersistenceManager(n);return e===null?s.removeCurrentUser():s.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&Tr(e)||this._popupRedirectResolver;pe(n,this,"argument-error"),this.redirectPersistenceManager=await no.create(this,[Tr(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,s;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)===null||n===void 0?void 0:n._redirectEventId)===e?this._currentUser:((s=this.redirectUser)===null||s===void 0?void 0:s._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const s=(n=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&n!==void 0?n:null;this.lastNotifiedUid!==s&&(this.lastNotifiedUid=s,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,s,a){if(this._deleted)return()=>{};const u=typeof n=="function"?n:n.next.bind(n);let h=!1;const m=this._isInitialized?Promise.resolve():this._initializationPromise;if(pe(m,this,"internal-error"),m.then(()=>{h||u(this.currentUser)}),typeof n=="function"){const g=e.addObserver(n,s,a);return()=>{h=!0,g()}}else{const g=e.addObserver(n);return()=>{h=!0,g()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return pe(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Uv(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const n={"X-Client-Version":this.clientVersion};this.app.options.appId&&(n["X-Firebase-gmpid"]=this.app.options.appId);const s=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());s&&(n["X-Firebase-Client"]=s);const a=await this._getAppCheckToken();return a&&(n["X-Firebase-AppCheck"]=a),n}async _getAppCheckToken(){var e;if(_n(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const n=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return n!=null&&n.error&&PT(`Error while retrieving App Check token: ${n.error}`),n==null?void 0:n.token}}function rs(i){return Ut(i)}class Km{constructor(e){this.auth=e,this.observer=null,this.addObserver=gw(n=>this.observer=n)}get next(){return pe(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Hu={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function eI(i){Hu=i}function bv(i){return Hu.loadJS(i)}function tI(){return Hu.recaptchaEnterpriseScript}function nI(){return Hu.gapiScript}function rI(i){return`__${i}${Math.floor(Math.random()*1e6)}`}class iI{constructor(){this.enterprise=new sI}ready(e){e()}execute(e,n){return Promise.resolve("token")}render(e,n){return""}}class sI{ready(e){e()}execute(e,n){return Promise.resolve("token")}render(e,n){return""}}const oI="recaptcha-enterprise",Fv="NO_RECAPTCHA";class aI{constructor(e){this.type=oI,this.auth=rs(e)}async verify(e="verify",n=!1){async function s(u){if(!n){if(u.tenantId==null&&u._agentRecaptchaConfig!=null)return u._agentRecaptchaConfig.siteKey;if(u.tenantId!=null&&u._tenantRecaptchaConfigs[u.tenantId]!==void 0)return u._tenantRecaptchaConfigs[u.tenantId].siteKey}return new Promise(async(h,m)=>{bT(u,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(g=>{if(g.recaptchaKey===void 0)m(new Error("recaptcha Enterprise site key undefined"));else{const _=new UT(g);return u.tenantId==null?u._agentRecaptchaConfig=_:u._tenantRecaptchaConfigs[u.tenantId]=_,h(_.siteKey)}}).catch(g=>{m(g)})})}function a(u,h,m){const g=window.grecaptcha;Bm(g)?g.enterprise.ready(()=>{g.enterprise.execute(u,{action:e}).then(_=>{h(_)}).catch(()=>{h(Fv)})}):m(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new iI().execute("siteKey",{action:"verify"}):new Promise((u,h)=>{s(this.auth).then(m=>{if(!n&&Bm(window.grecaptcha))a(m,u,h);else{if(typeof window>"u"){h(new Error("RecaptchaVerifier is only supported in browser"));return}let g=tI();g.length!==0&&(g+=m),bv(g).then(()=>{a(m,u,h)}).catch(_=>{h(_)})}}).catch(m=>{h(m)})})}}async function qm(i,e,n,s=!1,a=!1){const u=new aI(i);let h;if(a)h=Fv;else try{h=await u.verify(n)}catch{h=await u.verify(n,!0)}const m=Object.assign({},e);if(n==="mfaSmsEnrollment"||n==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in m){const g=m.phoneEnrollmentInfo.phoneNumber,_=m.phoneEnrollmentInfo.recaptchaToken;Object.assign(m,{phoneEnrollmentInfo:{phoneNumber:g,recaptchaToken:_,captchaResponse:h,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in m){const g=m.phoneSignInInfo.recaptchaToken;Object.assign(m,{phoneSignInInfo:{recaptchaToken:g,captchaResponse:h,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return m}return s?Object.assign(m,{captchaResp:h}):Object.assign(m,{captchaResponse:h}),Object.assign(m,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(m,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),m}async function id(i,e,n,s,a){var u;if(!((u=i._getRecaptchaConfig())===null||u===void 0)&&u.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const h=await qm(i,e,n,n==="getOobCode");return s(i,h)}else return s(i,e).catch(async h=>{if(h.code==="auth/missing-recaptcha-token"){console.log(`${n} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const m=await qm(i,e,n,n==="getOobCode");return s(i,m)}else return Promise.reject(h)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lI(i,e){const n=Sd(i,"auth");if(n.isInitialized()){const a=n.getImmediate(),u=n.getOptions();if(Ki(u,e??{}))return a;Un(a,"already-initialized")}return n.initialize({options:e})}function uI(i,e){const n=(e==null?void 0:e.persistence)||[],s=(Array.isArray(n)?n:[n]).map(Tr);e!=null&&e.errorMap&&i._updateErrorMap(e.errorMap),i._initializeWithPersistence(s,e==null?void 0:e.popupRedirectResolver)}function cI(i,e,n){const s=rs(i);pe(/^https?:\/\//.test(e),s,"invalid-emulator-scheme");const a=!1,u=jv(e),{host:h,port:m}=hI(e),g=m===null?"":`:${m}`,_={url:`${u}//${h}${g}/`},w=Object.freeze({host:h,port:m,protocol:u.replace(":",""),options:Object.freeze({disableWarnings:a})});if(!s._canInitEmulator){pe(s.config.emulator&&s.emulatorConfig,s,"emulator-config-failed"),pe(Ki(_,s.config.emulator)&&Ki(w,s.emulatorConfig),s,"emulator-config-failed");return}s.config.emulator=_,s.emulatorConfig=w,s.settings.appVerificationDisabledForTesting=!0,dI()}function jv(i){const e=i.indexOf(":");return e<0?"":i.substr(0,e+1)}function hI(i){const e=jv(i),n=/(\/\/)?([^?#/]+)/.exec(i.substr(e.length));if(!n)return{host:"",port:null};const s=n[2].split("@").pop()||"",a=/^(\[[^\]]+\])(:|$)/.exec(s);if(a){const u=a[1];return{host:u,port:Qm(s.substr(u.length+1))}}else{const[u,h]=s.split(":");return{host:u,port:Qm(h)}}}function Qm(i){if(!i)return null;const e=Number(i);return isNaN(e)?null:e}function dI(){function i(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",i):i())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nd{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return wr("not implemented")}_getIdTokenResponse(e){return wr("not implemented")}_linkToIdToken(e,n){return wr("not implemented")}_getReauthenticationResolver(e){return wr("not implemented")}}async function fI(i,e){return fi(i,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function pI(i,e){return Ua(i,"POST","/v1/accounts:signInWithPassword",di(i,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function mI(i,e){return Ua(i,"POST","/v1/accounts:signInWithEmailLink",di(i,e))}async function gI(i,e){return Ua(i,"POST","/v1/accounts:signInWithEmailLink",di(i,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sa extends Nd{constructor(e,n,s,a=null){super("password",s),this._email=e,this._password=n,this._tenantId=a}static _fromEmailAndPassword(e,n){return new Sa(e,n,"password")}static _fromEmailAndCode(e,n,s=null){return new Sa(e,n,"emailLink",s)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e;if(n!=null&&n.email&&(n!=null&&n.password)){if(n.signInMethod==="password")return this._fromEmailAndPassword(n.email,n.password);if(n.signInMethod==="emailLink")return this._fromEmailAndCode(n.email,n.password,n.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const n={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return id(e,n,"signInWithPassword",pI);case"emailLink":return mI(e,{email:this._email,oobCode:this._password});default:Un(e,"internal-error")}}async _linkToIdToken(e,n){switch(this.signInMethod){case"password":const s={idToken:n,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return id(e,s,"signUpPassword",fI);case"emailLink":return gI(e,{idToken:n,email:this._email,oobCode:this._password});default:Un(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ro(i,e){return Ua(i,"POST","/v1/accounts:signInWithIdp",di(i,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vI="http://localhost";class Qi extends Nd{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new Qi(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):Un("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:s,signInMethod:a}=n,u=Ad(n,["providerId","signInMethod"]);if(!s||!a)return null;const h=new Qi(s,a);return h.idToken=u.idToken||void 0,h.accessToken=u.accessToken||void 0,h.secret=u.secret,h.nonce=u.nonce,h.pendingToken=u.pendingToken||null,h}_getIdTokenResponse(e){const n=this.buildRequest();return ro(e,n)}_linkToIdToken(e,n){const s=this.buildRequest();return s.idToken=n,ro(e,s)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,ro(e,n)}buildRequest(){const e={requestUri:vI,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=Va(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yI(i){switch(i){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function _I(i){const e=da(fa(i)).link,n=e?da(fa(e)).deep_link_id:null,s=da(fa(i)).deep_link_id;return(s?da(fa(s)).link:null)||s||n||e||i}class Od{constructor(e){var n,s,a,u,h,m;const g=da(fa(e)),_=(n=g.apiKey)!==null&&n!==void 0?n:null,w=(s=g.oobCode)!==null&&s!==void 0?s:null,T=yI((a=g.mode)!==null&&a!==void 0?a:null);pe(_&&w&&T,"argument-error"),this.apiKey=_,this.operation=T,this.code=w,this.continueUrl=(u=g.continueUrl)!==null&&u!==void 0?u:null,this.languageCode=(h=g.lang)!==null&&h!==void 0?h:null,this.tenantId=(m=g.tenantId)!==null&&m!==void 0?m:null}static parseLink(e){const n=_I(e);try{return new Od(n)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class po{constructor(){this.providerId=po.PROVIDER_ID}static credential(e,n){return Sa._fromEmailAndPassword(e,n)}static credentialWithLink(e,n){const s=Od.parseLink(n);return pe(s,"argument-error"),Sa._fromEmailAndCode(e,s.code,s.tenantId)}}po.PROVIDER_ID="password";po.EMAIL_PASSWORD_SIGN_IN_METHOD="password";po.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zv{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ba extends zv{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zr extends ba{constructor(){super("facebook.com")}static credential(e){return Qi._fromParams({providerId:Zr.PROVIDER_ID,signInMethod:Zr.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Zr.credentialFromTaggedObject(e)}static credentialFromError(e){return Zr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Zr.credential(e.oauthAccessToken)}catch{return null}}}Zr.FACEBOOK_SIGN_IN_METHOD="facebook.com";Zr.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ei extends ba{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return Qi._fromParams({providerId:ei.PROVIDER_ID,signInMethod:ei.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return ei.credentialFromTaggedObject(e)}static credentialFromError(e){return ei.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:s}=e;if(!n&&!s)return null;try{return ei.credential(n,s)}catch{return null}}}ei.GOOGLE_SIGN_IN_METHOD="google.com";ei.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ti extends ba{constructor(){super("github.com")}static credential(e){return Qi._fromParams({providerId:ti.PROVIDER_ID,signInMethod:ti.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return ti.credentialFromTaggedObject(e)}static credentialFromError(e){return ti.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return ti.credential(e.oauthAccessToken)}catch{return null}}}ti.GITHUB_SIGN_IN_METHOD="github.com";ti.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ni extends ba{constructor(){super("twitter.com")}static credential(e,n){return Qi._fromParams({providerId:ni.PROVIDER_ID,signInMethod:ni.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return ni.credentialFromTaggedObject(e)}static credentialFromError(e){return ni.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:s}=e;if(!n||!s)return null;try{return ni.credential(n,s)}catch{return null}}}ni.TWITTER_SIGN_IN_METHOD="twitter.com";ni.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function EI(i,e){return Ua(i,"POST","/v1/accounts:signUp",di(i,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xi{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,s,a=!1){const u=await Mn._fromIdTokenResponse(e,s,a),h=Xm(s);return new Xi({user:u,providerId:h,_tokenResponse:s,operationType:n})}static async _forOperation(e,n,s){await e._updateTokensIfNecessary(s,!0);const a=Xm(s);return new Xi({user:e,providerId:a,_tokenResponse:s,operationType:n})}}function Xm(i){return i.providerId?i.providerId:"phoneNumber"in i?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cu extends Rr{constructor(e,n,s,a){var u;super(n.code,n.message),this.operationType=s,this.user=a,Object.setPrototypeOf(this,Cu.prototype),this.customData={appName:e.name,tenantId:(u=e.tenantId)!==null&&u!==void 0?u:void 0,_serverResponse:n.customData._serverResponse,operationType:s}}static _fromErrorAndOperation(e,n,s,a){return new Cu(e,n,s,a)}}function Bv(i,e,n,s){return(e==="reauthenticate"?n._getReauthenticationResolver(i):n._getIdTokenResponse(i)).catch(u=>{throw u.code==="auth/multi-factor-auth-required"?Cu._fromErrorAndOperation(i,u,e,s):u})}async function wI(i,e,n=!1){const s=await Ia(i,e._linkToIdToken(i.auth,await i.getIdToken()),n);return Xi._forOperation(i,"link",s)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function TI(i,e,n=!1){const{auth:s}=i;if(_n(s.app))return Promise.reject(Ir(s));const a="reauthenticate";try{const u=await Ia(i,Bv(s,a,e,i),n);pe(u.idToken,s,"internal-error");const h=Pd(u.idToken);pe(h,s,"internal-error");const{sub:m}=h;return pe(i.uid===m,s,"user-mismatch"),Xi._forOperation(i,a,u)}catch(u){throw(u==null?void 0:u.code)==="auth/user-not-found"&&Un(s,"user-mismatch"),u}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function $v(i,e,n=!1){if(_n(i.app))return Promise.reject(Ir(i));const s="signIn",a=await Bv(i,s,e),u=await Xi._fromIdTokenResponse(i,s,a);return n||await i._updateCurrentUser(u.user),u}async function II(i,e){return $v(rs(i),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Hv(i){const e=rs(i);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function NC(i,e,n){if(_n(i.app))return Promise.reject(Ir(i));const s=rs(i),h=await id(s,{returnSecureToken:!0,email:e,password:n,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",EI).catch(g=>{throw g.code==="auth/password-does-not-meet-requirements"&&Hv(i),g}),m=await Xi._fromIdTokenResponse(s,"signIn",h);return await s._updateCurrentUser(m.user),m}function SI(i,e,n){return _n(i.app)?Promise.reject(Ir(i)):II(Ut(i),po.credential(e,n)).catch(async s=>{throw s.code==="auth/password-does-not-meet-requirements"&&Hv(i),s})}function AI(i,e,n,s){return Ut(i).onIdTokenChanged(e,n,s)}function RI(i,e,n){return Ut(i).beforeAuthStateChanged(e,n)}function CI(i,e,n,s){return Ut(i).onAuthStateChanged(e,n,s)}function PI(i){return Ut(i).signOut()}const Pu="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wv{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(Pu,"1"),this.storage.removeItem(Pu),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kI=1e3,NI=10;class Gv extends Wv{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Mv(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const s=this.storage.getItem(n),a=this.localCache[n];s!==a&&e(n,a,s)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((h,m,g)=>{this.notifyListeners(h,g)});return}const s=e.key;n?this.detachListener():this.stopPolling();const a=()=>{const h=this.storage.getItem(s);!n&&this.localCache[s]===h||this.notifyListeners(s,h)},u=this.storage.getItem(s);qT()&&u!==e.newValue&&e.newValue!==e.oldValue?setTimeout(a,NI):a()}notifyListeners(e,n){this.localCache[e]=n;const s=this.listeners[e];if(s)for(const a of Array.from(s))a(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,s)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:s}),!0)})},kI)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}Gv.type="LOCAL";const OI=Gv;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kv extends Wv{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}Kv.type="SESSION";const qv=Kv;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function DI(i){return Promise.all(i.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wu{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(a=>a.isListeningto(e));if(n)return n;const s=new Wu(e);return this.receivers.push(s),s}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:s,eventType:a,data:u}=n.data,h=this.handlersMap[a];if(!(h!=null&&h.size))return;n.ports[0].postMessage({status:"ack",eventId:s,eventType:a});const m=Array.from(h).map(async _=>_(n.origin,u)),g=await DI(m);n.ports[0].postMessage({status:"done",eventId:s,eventType:a,response:g})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Wu.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dd(i="",e=10){let n="";for(let s=0;s<e;s++)n+=Math.floor(Math.random()*10);return i+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xI{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,s=50){const a=typeof MessageChannel<"u"?new MessageChannel:null;if(!a)throw new Error("connection_unavailable");let u,h;return new Promise((m,g)=>{const _=Dd("",20);a.port1.start();const w=setTimeout(()=>{g(new Error("unsupported_event"))},s);h={messageChannel:a,onMessage(T){const D=T;if(D.data.eventId===_)switch(D.data.status){case"ack":clearTimeout(w),u=setTimeout(()=>{g(new Error("timeout"))},3e3);break;case"done":clearTimeout(u),m(D.data.response);break;default:clearTimeout(w),clearTimeout(u),g(new Error("invalid_response"));break}}},this.handlers.add(h),a.port1.addEventListener("message",h.onMessage),this.target.postMessage({eventType:e,eventId:_,data:n},[a.port2])}).finally(()=>{h&&this.removeMessageHandler(h)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jn(){return window}function LI(i){Jn().location.href=i}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qv(){return typeof Jn().WorkerGlobalScope<"u"&&typeof Jn().importScripts=="function"}async function VI(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function MI(){var i;return((i=navigator==null?void 0:navigator.serviceWorker)===null||i===void 0?void 0:i.controller)||null}function UI(){return Qv()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xv="firebaseLocalStorageDb",bI=1,ku="firebaseLocalStorage",Yv="fbase_key";class Fa{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function Gu(i,e){return i.transaction([ku],e?"readwrite":"readonly").objectStore(ku)}function FI(){const i=indexedDB.deleteDatabase(Xv);return new Fa(i).toPromise()}function sd(){const i=indexedDB.open(Xv,bI);return new Promise((e,n)=>{i.addEventListener("error",()=>{n(i.error)}),i.addEventListener("upgradeneeded",()=>{const s=i.result;try{s.createObjectStore(ku,{keyPath:Yv})}catch(a){n(a)}}),i.addEventListener("success",async()=>{const s=i.result;s.objectStoreNames.contains(ku)?e(s):(s.close(),await FI(),e(await sd()))})})}async function Ym(i,e,n){const s=Gu(i,!0).put({[Yv]:e,value:n});return new Fa(s).toPromise()}async function jI(i,e){const n=Gu(i,!1).get(e),s=await new Fa(n).toPromise();return s===void 0?null:s.value}function Jm(i,e){const n=Gu(i,!0).delete(e);return new Fa(n).toPromise()}const zI=800,BI=3;class Jv{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await sd(),this.db)}async _withRetries(e){let n=0;for(;;)try{const s=await this._openDb();return await e(s)}catch(s){if(n++>BI)throw s;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Qv()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Wu._getInstance(UI()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var e,n;if(this.activeServiceWorker=await VI(),!this.activeServiceWorker)return;this.sender=new xI(this.activeServiceWorker);const s=await this.sender._send("ping",{},800);s&&!((e=s[0])===null||e===void 0)&&e.fulfilled&&!((n=s[0])===null||n===void 0)&&n.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||MI()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await sd();return await Ym(e,Pu,"1"),await Jm(e,Pu),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(s=>Ym(s,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(s=>jI(s,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>Jm(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(a=>{const u=Gu(a,!1).getAll();return new Fa(u).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],s=new Set;if(e.length!==0)for(const{fbase_key:a,value:u}of e)s.add(a),JSON.stringify(this.localCache[a])!==JSON.stringify(u)&&(this.notifyListeners(a,u),n.push(a));for(const a of Object.keys(this.localCache))this.localCache[a]&&!s.has(a)&&(this.notifyListeners(a,null),n.push(a));return n}notifyListeners(e,n){this.localCache[e]=n;const s=this.listeners[e];if(s)for(const a of Array.from(s))a(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),zI)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Jv.type="LOCAL";const $I=Jv;new Ma(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function HI(i,e){return e?Tr(e):(pe(i._popupRedirectResolver,i,"argument-error"),i._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xd extends Nd{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return ro(e,this._buildIdpRequest())}_linkToIdToken(e,n){return ro(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return ro(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function WI(i){return $v(i.auth,new xd(i),i.bypassAuthState)}function GI(i){const{auth:e,user:n}=i;return pe(n,e,"internal-error"),TI(n,new xd(i),i.bypassAuthState)}async function KI(i){const{auth:e,user:n}=i;return pe(n,e,"internal-error"),wI(n,new xd(i),i.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zv{constructor(e,n,s,a,u=!1){this.auth=e,this.resolver=s,this.user=a,this.bypassAuthState=u,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(s){this.reject(s)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:s,postBody:a,tenantId:u,error:h,type:m}=e;if(h){this.reject(h);return}const g={auth:this.auth,requestUri:n,sessionId:s,tenantId:u||void 0,postBody:a||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(m)(g))}catch(_){this.reject(_)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return WI;case"linkViaPopup":case"linkViaRedirect":return KI;case"reauthViaPopup":case"reauthViaRedirect":return GI;default:Un(this.auth,"internal-error")}}resolve(e){Ar(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Ar(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qI=new Ma(2e3,1e4);class eo extends Zv{constructor(e,n,s,a,u){super(e,n,a,u),this.provider=s,this.authWindow=null,this.pollId=null,eo.currentPopupAction&&eo.currentPopupAction.cancel(),eo.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return pe(e,this.auth,"internal-error"),e}async onExecution(){Ar(this.filter.length===1,"Popup operations only handle one event");const e=Dd();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(Yn(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(Yn(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,eo.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,s;if(!((s=(n=this.authWindow)===null||n===void 0?void 0:n.window)===null||s===void 0)&&s.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Yn(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,qI.get())};e()}}eo.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const QI="pendingRedirect",mu=new Map;class XI extends Zv{constructor(e,n,s=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,s),this.eventId=null}async execute(){let e=mu.get(this.auth._key());if(!e){try{const s=await YI(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(s)}catch(n){e=()=>Promise.reject(n)}mu.set(this.auth._key(),e)}return this.bypassAuthState||mu.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function YI(i,e){const n=eS(e),s=ZI(i);if(!await s._isAvailable())return!1;const a=await s._get(n)==="true";return await s._remove(n),a}function JI(i,e){mu.set(i._key(),e)}function ZI(i){return Tr(i._redirectPersistence)}function eS(i){return pu(QI,i.config.apiKey,i.name)}async function tS(i,e,n=!1){if(_n(i.app))return Promise.reject(Ir(i));const s=rs(i),a=HI(s,e),h=await new XI(s,a,n).execute();return h&&!n&&(delete h.user._redirectEventId,await s._persistUserIfCurrent(h.user),await s._setRedirectUser(null,e)),h}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nS=10*60*1e3;class rS{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(s=>{this.isEventForConsumer(e,s)&&(n=!0,this.sendToConsumer(e,s),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!iS(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var s;if(e.error&&!ey(e)){const a=((s=e.error.code)===null||s===void 0?void 0:s.split("auth/")[1])||"internal-error";n.onError(Yn(this.auth,a))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const s=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&s}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=nS&&this.cachedEventUids.clear(),this.cachedEventUids.has(Zm(e))}saveEventToCache(e){this.cachedEventUids.add(Zm(e)),this.lastProcessedEventTime=Date.now()}}function Zm(i){return[i.type,i.eventId,i.sessionId,i.tenantId].filter(e=>e).join("-")}function ey({type:i,error:e}){return i==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function iS(i){switch(i.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return ey(i);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function sS(i,e={}){return fi(i,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oS=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,aS=/^https?/;async function lS(i){if(i.config.emulator)return;const{authorizedDomains:e}=await sS(i);for(const n of e)try{if(uS(n))return}catch{}Un(i,"unauthorized-domain")}function uS(i){const e=nd(),{protocol:n,hostname:s}=new URL(e);if(i.startsWith("chrome-extension://")){const h=new URL(i);return h.hostname===""&&s===""?n==="chrome-extension:"&&i.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&h.hostname===s}if(!aS.test(n))return!1;if(oS.test(i))return s===i;const a=i.replace(/\./g,"\\.");return new RegExp("^(.+\\."+a+"|"+a+")$","i").test(s)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cS=new Ma(3e4,6e4);function eg(){const i=Jn().___jsl;if(i!=null&&i.H){for(const e of Object.keys(i.H))if(i.H[e].r=i.H[e].r||[],i.H[e].L=i.H[e].L||[],i.H[e].r=[...i.H[e].L],i.CP)for(let n=0;n<i.CP.length;n++)i.CP[n]=null}}function hS(i){return new Promise((e,n)=>{var s,a,u;function h(){eg(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{eg(),n(Yn(i,"network-request-failed"))},timeout:cS.get()})}if(!((a=(s=Jn().gapi)===null||s===void 0?void 0:s.iframes)===null||a===void 0)&&a.Iframe)e(gapi.iframes.getContext());else if(!((u=Jn().gapi)===null||u===void 0)&&u.load)h();else{const m=rI("iframefcb");return Jn()[m]=()=>{gapi.load?h():n(Yn(i,"network-request-failed"))},bv(`${nI()}?onload=${m}`).catch(g=>n(g))}}).catch(e=>{throw gu=null,e})}let gu=null;function dS(i){return gu=gu||hS(i),gu}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fS=new Ma(5e3,15e3),pS="__/auth/iframe",mS="emulator/auth/iframe",gS={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},vS=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function yS(i){const e=i.config;pe(e.authDomain,i,"auth-domain-config-required");const n=e.emulator?Cd(e,mS):`https://${i.config.authDomain}/${pS}`,s={apiKey:e.apiKey,appName:i.name,v:fo},a=vS.get(i.config.apiHost);a&&(s.eid=a);const u=i._getFrameworks();return u.length&&(s.fw=u.join(",")),`${n}?${Va(s).slice(1)}`}async function _S(i){const e=await dS(i),n=Jn().gapi;return pe(n,i,"internal-error"),e.open({where:document.body,url:yS(i),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:gS,dontclear:!0},s=>new Promise(async(a,u)=>{await s.restyle({setHideOnLeave:!1});const h=Yn(i,"network-request-failed"),m=Jn().setTimeout(()=>{u(h)},fS.get());function g(){Jn().clearTimeout(m),a(s)}s.ping(g).then(g,()=>{u(h)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ES={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},wS=500,TS=600,IS="_blank",SS="http://localhost";class tg{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function AS(i,e,n,s=wS,a=TS){const u=Math.max((window.screen.availHeight-a)/2,0).toString(),h=Math.max((window.screen.availWidth-s)/2,0).toString();let m="";const g=Object.assign(Object.assign({},ES),{width:s.toString(),height:a.toString(),top:u,left:h}),_=Mt().toLowerCase();n&&(m=Ov(_)?IS:n),kv(_)&&(e=e||SS,g.scrollbars="yes");const w=Object.entries(g).reduce((D,[B,W])=>`${D}${B}=${W},`,"");if(KT(_)&&m!=="_self")return RS(e||"",m),new tg(null);const T=window.open(e||"",m,w);pe(T,i,"popup-blocked");try{T.focus()}catch{}return new tg(T)}function RS(i,e){const n=document.createElement("a");n.href=i,n.target=e;const s=document.createEvent("MouseEvent");s.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(s)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const CS="__/auth/handler",PS="emulator/auth/handler",kS=encodeURIComponent("fac");async function ng(i,e,n,s,a,u){pe(i.config.authDomain,i,"auth-domain-config-required"),pe(i.config.apiKey,i,"invalid-api-key");const h={apiKey:i.config.apiKey,appName:i.name,authType:n,redirectUrl:s,v:fo,eventId:a};if(e instanceof zv){e.setDefaultLanguage(i.languageCode),h.providerId=e.providerId||"",mw(e.getCustomParameters())||(h.customParameters=JSON.stringify(e.getCustomParameters()));for(const[w,T]of Object.entries({}))h[w]=T}if(e instanceof ba){const w=e.getScopes().filter(T=>T!=="");w.length>0&&(h.scopes=w.join(","))}i.tenantId&&(h.tid=i.tenantId);const m=h;for(const w of Object.keys(m))m[w]===void 0&&delete m[w];const g=await i._getAppCheckToken(),_=g?`#${kS}=${encodeURIComponent(g)}`:"";return`${NS(i)}?${Va(m).slice(1)}${_}`}function NS({config:i}){return i.emulator?Cd(i,PS):`https://${i.authDomain}/${CS}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $h="webStorageSupport";class OS{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=qv,this._completeRedirectFn=tS,this._overrideRedirectResult=JI}async _openPopup(e,n,s,a){var u;Ar((u=this.eventManagers[e._key()])===null||u===void 0?void 0:u.manager,"_initialize() not called before _openPopup()");const h=await ng(e,n,s,nd(),a);return AS(e,h,Dd())}async _openRedirect(e,n,s,a){await this._originValidation(e);const u=await ng(e,n,s,nd(),a);return LI(u),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:a,promise:u}=this.eventManagers[n];return a?Promise.resolve(a):(Ar(u,"If manager is not set, promise should be"),u)}const s=this.initAndGetManager(e);return this.eventManagers[n]={promise:s},s.catch(()=>{delete this.eventManagers[n]}),s}async initAndGetManager(e){const n=await _S(e),s=new rS(e);return n.register("authEvent",a=>(pe(a==null?void 0:a.authEvent,e,"invalid-auth-event"),{status:s.onEvent(a.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:s},this.iframes[e._key()]=n,s}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send($h,{type:$h},a=>{var u;const h=(u=a==null?void 0:a[0])===null||u===void 0?void 0:u[$h];h!==void 0&&n(!!h),Un(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=lS(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return Mv()||Nv()||kd()}}const DS=OS;var rg="@firebase/auth",ig="1.10.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xS{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(s=>{e((s==null?void 0:s.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){pe(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function LS(i){switch(i){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function VS(i){so(new qi("auth",(e,{options:n})=>{const s=e.getProvider("app").getImmediate(),a=e.getProvider("heartbeat"),u=e.getProvider("app-check-internal"),{apiKey:h,authDomain:m}=s.options;pe(h&&!h.includes(":"),"invalid-api-key",{appName:s.name});const g={apiKey:h,authDomain:m,clientPlatform:i,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Uv(i)},_=new ZT(s,a,u,g);return uI(_,n),_},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,s)=>{e.getProvider("auth-internal").initialize()})),so(new qi("auth-internal",e=>{const n=rs(e.getProvider("auth").getImmediate());return(s=>new xS(s))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),ai(rg,ig,LS(i)),ai(rg,ig,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const MS=5*60,US=pv("authIdTokenMaxAge")||MS;let sg=null;const bS=i=>async e=>{const n=e&&await e.getIdTokenResult(),s=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(s&&s>US)return;const a=n==null?void 0:n.token;sg!==a&&(sg=a,await fetch(i,{method:a?"POST":"DELETE",headers:a?{Authorization:`Bearer ${a}`}:{}}))};function ty(i=yv()){const e=Sd(i,"auth");if(e.isInitialized())return e.getImmediate();const n=lI(i,{popupRedirectResolver:DS,persistence:[$I,OI,qv]}),s=pv("authTokenSyncURL");if(s&&typeof isSecureContext=="boolean"&&isSecureContext){const u=new URL(s,location.origin);if(location.origin===u.origin){const h=bS(u.toString());RI(n,h,()=>h(n.currentUser)),AI(n,m=>h(m))}}const a=dv("auth");return a&&cI(n,`http://${a}`),n}function FS(){var i,e;return(e=(i=document.getElementsByTagName("head"))===null||i===void 0?void 0:i[0])!==null&&e!==void 0?e:document}eI({loadJS(i){return new Promise((e,n)=>{const s=document.createElement("script");s.setAttribute("src",i),s.onload=e,s.onerror=a=>{const u=Yn("internal-error");u.customData=a,n(u)},s.type="text/javascript",s.charset="UTF-8",FS().appendChild(s)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});VS("Browser");var jS="firebase",zS="11.6.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ai(jS,zS,"app");var og=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Ld;(function(){var i;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(N,S){function R(){}R.prototype=S.prototype,N.D=S.prototype,N.prototype=new R,N.prototype.constructor=N,N.C=function(P,O,L){for(var A=Array(arguments.length-2),Je=2;Je<arguments.length;Je++)A[Je-2]=arguments[Je];return S.prototype[O].apply(P,A)}}function n(){this.blockSize=-1}function s(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(s,n),s.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function a(N,S,R){R||(R=0);var P=Array(16);if(typeof S=="string")for(var O=0;16>O;++O)P[O]=S.charCodeAt(R++)|S.charCodeAt(R++)<<8|S.charCodeAt(R++)<<16|S.charCodeAt(R++)<<24;else for(O=0;16>O;++O)P[O]=S[R++]|S[R++]<<8|S[R++]<<16|S[R++]<<24;S=N.g[0],R=N.g[1],O=N.g[2];var L=N.g[3],A=S+(L^R&(O^L))+P[0]+3614090360&4294967295;S=R+(A<<7&4294967295|A>>>25),A=L+(O^S&(R^O))+P[1]+3905402710&4294967295,L=S+(A<<12&4294967295|A>>>20),A=O+(R^L&(S^R))+P[2]+606105819&4294967295,O=L+(A<<17&4294967295|A>>>15),A=R+(S^O&(L^S))+P[3]+3250441966&4294967295,R=O+(A<<22&4294967295|A>>>10),A=S+(L^R&(O^L))+P[4]+4118548399&4294967295,S=R+(A<<7&4294967295|A>>>25),A=L+(O^S&(R^O))+P[5]+1200080426&4294967295,L=S+(A<<12&4294967295|A>>>20),A=O+(R^L&(S^R))+P[6]+2821735955&4294967295,O=L+(A<<17&4294967295|A>>>15),A=R+(S^O&(L^S))+P[7]+4249261313&4294967295,R=O+(A<<22&4294967295|A>>>10),A=S+(L^R&(O^L))+P[8]+1770035416&4294967295,S=R+(A<<7&4294967295|A>>>25),A=L+(O^S&(R^O))+P[9]+2336552879&4294967295,L=S+(A<<12&4294967295|A>>>20),A=O+(R^L&(S^R))+P[10]+4294925233&4294967295,O=L+(A<<17&4294967295|A>>>15),A=R+(S^O&(L^S))+P[11]+2304563134&4294967295,R=O+(A<<22&4294967295|A>>>10),A=S+(L^R&(O^L))+P[12]+1804603682&4294967295,S=R+(A<<7&4294967295|A>>>25),A=L+(O^S&(R^O))+P[13]+4254626195&4294967295,L=S+(A<<12&4294967295|A>>>20),A=O+(R^L&(S^R))+P[14]+2792965006&4294967295,O=L+(A<<17&4294967295|A>>>15),A=R+(S^O&(L^S))+P[15]+1236535329&4294967295,R=O+(A<<22&4294967295|A>>>10),A=S+(O^L&(R^O))+P[1]+4129170786&4294967295,S=R+(A<<5&4294967295|A>>>27),A=L+(R^O&(S^R))+P[6]+3225465664&4294967295,L=S+(A<<9&4294967295|A>>>23),A=O+(S^R&(L^S))+P[11]+643717713&4294967295,O=L+(A<<14&4294967295|A>>>18),A=R+(L^S&(O^L))+P[0]+3921069994&4294967295,R=O+(A<<20&4294967295|A>>>12),A=S+(O^L&(R^O))+P[5]+3593408605&4294967295,S=R+(A<<5&4294967295|A>>>27),A=L+(R^O&(S^R))+P[10]+38016083&4294967295,L=S+(A<<9&4294967295|A>>>23),A=O+(S^R&(L^S))+P[15]+3634488961&4294967295,O=L+(A<<14&4294967295|A>>>18),A=R+(L^S&(O^L))+P[4]+3889429448&4294967295,R=O+(A<<20&4294967295|A>>>12),A=S+(O^L&(R^O))+P[9]+568446438&4294967295,S=R+(A<<5&4294967295|A>>>27),A=L+(R^O&(S^R))+P[14]+3275163606&4294967295,L=S+(A<<9&4294967295|A>>>23),A=O+(S^R&(L^S))+P[3]+4107603335&4294967295,O=L+(A<<14&4294967295|A>>>18),A=R+(L^S&(O^L))+P[8]+1163531501&4294967295,R=O+(A<<20&4294967295|A>>>12),A=S+(O^L&(R^O))+P[13]+2850285829&4294967295,S=R+(A<<5&4294967295|A>>>27),A=L+(R^O&(S^R))+P[2]+4243563512&4294967295,L=S+(A<<9&4294967295|A>>>23),A=O+(S^R&(L^S))+P[7]+1735328473&4294967295,O=L+(A<<14&4294967295|A>>>18),A=R+(L^S&(O^L))+P[12]+2368359562&4294967295,R=O+(A<<20&4294967295|A>>>12),A=S+(R^O^L)+P[5]+4294588738&4294967295,S=R+(A<<4&4294967295|A>>>28),A=L+(S^R^O)+P[8]+2272392833&4294967295,L=S+(A<<11&4294967295|A>>>21),A=O+(L^S^R)+P[11]+1839030562&4294967295,O=L+(A<<16&4294967295|A>>>16),A=R+(O^L^S)+P[14]+4259657740&4294967295,R=O+(A<<23&4294967295|A>>>9),A=S+(R^O^L)+P[1]+2763975236&4294967295,S=R+(A<<4&4294967295|A>>>28),A=L+(S^R^O)+P[4]+1272893353&4294967295,L=S+(A<<11&4294967295|A>>>21),A=O+(L^S^R)+P[7]+4139469664&4294967295,O=L+(A<<16&4294967295|A>>>16),A=R+(O^L^S)+P[10]+3200236656&4294967295,R=O+(A<<23&4294967295|A>>>9),A=S+(R^O^L)+P[13]+681279174&4294967295,S=R+(A<<4&4294967295|A>>>28),A=L+(S^R^O)+P[0]+3936430074&4294967295,L=S+(A<<11&4294967295|A>>>21),A=O+(L^S^R)+P[3]+3572445317&4294967295,O=L+(A<<16&4294967295|A>>>16),A=R+(O^L^S)+P[6]+76029189&4294967295,R=O+(A<<23&4294967295|A>>>9),A=S+(R^O^L)+P[9]+3654602809&4294967295,S=R+(A<<4&4294967295|A>>>28),A=L+(S^R^O)+P[12]+3873151461&4294967295,L=S+(A<<11&4294967295|A>>>21),A=O+(L^S^R)+P[15]+530742520&4294967295,O=L+(A<<16&4294967295|A>>>16),A=R+(O^L^S)+P[2]+3299628645&4294967295,R=O+(A<<23&4294967295|A>>>9),A=S+(O^(R|~L))+P[0]+4096336452&4294967295,S=R+(A<<6&4294967295|A>>>26),A=L+(R^(S|~O))+P[7]+1126891415&4294967295,L=S+(A<<10&4294967295|A>>>22),A=O+(S^(L|~R))+P[14]+2878612391&4294967295,O=L+(A<<15&4294967295|A>>>17),A=R+(L^(O|~S))+P[5]+4237533241&4294967295,R=O+(A<<21&4294967295|A>>>11),A=S+(O^(R|~L))+P[12]+1700485571&4294967295,S=R+(A<<6&4294967295|A>>>26),A=L+(R^(S|~O))+P[3]+2399980690&4294967295,L=S+(A<<10&4294967295|A>>>22),A=O+(S^(L|~R))+P[10]+4293915773&4294967295,O=L+(A<<15&4294967295|A>>>17),A=R+(L^(O|~S))+P[1]+2240044497&4294967295,R=O+(A<<21&4294967295|A>>>11),A=S+(O^(R|~L))+P[8]+1873313359&4294967295,S=R+(A<<6&4294967295|A>>>26),A=L+(R^(S|~O))+P[15]+4264355552&4294967295,L=S+(A<<10&4294967295|A>>>22),A=O+(S^(L|~R))+P[6]+2734768916&4294967295,O=L+(A<<15&4294967295|A>>>17),A=R+(L^(O|~S))+P[13]+1309151649&4294967295,R=O+(A<<21&4294967295|A>>>11),A=S+(O^(R|~L))+P[4]+4149444226&4294967295,S=R+(A<<6&4294967295|A>>>26),A=L+(R^(S|~O))+P[11]+3174756917&4294967295,L=S+(A<<10&4294967295|A>>>22),A=O+(S^(L|~R))+P[2]+718787259&4294967295,O=L+(A<<15&4294967295|A>>>17),A=R+(L^(O|~S))+P[9]+3951481745&4294967295,N.g[0]=N.g[0]+S&4294967295,N.g[1]=N.g[1]+(O+(A<<21&4294967295|A>>>11))&4294967295,N.g[2]=N.g[2]+O&4294967295,N.g[3]=N.g[3]+L&4294967295}s.prototype.u=function(N,S){S===void 0&&(S=N.length);for(var R=S-this.blockSize,P=this.B,O=this.h,L=0;L<S;){if(O==0)for(;L<=R;)a(this,N,L),L+=this.blockSize;if(typeof N=="string"){for(;L<S;)if(P[O++]=N.charCodeAt(L++),O==this.blockSize){a(this,P),O=0;break}}else for(;L<S;)if(P[O++]=N[L++],O==this.blockSize){a(this,P),O=0;break}}this.h=O,this.o+=S},s.prototype.v=function(){var N=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);N[0]=128;for(var S=1;S<N.length-8;++S)N[S]=0;var R=8*this.o;for(S=N.length-8;S<N.length;++S)N[S]=R&255,R/=256;for(this.u(N),N=Array(16),S=R=0;4>S;++S)for(var P=0;32>P;P+=8)N[R++]=this.g[S]>>>P&255;return N};function u(N,S){var R=m;return Object.prototype.hasOwnProperty.call(R,N)?R[N]:R[N]=S(N)}function h(N,S){this.h=S;for(var R=[],P=!0,O=N.length-1;0<=O;O--){var L=N[O]|0;P&&L==S||(R[O]=L,P=!1)}this.g=R}var m={};function g(N){return-128<=N&&128>N?u(N,function(S){return new h([S|0],0>S?-1:0)}):new h([N|0],0>N?-1:0)}function _(N){if(isNaN(N)||!isFinite(N))return T;if(0>N)return j(_(-N));for(var S=[],R=1,P=0;N>=R;P++)S[P]=N/R|0,R*=4294967296;return new h(S,0)}function w(N,S){if(N.length==0)throw Error("number format error: empty string");if(S=S||10,2>S||36<S)throw Error("radix out of range: "+S);if(N.charAt(0)=="-")return j(w(N.substring(1),S));if(0<=N.indexOf("-"))throw Error('number format error: interior "-" character');for(var R=_(Math.pow(S,8)),P=T,O=0;O<N.length;O+=8){var L=Math.min(8,N.length-O),A=parseInt(N.substring(O,O+L),S);8>L?(L=_(Math.pow(S,L)),P=P.j(L).add(_(A))):(P=P.j(R),P=P.add(_(A)))}return P}var T=g(0),D=g(1),B=g(16777216);i=h.prototype,i.m=function(){if(q(this))return-j(this).m();for(var N=0,S=1,R=0;R<this.g.length;R++){var P=this.i(R);N+=(0<=P?P:4294967296+P)*S,S*=4294967296}return N},i.toString=function(N){if(N=N||10,2>N||36<N)throw Error("radix out of range: "+N);if(W(this))return"0";if(q(this))return"-"+j(this).toString(N);for(var S=_(Math.pow(N,6)),R=this,P="";;){var O=ve(R,S).g;R=ne(R,O.j(S));var L=((0<R.g.length?R.g[0]:R.h)>>>0).toString(N);if(R=O,W(R))return L+P;for(;6>L.length;)L="0"+L;P=L+P}},i.i=function(N){return 0>N?0:N<this.g.length?this.g[N]:this.h};function W(N){if(N.h!=0)return!1;for(var S=0;S<N.g.length;S++)if(N.g[S]!=0)return!1;return!0}function q(N){return N.h==-1}i.l=function(N){return N=ne(this,N),q(N)?-1:W(N)?0:1};function j(N){for(var S=N.g.length,R=[],P=0;P<S;P++)R[P]=~N.g[P];return new h(R,~N.h).add(D)}i.abs=function(){return q(this)?j(this):this},i.add=function(N){for(var S=Math.max(this.g.length,N.g.length),R=[],P=0,O=0;O<=S;O++){var L=P+(this.i(O)&65535)+(N.i(O)&65535),A=(L>>>16)+(this.i(O)>>>16)+(N.i(O)>>>16);P=A>>>16,L&=65535,A&=65535,R[O]=A<<16|L}return new h(R,R[R.length-1]&-2147483648?-1:0)};function ne(N,S){return N.add(j(S))}i.j=function(N){if(W(this)||W(N))return T;if(q(this))return q(N)?j(this).j(j(N)):j(j(this).j(N));if(q(N))return j(this.j(j(N)));if(0>this.l(B)&&0>N.l(B))return _(this.m()*N.m());for(var S=this.g.length+N.g.length,R=[],P=0;P<2*S;P++)R[P]=0;for(P=0;P<this.g.length;P++)for(var O=0;O<N.g.length;O++){var L=this.i(P)>>>16,A=this.i(P)&65535,Je=N.i(O)>>>16,Ct=N.i(O)&65535;R[2*P+2*O]+=A*Ct,ce(R,2*P+2*O),R[2*P+2*O+1]+=L*Ct,ce(R,2*P+2*O+1),R[2*P+2*O+1]+=A*Je,ce(R,2*P+2*O+1),R[2*P+2*O+2]+=L*Je,ce(R,2*P+2*O+2)}for(P=0;P<S;P++)R[P]=R[2*P+1]<<16|R[2*P];for(P=S;P<2*S;P++)R[P]=0;return new h(R,0)};function ce(N,S){for(;(N[S]&65535)!=N[S];)N[S+1]+=N[S]>>>16,N[S]&=65535,S++}function le(N,S){this.g=N,this.h=S}function ve(N,S){if(W(S))throw Error("division by zero");if(W(N))return new le(T,T);if(q(N))return S=ve(j(N),S),new le(j(S.g),j(S.h));if(q(S))return S=ve(N,j(S)),new le(j(S.g),S.h);if(30<N.g.length){if(q(N)||q(S))throw Error("slowDivide_ only works with positive integers.");for(var R=D,P=S;0>=P.l(N);)R=Ve(R),P=Ve(P);var O=Re(R,1),L=Re(P,1);for(P=Re(P,2),R=Re(R,2);!W(P);){var A=L.add(P);0>=A.l(N)&&(O=O.add(R),L=A),P=Re(P,1),R=Re(R,1)}return S=ne(N,O.j(S)),new le(O,S)}for(O=T;0<=N.l(S);){for(R=Math.max(1,Math.floor(N.m()/S.m())),P=Math.ceil(Math.log(R)/Math.LN2),P=48>=P?1:Math.pow(2,P-48),L=_(R),A=L.j(S);q(A)||0<A.l(N);)R-=P,L=_(R),A=L.j(S);W(L)&&(L=D),O=O.add(L),N=ne(N,A)}return new le(O,N)}i.A=function(N){return ve(this,N).h},i.and=function(N){for(var S=Math.max(this.g.length,N.g.length),R=[],P=0;P<S;P++)R[P]=this.i(P)&N.i(P);return new h(R,this.h&N.h)},i.or=function(N){for(var S=Math.max(this.g.length,N.g.length),R=[],P=0;P<S;P++)R[P]=this.i(P)|N.i(P);return new h(R,this.h|N.h)},i.xor=function(N){for(var S=Math.max(this.g.length,N.g.length),R=[],P=0;P<S;P++)R[P]=this.i(P)^N.i(P);return new h(R,this.h^N.h)};function Ve(N){for(var S=N.g.length+1,R=[],P=0;P<S;P++)R[P]=N.i(P)<<1|N.i(P-1)>>>31;return new h(R,N.h)}function Re(N,S){var R=S>>5;S%=32;for(var P=N.g.length-R,O=[],L=0;L<P;L++)O[L]=0<S?N.i(L+R)>>>S|N.i(L+R+1)<<32-S:N.i(L+R);return new h(O,N.h)}s.prototype.digest=s.prototype.v,s.prototype.reset=s.prototype.s,s.prototype.update=s.prototype.u,h.prototype.add=h.prototype.add,h.prototype.multiply=h.prototype.j,h.prototype.modulo=h.prototype.A,h.prototype.compare=h.prototype.l,h.prototype.toNumber=h.prototype.m,h.prototype.toString=h.prototype.toString,h.prototype.getBits=h.prototype.i,h.fromNumber=_,h.fromString=w,Ld=h}).apply(typeof og<"u"?og:typeof self<"u"?self:typeof window<"u"?window:{});var lu=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var ny,pa,ry,vu,od,iy,sy,oy;(function(){var i,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(l,f,v){return l==Array.prototype||l==Object.prototype||(l[f]=v.value),l};function n(l){l=[typeof globalThis=="object"&&globalThis,l,typeof window=="object"&&window,typeof self=="object"&&self,typeof lu=="object"&&lu];for(var f=0;f<l.length;++f){var v=l[f];if(v&&v.Math==Math)return v}throw Error("Cannot find global object")}var s=n(this);function a(l,f){if(f)e:{var v=s;l=l.split(".");for(var E=0;E<l.length-1;E++){var V=l[E];if(!(V in v))break e;v=v[V]}l=l[l.length-1],E=v[l],f=f(E),f!=E&&f!=null&&e(v,l,{configurable:!0,writable:!0,value:f})}}function u(l,f){l instanceof String&&(l+="");var v=0,E=!1,V={next:function(){if(!E&&v<l.length){var F=v++;return{value:f(F,l[F]),done:!1}}return E=!0,{done:!0,value:void 0}}};return V[Symbol.iterator]=function(){return V},V}a("Array.prototype.values",function(l){return l||function(){return u(this,function(f,v){return v})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var h=h||{},m=this||self;function g(l){var f=typeof l;return f=f!="object"?f:l?Array.isArray(l)?"array":f:"null",f=="array"||f=="object"&&typeof l.length=="number"}function _(l){var f=typeof l;return f=="object"&&l!=null||f=="function"}function w(l,f,v){return l.call.apply(l.bind,arguments)}function T(l,f,v){if(!l)throw Error();if(2<arguments.length){var E=Array.prototype.slice.call(arguments,2);return function(){var V=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(V,E),l.apply(f,V)}}return function(){return l.apply(f,arguments)}}function D(l,f,v){return D=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?w:T,D.apply(null,arguments)}function B(l,f){var v=Array.prototype.slice.call(arguments,1);return function(){var E=v.slice();return E.push.apply(E,arguments),l.apply(this,E)}}function W(l,f){function v(){}v.prototype=f.prototype,l.aa=f.prototype,l.prototype=new v,l.prototype.constructor=l,l.Qb=function(E,V,F){for(var J=Array(arguments.length-2),Me=2;Me<arguments.length;Me++)J[Me-2]=arguments[Me];return f.prototype[V].apply(E,J)}}function q(l){const f=l.length;if(0<f){const v=Array(f);for(let E=0;E<f;E++)v[E]=l[E];return v}return[]}function j(l,f){for(let v=1;v<arguments.length;v++){const E=arguments[v];if(g(E)){const V=l.length||0,F=E.length||0;l.length=V+F;for(let J=0;J<F;J++)l[V+J]=E[J]}else l.push(E)}}class ne{constructor(f,v){this.i=f,this.j=v,this.h=0,this.g=null}get(){let f;return 0<this.h?(this.h--,f=this.g,this.g=f.next,f.next=null):f=this.i(),f}}function ce(l){return/^[\s\xa0]*$/.test(l)}function le(){var l=m.navigator;return l&&(l=l.userAgent)?l:""}function ve(l){return ve[" "](l),l}ve[" "]=function(){};var Ve=le().indexOf("Gecko")!=-1&&!(le().toLowerCase().indexOf("webkit")!=-1&&le().indexOf("Edge")==-1)&&!(le().indexOf("Trident")!=-1||le().indexOf("MSIE")!=-1)&&le().indexOf("Edge")==-1;function Re(l,f,v){for(const E in l)f.call(v,l[E],E,l)}function N(l,f){for(const v in l)f.call(void 0,l[v],v,l)}function S(l){const f={};for(const v in l)f[v]=l[v];return f}const R="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function P(l,f){let v,E;for(let V=1;V<arguments.length;V++){E=arguments[V];for(v in E)l[v]=E[v];for(let F=0;F<R.length;F++)v=R[F],Object.prototype.hasOwnProperty.call(E,v)&&(l[v]=E[v])}}function O(l){var f=1;l=l.split(":");const v=[];for(;0<f&&l.length;)v.push(l.shift()),f--;return l.length&&v.push(l.join(":")),v}function L(l){m.setTimeout(()=>{throw l},0)}function A(){var l=he;let f=null;return l.g&&(f=l.g,l.g=l.g.next,l.g||(l.h=null),f.next=null),f}class Je{constructor(){this.h=this.g=null}add(f,v){const E=Ct.get();E.set(f,v),this.h?this.h.next=E:this.g=E,this.h=E}}var Ct=new ne(()=>new Pt,l=>l.reset());class Pt{constructor(){this.next=this.g=this.h=null}set(f,v){this.h=f,this.g=v,this.next=null}reset(){this.next=this.g=this.h=null}}let Ue,Z=!1,he=new Je,te=()=>{const l=m.Promise.resolve(void 0);Ue=()=>{l.then(x)}};var x=()=>{for(var l;l=A();){try{l.h.call(l.g)}catch(v){L(v)}var f=Ct;f.j(l),100>f.h&&(f.h++,l.next=f.g,f.g=l)}Z=!1};function z(){this.s=this.s,this.C=this.C}z.prototype.s=!1,z.prototype.ma=function(){this.s||(this.s=!0,this.N())},z.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function ue(l,f){this.type=l,this.g=this.target=f,this.defaultPrevented=!1}ue.prototype.h=function(){this.defaultPrevented=!0};var ye=function(){if(!m.addEventListener||!Object.defineProperty)return!1;var l=!1,f=Object.defineProperty({},"passive",{get:function(){l=!0}});try{const v=()=>{};m.addEventListener("test",v,f),m.removeEventListener("test",v,f)}catch{}return l}();function Ee(l,f){if(ue.call(this,l?l.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,l){var v=this.type=l.type,E=l.changedTouches&&l.changedTouches.length?l.changedTouches[0]:null;if(this.target=l.target||l.srcElement,this.g=f,f=l.relatedTarget){if(Ve){e:{try{ve(f.nodeName);var V=!0;break e}catch{}V=!1}V||(f=null)}}else v=="mouseover"?f=l.fromElement:v=="mouseout"&&(f=l.toElement);this.relatedTarget=f,E?(this.clientX=E.clientX!==void 0?E.clientX:E.pageX,this.clientY=E.clientY!==void 0?E.clientY:E.pageY,this.screenX=E.screenX||0,this.screenY=E.screenY||0):(this.clientX=l.clientX!==void 0?l.clientX:l.pageX,this.clientY=l.clientY!==void 0?l.clientY:l.pageY,this.screenX=l.screenX||0,this.screenY=l.screenY||0),this.button=l.button,this.key=l.key||"",this.ctrlKey=l.ctrlKey,this.altKey=l.altKey,this.shiftKey=l.shiftKey,this.metaKey=l.metaKey,this.pointerId=l.pointerId||0,this.pointerType=typeof l.pointerType=="string"?l.pointerType:Ce[l.pointerType]||"",this.state=l.state,this.i=l,l.defaultPrevented&&Ee.aa.h.call(this)}}W(Ee,ue);var Ce={2:"touch",3:"pen",4:"mouse"};Ee.prototype.h=function(){Ee.aa.h.call(this);var l=this.i;l.preventDefault?l.preventDefault():l.returnValue=!1};var xe="closure_listenable_"+(1e6*Math.random()|0),Le=0;function Fe(l,f,v,E,V){this.listener=l,this.proxy=null,this.src=f,this.type=v,this.capture=!!E,this.ha=V,this.key=++Le,this.da=this.fa=!1}function ht(l){l.da=!0,l.listener=null,l.proxy=null,l.src=null,l.ha=null}function rr(l){this.src=l,this.g={},this.h=0}rr.prototype.add=function(l,f,v,E,V){var F=l.toString();l=this.g[F],l||(l=this.g[F]=[],this.h++);var J=Cr(l,f,E,V);return-1<J?(f=l[J],v||(f.fa=!1)):(f=new Fe(f,this.src,F,!!E,V),f.fa=v,l.push(f)),f};function os(l,f){var v=f.type;if(v in l.g){var E=l.g[v],V=Array.prototype.indexOf.call(E,f,void 0),F;(F=0<=V)&&Array.prototype.splice.call(E,V,1),F&&(ht(f),l.g[v].length==0&&(delete l.g[v],l.h--))}}function Cr(l,f,v,E){for(var V=0;V<l.length;++V){var F=l[V];if(!F.da&&F.listener==f&&F.capture==!!v&&F.ha==E)return V}return-1}var mi="closure_lm_"+(1e6*Math.random()|0),as={};function go(l,f,v,E,V){if(Array.isArray(f)){for(var F=0;F<f.length;F++)go(l,f[F],v,E,V);return null}return v=_o(v),l&&l[xe]?l.K(f,v,_(E)?!!E.capture:!1,V):vo(l,f,v,!1,E,V)}function vo(l,f,v,E,V,F){if(!f)throw Error("Invalid event type");var J=_(V)?!!V.capture:!!V,Me=us(l);if(Me||(l[mi]=Me=new rr(l)),v=Me.add(f,v,E,J,F),v.proxy)return v;if(E=Wa(),v.proxy=E,E.src=l,E.listener=v,l.addEventListener)ye||(V=J),V===void 0&&(V=!1),l.addEventListener(f.toString(),E,V);else if(l.attachEvent)l.attachEvent(sr(f.toString()),E);else if(l.addListener&&l.removeListener)l.addListener(E);else throw Error("addEventListener and attachEvent are unavailable.");return v}function Wa(){function l(v){return f.call(l.src,l.listener,v)}const f=yo;return l}function ls(l,f,v,E,V){if(Array.isArray(f))for(var F=0;F<f.length;F++)ls(l,f[F],v,E,V);else E=_(E)?!!E.capture:!!E,v=_o(v),l&&l[xe]?(l=l.i,f=String(f).toString(),f in l.g&&(F=l.g[f],v=Cr(F,v,E,V),-1<v&&(ht(F[v]),Array.prototype.splice.call(F,v,1),F.length==0&&(delete l.g[f],l.h--)))):l&&(l=us(l))&&(f=l.g[f.toString()],l=-1,f&&(l=Cr(f,v,E,V)),(v=-1<l?f[l]:null)&&ir(v))}function ir(l){if(typeof l!="number"&&l&&!l.da){var f=l.src;if(f&&f[xe])os(f.i,l);else{var v=l.type,E=l.proxy;f.removeEventListener?f.removeEventListener(v,E,l.capture):f.detachEvent?f.detachEvent(sr(v),E):f.addListener&&f.removeListener&&f.removeListener(E),(v=us(f))?(os(v,l),v.h==0&&(v.src=null,f[mi]=null)):ht(l)}}}function sr(l){return l in as?as[l]:as[l]="on"+l}function yo(l,f){if(l.da)l=!0;else{f=new Ee(f,this);var v=l.listener,E=l.ha||l.src;l.fa&&ir(l),l=v.call(E,f)}return l}function us(l){return l=l[mi],l instanceof rr?l:null}var cs="__closure_events_fn_"+(1e9*Math.random()>>>0);function _o(l){return typeof l=="function"?l:(l[cs]||(l[cs]=function(f){return l.handleEvent(f)}),l[cs])}function ot(){z.call(this),this.i=new rr(this),this.M=this,this.F=null}W(ot,z),ot.prototype[xe]=!0,ot.prototype.removeEventListener=function(l,f,v,E){ls(this,l,f,v,E)};function at(l,f){var v,E=l.F;if(E)for(v=[];E;E=E.F)v.push(E);if(l=l.M,E=f.type||f,typeof f=="string")f=new ue(f,l);else if(f instanceof ue)f.target=f.target||l;else{var V=f;f=new ue(E,l),P(f,V)}if(V=!0,v)for(var F=v.length-1;0<=F;F--){var J=f.g=v[F];V=or(J,E,!0,f)&&V}if(J=f.g=l,V=or(J,E,!0,f)&&V,V=or(J,E,!1,f)&&V,v)for(F=0;F<v.length;F++)J=f.g=v[F],V=or(J,E,!1,f)&&V}ot.prototype.N=function(){if(ot.aa.N.call(this),this.i){var l=this.i,f;for(f in l.g){for(var v=l.g[f],E=0;E<v.length;E++)ht(v[E]);delete l.g[f],l.h--}}this.F=null},ot.prototype.K=function(l,f,v,E){return this.i.add(String(l),f,!1,v,E)},ot.prototype.L=function(l,f,v,E){return this.i.add(String(l),f,!0,v,E)};function or(l,f,v,E){if(f=l.i.g[String(f)],!f)return!0;f=f.concat();for(var V=!0,F=0;F<f.length;++F){var J=f[F];if(J&&!J.da&&J.capture==v){var Me=J.listener,lt=J.ha||J.src;J.fa&&os(l.i,J),V=Me.call(lt,E)!==!1&&V}}return V&&!E.defaultPrevented}function Eo(l,f,v){if(typeof l=="function")v&&(l=D(l,v));else if(l&&typeof l.handleEvent=="function")l=D(l.handleEvent,l);else throw Error("Invalid listener argument");return 2147483647<Number(f)?-1:m.setTimeout(l,f||0)}function Pr(l){l.g=Eo(()=>{l.g=null,l.i&&(l.i=!1,Pr(l))},l.l);const f=l.h;l.h=null,l.m.apply(null,f)}class gi extends z{constructor(f,v){super(),this.m=f,this.l=v,this.h=null,this.i=!1,this.g=null}j(f){this.h=arguments,this.g?this.i=!0:Pr(this)}N(){super.N(),this.g&&(m.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function vi(l){z.call(this),this.h=l,this.g={}}W(vi,z);var wo=[];function To(l){Re(l.g,function(f,v){this.g.hasOwnProperty(v)&&ir(f)},l),l.g={}}vi.prototype.N=function(){vi.aa.N.call(this),To(this)},vi.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Io=m.JSON.stringify,So=m.JSON.parse,Ao=class{stringify(l){return m.JSON.stringify(l,void 0)}parse(l){return m.JSON.parse(l,void 0)}};function yi(){}yi.prototype.h=null;function hs(l){return l.h||(l.h=l.i())}function ds(){}var ln={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Fn(){ue.call(this,"d")}W(Fn,ue);function fs(){ue.call(this,"c")}W(fs,ue);var jn={},Ro=null;function _i(){return Ro=Ro||new ot}jn.La="serverreachability";function Co(l){ue.call(this,jn.La,l)}W(Co,ue);function ar(l){const f=_i();at(f,new Co(f))}jn.STAT_EVENT="statevent";function Po(l,f){ue.call(this,jn.STAT_EVENT,l),this.stat=f}W(Po,ue);function Ze(l){const f=_i();at(f,new Po(f,l))}jn.Ma="timingevent";function ps(l,f){ue.call(this,jn.Ma,l),this.size=f}W(ps,ue);function En(l,f){if(typeof l!="function")throw Error("Fn must not be null and must be a function");return m.setTimeout(function(){l()},f)}function Ei(){this.g=!0}Ei.prototype.xa=function(){this.g=!1};function wi(l,f,v,E,V,F){l.info(function(){if(l.g)if(F)for(var J="",Me=F.split("&"),lt=0;lt<Me.length;lt++){var Pe=Me[lt].split("=");if(1<Pe.length){var dt=Pe[0];Pe=Pe[1];var tt=dt.split("_");J=2<=tt.length&&tt[1]=="type"?J+(dt+"="+Pe+"&"):J+(dt+"=redacted&")}}else J=null;else J=F;return"XMLHTTP REQ ("+E+") [attempt "+V+"]: "+f+`
`+v+`
`+J})}function ms(l,f,v,E,V,F,J){l.info(function(){return"XMLHTTP RESP ("+E+") [ attempt "+V+"]: "+f+`
`+v+`
`+F+" "+J})}function wn(l,f,v,E){l.info(function(){return"XMLHTTP TEXT ("+f+"): "+ic(l,v)+(E?" "+E:"")})}function ko(l,f){l.info(function(){return"TIMEOUT: "+f})}Ei.prototype.info=function(){};function ic(l,f){if(!l.g)return f;if(!f)return null;try{var v=JSON.parse(f);if(v){for(l=0;l<v.length;l++)if(Array.isArray(v[l])){var E=v[l];if(!(2>E.length)){var V=E[1];if(Array.isArray(V)&&!(1>V.length)){var F=V[0];if(F!="noop"&&F!="stop"&&F!="close")for(var J=1;J<V.length;J++)V[J]=""}}}}return Io(v)}catch{return f}}var gs={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Ga={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Tn;function Ti(){}W(Ti,yi),Ti.prototype.g=function(){return new XMLHttpRequest},Ti.prototype.i=function(){return{}},Tn=new Ti;function In(l,f,v,E){this.j=l,this.i=f,this.l=v,this.R=E||1,this.U=new vi(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Ka}function Ka(){this.i=null,this.g="",this.h=!1}var No={},vs={};function ys(l,f,v){l.L=1,l.v=xr(Zt(f)),l.m=v,l.P=!0,Oo(l,null)}function Oo(l,f){l.F=Date.now(),je(l),l.A=Zt(l.v);var v=l.A,E=l.R;Array.isArray(E)||(E=[String(E)]),Vr(v.i,"t",E),l.C=0,v=l.j.J,l.h=new Ka,l.g=hl(l.j,v?f:null,!l.m),0<l.O&&(l.M=new gi(D(l.Y,l,l.g),l.O)),f=l.U,v=l.g,E=l.ca;var V="readystatechange";Array.isArray(V)||(V&&(wo[0]=V.toString()),V=wo);for(var F=0;F<V.length;F++){var J=go(v,V[F],E||f.handleEvent,!1,f.h||f);if(!J)break;f.g[J.key]=J}f=l.H?S(l.H):{},l.m?(l.u||(l.u="POST"),f["Content-Type"]="application/x-www-form-urlencoded",l.g.ea(l.A,l.u,l.m,f)):(l.u="GET",l.g.ea(l.A,l.u,null,f)),ar(),wi(l.i,l.u,l.A,l.l,l.R,l.m)}In.prototype.ca=function(l){l=l.target;const f=this.M;f&&$t(l)==3?f.j():this.Y(l)},In.prototype.Y=function(l){try{if(l==this.g)e:{const tt=$t(this.g);var f=this.g.Ba();const hn=this.g.Z();if(!(3>tt)&&(tt!=3||this.g&&(this.h.h||this.g.oa()||Uo(this.g)))){this.J||tt!=4||f==7||(f==8||0>=hn?ar(3):ar(2)),Ii(this);var v=this.g.Z();this.X=v;t:if(qa(this)){var E=Uo(this.g);l="";var V=E.length,F=$t(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){un(this),kr(this);var J="";break t}this.h.i=new m.TextDecoder}for(f=0;f<V;f++)this.h.h=!0,l+=this.h.i.decode(E[f],{stream:!(F&&f==V-1)});E.length=0,this.h.g+=l,this.C=0,J=this.h.g}else J=this.g.oa();if(this.o=v==200,ms(this.i,this.u,this.A,this.l,this.R,tt,v),this.o){if(this.T&&!this.K){t:{if(this.g){var Me,lt=this.g;if((Me=lt.g?lt.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!ce(Me)){var Pe=Me;break t}}Pe=null}if(v=Pe)wn(this.i,this.l,v,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Do(this,v);else{this.o=!1,this.s=3,Ze(12),un(this),kr(this);break e}}if(this.P){v=!0;let tn;for(;!this.J&&this.C<J.length;)if(tn=sc(this,J),tn==vs){tt==4&&(this.s=4,Ze(14),v=!1),wn(this.i,this.l,null,"[Incomplete Response]");break}else if(tn==No){this.s=4,Ze(15),wn(this.i,this.l,J,"[Invalid Chunk]"),v=!1;break}else wn(this.i,this.l,tn,null),Do(this,tn);if(qa(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),tt!=4||J.length!=0||this.h.h||(this.s=1,Ze(16),v=!1),this.o=this.o&&v,!v)wn(this.i,this.l,J,"[Invalid Chunked Response]"),un(this),kr(this);else if(0<J.length&&!this.W){this.W=!0;var dt=this.j;dt.g==this&&dt.ba&&!dt.M&&(dt.j.info("Great, no buffering proxy detected. Bytes received: "+J.length),Fo(dt),dt.M=!0,Ze(11))}}else wn(this.i,this.l,J,null),Do(this,J);tt==4&&un(this),this.o&&!this.J&&(tt==4?ks(this.j,this):(this.o=!1,je(this)))}else Ss(this.g),v==400&&0<J.indexOf("Unknown SID")?(this.s=3,Ze(12)):(this.s=0,Ze(13)),un(this),kr(this)}}}catch{}finally{}};function qa(l){return l.g?l.u=="GET"&&l.L!=2&&l.j.Ca:!1}function sc(l,f){var v=l.C,E=f.indexOf(`
`,v);return E==-1?vs:(v=Number(f.substring(v,E)),isNaN(v)?No:(E+=1,E+v>f.length?vs:(f=f.slice(E,E+v),l.C=E+v,f)))}In.prototype.cancel=function(){this.J=!0,un(this)};function je(l){l.S=Date.now()+l.I,Qa(l,l.I)}function Qa(l,f){if(l.B!=null)throw Error("WatchDog timer not null");l.B=En(D(l.ba,l),f)}function Ii(l){l.B&&(m.clearTimeout(l.B),l.B=null)}In.prototype.ba=function(){this.B=null;const l=Date.now();0<=l-this.S?(ko(this.i,this.A),this.L!=2&&(ar(),Ze(17)),un(this),this.s=2,kr(this)):Qa(this,this.S-l)};function kr(l){l.j.G==0||l.J||ks(l.j,l)}function un(l){Ii(l);var f=l.M;f&&typeof f.ma=="function"&&f.ma(),l.M=null,To(l.U),l.g&&(f=l.g,l.g=null,f.abort(),f.ma())}function Do(l,f){try{var v=l.j;if(v.G!=0&&(v.g==l||bt(v.h,l))){if(!l.K&&bt(v.h,l)&&v.G==3){try{var E=v.Da.g.parse(f)}catch{E=null}if(Array.isArray(E)&&E.length==3){var V=E;if(V[0]==0){e:if(!v.u){if(v.g)if(v.g.F+3e3<l.F)Ps(v),Pn(v);else break e;Cs(v),Ze(18)}}else v.za=V[1],0<v.za-v.T&&37500>V[2]&&v.F&&v.v==0&&!v.C&&(v.C=En(D(v.Za,v),6e3));if(1>=Ya(v.h)&&v.ca){try{v.ca()}catch{}v.ca=void 0}}else dr(v,11)}else if((l.K||v.g==l)&&Ps(v),!ce(f))for(V=v.Da.g.parse(f),f=0;f<V.length;f++){let Pe=V[f];if(v.T=Pe[0],Pe=Pe[1],v.G==2)if(Pe[0]=="c"){v.K=Pe[1],v.ia=Pe[2];const dt=Pe[3];dt!=null&&(v.la=dt,v.j.info("VER="+v.la));const tt=Pe[4];tt!=null&&(v.Aa=tt,v.j.info("SVER="+v.Aa));const hn=Pe[5];hn!=null&&typeof hn=="number"&&0<hn&&(E=1.5*hn,v.L=E,v.j.info("backChannelRequestTimeoutMs_="+E)),E=v;const tn=l.g;if(tn){const Ni=tn.g?tn.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Ni){var F=E.h;F.g||Ni.indexOf("spdy")==-1&&Ni.indexOf("quic")==-1&&Ni.indexOf("h2")==-1||(F.j=F.l,F.g=new Set,F.h&&(xo(F,F.h),F.h=null))}if(E.D){const Os=tn.g?tn.g.getResponseHeader("X-HTTP-Session-Id"):null;Os&&(E.ya=Os,be(E.I,E.D,Os))}}v.G=3,v.l&&v.l.ua(),v.ba&&(v.R=Date.now()-l.F,v.j.info("Handshake RTT: "+v.R+"ms")),E=v;var J=l;if(E.qa=cl(E,E.J?E.ia:null,E.W),J.K){Ja(E.h,J);var Me=J,lt=E.L;lt&&(Me.I=lt),Me.B&&(Ii(Me),je(Me)),E.g=J}else ki(E);0<v.i.length&&Hn(v)}else Pe[0]!="stop"&&Pe[0]!="close"||dr(v,7);else v.G==3&&(Pe[0]=="stop"||Pe[0]=="close"?Pe[0]=="stop"?dr(v,7):Et(v):Pe[0]!="noop"&&v.l&&v.l.ta(Pe),v.v=0)}}ar(4)}catch{}}var Xa=class{constructor(l,f){this.g=l,this.map=f}};function Si(l){this.l=l||10,m.PerformanceNavigationTiming?(l=m.performance.getEntriesByType("navigation"),l=0<l.length&&(l[0].nextHopProtocol=="hq"||l[0].nextHopProtocol=="h2")):l=!!(m.chrome&&m.chrome.loadTimes&&m.chrome.loadTimes()&&m.chrome.loadTimes().wasFetchedViaSpdy),this.j=l?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Jt(l){return l.h?!0:l.g?l.g.size>=l.j:!1}function Ya(l){return l.h?1:l.g?l.g.size:0}function bt(l,f){return l.h?l.h==f:l.g?l.g.has(f):!1}function xo(l,f){l.g?l.g.add(f):l.h=f}function Ja(l,f){l.h&&l.h==f?l.h=null:l.g&&l.g.has(f)&&l.g.delete(f)}Si.prototype.cancel=function(){if(this.i=Za(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const l of this.g.values())l.cancel();this.g.clear()}};function Za(l){if(l.h!=null)return l.i.concat(l.h.D);if(l.g!=null&&l.g.size!==0){let f=l.i;for(const v of l.g.values())f=f.concat(v.D);return f}return q(l.i)}function _s(l){if(l.V&&typeof l.V=="function")return l.V();if(typeof Map<"u"&&l instanceof Map||typeof Set<"u"&&l instanceof Set)return Array.from(l.values());if(typeof l=="string")return l.split("");if(g(l)){for(var f=[],v=l.length,E=0;E<v;E++)f.push(l[E]);return f}f=[],v=0;for(E in l)f[v++]=l[E];return f}function Es(l){if(l.na&&typeof l.na=="function")return l.na();if(!l.V||typeof l.V!="function"){if(typeof Map<"u"&&l instanceof Map)return Array.from(l.keys());if(!(typeof Set<"u"&&l instanceof Set)){if(g(l)||typeof l=="string"){var f=[];l=l.length;for(var v=0;v<l;v++)f.push(v);return f}f=[],v=0;for(const E in l)f[v++]=E;return f}}}function Nr(l,f){if(l.forEach&&typeof l.forEach=="function")l.forEach(f,void 0);else if(g(l)||typeof l=="string")Array.prototype.forEach.call(l,f,void 0);else for(var v=Es(l),E=_s(l),V=E.length,F=0;F<V;F++)f.call(void 0,E[F],v&&v[F],l)}var Ai=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function oc(l,f){if(l){l=l.split("&");for(var v=0;v<l.length;v++){var E=l[v].indexOf("="),V=null;if(0<=E){var F=l[v].substring(0,E);V=l[v].substring(E+1)}else F=l[v];f(F,V?decodeURIComponent(V.replace(/\+/g," ")):"")}}}function lr(l){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,l instanceof lr){this.h=l.h,Ri(this,l.j),this.o=l.o,this.g=l.g,Or(this,l.s),this.l=l.l;var f=l.i,v=new zn;v.i=f.i,f.g&&(v.g=new Map(f.g),v.h=f.h),Dr(this,v),this.m=l.m}else l&&(f=String(l).match(Ai))?(this.h=!1,Ri(this,f[1]||"",!0),this.o=Ae(f[2]||""),this.g=Ae(f[3]||"",!0),Or(this,f[4]),this.l=Ae(f[5]||"",!0),Dr(this,f[6]||"",!0),this.m=Ae(f[7]||"")):(this.h=!1,this.i=new zn(null,this.h))}lr.prototype.toString=function(){var l=[],f=this.j;f&&l.push(Lr(f,ws,!0),":");var v=this.g;return(v||f=="file")&&(l.push("//"),(f=this.o)&&l.push(Lr(f,ws,!0),"@"),l.push(encodeURIComponent(String(v)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),v=this.s,v!=null&&l.push(":",String(v))),(v=this.l)&&(this.g&&v.charAt(0)!="/"&&l.push("/"),l.push(Lr(v,v.charAt(0)=="/"?nl:tl,!0))),(v=this.i.toString())&&l.push("?",v),(v=this.m)&&l.push("#",Lr(v,Lo)),l.join("")};function Zt(l){return new lr(l)}function Ri(l,f,v){l.j=v?Ae(f,!0):f,l.j&&(l.j=l.j.replace(/:$/,""))}function Or(l,f){if(f){if(f=Number(f),isNaN(f)||0>f)throw Error("Bad port number "+f);l.s=f}else l.s=null}function Dr(l,f,v){f instanceof zn?(l.i=f,Bn(l.i,l.h)):(v||(f=Lr(f,rl)),l.i=new zn(f,l.h))}function be(l,f,v){l.i.set(f,v)}function xr(l){return be(l,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),l}function Ae(l,f){return l?f?decodeURI(l.replace(/%25/g,"%2525")):decodeURIComponent(l):""}function Lr(l,f,v){return typeof l=="string"?(l=encodeURI(l).replace(f,el),v&&(l=l.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),l):null}function el(l){return l=l.charCodeAt(0),"%"+(l>>4&15).toString(16)+(l&15).toString(16)}var ws=/[#\/\?@]/g,tl=/[#\?:]/g,nl=/[#\?]/g,rl=/[#\?@]/g,Lo=/#/g;function zn(l,f){this.h=this.g=null,this.i=l||null,this.j=!!f}function _t(l){l.g||(l.g=new Map,l.h=0,l.i&&oc(l.i,function(f,v){l.add(decodeURIComponent(f.replace(/\+/g," ")),v)}))}i=zn.prototype,i.add=function(l,f){_t(this),this.i=null,l=cn(this,l);var v=this.g.get(l);return v||this.g.set(l,v=[]),v.push(f),this.h+=1,this};function Sn(l,f){_t(l),f=cn(l,f),l.g.has(f)&&(l.i=null,l.h-=l.g.get(f).length,l.g.delete(f))}function An(l,f){return _t(l),f=cn(l,f),l.g.has(f)}i.forEach=function(l,f){_t(this),this.g.forEach(function(v,E){v.forEach(function(V){l.call(f,V,E,this)},this)},this)},i.na=function(){_t(this);const l=Array.from(this.g.values()),f=Array.from(this.g.keys()),v=[];for(let E=0;E<f.length;E++){const V=l[E];for(let F=0;F<V.length;F++)v.push(f[E])}return v},i.V=function(l){_t(this);let f=[];if(typeof l=="string")An(this,l)&&(f=f.concat(this.g.get(cn(this,l))));else{l=Array.from(this.g.values());for(let v=0;v<l.length;v++)f=f.concat(l[v])}return f},i.set=function(l,f){return _t(this),this.i=null,l=cn(this,l),An(this,l)&&(this.h-=this.g.get(l).length),this.g.set(l,[f]),this.h+=1,this},i.get=function(l,f){return l?(l=this.V(l),0<l.length?String(l[0]):f):f};function Vr(l,f,v){Sn(l,f),0<v.length&&(l.i=null,l.g.set(cn(l,f),q(v)),l.h+=v.length)}i.toString=function(){if(this.i)return this.i;if(!this.g)return"";const l=[],f=Array.from(this.g.keys());for(var v=0;v<f.length;v++){var E=f[v];const F=encodeURIComponent(String(E)),J=this.V(E);for(E=0;E<J.length;E++){var V=F;J[E]!==""&&(V+="="+encodeURIComponent(String(J[E]))),l.push(V)}}return this.i=l.join("&")};function cn(l,f){return f=String(f),l.j&&(f=f.toLowerCase()),f}function Bn(l,f){f&&!l.j&&(_t(l),l.i=null,l.g.forEach(function(v,E){var V=E.toLowerCase();E!=V&&(Sn(this,E),Vr(this,V,v))},l)),l.j=f}function ac(l,f){const v=new Ei;if(m.Image){const E=new Image;E.onload=B(Bt,v,"TestLoadImage: loaded",!0,f,E),E.onerror=B(Bt,v,"TestLoadImage: error",!1,f,E),E.onabort=B(Bt,v,"TestLoadImage: abort",!1,f,E),E.ontimeout=B(Bt,v,"TestLoadImage: timeout",!1,f,E),m.setTimeout(function(){E.ontimeout&&E.ontimeout()},1e4),E.src=l}else f(!1)}function il(l,f){const v=new Ei,E=new AbortController,V=setTimeout(()=>{E.abort(),Bt(v,"TestPingServer: timeout",!1,f)},1e4);fetch(l,{signal:E.signal}).then(F=>{clearTimeout(V),F.ok?Bt(v,"TestPingServer: ok",!0,f):Bt(v,"TestPingServer: server error",!1,f)}).catch(()=>{clearTimeout(V),Bt(v,"TestPingServer: error",!1,f)})}function Bt(l,f,v,E,V){try{V&&(V.onload=null,V.onerror=null,V.onabort=null,V.ontimeout=null),E(v)}catch{}}function lc(){this.g=new Ao}function sl(l,f,v){const E=v||"";try{Nr(l,function(V,F){let J=V;_(V)&&(J=Io(V)),f.push(E+F+"="+encodeURIComponent(J))})}catch(V){throw f.push(E+"type="+encodeURIComponent("_badmap")),V}}function ur(l){this.l=l.Ub||null,this.j=l.eb||!1}W(ur,yi),ur.prototype.g=function(){return new Ci(this.l,this.j)},ur.prototype.i=function(l){return function(){return l}}({});function Ci(l,f){ot.call(this),this.D=l,this.o=f,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}W(Ci,ot),i=Ci.prototype,i.open=function(l,f){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=l,this.A=f,this.readyState=1,Cn(this)},i.send=function(l){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const f={headers:this.u,method:this.B,credentials:this.m,cache:void 0};l&&(f.body=l),(this.D||m).fetch(new Request(this.A,f)).then(this.Sa.bind(this),this.ga.bind(this))},i.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Rn(this)),this.readyState=0},i.Sa=function(l){if(this.g&&(this.l=l,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=l.headers,this.readyState=2,Cn(this)),this.g&&(this.readyState=3,Cn(this),this.g)))if(this.responseType==="arraybuffer")l.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof m.ReadableStream<"u"&&"body"in l){if(this.j=l.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;ol(this)}else l.text().then(this.Ra.bind(this),this.ga.bind(this))};function ol(l){l.j.read().then(l.Pa.bind(l)).catch(l.ga.bind(l))}i.Pa=function(l){if(this.g){if(this.o&&l.value)this.response.push(l.value);else if(!this.o){var f=l.value?l.value:new Uint8Array(0);(f=this.v.decode(f,{stream:!l.done}))&&(this.response=this.responseText+=f)}l.done?Rn(this):Cn(this),this.readyState==3&&ol(this)}},i.Ra=function(l){this.g&&(this.response=this.responseText=l,Rn(this))},i.Qa=function(l){this.g&&(this.response=l,Rn(this))},i.ga=function(){this.g&&Rn(this)};function Rn(l){l.readyState=4,l.l=null,l.j=null,l.v=null,Cn(l)}i.setRequestHeader=function(l,f){this.u.append(l,f)},i.getResponseHeader=function(l){return this.h&&this.h.get(l.toLowerCase())||""},i.getAllResponseHeaders=function(){if(!this.h)return"";const l=[],f=this.h.entries();for(var v=f.next();!v.done;)v=v.value,l.push(v[0]+": "+v[1]),v=f.next();return l.join(`\r
`)};function Cn(l){l.onreadystatechange&&l.onreadystatechange.call(l)}Object.defineProperty(Ci.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(l){this.m=l?"include":"same-origin"}});function cr(l){let f="";return Re(l,function(v,E){f+=E,f+=":",f+=v,f+=`\r
`}),f}function Mr(l,f,v){e:{for(E in v){var E=!1;break e}E=!0}E||(v=cr(v),typeof l=="string"?v!=null&&encodeURIComponent(String(v)):be(l,f,v))}function We(l){ot.call(this),this.headers=new Map,this.o=l||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}W(We,ot);var uc=/^https?$/i,Vo=["POST","PUT"];i=We.prototype,i.Ha=function(l){this.J=l},i.ea=function(l,f,v,E){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+l);f=f?f.toUpperCase():"GET",this.D=l,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Tn.g(),this.v=this.o?hs(this.o):hs(Tn),this.g.onreadystatechange=D(this.Ea,this);try{this.B=!0,this.g.open(f,String(l),!0),this.B=!1}catch(F){Pi(this,F);return}if(l=v||"",v=new Map(this.headers),E)if(Object.getPrototypeOf(E)===Object.prototype)for(var V in E)v.set(V,E[V]);else if(typeof E.keys=="function"&&typeof E.get=="function")for(const F of E.keys())v.set(F,E.get(F));else throw Error("Unknown input type for opt_headers: "+String(E));E=Array.from(v.keys()).find(F=>F.toLowerCase()=="content-type"),V=m.FormData&&l instanceof m.FormData,!(0<=Array.prototype.indexOf.call(Vo,f,void 0))||E||V||v.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[F,J]of v)this.g.setRequestHeader(F,J);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Is(this),this.u=!0,this.g.send(l),this.u=!1}catch(F){Pi(this,F)}};function Pi(l,f){l.h=!1,l.g&&(l.j=!0,l.g.abort(),l.j=!1),l.l=f,l.m=5,Ts(l),en(l)}function Ts(l){l.A||(l.A=!0,at(l,"complete"),at(l,"error"))}i.abort=function(l){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=l||7,at(this,"complete"),at(this,"abort"),en(this))},i.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),en(this,!0)),We.aa.N.call(this)},i.Ea=function(){this.s||(this.B||this.u||this.j?Mo(this):this.bb())},i.bb=function(){Mo(this)};function Mo(l){if(l.h&&typeof h<"u"&&(!l.v[1]||$t(l)!=4||l.Z()!=2)){if(l.u&&$t(l)==4)Eo(l.Ea,0,l);else if(at(l,"readystatechange"),$t(l)==4){l.h=!1;try{const J=l.Z();e:switch(J){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var f=!0;break e;default:f=!1}var v;if(!(v=f)){var E;if(E=J===0){var V=String(l.D).match(Ai)[1]||null;!V&&m.self&&m.self.location&&(V=m.self.location.protocol.slice(0,-1)),E=!uc.test(V?V.toLowerCase():"")}v=E}if(v)at(l,"complete"),at(l,"success");else{l.m=6;try{var F=2<$t(l)?l.g.statusText:""}catch{F=""}l.l=F+" ["+l.Z()+"]",Ts(l)}}finally{en(l)}}}}function en(l,f){if(l.g){Is(l);const v=l.g,E=l.v[0]?()=>{}:null;l.g=null,l.v=null,f||at(l,"ready");try{v.onreadystatechange=E}catch{}}}function Is(l){l.I&&(m.clearTimeout(l.I),l.I=null)}i.isActive=function(){return!!this.g};function $t(l){return l.g?l.g.readyState:0}i.Z=function(){try{return 2<$t(this)?this.g.status:-1}catch{return-1}},i.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},i.Oa=function(l){if(this.g){var f=this.g.responseText;return l&&f.indexOf(l)==0&&(f=f.substring(l.length)),So(f)}};function Uo(l){try{if(!l.g)return null;if("response"in l.g)return l.g.response;switch(l.H){case"":case"text":return l.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in l.g)return l.g.mozResponseArrayBuffer}return null}catch{return null}}function Ss(l){const f={};l=(l.g&&2<=$t(l)&&l.g.getAllResponseHeaders()||"").split(`\r
`);for(let E=0;E<l.length;E++){if(ce(l[E]))continue;var v=O(l[E]);const V=v[0];if(v=v[1],typeof v!="string")continue;v=v.trim();const F=f[V]||[];f[V]=F,F.push(v)}N(f,function(E){return E.join(", ")})}i.Ba=function(){return this.m},i.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function $n(l,f,v){return v&&v.internalChannelParams&&v.internalChannelParams[l]||f}function bo(l){this.Aa=0,this.i=[],this.j=new Ei,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=$n("failFast",!1,l),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=$n("baseRetryDelayMs",5e3,l),this.cb=$n("retryDelaySeedMs",1e4,l),this.Wa=$n("forwardChannelMaxRetries",2,l),this.wa=$n("forwardChannelRequestTimeoutMs",2e4,l),this.pa=l&&l.xmlHttpFactory||void 0,this.Xa=l&&l.Tb||void 0,this.Ca=l&&l.useFetchStreams||!1,this.L=void 0,this.J=l&&l.supportsCrossDomainXhr||!1,this.K="",this.h=new Si(l&&l.concurrentRequestLimit),this.Da=new lc,this.P=l&&l.fastHandshake||!1,this.O=l&&l.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=l&&l.Rb||!1,l&&l.xa&&this.j.xa(),l&&l.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&l&&l.detectBufferingProxy||!1,this.ja=void 0,l&&l.longPollingTimeout&&0<l.longPollingTimeout&&(this.ja=l.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}i=bo.prototype,i.la=8,i.G=1,i.connect=function(l,f,v,E){Ze(0),this.W=l,this.H=f||{},v&&E!==void 0&&(this.H.OSID=v,this.H.OAID=E),this.F=this.X,this.I=cl(this,null,this.W),Hn(this)};function Et(l){if(As(l),l.G==3){var f=l.U++,v=Zt(l.I);if(be(v,"SID",l.K),be(v,"RID",f),be(v,"TYPE","terminate"),hr(l,v),f=new In(l,l.j,f),f.L=2,f.v=xr(Zt(v)),v=!1,m.navigator&&m.navigator.sendBeacon)try{v=m.navigator.sendBeacon(f.v.toString(),"")}catch{}!v&&m.Image&&(new Image().src=f.v,v=!0),v||(f.g=hl(f.j,null),f.g.ea(f.v)),f.F=Date.now(),je(f)}ul(l)}function Pn(l){l.g&&(Fo(l),l.g.cancel(),l.g=null)}function As(l){Pn(l),l.u&&(m.clearTimeout(l.u),l.u=null),Ps(l),l.h.cancel(),l.s&&(typeof l.s=="number"&&m.clearTimeout(l.s),l.s=null)}function Hn(l){if(!Jt(l.h)&&!l.s){l.s=!0;var f=l.Ga;Ue||te(),Z||(Ue(),Z=!0),he.add(f,l),l.B=0}}function cc(l,f){return Ya(l.h)>=l.h.j-(l.s?1:0)?!1:l.s?(l.i=f.D.concat(l.i),!0):l.G==1||l.G==2||l.B>=(l.Va?0:l.Wa)?!1:(l.s=En(D(l.Ga,l,f),ll(l,l.B)),l.B++,!0)}i.Ga=function(l){if(this.s)if(this.s=null,this.G==1){if(!l){this.U=Math.floor(1e5*Math.random()),l=this.U++;const V=new In(this,this.j,l);let F=this.o;if(this.S&&(F?(F=S(F),P(F,this.S)):F=this.S),this.m!==null||this.O||(V.H=F,F=null),this.P)e:{for(var f=0,v=0;v<this.i.length;v++){t:{var E=this.i[v];if("__data__"in E.map&&(E=E.map.__data__,typeof E=="string")){E=E.length;break t}E=void 0}if(E===void 0)break;if(f+=E,4096<f){f=v;break e}if(f===4096||v===this.i.length-1){f=v+1;break e}}f=1e3}else f=1e3;f=Ur(this,V,f),v=Zt(this.I),be(v,"RID",l),be(v,"CVER",22),this.D&&be(v,"X-HTTP-Session-Id",this.D),hr(this,v),F&&(this.O?f="headers="+encodeURIComponent(String(cr(F)))+"&"+f:this.m&&Mr(v,this.m,F)),xo(this.h,V),this.Ua&&be(v,"TYPE","init"),this.P?(be(v,"$req",f),be(v,"SID","null"),V.T=!0,ys(V,v,null)):ys(V,v,f),this.G=2}}else this.G==3&&(l?Rs(this,l):this.i.length==0||Jt(this.h)||Rs(this))};function Rs(l,f){var v;f?v=f.l:v=l.U++;const E=Zt(l.I);be(E,"SID",l.K),be(E,"RID",v),be(E,"AID",l.T),hr(l,E),l.m&&l.o&&Mr(E,l.m,l.o),v=new In(l,l.j,v,l.B+1),l.m===null&&(v.H=l.o),f&&(l.i=f.D.concat(l.i)),f=Ur(l,v,1e3),v.I=Math.round(.5*l.wa)+Math.round(.5*l.wa*Math.random()),xo(l.h,v),ys(v,E,f)}function hr(l,f){l.H&&Re(l.H,function(v,E){be(f,E,v)}),l.l&&Nr({},function(v,E){be(f,E,v)})}function Ur(l,f,v){v=Math.min(l.i.length,v);var E=l.l?D(l.l.Na,l.l,l):null;e:{var V=l.i;let F=-1;for(;;){const J=["count="+v];F==-1?0<v?(F=V[0].g,J.push("ofs="+F)):F=0:J.push("ofs="+F);let Me=!0;for(let lt=0;lt<v;lt++){let Pe=V[lt].g;const dt=V[lt].map;if(Pe-=F,0>Pe)F=Math.max(0,V[lt].g-100),Me=!1;else try{sl(dt,J,"req"+Pe+"_")}catch{E&&E(dt)}}if(Me){E=J.join("&");break e}}}return l=l.i.splice(0,v),f.D=l,E}function ki(l){if(!l.g&&!l.u){l.Y=1;var f=l.Fa;Ue||te(),Z||(Ue(),Z=!0),he.add(f,l),l.v=0}}function Cs(l){return l.g||l.u||3<=l.v?!1:(l.Y++,l.u=En(D(l.Fa,l),ll(l,l.v)),l.v++,!0)}i.Fa=function(){if(this.u=null,al(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var l=2*this.R;this.j.info("BP detection timer enabled: "+l),this.A=En(D(this.ab,this),l)}},i.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Ze(10),Pn(this),al(this))};function Fo(l){l.A!=null&&(m.clearTimeout(l.A),l.A=null)}function al(l){l.g=new In(l,l.j,"rpc",l.Y),l.m===null&&(l.g.H=l.o),l.g.O=0;var f=Zt(l.qa);be(f,"RID","rpc"),be(f,"SID",l.K),be(f,"AID",l.T),be(f,"CI",l.F?"0":"1"),!l.F&&l.ja&&be(f,"TO",l.ja),be(f,"TYPE","xmlhttp"),hr(l,f),l.m&&l.o&&Mr(f,l.m,l.o),l.L&&(l.g.I=l.L);var v=l.g;l=l.ia,v.L=1,v.v=xr(Zt(f)),v.m=null,v.P=!0,Oo(v,l)}i.Za=function(){this.C!=null&&(this.C=null,Pn(this),Cs(this),Ze(19))};function Ps(l){l.C!=null&&(m.clearTimeout(l.C),l.C=null)}function ks(l,f){var v=null;if(l.g==f){Ps(l),Fo(l),l.g=null;var E=2}else if(bt(l.h,f))v=f.D,Ja(l.h,f),E=1;else return;if(l.G!=0){if(f.o)if(E==1){v=f.m?f.m.length:0,f=Date.now()-f.F;var V=l.B;E=_i(),at(E,new ps(E,v)),Hn(l)}else ki(l);else if(V=f.s,V==3||V==0&&0<f.X||!(E==1&&cc(l,f)||E==2&&Cs(l)))switch(v&&0<v.length&&(f=l.h,f.i=f.i.concat(v)),V){case 1:dr(l,5);break;case 4:dr(l,10);break;case 3:dr(l,6);break;default:dr(l,2)}}}function ll(l,f){let v=l.Ta+Math.floor(Math.random()*l.cb);return l.isActive()||(v*=2),v*f}function dr(l,f){if(l.j.info("Error code "+f),f==2){var v=D(l.fb,l),E=l.Xa;const V=!E;E=new lr(E||"//www.google.com/images/cleardot.gif"),m.location&&m.location.protocol=="http"||Ri(E,"https"),xr(E),V?ac(E.toString(),v):il(E.toString(),v)}else Ze(2);l.G=0,l.l&&l.l.sa(f),ul(l),As(l)}i.fb=function(l){l?(this.j.info("Successfully pinged google.com"),Ze(2)):(this.j.info("Failed to ping google.com"),Ze(1))};function ul(l){if(l.G=0,l.ka=[],l.l){const f=Za(l.h);(f.length!=0||l.i.length!=0)&&(j(l.ka,f),j(l.ka,l.i),l.h.i.length=0,q(l.i),l.i.length=0),l.l.ra()}}function cl(l,f,v){var E=v instanceof lr?Zt(v):new lr(v);if(E.g!="")f&&(E.g=f+"."+E.g),Or(E,E.s);else{var V=m.location;E=V.protocol,f=f?f+"."+V.hostname:V.hostname,V=+V.port;var F=new lr(null);E&&Ri(F,E),f&&(F.g=f),V&&Or(F,V),v&&(F.l=v),E=F}return v=l.D,f=l.ya,v&&f&&be(E,v,f),be(E,"VER",l.la),hr(l,E),E}function hl(l,f,v){if(f&&!l.J)throw Error("Can't create secondary domain capable XhrIo object.");return f=l.Ca&&!l.pa?new We(new ur({eb:v})):new We(l.pa),f.Ha(l.J),f}i.isActive=function(){return!!this.l&&this.l.isActive(this)};function jo(){}i=jo.prototype,i.ua=function(){},i.ta=function(){},i.sa=function(){},i.ra=function(){},i.isActive=function(){return!0},i.Na=function(){};function Ns(){}Ns.prototype.g=function(l,f){return new Ft(l,f)};function Ft(l,f){ot.call(this),this.g=new bo(f),this.l=l,this.h=f&&f.messageUrlParams||null,l=f&&f.messageHeaders||null,f&&f.clientProtocolHeaderRequired&&(l?l["X-Client-Protocol"]="webchannel":l={"X-Client-Protocol":"webchannel"}),this.g.o=l,l=f&&f.initMessageHeaders||null,f&&f.messageContentType&&(l?l["X-WebChannel-Content-Type"]=f.messageContentType:l={"X-WebChannel-Content-Type":f.messageContentType}),f&&f.va&&(l?l["X-WebChannel-Client-Profile"]=f.va:l={"X-WebChannel-Client-Profile":f.va}),this.g.S=l,(l=f&&f.Sb)&&!ce(l)&&(this.g.m=l),this.v=f&&f.supportsCrossDomainXhr||!1,this.u=f&&f.sendRawJson||!1,(f=f&&f.httpSessionIdParam)&&!ce(f)&&(this.g.D=f,l=this.h,l!==null&&f in l&&(l=this.h,f in l&&delete l[f])),this.j=new Wn(this)}W(Ft,ot),Ft.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Ft.prototype.close=function(){Et(this.g)},Ft.prototype.o=function(l){var f=this.g;if(typeof l=="string"){var v={};v.__data__=l,l=v}else this.u&&(v={},v.__data__=Io(l),l=v);f.i.push(new Xa(f.Ya++,l)),f.G==3&&Hn(f)},Ft.prototype.N=function(){this.g.l=null,delete this.j,Et(this.g),delete this.g,Ft.aa.N.call(this)};function dl(l){Fn.call(this),l.__headers__&&(this.headers=l.__headers__,this.statusCode=l.__status__,delete l.__headers__,delete l.__status__);var f=l.__sm__;if(f){e:{for(const v in f){l=v;break e}l=void 0}(this.i=l)&&(l=this.i,f=f!==null&&l in f?f[l]:void 0),this.data=f}else this.data=l}W(dl,Fn);function fl(){fs.call(this),this.status=1}W(fl,fs);function Wn(l){this.g=l}W(Wn,jo),Wn.prototype.ua=function(){at(this.g,"a")},Wn.prototype.ta=function(l){at(this.g,new dl(l))},Wn.prototype.sa=function(l){at(this.g,new fl)},Wn.prototype.ra=function(){at(this.g,"b")},Ns.prototype.createWebChannel=Ns.prototype.g,Ft.prototype.send=Ft.prototype.o,Ft.prototype.open=Ft.prototype.m,Ft.prototype.close=Ft.prototype.close,oy=function(){return new Ns},sy=function(){return _i()},iy=jn,od={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},gs.NO_ERROR=0,gs.TIMEOUT=8,gs.HTTP_ERROR=6,vu=gs,Ga.COMPLETE="complete",ry=Ga,ds.EventType=ln,ln.OPEN="a",ln.CLOSE="b",ln.ERROR="c",ln.MESSAGE="d",ot.prototype.listen=ot.prototype.K,pa=ds,We.prototype.listenOnce=We.prototype.L,We.prototype.getLastError=We.prototype.Ka,We.prototype.getLastErrorCode=We.prototype.Ba,We.prototype.getStatus=We.prototype.Z,We.prototype.getResponseJson=We.prototype.Oa,We.prototype.getResponseText=We.prototype.oa,We.prototype.send=We.prototype.ea,We.prototype.setWithCredentials=We.prototype.Ha,ny=We}).apply(typeof lu<"u"?lu:typeof self<"u"?self:typeof window<"u"?window:{});const ag="@firebase/firestore",lg="4.7.11";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lt{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Lt.UNAUTHENTICATED=new Lt(null),Lt.GOOGLE_CREDENTIALS=new Lt("google-credentials-uid"),Lt.FIRST_PARTY=new Lt("first-party-uid"),Lt.MOCK_USER=new Lt("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let mo="11.6.1";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yi=new Td("@firebase/firestore");function Js(){return Yi.logLevel}function oe(i,...e){if(Yi.logLevel<=Se.DEBUG){const n=e.map(Vd);Yi.debug(`Firestore (${mo}): ${i}`,...n)}}function Ji(i,...e){if(Yi.logLevel<=Se.ERROR){const n=e.map(Vd);Yi.error(`Firestore (${mo}): ${i}`,...n)}}function Ku(i,...e){if(Yi.logLevel<=Se.WARN){const n=e.map(Vd);Yi.warn(`Firestore (${mo}): ${i}`,...n)}}function Vd(i){if(typeof i=="string")return i;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(n){return JSON.stringify(n)}(i)}catch{return i}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Te(i,e,n){let s="Unexpected state";typeof e=="string"?s=e:n=e,ay(i,s,n)}function ay(i,e,n){let s=`FIRESTORE (${mo}) INTERNAL ASSERTION FAILED: ${e} (ID: ${i.toString(16)})`;if(n!==void 0)try{s+=" CONTEXT: "+JSON.stringify(n)}catch{s+=" CONTEXT: "+n}throw Ji(s),new Error(s)}function Ye(i,e,n,s){let a="Unexpected state";typeof n=="string"?a=n:s=n,i||ay(e,a,s)}function Be(i,e){return i}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Q={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class ge extends Rr{constructor(e,n){super(e,n),this.code=e,this.message=n,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wi{constructor(){this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ly{constructor(e,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class BS{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,n){e.enqueueRetryable(()=>n(Lt.UNAUTHENTICATED))}shutdown(){}}class $S{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,n){this.changeListener=n,e.enqueueRetryable(()=>n(this.token.user))}shutdown(){this.changeListener=null}}class HS{constructor(e){this.t=e,this.currentUser=Lt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,n){Ye(this.o===void 0,42304);let s=this.i;const a=g=>this.i!==s?(s=this.i,n(g)):Promise.resolve();let u=new Wi;this.o=()=>{this.i++,this.currentUser=this.u(),u.resolve(),u=new Wi,e.enqueueRetryable(()=>a(this.currentUser))};const h=()=>{const g=u;e.enqueueRetryable(async()=>{await g.promise,await a(this.currentUser)})},m=g=>{oe("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=g,this.o&&(this.auth.addAuthTokenListener(this.o),h())};this.t.onInit(g=>m(g)),setTimeout(()=>{if(!this.auth){const g=this.t.getImmediate({optional:!0});g?m(g):(oe("FirebaseAuthCredentialsProvider","Auth not yet detected"),u.resolve(),u=new Wi)}},0),h()}getToken(){const e=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then(s=>this.i!==e?(oe("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):s?(Ye(typeof s.accessToken=="string",31837,{l:s}),new ly(s.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return Ye(e===null||typeof e=="string",2055,{h:e}),new Lt(e)}}class WS{constructor(e,n,s){this.P=e,this.T=n,this.I=s,this.type="FirstParty",this.user=Lt.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class GS{constructor(e,n,s){this.P=e,this.T=n,this.I=s}getToken(){return Promise.resolve(new WS(this.P,this.T,this.I))}start(e,n){e.enqueueRetryable(()=>n(Lt.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class ug{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class KS{constructor(e,n){this.V=n,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,_n(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,n){Ye(this.o===void 0,3512);const s=u=>{u.error!=null&&oe("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${u.error.message}`);const h=u.token!==this.m;return this.m=u.token,oe("FirebaseAppCheckTokenProvider",`Received ${h?"new":"existing"} token.`),h?n(u.token):Promise.resolve()};this.o=u=>{e.enqueueRetryable(()=>s(u))};const a=u=>{oe("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=u,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(u=>a(u)),setTimeout(()=>{if(!this.appCheck){const u=this.V.getImmediate({optional:!0});u?a(u):oe("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new ug(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(n=>n?(Ye(typeof n.token=="string",44558,{tokenResult:n}),this.m=n.token,new ug(n.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qS(i){const e=typeof self<"u"&&(self.crypto||self.msCrypto),n=new Uint8Array(i);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(n);else for(let s=0;s<i;s++)n[s]=Math.floor(256*Math.random());return n}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function QS(){return new TextEncoder}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uy{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=62*Math.floor(4.129032258064516);let s="";for(;s.length<20;){const a=qS(40);for(let u=0;u<a.length;++u)s.length<20&&a[u]<n&&(s+=e.charAt(a[u]%62))}return s}}function Oe(i,e){return i<e?-1:i>e?1:0}function ad(i,e){let n=0;for(;n<i.length&&n<e.length;){const s=i.codePointAt(n),a=e.codePointAt(n);if(s!==a){if(s<128&&a<128)return Oe(s,a);{const u=QS(),h=XS(u.encode(cg(i,n)),u.encode(cg(e,n)));return h!==0?h:Oe(s,a)}}n+=s>65535?2:1}return Oe(i.length,e.length)}function cg(i,e){return i.codePointAt(e)>65535?i.substring(e,e+2):i.substring(e,e+1)}function XS(i,e){for(let n=0;n<i.length&&n<e.length;++n)if(i[n]!==e[n])return Oe(i[n],e[n]);return Oe(i.length,e.length)}function oo(i,e,n){return i.length===e.length&&i.every((s,a)=>n(s,e[a]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hg=-62135596800,dg=1e6;class yt{static now(){return yt.fromMillis(Date.now())}static fromDate(e){return yt.fromMillis(e.getTime())}static fromMillis(e){const n=Math.floor(e/1e3),s=Math.floor((e-1e3*n)*dg);return new yt(n,s)}constructor(e,n){if(this.seconds=e,this.nanoseconds=n,n<0)throw new ge(Q.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(n>=1e9)throw new ge(Q.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(e<hg)throw new ge(Q.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new ge(Q.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/dg}_compareTo(e){return this.seconds===e.seconds?Oe(this.nanoseconds,e.nanoseconds):Oe(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds-hg;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ke{static fromTimestamp(e){return new Ke(e)}static min(){return new Ke(new yt(0,0))}static max(){return new Ke(new yt(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fg="__name__";class Xn{constructor(e,n,s){n===void 0?n=0:n>e.length&&Te(637,{offset:n,range:e.length}),s===void 0?s=e.length-n:s>e.length-n&&Te(1746,{length:s,range:e.length-n}),this.segments=e,this.offset=n,this.len=s}get length(){return this.len}isEqual(e){return Xn.comparator(this,e)===0}child(e){const n=this.segments.slice(this.offset,this.limit());return e instanceof Xn?e.forEach(s=>{n.push(s)}):n.push(e),this.construct(n)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}forEach(e){for(let n=this.offset,s=this.limit();n<s;n++)e(this.segments[n])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,n){const s=Math.min(e.length,n.length);for(let a=0;a<s;a++){const u=Xn.compareSegments(e.get(a),n.get(a));if(u!==0)return u}return Oe(e.length,n.length)}static compareSegments(e,n){const s=Xn.isNumericId(e),a=Xn.isNumericId(n);return s&&!a?-1:!s&&a?1:s&&a?Xn.extractNumericId(e).compare(Xn.extractNumericId(n)):ad(e,n)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Ld.fromString(e.substring(4,e.length-2))}}class it extends Xn{construct(e,n,s){return new it(e,n,s)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const n=[];for(const s of e){if(s.indexOf("//")>=0)throw new ge(Q.INVALID_ARGUMENT,`Invalid segment (${s}). Paths must not contain // in them.`);n.push(...s.split("/").filter(a=>a.length>0))}return new it(n)}static emptyPath(){return new it([])}}const YS=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class At extends Xn{construct(e,n,s){return new At(e,n,s)}static isValidIdentifier(e){return YS.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),At.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===fg}static keyField(){return new At([fg])}static fromServerFormat(e){const n=[];let s="",a=0;const u=()=>{if(s.length===0)throw new ge(Q.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);n.push(s),s=""};let h=!1;for(;a<e.length;){const m=e[a];if(m==="\\"){if(a+1===e.length)throw new ge(Q.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const g=e[a+1];if(g!=="\\"&&g!=="."&&g!=="`")throw new ge(Q.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);s+=g,a+=2}else m==="`"?(h=!h,a++):m!=="."||h?(s+=m,a++):(u(),a++)}if(u(),h)throw new ge(Q.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new At(n)}static emptyPath(){return new At([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _e{constructor(e){this.path=e}static fromPath(e){return new _e(it.fromString(e))}static fromName(e){return new _e(it.fromString(e).popFirst(5))}static empty(){return new _e(it.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&it.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,n){return it.comparator(e.path,n.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new _e(new it(e.slice()))}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Aa=-1;function JS(i,e){const n=i.toTimestamp().seconds,s=i.toTimestamp().nanoseconds+1,a=Ke.fromTimestamp(s===1e9?new yt(n+1,0):new yt(n,s));return new li(a,_e.empty(),e)}function ZS(i){return new li(i.readTime,i.key,Aa)}class li{constructor(e,n,s){this.readTime=e,this.documentKey=n,this.largestBatchId=s}static min(){return new li(Ke.min(),_e.empty(),Aa)}static max(){return new li(Ke.max(),_e.empty(),Aa)}}function eA(i,e){let n=i.readTime.compareTo(e.readTime);return n!==0?n:(n=_e.comparator(i.documentKey,e.documentKey),n!==0?n:Oe(i.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tA="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class nA{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Md(i){if(i.code!==Q.FAILED_PRECONDITION||i.message!==tA)throw i;oe("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ${constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(n=>{this.isDone=!0,this.result=n,this.nextCallback&&this.nextCallback(n)},n=>{this.isDone=!0,this.error=n,this.catchCallback&&this.catchCallback(n)})}catch(e){return this.next(void 0,e)}next(e,n){return this.callbackAttached&&Te(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(n,this.error):this.wrapSuccess(e,this.result):new $((s,a)=>{this.nextCallback=u=>{this.wrapSuccess(e,u).next(s,a)},this.catchCallback=u=>{this.wrapFailure(n,u).next(s,a)}})}toPromise(){return new Promise((e,n)=>{this.next(e,n)})}wrapUserFunction(e){try{const n=e();return n instanceof $?n:$.resolve(n)}catch(n){return $.reject(n)}}wrapSuccess(e,n){return e?this.wrapUserFunction(()=>e(n)):$.resolve(n)}wrapFailure(e,n){return e?this.wrapUserFunction(()=>e(n)):$.reject(n)}static resolve(e){return new $((n,s)=>{n(e)})}static reject(e){return new $((n,s)=>{s(e)})}static waitFor(e){return new $((n,s)=>{let a=0,u=0,h=!1;e.forEach(m=>{++a,m.next(()=>{++u,h&&u===a&&n()},g=>s(g))}),h=!0,u===a&&n()})}static or(e){let n=$.resolve(!1);for(const s of e)n=n.next(a=>a?$.resolve(a):s());return n}static forEach(e,n){const s=[];return e.forEach((a,u)=>{s.push(n.call(this,a,u))}),this.waitFor(s)}static mapArray(e,n){return new $((s,a)=>{const u=e.length,h=new Array(u);let m=0;for(let g=0;g<u;g++){const _=g;n(e[_]).next(w=>{h[_]=w,++m,m===u&&s(h)},w=>a(w))}})}static doWhile(e,n){return new $((s,a)=>{const u=()=>{e()===!0?n().next(()=>{u()},a):s()};u()})}}function rA(i){const e=i.match(/Android ([\d.]+)/i),n=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(n)}function ja(i){return i.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ud{constructor(e,n){this.previousValue=e,n&&(n.sequenceNumberHandler=s=>this.ue(s),this.ce=s=>n.writeSequenceNumber(s))}ue(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ce&&this.ce(e),e}}Ud.le=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bd=-1;function Fd(i){return i==null}function Nu(i){return i===0&&1/i==-1/0}function iA(i){return typeof i=="number"&&Number.isInteger(i)&&!Nu(i)&&i<=Number.MAX_SAFE_INTEGER&&i>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cy="";function sA(i){let e="";for(let n=0;n<i.length;n++)e.length>0&&(e=pg(e)),e=oA(i.get(n),e);return pg(e)}function oA(i,e){let n=e;const s=i.length;for(let a=0;a<s;a++){const u=i.charAt(a);switch(u){case"\0":n+="";break;case cy:n+="";break;default:n+=u}}return n}function pg(i){return i+cy+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mg(i){let e=0;for(const n in i)Object.prototype.hasOwnProperty.call(i,n)&&e++;return e}function is(i,e){for(const n in i)Object.prototype.hasOwnProperty.call(i,n)&&e(n,i[n])}function hy(i){for(const e in i)if(Object.prototype.hasOwnProperty.call(i,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yt{constructor(e,n){this.comparator=e,this.root=n||It.EMPTY}insert(e,n){return new Yt(this.comparator,this.root.insert(e,n,this.comparator).copy(null,null,It.BLACK,null,null))}remove(e){return new Yt(this.comparator,this.root.remove(e,this.comparator).copy(null,null,It.BLACK,null,null))}get(e){let n=this.root;for(;!n.isEmpty();){const s=this.comparator(e,n.key);if(s===0)return n.value;s<0?n=n.left:s>0&&(n=n.right)}return null}indexOf(e){let n=0,s=this.root;for(;!s.isEmpty();){const a=this.comparator(e,s.key);if(a===0)return n+s.left.size;a<0?s=s.left:(n+=s.left.size+1,s=s.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((n,s)=>(e(n,s),!1))}toString(){const e=[];return this.inorderTraversal((n,s)=>(e.push(`${n}:${s}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new uu(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new uu(this.root,e,this.comparator,!1)}getReverseIterator(){return new uu(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new uu(this.root,e,this.comparator,!0)}}class uu{constructor(e,n,s,a){this.isReverse=a,this.nodeStack=[];let u=1;for(;!e.isEmpty();)if(u=n?s(e.key,n):1,n&&a&&(u*=-1),u<0)e=this.isReverse?e.left:e.right;else{if(u===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const n={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return n}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class It{constructor(e,n,s,a,u){this.key=e,this.value=n,this.color=s??It.RED,this.left=a??It.EMPTY,this.right=u??It.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,n,s,a,u){return new It(e??this.key,n??this.value,s??this.color,a??this.left,u??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,s){let a=this;const u=s(e,a.key);return a=u<0?a.copy(null,null,null,a.left.insert(e,n,s),null):u===0?a.copy(null,n,null,null,null):a.copy(null,null,null,null,a.right.insert(e,n,s)),a.fixUp()}removeMin(){if(this.left.isEmpty())return It.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,n){let s,a=this;if(n(e,a.key)<0)a.left.isEmpty()||a.left.isRed()||a.left.left.isRed()||(a=a.moveRedLeft()),a=a.copy(null,null,null,a.left.remove(e,n),null);else{if(a.left.isRed()&&(a=a.rotateRight()),a.right.isEmpty()||a.right.isRed()||a.right.left.isRed()||(a=a.moveRedRight()),n(e,a.key)===0){if(a.right.isEmpty())return It.EMPTY;s=a.right.min(),a=a.copy(s.key,s.value,null,null,a.right.removeMin())}a=a.copy(null,null,null,null,a.right.remove(e,n))}return a.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,It.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,It.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw Te(43730,{key:this.key,value:this.value});if(this.right.isRed())throw Te(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw Te(27949);return e+(this.isRed()?0:1)}}It.EMPTY=null,It.RED=!0,It.BLACK=!1;It.EMPTY=new class{constructor(){this.size=0}get key(){throw Te(57766)}get value(){throw Te(16141)}get color(){throw Te(16727)}get left(){throw Te(29726)}get right(){throw Te(36894)}copy(e,n,s,a,u){return this}insert(e,n,s){return new It(e,n)}remove(e,n){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rt{constructor(e){this.comparator=e,this.data=new Yt(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((n,s)=>(e(n),!1))}forEachInRange(e,n){const s=this.data.getIteratorFrom(e[0]);for(;s.hasNext();){const a=s.getNext();if(this.comparator(a.key,e[1])>=0)return;n(a.key)}}forEachWhile(e,n){let s;for(s=n!==void 0?this.data.getIteratorFrom(n):this.data.getIterator();s.hasNext();)if(!e(s.getNext().key))return}firstAfterOrEqual(e){const n=this.data.getIteratorFrom(e);return n.hasNext()?n.getNext().key:null}getIterator(){return new gg(this.data.getIterator())}getIteratorFrom(e){return new gg(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let n=this;return n.size<e.size&&(n=e,e=this),e.forEach(s=>{n=n.add(s)}),n}isEqual(e){if(!(e instanceof Rt)||this.size!==e.size)return!1;const n=this.data.getIterator(),s=e.data.getIterator();for(;n.hasNext();){const a=n.getNext().key,u=s.getNext().key;if(this.comparator(a,u)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(n=>{e.push(n)}),e}toString(){const e=[];return this.forEach(n=>e.push(n)),"SortedSet("+e.toString()+")"}copy(e){const n=new Rt(this.comparator);return n.data=e,n}}class gg{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class an{constructor(e){this.fields=e,e.sort(At.comparator)}static empty(){return new an([])}unionWith(e){let n=new Rt(At.comparator);for(const s of this.fields)n=n.add(s);for(const s of e)n=n.add(s);return new an(n.toArray())}covers(e){for(const n of this.fields)if(n.isPrefixOf(e))return!0;return!1}isEqual(e){return oo(this.fields,e.fields,(n,s)=>n.isEqual(s))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aA extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tr{constructor(e){this.binaryString=e}static fromBase64String(e){const n=function(a){try{return atob(a)}catch(u){throw typeof DOMException<"u"&&u instanceof DOMException?new aA("Invalid base64 string: "+u):u}}(e);return new tr(n)}static fromUint8Array(e){const n=function(a){let u="";for(let h=0;h<a.length;++h)u+=String.fromCharCode(a[h]);return u}(e);return new tr(n)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(n){return btoa(n)}(this.binaryString)}toUint8Array(){return function(n){const s=new Uint8Array(n.length);for(let a=0;a<n.length;a++)s[a]=n.charCodeAt(a);return s}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return Oe(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}tr.EMPTY_BYTE_STRING=new tr("");const lA=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Zi(i){if(Ye(!!i,39018),typeof i=="string"){let e=0;const n=lA.exec(i);if(Ye(!!n,46558,{timestamp:i}),n[1]){let a=n[1];a=(a+"000000000").substr(0,9),e=Number(a)}const s=new Date(i);return{seconds:Math.floor(s.getTime()/1e3),nanos:e}}return{seconds:St(i.seconds),nanos:St(i.nanos)}}function St(i){return typeof i=="number"?i:typeof i=="string"?Number(i):0}function ao(i){return typeof i=="string"?tr.fromBase64String(i):tr.fromUint8Array(i)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dy="server_timestamp",fy="__type__",py="__previous_value__",my="__local_write_time__";function jd(i){var e,n;return((n=(((e=i==null?void 0:i.mapValue)===null||e===void 0?void 0:e.fields)||{})[fy])===null||n===void 0?void 0:n.stringValue)===dy}function zd(i){const e=i.mapValue.fields[py];return jd(e)?zd(e):e}function Ou(i){const e=Zi(i.mapValue.fields[my].timestampValue);return new yt(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uA{constructor(e,n,s,a,u,h,m,g,_){this.databaseId=e,this.appId=n,this.persistenceKey=s,this.host=a,this.ssl=u,this.forceLongPolling=h,this.autoDetectLongPolling=m,this.longPollingOptions=g,this.useFetchStreams=_}}const Du="(default)";class xu{constructor(e,n){this.projectId=e,this.database=n||Du}static empty(){return new xu("","")}get isDefaultDatabase(){return this.database===Du}isEqual(e){return e instanceof xu&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gy="__type__",cA="__max__",cu={mapValue:{}},vy="__vector__",ld="value";function es(i){return"nullValue"in i?0:"booleanValue"in i?1:"integerValue"in i||"doubleValue"in i?2:"timestampValue"in i?3:"stringValue"in i?5:"bytesValue"in i?6:"referenceValue"in i?7:"geoPointValue"in i?8:"arrayValue"in i?9:"mapValue"in i?jd(i)?4:dA(i)?9007199254740991:hA(i)?10:11:Te(28295,{value:i})}function nr(i,e){if(i===e)return!0;const n=es(i);if(n!==es(e))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return i.booleanValue===e.booleanValue;case 4:return Ou(i).isEqual(Ou(e));case 3:return function(a,u){if(typeof a.timestampValue=="string"&&typeof u.timestampValue=="string"&&a.timestampValue.length===u.timestampValue.length)return a.timestampValue===u.timestampValue;const h=Zi(a.timestampValue),m=Zi(u.timestampValue);return h.seconds===m.seconds&&h.nanos===m.nanos}(i,e);case 5:return i.stringValue===e.stringValue;case 6:return function(a,u){return ao(a.bytesValue).isEqual(ao(u.bytesValue))}(i,e);case 7:return i.referenceValue===e.referenceValue;case 8:return function(a,u){return St(a.geoPointValue.latitude)===St(u.geoPointValue.latitude)&&St(a.geoPointValue.longitude)===St(u.geoPointValue.longitude)}(i,e);case 2:return function(a,u){if("integerValue"in a&&"integerValue"in u)return St(a.integerValue)===St(u.integerValue);if("doubleValue"in a&&"doubleValue"in u){const h=St(a.doubleValue),m=St(u.doubleValue);return h===m?Nu(h)===Nu(m):isNaN(h)&&isNaN(m)}return!1}(i,e);case 9:return oo(i.arrayValue.values||[],e.arrayValue.values||[],nr);case 10:case 11:return function(a,u){const h=a.mapValue.fields||{},m=u.mapValue.fields||{};if(mg(h)!==mg(m))return!1;for(const g in h)if(h.hasOwnProperty(g)&&(m[g]===void 0||!nr(h[g],m[g])))return!1;return!0}(i,e);default:return Te(52216,{left:i})}}function Ra(i,e){return(i.values||[]).find(n=>nr(n,e))!==void 0}function lo(i,e){if(i===e)return 0;const n=es(i),s=es(e);if(n!==s)return Oe(n,s);switch(n){case 0:case 9007199254740991:return 0;case 1:return Oe(i.booleanValue,e.booleanValue);case 2:return function(u,h){const m=St(u.integerValue||u.doubleValue),g=St(h.integerValue||h.doubleValue);return m<g?-1:m>g?1:m===g?0:isNaN(m)?isNaN(g)?0:-1:1}(i,e);case 3:return vg(i.timestampValue,e.timestampValue);case 4:return vg(Ou(i),Ou(e));case 5:return ad(i.stringValue,e.stringValue);case 6:return function(u,h){const m=ao(u),g=ao(h);return m.compareTo(g)}(i.bytesValue,e.bytesValue);case 7:return function(u,h){const m=u.split("/"),g=h.split("/");for(let _=0;_<m.length&&_<g.length;_++){const w=Oe(m[_],g[_]);if(w!==0)return w}return Oe(m.length,g.length)}(i.referenceValue,e.referenceValue);case 8:return function(u,h){const m=Oe(St(u.latitude),St(h.latitude));return m!==0?m:Oe(St(u.longitude),St(h.longitude))}(i.geoPointValue,e.geoPointValue);case 9:return yg(i.arrayValue,e.arrayValue);case 10:return function(u,h){var m,g,_,w;const T=u.fields||{},D=h.fields||{},B=(m=T[ld])===null||m===void 0?void 0:m.arrayValue,W=(g=D[ld])===null||g===void 0?void 0:g.arrayValue,q=Oe(((_=B==null?void 0:B.values)===null||_===void 0?void 0:_.length)||0,((w=W==null?void 0:W.values)===null||w===void 0?void 0:w.length)||0);return q!==0?q:yg(B,W)}(i.mapValue,e.mapValue);case 11:return function(u,h){if(u===cu.mapValue&&h===cu.mapValue)return 0;if(u===cu.mapValue)return 1;if(h===cu.mapValue)return-1;const m=u.fields||{},g=Object.keys(m),_=h.fields||{},w=Object.keys(_);g.sort(),w.sort();for(let T=0;T<g.length&&T<w.length;++T){const D=ad(g[T],w[T]);if(D!==0)return D;const B=lo(m[g[T]],_[w[T]]);if(B!==0)return B}return Oe(g.length,w.length)}(i.mapValue,e.mapValue);default:throw Te(23264,{Pe:n})}}function vg(i,e){if(typeof i=="string"&&typeof e=="string"&&i.length===e.length)return Oe(i,e);const n=Zi(i),s=Zi(e),a=Oe(n.seconds,s.seconds);return a!==0?a:Oe(n.nanos,s.nanos)}function yg(i,e){const n=i.values||[],s=e.values||[];for(let a=0;a<n.length&&a<s.length;++a){const u=lo(n[a],s[a]);if(u)return u}return Oe(n.length,s.length)}function uo(i){return ud(i)}function ud(i){return"nullValue"in i?"null":"booleanValue"in i?""+i.booleanValue:"integerValue"in i?""+i.integerValue:"doubleValue"in i?""+i.doubleValue:"timestampValue"in i?function(n){const s=Zi(n);return`time(${s.seconds},${s.nanos})`}(i.timestampValue):"stringValue"in i?i.stringValue:"bytesValue"in i?function(n){return ao(n).toBase64()}(i.bytesValue):"referenceValue"in i?function(n){return _e.fromName(n).toString()}(i.referenceValue):"geoPointValue"in i?function(n){return`geo(${n.latitude},${n.longitude})`}(i.geoPointValue):"arrayValue"in i?function(n){let s="[",a=!0;for(const u of n.values||[])a?a=!1:s+=",",s+=ud(u);return s+"]"}(i.arrayValue):"mapValue"in i?function(n){const s=Object.keys(n.fields||{}).sort();let a="{",u=!0;for(const h of s)u?u=!1:a+=",",a+=`${h}:${ud(n.fields[h])}`;return a+"}"}(i.mapValue):Te(61005,{value:i})}function yu(i){switch(es(i)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=zd(i);return e?16+yu(e):16;case 5:return 2*i.stringValue.length;case 6:return ao(i.bytesValue).approximateByteSize();case 7:return i.referenceValue.length;case 9:return function(s){return(s.values||[]).reduce((a,u)=>a+yu(u),0)}(i.arrayValue);case 10:case 11:return function(s){let a=0;return is(s.fields,(u,h)=>{a+=u.length+yu(h)}),a}(i.mapValue);default:throw Te(13486,{value:i})}}function cd(i){return!!i&&"integerValue"in i}function Bd(i){return!!i&&"arrayValue"in i}function _u(i){return!!i&&"mapValue"in i}function hA(i){var e,n;return((n=(((e=i==null?void 0:i.mapValue)===null||e===void 0?void 0:e.fields)||{})[gy])===null||n===void 0?void 0:n.stringValue)===vy}function ga(i){if(i.geoPointValue)return{geoPointValue:Object.assign({},i.geoPointValue)};if(i.timestampValue&&typeof i.timestampValue=="object")return{timestampValue:Object.assign({},i.timestampValue)};if(i.mapValue){const e={mapValue:{fields:{}}};return is(i.mapValue.fields,(n,s)=>e.mapValue.fields[n]=ga(s)),e}if(i.arrayValue){const e={arrayValue:{values:[]}};for(let n=0;n<(i.arrayValue.values||[]).length;++n)e.arrayValue.values[n]=ga(i.arrayValue.values[n]);return e}return Object.assign({},i)}function dA(i){return(((i.mapValue||{}).fields||{}).__type__||{}).stringValue===cA}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class on{constructor(e){this.value=e}static empty(){return new on({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let n=this.value;for(let s=0;s<e.length-1;++s)if(n=(n.mapValue.fields||{})[e.get(s)],!_u(n))return null;return n=(n.mapValue.fields||{})[e.lastSegment()],n||null}}set(e,n){this.getFieldsMap(e.popLast())[e.lastSegment()]=ga(n)}setAll(e){let n=At.emptyPath(),s={},a=[];e.forEach((h,m)=>{if(!n.isImmediateParentOf(m)){const g=this.getFieldsMap(n);this.applyChanges(g,s,a),s={},a=[],n=m.popLast()}h?s[m.lastSegment()]=ga(h):a.push(m.lastSegment())});const u=this.getFieldsMap(n);this.applyChanges(u,s,a)}delete(e){const n=this.field(e.popLast());_u(n)&&n.mapValue.fields&&delete n.mapValue.fields[e.lastSegment()]}isEqual(e){return nr(this.value,e.value)}getFieldsMap(e){let n=this.value;n.mapValue.fields||(n.mapValue={fields:{}});for(let s=0;s<e.length;++s){let a=n.mapValue.fields[e.get(s)];_u(a)&&a.mapValue.fields||(a={mapValue:{fields:{}}},n.mapValue.fields[e.get(s)]=a),n=a}return n.mapValue.fields}applyChanges(e,n,s){is(n,(a,u)=>e[a]=u);for(const a of s)delete e[a]}clone(){return new on(ga(this.value))}}function yy(i){const e=[];return is(i.fields,(n,s)=>{const a=new At([n]);if(_u(s)){const u=yy(s.mapValue).fields;if(u.length===0)e.push(a);else for(const h of u)e.push(a.child(h))}else e.push(a)}),new an(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vn{constructor(e,n,s,a,u,h,m){this.key=e,this.documentType=n,this.version=s,this.readTime=a,this.createTime=u,this.data=h,this.documentState=m}static newInvalidDocument(e){return new Vn(e,0,Ke.min(),Ke.min(),Ke.min(),on.empty(),0)}static newFoundDocument(e,n,s,a){return new Vn(e,1,n,Ke.min(),s,a,0)}static newNoDocument(e,n){return new Vn(e,2,n,Ke.min(),Ke.min(),on.empty(),0)}static newUnknownDocument(e,n){return new Vn(e,3,n,Ke.min(),Ke.min(),on.empty(),2)}convertToFoundDocument(e,n){return!this.createTime.isEqual(Ke.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=n,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=on.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=on.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=Ke.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Vn&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Vn(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lu{constructor(e,n){this.position=e,this.inclusive=n}}function _g(i,e,n){let s=0;for(let a=0;a<i.position.length;a++){const u=e[a],h=i.position[a];if(u.field.isKeyField()?s=_e.comparator(_e.fromName(h.referenceValue),n.key):s=lo(h,n.data.field(u.field)),u.dir==="desc"&&(s*=-1),s!==0)break}return s}function Eg(i,e){if(i===null)return e===null;if(e===null||i.inclusive!==e.inclusive||i.position.length!==e.position.length)return!1;for(let n=0;n<i.position.length;n++)if(!nr(i.position[n],e.position[n]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vu{constructor(e,n="asc"){this.field=e,this.dir=n}}function fA(i,e){return i.dir===e.dir&&i.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _y{}class vt extends _y{constructor(e,n,s){super(),this.field=e,this.op=n,this.value=s}static create(e,n,s){return e.isKeyField()?n==="in"||n==="not-in"?this.createKeyFieldInFilter(e,n,s):new mA(e,n,s):n==="array-contains"?new yA(e,s):n==="in"?new _A(e,s):n==="not-in"?new EA(e,s):n==="array-contains-any"?new wA(e,s):new vt(e,n,s)}static createKeyFieldInFilter(e,n,s){return n==="in"?new gA(e,s):new vA(e,s)}matches(e){const n=e.data.field(this.field);return this.op==="!="?n!==null&&n.nullValue===void 0&&this.matchesComparison(lo(n,this.value)):n!==null&&es(this.value)===es(n)&&this.matchesComparison(lo(n,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return Te(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class ui extends _y{constructor(e,n){super(),this.filters=e,this.op=n,this.Te=null}static create(e,n){return new ui(e,n)}matches(e){return Ey(this)?this.filters.find(n=>!n.matches(e))===void 0:this.filters.find(n=>n.matches(e))!==void 0}getFlattenedFilters(){return this.Te!==null||(this.Te=this.filters.reduce((e,n)=>e.concat(n.getFlattenedFilters()),[])),this.Te}getFilters(){return Object.assign([],this.filters)}}function Ey(i){return i.op==="and"}function wy(i){return pA(i)&&Ey(i)}function pA(i){for(const e of i.filters)if(e instanceof ui)return!1;return!0}function hd(i){if(i instanceof vt)return i.field.canonicalString()+i.op.toString()+uo(i.value);if(wy(i))return i.filters.map(e=>hd(e)).join(",");{const e=i.filters.map(n=>hd(n)).join(",");return`${i.op}(${e})`}}function Ty(i,e){return i instanceof vt?function(s,a){return a instanceof vt&&s.op===a.op&&s.field.isEqual(a.field)&&nr(s.value,a.value)}(i,e):i instanceof ui?function(s,a){return a instanceof ui&&s.op===a.op&&s.filters.length===a.filters.length?s.filters.reduce((u,h,m)=>u&&Ty(h,a.filters[m]),!0):!1}(i,e):void Te(19439)}function Iy(i){return i instanceof vt?function(n){return`${n.field.canonicalString()} ${n.op} ${uo(n.value)}`}(i):i instanceof ui?function(n){return n.op.toString()+" {"+n.getFilters().map(Iy).join(" ,")+"}"}(i):"Filter"}class mA extends vt{constructor(e,n,s){super(e,n,s),this.key=_e.fromName(s.referenceValue)}matches(e){const n=_e.comparator(e.key,this.key);return this.matchesComparison(n)}}class gA extends vt{constructor(e,n){super(e,"in",n),this.keys=Sy("in",n)}matches(e){return this.keys.some(n=>n.isEqual(e.key))}}class vA extends vt{constructor(e,n){super(e,"not-in",n),this.keys=Sy("not-in",n)}matches(e){return!this.keys.some(n=>n.isEqual(e.key))}}function Sy(i,e){var n;return(((n=e.arrayValue)===null||n===void 0?void 0:n.values)||[]).map(s=>_e.fromName(s.referenceValue))}class yA extends vt{constructor(e,n){super(e,"array-contains",n)}matches(e){const n=e.data.field(this.field);return Bd(n)&&Ra(n.arrayValue,this.value)}}class _A extends vt{constructor(e,n){super(e,"in",n)}matches(e){const n=e.data.field(this.field);return n!==null&&Ra(this.value.arrayValue,n)}}class EA extends vt{constructor(e,n){super(e,"not-in",n)}matches(e){if(Ra(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const n=e.data.field(this.field);return n!==null&&n.nullValue===void 0&&!Ra(this.value.arrayValue,n)}}class wA extends vt{constructor(e,n){super(e,"array-contains-any",n)}matches(e){const n=e.data.field(this.field);return!(!Bd(n)||!n.arrayValue.values)&&n.arrayValue.values.some(s=>Ra(this.value.arrayValue,s))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class TA{constructor(e,n=null,s=[],a=[],u=null,h=null,m=null){this.path=e,this.collectionGroup=n,this.orderBy=s,this.filters=a,this.limit=u,this.startAt=h,this.endAt=m,this.Ie=null}}function wg(i,e=null,n=[],s=[],a=null,u=null,h=null){return new TA(i,e,n,s,a,u,h)}function $d(i){const e=Be(i);if(e.Ie===null){let n=e.path.canonicalString();e.collectionGroup!==null&&(n+="|cg:"+e.collectionGroup),n+="|f:",n+=e.filters.map(s=>hd(s)).join(","),n+="|ob:",n+=e.orderBy.map(s=>function(u){return u.field.canonicalString()+u.dir}(s)).join(","),Fd(e.limit)||(n+="|l:",n+=e.limit),e.startAt&&(n+="|lb:",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map(s=>uo(s)).join(",")),e.endAt&&(n+="|ub:",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map(s=>uo(s)).join(",")),e.Ie=n}return e.Ie}function Hd(i,e){if(i.limit!==e.limit||i.orderBy.length!==e.orderBy.length)return!1;for(let n=0;n<i.orderBy.length;n++)if(!fA(i.orderBy[n],e.orderBy[n]))return!1;if(i.filters.length!==e.filters.length)return!1;for(let n=0;n<i.filters.length;n++)if(!Ty(i.filters[n],e.filters[n]))return!1;return i.collectionGroup===e.collectionGroup&&!!i.path.isEqual(e.path)&&!!Eg(i.startAt,e.startAt)&&Eg(i.endAt,e.endAt)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qu{constructor(e,n=null,s=[],a=[],u=null,h="F",m=null,g=null){this.path=e,this.collectionGroup=n,this.explicitOrderBy=s,this.filters=a,this.limit=u,this.limitType=h,this.startAt=m,this.endAt=g,this.Ee=null,this.de=null,this.Ae=null,this.startAt,this.endAt}}function IA(i,e,n,s,a,u,h,m){return new qu(i,e,n,s,a,u,h,m)}function SA(i){return new qu(i)}function Tg(i){return i.filters.length===0&&i.limit===null&&i.startAt==null&&i.endAt==null&&(i.explicitOrderBy.length===0||i.explicitOrderBy.length===1&&i.explicitOrderBy[0].field.isKeyField())}function AA(i){return i.collectionGroup!==null}function va(i){const e=Be(i);if(e.Ee===null){e.Ee=[];const n=new Set;for(const u of e.explicitOrderBy)e.Ee.push(u),n.add(u.field.canonicalString());const s=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(h){let m=new Rt(At.comparator);return h.filters.forEach(g=>{g.getFlattenedFilters().forEach(_=>{_.isInequality()&&(m=m.add(_.field))})}),m})(e).forEach(u=>{n.has(u.canonicalString())||u.isKeyField()||e.Ee.push(new Vu(u,s))}),n.has(At.keyField().canonicalString())||e.Ee.push(new Vu(At.keyField(),s))}return e.Ee}function Gi(i){const e=Be(i);return e.de||(e.de=RA(e,va(i))),e.de}function RA(i,e){if(i.limitType==="F")return wg(i.path,i.collectionGroup,e,i.filters,i.limit,i.startAt,i.endAt);{e=e.map(a=>{const u=a.dir==="desc"?"asc":"desc";return new Vu(a.field,u)});const n=i.endAt?new Lu(i.endAt.position,i.endAt.inclusive):null,s=i.startAt?new Lu(i.startAt.position,i.startAt.inclusive):null;return wg(i.path,i.collectionGroup,e,i.filters,i.limit,n,s)}}function dd(i,e,n){return new qu(i.path,i.collectionGroup,i.explicitOrderBy.slice(),i.filters.slice(),e,n,i.startAt,i.endAt)}function Ay(i,e){return Hd(Gi(i),Gi(e))&&i.limitType===e.limitType}function Ry(i){return`${$d(Gi(i))}|lt:${i.limitType}`}function ha(i){return`Query(target=${function(n){let s=n.path.canonicalString();return n.collectionGroup!==null&&(s+=" collectionGroup="+n.collectionGroup),n.filters.length>0&&(s+=`, filters: [${n.filters.map(a=>Iy(a)).join(", ")}]`),Fd(n.limit)||(s+=", limit: "+n.limit),n.orderBy.length>0&&(s+=`, orderBy: [${n.orderBy.map(a=>function(h){return`${h.field.canonicalString()} (${h.dir})`}(a)).join(", ")}]`),n.startAt&&(s+=", startAt: ",s+=n.startAt.inclusive?"b:":"a:",s+=n.startAt.position.map(a=>uo(a)).join(",")),n.endAt&&(s+=", endAt: ",s+=n.endAt.inclusive?"a:":"b:",s+=n.endAt.position.map(a=>uo(a)).join(",")),`Target(${s})`}(Gi(i))}; limitType=${i.limitType})`}function Wd(i,e){return e.isFoundDocument()&&function(s,a){const u=a.key.path;return s.collectionGroup!==null?a.key.hasCollectionId(s.collectionGroup)&&s.path.isPrefixOf(u):_e.isDocumentKey(s.path)?s.path.isEqual(u):s.path.isImmediateParentOf(u)}(i,e)&&function(s,a){for(const u of va(s))if(!u.field.isKeyField()&&a.data.field(u.field)===null)return!1;return!0}(i,e)&&function(s,a){for(const u of s.filters)if(!u.matches(a))return!1;return!0}(i,e)&&function(s,a){return!(s.startAt&&!function(h,m,g){const _=_g(h,m,g);return h.inclusive?_<=0:_<0}(s.startAt,va(s),a)||s.endAt&&!function(h,m,g){const _=_g(h,m,g);return h.inclusive?_>=0:_>0}(s.endAt,va(s),a))}(i,e)}function CA(i){return(e,n)=>{let s=!1;for(const a of va(i)){const u=PA(a,e,n);if(u!==0)return u;s=s||a.field.isKeyField()}return 0}}function PA(i,e,n){const s=i.field.isKeyField()?_e.comparator(e.key,n.key):function(u,h,m){const g=h.data.field(u),_=m.data.field(u);return g!==null&&_!==null?lo(g,_):Te(42886)}(i.field,e,n);switch(i.dir){case"asc":return s;case"desc":return-1*s;default:return Te(19790,{direction:i.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ss{constructor(e,n){this.mapKeyFn=e,this.equalsFn=n,this.inner={},this.innerSize=0}get(e){const n=this.mapKeyFn(e),s=this.inner[n];if(s!==void 0){for(const[a,u]of s)if(this.equalsFn(a,e))return u}}has(e){return this.get(e)!==void 0}set(e,n){const s=this.mapKeyFn(e),a=this.inner[s];if(a===void 0)return this.inner[s]=[[e,n]],void this.innerSize++;for(let u=0;u<a.length;u++)if(this.equalsFn(a[u][0],e))return void(a[u]=[e,n]);a.push([e,n]),this.innerSize++}delete(e){const n=this.mapKeyFn(e),s=this.inner[n];if(s===void 0)return!1;for(let a=0;a<s.length;a++)if(this.equalsFn(s[a][0],e))return s.length===1?delete this.inner[n]:s.splice(a,1),this.innerSize--,!0;return!1}forEach(e){is(this.inner,(n,s)=>{for(const[a,u]of s)e(a,u)})}isEmpty(){return hy(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kA=new Yt(_e.comparator);function Mu(){return kA}const Cy=new Yt(_e.comparator);function hu(...i){let e=Cy;for(const n of i)e=e.insert(n.key,n);return e}function Py(i){let e=Cy;return i.forEach((n,s)=>e=e.insert(n,s.overlayedDocument)),e}function Hi(){return ya()}function ky(){return ya()}function ya(){return new ss(i=>i.toString(),(i,e)=>i.isEqual(e))}const NA=new Yt(_e.comparator),OA=new Rt(_e.comparator);function Vt(...i){let e=OA;for(const n of i)e=e.add(n);return e}const DA=new Rt(Oe);function xA(){return DA}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gd(i,e){if(i.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Nu(e)?"-0":e}}function Ny(i){return{integerValue:""+i}}function LA(i,e){return iA(e)?Ny(e):Gd(i,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qu{constructor(){this._=void 0}}function VA(i,e,n){return i instanceof Ca?function(a,u){const h={fields:{[fy]:{stringValue:dy},[my]:{timestampValue:{seconds:a.seconds,nanos:a.nanoseconds}}}};return u&&jd(u)&&(u=zd(u)),u&&(h.fields[py]=u),{mapValue:h}}(n,e):i instanceof Pa?Dy(i,e):i instanceof ka?xy(i,e):function(a,u){const h=Oy(a,u),m=Ig(h)+Ig(a.Re);return cd(h)&&cd(a.Re)?Ny(m):Gd(a.serializer,m)}(i,e)}function MA(i,e,n){return i instanceof Pa?Dy(i,e):i instanceof ka?xy(i,e):n}function Oy(i,e){return i instanceof Uu?function(s){return cd(s)||function(u){return!!u&&"doubleValue"in u}(s)}(e)?e:{integerValue:0}:null}class Ca extends Qu{}class Pa extends Qu{constructor(e){super(),this.elements=e}}function Dy(i,e){const n=Ly(e);for(const s of i.elements)n.some(a=>nr(a,s))||n.push(s);return{arrayValue:{values:n}}}class ka extends Qu{constructor(e){super(),this.elements=e}}function xy(i,e){let n=Ly(e);for(const s of i.elements)n=n.filter(a=>!nr(a,s));return{arrayValue:{values:n}}}class Uu extends Qu{constructor(e,n){super(),this.serializer=e,this.Re=n}}function Ig(i){return St(i.integerValue||i.doubleValue)}function Ly(i){return Bd(i)&&i.arrayValue.values?i.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class UA{constructor(e,n){this.field=e,this.transform=n}}function bA(i,e){return i.field.isEqual(e.field)&&function(s,a){return s instanceof Pa&&a instanceof Pa||s instanceof ka&&a instanceof ka?oo(s.elements,a.elements,nr):s instanceof Uu&&a instanceof Uu?nr(s.Re,a.Re):s instanceof Ca&&a instanceof Ca}(i.transform,e.transform)}class FA{constructor(e,n){this.version=e,this.transformResults=n}}class Zn{constructor(e,n){this.updateTime=e,this.exists=n}static none(){return new Zn}static exists(e){return new Zn(void 0,e)}static updateTime(e){return new Zn(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Eu(i,e){return i.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(i.updateTime):i.exists===void 0||i.exists===e.isFoundDocument()}class Xu{}function Vy(i,e){if(!i.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return i.isNoDocument()?new Uy(i.key,Zn.none()):new za(i.key,i.data,Zn.none());{const n=i.data,s=on.empty();let a=new Rt(At.comparator);for(let u of e.fields)if(!a.has(u)){let h=n.field(u);h===null&&u.length>1&&(u=u.popLast(),h=n.field(u)),h===null?s.delete(u):s.set(u,h),a=a.add(u)}return new pi(i.key,s,new an(a.toArray()),Zn.none())}}function jA(i,e,n){i instanceof za?function(a,u,h){const m=a.value.clone(),g=Ag(a.fieldTransforms,u,h.transformResults);m.setAll(g),u.convertToFoundDocument(h.version,m).setHasCommittedMutations()}(i,e,n):i instanceof pi?function(a,u,h){if(!Eu(a.precondition,u))return void u.convertToUnknownDocument(h.version);const m=Ag(a.fieldTransforms,u,h.transformResults),g=u.data;g.setAll(My(a)),g.setAll(m),u.convertToFoundDocument(h.version,g).setHasCommittedMutations()}(i,e,n):function(a,u,h){u.convertToNoDocument(h.version).setHasCommittedMutations()}(0,e,n)}function _a(i,e,n,s){return i instanceof za?function(u,h,m,g){if(!Eu(u.precondition,h))return m;const _=u.value.clone(),w=Rg(u.fieldTransforms,g,h);return _.setAll(w),h.convertToFoundDocument(h.version,_).setHasLocalMutations(),null}(i,e,n,s):i instanceof pi?function(u,h,m,g){if(!Eu(u.precondition,h))return m;const _=Rg(u.fieldTransforms,g,h),w=h.data;return w.setAll(My(u)),w.setAll(_),h.convertToFoundDocument(h.version,w).setHasLocalMutations(),m===null?null:m.unionWith(u.fieldMask.fields).unionWith(u.fieldTransforms.map(T=>T.field))}(i,e,n,s):function(u,h,m){return Eu(u.precondition,h)?(h.convertToNoDocument(h.version).setHasLocalMutations(),null):m}(i,e,n)}function zA(i,e){let n=null;for(const s of i.fieldTransforms){const a=e.data.field(s.field),u=Oy(s.transform,a||null);u!=null&&(n===null&&(n=on.empty()),n.set(s.field,u))}return n||null}function Sg(i,e){return i.type===e.type&&!!i.key.isEqual(e.key)&&!!i.precondition.isEqual(e.precondition)&&!!function(s,a){return s===void 0&&a===void 0||!(!s||!a)&&oo(s,a,(u,h)=>bA(u,h))}(i.fieldTransforms,e.fieldTransforms)&&(i.type===0?i.value.isEqual(e.value):i.type!==1||i.data.isEqual(e.data)&&i.fieldMask.isEqual(e.fieldMask))}class za extends Xu{constructor(e,n,s,a=[]){super(),this.key=e,this.value=n,this.precondition=s,this.fieldTransforms=a,this.type=0}getFieldMask(){return null}}class pi extends Xu{constructor(e,n,s,a,u=[]){super(),this.key=e,this.data=n,this.fieldMask=s,this.precondition=a,this.fieldTransforms=u,this.type=1}getFieldMask(){return this.fieldMask}}function My(i){const e=new Map;return i.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const s=i.data.field(n);e.set(n,s)}}),e}function Ag(i,e,n){const s=new Map;Ye(i.length===n.length,32656,{Ve:n.length,me:i.length});for(let a=0;a<n.length;a++){const u=i[a],h=u.transform,m=e.data.field(u.field);s.set(u.field,MA(h,m,n[a]))}return s}function Rg(i,e,n){const s=new Map;for(const a of i){const u=a.transform,h=n.data.field(a.field);s.set(a.field,VA(u,h,e))}return s}class Uy extends Xu{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class BA extends Xu{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $A{constructor(e,n,s,a){this.batchId=e,this.localWriteTime=n,this.baseMutations=s,this.mutations=a}applyToRemoteDocument(e,n){const s=n.mutationResults;for(let a=0;a<this.mutations.length;a++){const u=this.mutations[a];u.key.isEqual(e.key)&&jA(u,e,s[a])}}applyToLocalView(e,n){for(const s of this.baseMutations)s.key.isEqual(e.key)&&(n=_a(s,e,n,this.localWriteTime));for(const s of this.mutations)s.key.isEqual(e.key)&&(n=_a(s,e,n,this.localWriteTime));return n}applyToLocalDocumentSet(e,n){const s=ky();return this.mutations.forEach(a=>{const u=e.get(a.key),h=u.overlayedDocument;let m=this.applyToLocalView(h,u.mutatedFields);m=n.has(a.key)?null:m;const g=Vy(h,m);g!==null&&s.set(a.key,g),h.isValidDocument()||h.convertToNoDocument(Ke.min())}),s}keys(){return this.mutations.reduce((e,n)=>e.add(n.key),Vt())}isEqual(e){return this.batchId===e.batchId&&oo(this.mutations,e.mutations,(n,s)=>Sg(n,s))&&oo(this.baseMutations,e.baseMutations,(n,s)=>Sg(n,s))}}class Kd{constructor(e,n,s,a){this.batch=e,this.commitVersion=n,this.mutationResults=s,this.docVersions=a}static from(e,n,s){Ye(e.mutations.length===s.length,58842,{fe:e.mutations.length,ge:s.length});let a=function(){return NA}();const u=e.mutations;for(let h=0;h<u.length;h++)a=a.insert(u[h].key,s[h].version);return new Kd(e,n,s,a)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class HA{constructor(e,n){this.largestBatchId=e,this.mutation=n}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var rt,ke;function WA(i){switch(i){case Q.OK:return Te(64938);case Q.CANCELLED:case Q.UNKNOWN:case Q.DEADLINE_EXCEEDED:case Q.RESOURCE_EXHAUSTED:case Q.INTERNAL:case Q.UNAVAILABLE:case Q.UNAUTHENTICATED:return!1;case Q.INVALID_ARGUMENT:case Q.NOT_FOUND:case Q.ALREADY_EXISTS:case Q.PERMISSION_DENIED:case Q.FAILED_PRECONDITION:case Q.ABORTED:case Q.OUT_OF_RANGE:case Q.UNIMPLEMENTED:case Q.DATA_LOSS:return!0;default:return Te(15467,{code:i})}}function GA(i){if(i===void 0)return Ji("GRPC error has no .code"),Q.UNKNOWN;switch(i){case rt.OK:return Q.OK;case rt.CANCELLED:return Q.CANCELLED;case rt.UNKNOWN:return Q.UNKNOWN;case rt.DEADLINE_EXCEEDED:return Q.DEADLINE_EXCEEDED;case rt.RESOURCE_EXHAUSTED:return Q.RESOURCE_EXHAUSTED;case rt.INTERNAL:return Q.INTERNAL;case rt.UNAVAILABLE:return Q.UNAVAILABLE;case rt.UNAUTHENTICATED:return Q.UNAUTHENTICATED;case rt.INVALID_ARGUMENT:return Q.INVALID_ARGUMENT;case rt.NOT_FOUND:return Q.NOT_FOUND;case rt.ALREADY_EXISTS:return Q.ALREADY_EXISTS;case rt.PERMISSION_DENIED:return Q.PERMISSION_DENIED;case rt.FAILED_PRECONDITION:return Q.FAILED_PRECONDITION;case rt.ABORTED:return Q.ABORTED;case rt.OUT_OF_RANGE:return Q.OUT_OF_RANGE;case rt.UNIMPLEMENTED:return Q.UNIMPLEMENTED;case rt.DATA_LOSS:return Q.DATA_LOSS;default:return Te(39323,{code:i})}}(ke=rt||(rt={}))[ke.OK=0]="OK",ke[ke.CANCELLED=1]="CANCELLED",ke[ke.UNKNOWN=2]="UNKNOWN",ke[ke.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",ke[ke.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",ke[ke.NOT_FOUND=5]="NOT_FOUND",ke[ke.ALREADY_EXISTS=6]="ALREADY_EXISTS",ke[ke.PERMISSION_DENIED=7]="PERMISSION_DENIED",ke[ke.UNAUTHENTICATED=16]="UNAUTHENTICATED",ke[ke.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",ke[ke.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",ke[ke.ABORTED=10]="ABORTED",ke[ke.OUT_OF_RANGE=11]="OUT_OF_RANGE",ke[ke.UNIMPLEMENTED=12]="UNIMPLEMENTED",ke[ke.INTERNAL=13]="INTERNAL",ke[ke.UNAVAILABLE=14]="UNAVAILABLE",ke[ke.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */new Ld([4294967295,4294967295],0);class KA{constructor(e,n){this.databaseId=e,this.useProto3Json=n}}function fd(i,e){return i.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function qA(i,e){return i.useProto3Json?e.toBase64():e.toUint8Array()}function QA(i,e){return fd(i,e.toTimestamp())}function io(i){return Ye(!!i,49232),Ke.fromTimestamp(function(n){const s=Zi(n);return new yt(s.seconds,s.nanos)}(i))}function by(i,e){return pd(i,e).canonicalString()}function pd(i,e){const n=function(a){return new it(["projects",a.projectId,"databases",a.database])}(i).child("documents");return e===void 0?n:n.child(e)}function XA(i){const e=it.fromString(i);return Ye(iR(e),10190,{key:e.toString()}),e}function md(i,e){return by(i.databaseId,e.path)}function YA(i){const e=XA(i);return e.length===4?it.emptyPath():ZA(e)}function JA(i){return new it(["projects",i.databaseId.projectId,"databases",i.databaseId.database]).canonicalString()}function ZA(i){return Ye(i.length>4&&i.get(4)==="documents",29091,{key:i.toString()}),i.popFirst(5)}function Cg(i,e,n){return{name:md(i,e),fields:n.value.mapValue.fields}}function eR(i,e){let n;if(e instanceof za)n={update:Cg(i,e.key,e.value)};else if(e instanceof Uy)n={delete:md(i,e.key)};else if(e instanceof pi)n={update:Cg(i,e.key,e.data),updateMask:rR(e.fieldMask)};else{if(!(e instanceof BA))return Te(16599,{ft:e.type});n={verify:md(i,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map(s=>function(u,h){const m=h.transform;if(m instanceof Ca)return{fieldPath:h.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(m instanceof Pa)return{fieldPath:h.field.canonicalString(),appendMissingElements:{values:m.elements}};if(m instanceof ka)return{fieldPath:h.field.canonicalString(),removeAllFromArray:{values:m.elements}};if(m instanceof Uu)return{fieldPath:h.field.canonicalString(),increment:m.Re};throw Te(20930,{transform:h.transform})}(0,s))),e.precondition.isNone||(n.currentDocument=function(a,u){return u.updateTime!==void 0?{updateTime:QA(a,u.updateTime)}:u.exists!==void 0?{exists:u.exists}:Te(27497)}(i,e.precondition)),n}function tR(i,e){return i&&i.length>0?(Ye(e!==void 0,14353),i.map(n=>function(a,u){let h=a.updateTime?io(a.updateTime):io(u);return h.isEqual(Ke.min())&&(h=io(u)),new FA(h,a.transformResults||[])}(n,e))):[]}function nR(i){let e=YA(i.parent);const n=i.structuredQuery,s=n.from?n.from.length:0;let a=null;if(s>0){Ye(s===1,65062);const w=n.from[0];w.allDescendants?a=w.collectionId:e=e.child(w.collectionId)}let u=[];n.where&&(u=function(T){const D=Fy(T);return D instanceof ui&&wy(D)?D.getFilters():[D]}(n.where));let h=[];n.orderBy&&(h=function(T){return T.map(D=>function(W){return new Vu(Zs(W.field),function(j){switch(j){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(W.direction))}(D))}(n.orderBy));let m=null;n.limit&&(m=function(T){let D;return D=typeof T=="object"?T.value:T,Fd(D)?null:D}(n.limit));let g=null;n.startAt&&(g=function(T){const D=!!T.before,B=T.values||[];return new Lu(B,D)}(n.startAt));let _=null;return n.endAt&&(_=function(T){const D=!T.before,B=T.values||[];return new Lu(B,D)}(n.endAt)),IA(e,a,h,u,m,"F",g,_)}function Fy(i){return i.unaryFilter!==void 0?function(n){switch(n.unaryFilter.op){case"IS_NAN":const s=Zs(n.unaryFilter.field);return vt.create(s,"==",{doubleValue:NaN});case"IS_NULL":const a=Zs(n.unaryFilter.field);return vt.create(a,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const u=Zs(n.unaryFilter.field);return vt.create(u,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const h=Zs(n.unaryFilter.field);return vt.create(h,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return Te(61313);default:return Te(60726)}}(i):i.fieldFilter!==void 0?function(n){return vt.create(Zs(n.fieldFilter.field),function(a){switch(a){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return Te(58110);default:return Te(50506)}}(n.fieldFilter.op),n.fieldFilter.value)}(i):i.compositeFilter!==void 0?function(n){return ui.create(n.compositeFilter.filters.map(s=>Fy(s)),function(a){switch(a){case"AND":return"and";case"OR":return"or";default:return Te(1026)}}(n.compositeFilter.op))}(i):Te(30097,{filter:i})}function Zs(i){return At.fromServerFormat(i.fieldPath)}function rR(i){const e=[];return i.fields.forEach(n=>e.push(n.canonicalString())),{fieldPaths:e}}function iR(i){return i.length>=4&&i.get(0)==="projects"&&i.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sR{constructor(e){this.wt=e}}function oR(i){const e=nR({parent:i.parent,structuredQuery:i.structuredQuery});return i.limitType==="LAST"?dd(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aR{constructor(){this.yn=new lR}addToCollectionParentIndex(e,n){return this.yn.add(n),$.resolve()}getCollectionParents(e,n){return $.resolve(this.yn.getEntries(n))}addFieldIndex(e,n){return $.resolve()}deleteFieldIndex(e,n){return $.resolve()}deleteAllFieldIndexes(e){return $.resolve()}createTargetIndexes(e,n){return $.resolve()}getDocumentsMatchingTarget(e,n){return $.resolve(null)}getIndexType(e,n){return $.resolve(0)}getFieldIndexes(e,n){return $.resolve([])}getNextCollectionGroupToUpdate(e){return $.resolve(null)}getMinOffset(e,n){return $.resolve(li.min())}getMinOffsetFromCollectionGroup(e,n){return $.resolve(li.min())}updateCollectionGroup(e,n,s){return $.resolve()}updateIndexEntries(e,n){return $.resolve()}}class lR{constructor(){this.index={}}add(e){const n=e.lastSegment(),s=e.popLast(),a=this.index[n]||new Rt(it.comparator),u=!a.has(s);return this.index[n]=a.add(s),u}has(e){const n=e.lastSegment(),s=e.popLast(),a=this.index[n];return a&&a.has(s)}getEntries(e){return(this.index[e]||new Rt(it.comparator)).toArray()}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pg={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},jy=41943040;class Xt{static withCacheSize(e){return new Xt(e,Xt.DEFAULT_COLLECTION_PERCENTILE,Xt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,n,s){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=n,this.maximumSequenceNumbersToCollect=s}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Xt.DEFAULT_COLLECTION_PERCENTILE=10,Xt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Xt.DEFAULT=new Xt(jy,Xt.DEFAULT_COLLECTION_PERCENTILE,Xt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Xt.DISABLED=new Xt(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class co{constructor(e){this.nr=e}next(){return this.nr+=2,this.nr}static rr(){return new co(0)}static ir(){return new co(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kg="LruGarbageCollector",uR=1048576;function Ng([i,e],[n,s]){const a=Oe(i,n);return a===0?Oe(e,s):a}class cR{constructor(e){this.cr=e,this.buffer=new Rt(Ng),this.lr=0}hr(){return++this.lr}Pr(e){const n=[e,this.hr()];if(this.buffer.size<this.cr)this.buffer=this.buffer.add(n);else{const s=this.buffer.last();Ng(n,s)<0&&(this.buffer=this.buffer.delete(s).add(n))}}get maxValue(){return this.buffer.last()[0]}}class hR{constructor(e,n,s){this.garbageCollector=e,this.asyncQueue=n,this.localStore=s,this.Tr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Ir(6e4)}stop(){this.Tr&&(this.Tr.cancel(),this.Tr=null)}get started(){return this.Tr!==null}Ir(e){oe(kg,`Garbage collection scheduled in ${e}ms`),this.Tr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Tr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(n){ja(n)?oe(kg,"Ignoring IndexedDB error during garbage collection: ",n):await Md(n)}await this.Ir(3e5)})}}class dR{constructor(e,n){this.Er=e,this.params=n}calculateTargetCount(e,n){return this.Er.dr(e).next(s=>Math.floor(n/100*s))}nthSequenceNumber(e,n){if(n===0)return $.resolve(Ud.le);const s=new cR(n);return this.Er.forEachTarget(e,a=>s.Pr(a.sequenceNumber)).next(()=>this.Er.Ar(e,a=>s.Pr(a))).next(()=>s.maxValue)}removeTargets(e,n,s){return this.Er.removeTargets(e,n,s)}removeOrphanedDocuments(e,n){return this.Er.removeOrphanedDocuments(e,n)}collect(e,n){return this.params.cacheSizeCollectionThreshold===-1?(oe("LruGarbageCollector","Garbage collection skipped; disabled"),$.resolve(Pg)):this.getCacheSize(e).next(s=>s<this.params.cacheSizeCollectionThreshold?(oe("LruGarbageCollector",`Garbage collection skipped; Cache size ${s} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Pg):this.Rr(e,n))}getCacheSize(e){return this.Er.getCacheSize(e)}Rr(e,n){let s,a,u,h,m,g,_;const w=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(T=>(T>this.params.maximumSequenceNumbersToCollect?(oe("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${T}`),a=this.params.maximumSequenceNumbersToCollect):a=T,h=Date.now(),this.nthSequenceNumber(e,a))).next(T=>(s=T,m=Date.now(),this.removeTargets(e,s,n))).next(T=>(u=T,g=Date.now(),this.removeOrphanedDocuments(e,s))).next(T=>(_=Date.now(),Js()<=Se.DEBUG&&oe("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${h-w}ms
	Determined least recently used ${a} in `+(m-h)+`ms
	Removed ${u} targets in `+(g-m)+`ms
	Removed ${T} documents in `+(_-g)+`ms
Total Duration: ${_-w}ms`),$.resolve({didRun:!0,sequenceNumbersCollected:a,targetsRemoved:u,documentsRemoved:T})))}}function fR(i,e){return new dR(i,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pR{constructor(){this.changes=new ss(e=>e.toString(),(e,n)=>e.isEqual(n)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,n){this.assertNotApplied(),this.changes.set(e,Vn.newInvalidDocument(e).setReadTime(n))}getEntry(e,n){this.assertNotApplied();const s=this.changes.get(n);return s!==void 0?$.resolve(s):this.getFromCache(e,n)}getEntries(e,n){return this.getAllFromCache(e,n)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mR{constructor(e,n){this.overlayedDocument=e,this.mutatedFields=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gR{constructor(e,n,s,a){this.remoteDocumentCache=e,this.mutationQueue=n,this.documentOverlayCache=s,this.indexManager=a}getDocument(e,n){let s=null;return this.documentOverlayCache.getOverlay(e,n).next(a=>(s=a,this.remoteDocumentCache.getEntry(e,n))).next(a=>(s!==null&&_a(s.mutation,a,an.empty(),yt.now()),a))}getDocuments(e,n){return this.remoteDocumentCache.getEntries(e,n).next(s=>this.getLocalViewOfDocuments(e,s,Vt()).next(()=>s))}getLocalViewOfDocuments(e,n,s=Vt()){const a=Hi();return this.populateOverlays(e,a,n).next(()=>this.computeViews(e,n,a,s).next(u=>{let h=hu();return u.forEach((m,g)=>{h=h.insert(m,g.overlayedDocument)}),h}))}getOverlayedDocuments(e,n){const s=Hi();return this.populateOverlays(e,s,n).next(()=>this.computeViews(e,n,s,Vt()))}populateOverlays(e,n,s){const a=[];return s.forEach(u=>{n.has(u)||a.push(u)}),this.documentOverlayCache.getOverlays(e,a).next(u=>{u.forEach((h,m)=>{n.set(h,m)})})}computeViews(e,n,s,a){let u=Mu();const h=ya(),m=function(){return ya()}();return n.forEach((g,_)=>{const w=s.get(_.key);a.has(_.key)&&(w===void 0||w.mutation instanceof pi)?u=u.insert(_.key,_):w!==void 0?(h.set(_.key,w.mutation.getFieldMask()),_a(w.mutation,_,w.mutation.getFieldMask(),yt.now())):h.set(_.key,an.empty())}),this.recalculateAndSaveOverlays(e,u).next(g=>(g.forEach((_,w)=>h.set(_,w)),n.forEach((_,w)=>{var T;return m.set(_,new mR(w,(T=h.get(_))!==null&&T!==void 0?T:null))}),m))}recalculateAndSaveOverlays(e,n){const s=ya();let a=new Yt((h,m)=>h-m),u=Vt();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,n).next(h=>{for(const m of h)m.keys().forEach(g=>{const _=n.get(g);if(_===null)return;let w=s.get(g)||an.empty();w=m.applyToLocalView(_,w),s.set(g,w);const T=(a.get(m.batchId)||Vt()).add(g);a=a.insert(m.batchId,T)})}).next(()=>{const h=[],m=a.getReverseIterator();for(;m.hasNext();){const g=m.getNext(),_=g.key,w=g.value,T=ky();w.forEach(D=>{if(!u.has(D)){const B=Vy(n.get(D),s.get(D));B!==null&&T.set(D,B),u=u.add(D)}}),h.push(this.documentOverlayCache.saveOverlays(e,_,T))}return $.waitFor(h)}).next(()=>s)}recalculateAndSaveOverlaysForDocumentKeys(e,n){return this.remoteDocumentCache.getEntries(e,n).next(s=>this.recalculateAndSaveOverlays(e,s))}getDocumentsMatchingQuery(e,n,s,a){return function(h){return _e.isDocumentKey(h.path)&&h.collectionGroup===null&&h.filters.length===0}(n)?this.getDocumentsMatchingDocumentQuery(e,n.path):AA(n)?this.getDocumentsMatchingCollectionGroupQuery(e,n,s,a):this.getDocumentsMatchingCollectionQuery(e,n,s,a)}getNextDocuments(e,n,s,a){return this.remoteDocumentCache.getAllFromCollectionGroup(e,n,s,a).next(u=>{const h=a-u.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,n,s.largestBatchId,a-u.size):$.resolve(Hi());let m=Aa,g=u;return h.next(_=>$.forEach(_,(w,T)=>(m<T.largestBatchId&&(m=T.largestBatchId),u.get(w)?$.resolve():this.remoteDocumentCache.getEntry(e,w).next(D=>{g=g.insert(w,D)}))).next(()=>this.populateOverlays(e,_,u)).next(()=>this.computeViews(e,g,_,Vt())).next(w=>({batchId:m,changes:Py(w)})))})}getDocumentsMatchingDocumentQuery(e,n){return this.getDocument(e,new _e(n)).next(s=>{let a=hu();return s.isFoundDocument()&&(a=a.insert(s.key,s)),a})}getDocumentsMatchingCollectionGroupQuery(e,n,s,a){const u=n.collectionGroup;let h=hu();return this.indexManager.getCollectionParents(e,u).next(m=>$.forEach(m,g=>{const _=function(T,D){return new qu(D,null,T.explicitOrderBy.slice(),T.filters.slice(),T.limit,T.limitType,T.startAt,T.endAt)}(n,g.child(u));return this.getDocumentsMatchingCollectionQuery(e,_,s,a).next(w=>{w.forEach((T,D)=>{h=h.insert(T,D)})})}).next(()=>h))}getDocumentsMatchingCollectionQuery(e,n,s,a){let u;return this.documentOverlayCache.getOverlaysForCollection(e,n.path,s.largestBatchId).next(h=>(u=h,this.remoteDocumentCache.getDocumentsMatchingQuery(e,n,s,u,a))).next(h=>{u.forEach((g,_)=>{const w=_.getKey();h.get(w)===null&&(h=h.insert(w,Vn.newInvalidDocument(w)))});let m=hu();return h.forEach((g,_)=>{const w=u.get(g);w!==void 0&&_a(w.mutation,_,an.empty(),yt.now()),Wd(n,_)&&(m=m.insert(g,_))}),m})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vR{constructor(e){this.serializer=e,this.Fr=new Map,this.Mr=new Map}getBundleMetadata(e,n){return $.resolve(this.Fr.get(n))}saveBundleMetadata(e,n){return this.Fr.set(n.id,function(a){return{id:a.id,version:a.version,createTime:io(a.createTime)}}(n)),$.resolve()}getNamedQuery(e,n){return $.resolve(this.Mr.get(n))}saveNamedQuery(e,n){return this.Mr.set(n.name,function(a){return{name:a.name,query:oR(a.bundledQuery),readTime:io(a.readTime)}}(n)),$.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yR{constructor(){this.overlays=new Yt(_e.comparator),this.Or=new Map}getOverlay(e,n){return $.resolve(this.overlays.get(n))}getOverlays(e,n){const s=Hi();return $.forEach(n,a=>this.getOverlay(e,a).next(u=>{u!==null&&s.set(a,u)})).next(()=>s)}saveOverlays(e,n,s){return s.forEach((a,u)=>{this.St(e,n,u)}),$.resolve()}removeOverlaysForBatchId(e,n,s){const a=this.Or.get(s);return a!==void 0&&(a.forEach(u=>this.overlays=this.overlays.remove(u)),this.Or.delete(s)),$.resolve()}getOverlaysForCollection(e,n,s){const a=Hi(),u=n.length+1,h=new _e(n.child("")),m=this.overlays.getIteratorFrom(h);for(;m.hasNext();){const g=m.getNext().value,_=g.getKey();if(!n.isPrefixOf(_.path))break;_.path.length===u&&g.largestBatchId>s&&a.set(g.getKey(),g)}return $.resolve(a)}getOverlaysForCollectionGroup(e,n,s,a){let u=new Yt((_,w)=>_-w);const h=this.overlays.getIterator();for(;h.hasNext();){const _=h.getNext().value;if(_.getKey().getCollectionGroup()===n&&_.largestBatchId>s){let w=u.get(_.largestBatchId);w===null&&(w=Hi(),u=u.insert(_.largestBatchId,w)),w.set(_.getKey(),_)}}const m=Hi(),g=u.getIterator();for(;g.hasNext()&&(g.getNext().value.forEach((_,w)=>m.set(_,w)),!(m.size()>=a)););return $.resolve(m)}St(e,n,s){const a=this.overlays.get(s.key);if(a!==null){const h=this.Or.get(a.largestBatchId).delete(s.key);this.Or.set(a.largestBatchId,h)}this.overlays=this.overlays.insert(s.key,new HA(n,s));let u=this.Or.get(n);u===void 0&&(u=Vt(),this.Or.set(n,u)),this.Or.set(n,u.add(s.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _R{constructor(){this.sessionToken=tr.EMPTY_BYTE_STRING}getSessionToken(e){return $.resolve(this.sessionToken)}setSessionToken(e,n){return this.sessionToken=n,$.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qd{constructor(){this.Nr=new Rt(gt.Br),this.Lr=new Rt(gt.kr)}isEmpty(){return this.Nr.isEmpty()}addReference(e,n){const s=new gt(e,n);this.Nr=this.Nr.add(s),this.Lr=this.Lr.add(s)}qr(e,n){e.forEach(s=>this.addReference(s,n))}removeReference(e,n){this.Qr(new gt(e,n))}$r(e,n){e.forEach(s=>this.removeReference(s,n))}Ur(e){const n=new _e(new it([])),s=new gt(n,e),a=new gt(n,e+1),u=[];return this.Lr.forEachInRange([s,a],h=>{this.Qr(h),u.push(h.key)}),u}Kr(){this.Nr.forEach(e=>this.Qr(e))}Qr(e){this.Nr=this.Nr.delete(e),this.Lr=this.Lr.delete(e)}Wr(e){const n=new _e(new it([])),s=new gt(n,e),a=new gt(n,e+1);let u=Vt();return this.Lr.forEachInRange([s,a],h=>{u=u.add(h.key)}),u}containsKey(e){const n=new gt(e,0),s=this.Nr.firstAfterOrEqual(n);return s!==null&&e.isEqual(s.key)}}class gt{constructor(e,n){this.key=e,this.Gr=n}static Br(e,n){return _e.comparator(e.key,n.key)||Oe(e.Gr,n.Gr)}static kr(e,n){return Oe(e.Gr,n.Gr)||_e.comparator(e.key,n.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ER{constructor(e,n){this.indexManager=e,this.referenceDelegate=n,this.mutationQueue=[],this.Jn=1,this.zr=new Rt(gt.Br)}checkEmpty(e){return $.resolve(this.mutationQueue.length===0)}addMutationBatch(e,n,s,a){const u=this.Jn;this.Jn++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const h=new $A(u,n,s,a);this.mutationQueue.push(h);for(const m of a)this.zr=this.zr.add(new gt(m.key,u)),this.indexManager.addToCollectionParentIndex(e,m.key.path.popLast());return $.resolve(h)}lookupMutationBatch(e,n){return $.resolve(this.jr(n))}getNextMutationBatchAfterBatchId(e,n){const s=n+1,a=this.Hr(s),u=a<0?0:a;return $.resolve(this.mutationQueue.length>u?this.mutationQueue[u]:null)}getHighestUnacknowledgedBatchId(){return $.resolve(this.mutationQueue.length===0?bd:this.Jn-1)}getAllMutationBatches(e){return $.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,n){const s=new gt(n,0),a=new gt(n,Number.POSITIVE_INFINITY),u=[];return this.zr.forEachInRange([s,a],h=>{const m=this.jr(h.Gr);u.push(m)}),$.resolve(u)}getAllMutationBatchesAffectingDocumentKeys(e,n){let s=new Rt(Oe);return n.forEach(a=>{const u=new gt(a,0),h=new gt(a,Number.POSITIVE_INFINITY);this.zr.forEachInRange([u,h],m=>{s=s.add(m.Gr)})}),$.resolve(this.Jr(s))}getAllMutationBatchesAffectingQuery(e,n){const s=n.path,a=s.length+1;let u=s;_e.isDocumentKey(u)||(u=u.child(""));const h=new gt(new _e(u),0);let m=new Rt(Oe);return this.zr.forEachWhile(g=>{const _=g.key.path;return!!s.isPrefixOf(_)&&(_.length===a&&(m=m.add(g.Gr)),!0)},h),$.resolve(this.Jr(m))}Jr(e){const n=[];return e.forEach(s=>{const a=this.jr(s);a!==null&&n.push(a)}),n}removeMutationBatch(e,n){Ye(this.Yr(n.batchId,"removed")===0,55003),this.mutationQueue.shift();let s=this.zr;return $.forEach(n.mutations,a=>{const u=new gt(a.key,n.batchId);return s=s.delete(u),this.referenceDelegate.markPotentiallyOrphaned(e,a.key)}).next(()=>{this.zr=s})}Xn(e){}containsKey(e,n){const s=new gt(n,0),a=this.zr.firstAfterOrEqual(s);return $.resolve(n.isEqual(a&&a.key))}performConsistencyCheck(e){return this.mutationQueue.length,$.resolve()}Yr(e,n){return this.Hr(e)}Hr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}jr(e){const n=this.Hr(e);return n<0||n>=this.mutationQueue.length?null:this.mutationQueue[n]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wR{constructor(e){this.Zr=e,this.docs=function(){return new Yt(_e.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,n){const s=n.key,a=this.docs.get(s),u=a?a.size:0,h=this.Zr(n);return this.docs=this.docs.insert(s,{document:n.mutableCopy(),size:h}),this.size+=h-u,this.indexManager.addToCollectionParentIndex(e,s.path.popLast())}removeEntry(e){const n=this.docs.get(e);n&&(this.docs=this.docs.remove(e),this.size-=n.size)}getEntry(e,n){const s=this.docs.get(n);return $.resolve(s?s.document.mutableCopy():Vn.newInvalidDocument(n))}getEntries(e,n){let s=Mu();return n.forEach(a=>{const u=this.docs.get(a);s=s.insert(a,u?u.document.mutableCopy():Vn.newInvalidDocument(a))}),$.resolve(s)}getDocumentsMatchingQuery(e,n,s,a){let u=Mu();const h=n.path,m=new _e(h.child("__id-9223372036854775808__")),g=this.docs.getIteratorFrom(m);for(;g.hasNext();){const{key:_,value:{document:w}}=g.getNext();if(!h.isPrefixOf(_.path))break;_.path.length>h.length+1||eA(ZS(w),s)<=0||(a.has(w.key)||Wd(n,w))&&(u=u.insert(w.key,w.mutableCopy()))}return $.resolve(u)}getAllFromCollectionGroup(e,n,s,a){Te(9500)}Xr(e,n){return $.forEach(this.docs,s=>n(s))}newChangeBuffer(e){return new TR(this)}getSize(e){return $.resolve(this.size)}}class TR extends pR{constructor(e){super(),this.vr=e}applyChanges(e){const n=[];return this.changes.forEach((s,a)=>{a.isValidDocument()?n.push(this.vr.addEntry(e,a)):this.vr.removeEntry(s)}),$.waitFor(n)}getFromCache(e,n){return this.vr.getEntry(e,n)}getAllFromCache(e,n){return this.vr.getEntries(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class IR{constructor(e){this.persistence=e,this.ei=new ss(n=>$d(n),Hd),this.lastRemoteSnapshotVersion=Ke.min(),this.highestTargetId=0,this.ti=0,this.ni=new qd,this.targetCount=0,this.ri=co.rr()}forEachTarget(e,n){return this.ei.forEach((s,a)=>n(a)),$.resolve()}getLastRemoteSnapshotVersion(e){return $.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return $.resolve(this.ti)}allocateTargetId(e){return this.highestTargetId=this.ri.next(),$.resolve(this.highestTargetId)}setTargetsMetadata(e,n,s){return s&&(this.lastRemoteSnapshotVersion=s),n>this.ti&&(this.ti=n),$.resolve()}ar(e){this.ei.set(e.target,e);const n=e.targetId;n>this.highestTargetId&&(this.ri=new co(n),this.highestTargetId=n),e.sequenceNumber>this.ti&&(this.ti=e.sequenceNumber)}addTargetData(e,n){return this.ar(n),this.targetCount+=1,$.resolve()}updateTargetData(e,n){return this.ar(n),$.resolve()}removeTargetData(e,n){return this.ei.delete(n.target),this.ni.Ur(n.targetId),this.targetCount-=1,$.resolve()}removeTargets(e,n,s){let a=0;const u=[];return this.ei.forEach((h,m)=>{m.sequenceNumber<=n&&s.get(m.targetId)===null&&(this.ei.delete(h),u.push(this.removeMatchingKeysForTargetId(e,m.targetId)),a++)}),$.waitFor(u).next(()=>a)}getTargetCount(e){return $.resolve(this.targetCount)}getTargetData(e,n){const s=this.ei.get(n)||null;return $.resolve(s)}addMatchingKeys(e,n,s){return this.ni.qr(n,s),$.resolve()}removeMatchingKeys(e,n,s){this.ni.$r(n,s);const a=this.persistence.referenceDelegate,u=[];return a&&n.forEach(h=>{u.push(a.markPotentiallyOrphaned(e,h))}),$.waitFor(u)}removeMatchingKeysForTargetId(e,n){return this.ni.Ur(n),$.resolve()}getMatchingKeysForTargetId(e,n){const s=this.ni.Wr(n);return $.resolve(s)}containsKey(e,n){return $.resolve(this.ni.containsKey(n))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zy{constructor(e,n){this.ii={},this.overlays={},this.si=new Ud(0),this.oi=!1,this.oi=!0,this._i=new _R,this.referenceDelegate=e(this),this.ai=new IR(this),this.indexManager=new aR,this.remoteDocumentCache=function(a){return new wR(a)}(s=>this.referenceDelegate.ui(s)),this.serializer=new sR(n),this.ci=new vR(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.oi=!1,Promise.resolve()}get started(){return this.oi}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let n=this.overlays[e.toKey()];return n||(n=new yR,this.overlays[e.toKey()]=n),n}getMutationQueue(e,n){let s=this.ii[e.toKey()];return s||(s=new ER(n,this.referenceDelegate),this.ii[e.toKey()]=s),s}getGlobalsCache(){return this._i}getTargetCache(){return this.ai}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.ci}runTransaction(e,n,s){oe("MemoryPersistence","Starting transaction:",e);const a=new SR(this.si.next());return this.referenceDelegate.li(),s(a).next(u=>this.referenceDelegate.hi(a).next(()=>u)).toPromise().then(u=>(a.raiseOnCommittedEvent(),u))}Pi(e,n){return $.or(Object.values(this.ii).map(s=>()=>s.containsKey(e,n)))}}class SR extends nA{constructor(e){super(),this.currentSequenceNumber=e}}class Qd{constructor(e){this.persistence=e,this.Ti=new qd,this.Ii=null}static Ei(e){return new Qd(e)}get di(){if(this.Ii)return this.Ii;throw Te(60996)}addReference(e,n,s){return this.Ti.addReference(s,n),this.di.delete(s.toString()),$.resolve()}removeReference(e,n,s){return this.Ti.removeReference(s,n),this.di.add(s.toString()),$.resolve()}markPotentiallyOrphaned(e,n){return this.di.add(n.toString()),$.resolve()}removeTarget(e,n){this.Ti.Ur(n.targetId).forEach(a=>this.di.add(a.toString()));const s=this.persistence.getTargetCache();return s.getMatchingKeysForTargetId(e,n.targetId).next(a=>{a.forEach(u=>this.di.add(u.toString()))}).next(()=>s.removeTargetData(e,n))}li(){this.Ii=new Set}hi(e){const n=this.persistence.getRemoteDocumentCache().newChangeBuffer();return $.forEach(this.di,s=>{const a=_e.fromPath(s);return this.Ai(e,a).next(u=>{u||n.removeEntry(a,Ke.min())})}).next(()=>(this.Ii=null,n.apply(e)))}updateLimboDocument(e,n){return this.Ai(e,n).next(s=>{s?this.di.delete(n.toString()):this.di.add(n.toString())})}ui(e){return 0}Ai(e,n){return $.or([()=>$.resolve(this.Ti.containsKey(n)),()=>this.persistence.getTargetCache().containsKey(e,n),()=>this.persistence.Pi(e,n)])}}class bu{constructor(e,n){this.persistence=e,this.Ri=new ss(s=>sA(s.path),(s,a)=>s.isEqual(a)),this.garbageCollector=fR(this,n)}static Ei(e,n){return new bu(e,n)}li(){}hi(e){return $.resolve()}forEachTarget(e,n){return this.persistence.getTargetCache().forEachTarget(e,n)}dr(e){const n=this.Vr(e);return this.persistence.getTargetCache().getTargetCount(e).next(s=>n.next(a=>s+a))}Vr(e){let n=0;return this.Ar(e,s=>{n++}).next(()=>n)}Ar(e,n){return $.forEach(this.Ri,(s,a)=>this.gr(e,s,a).next(u=>u?$.resolve():n(a)))}removeTargets(e,n,s){return this.persistence.getTargetCache().removeTargets(e,n,s)}removeOrphanedDocuments(e,n){let s=0;const a=this.persistence.getRemoteDocumentCache(),u=a.newChangeBuffer();return a.Xr(e,h=>this.gr(e,h,n).next(m=>{m||(s++,u.removeEntry(h,Ke.min()))})).next(()=>u.apply(e)).next(()=>s)}markPotentiallyOrphaned(e,n){return this.Ri.set(n,e.currentSequenceNumber),$.resolve()}removeTarget(e,n){const s=n.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,s)}addReference(e,n,s){return this.Ri.set(s,e.currentSequenceNumber),$.resolve()}removeReference(e,n,s){return this.Ri.set(s,e.currentSequenceNumber),$.resolve()}updateLimboDocument(e,n){return this.Ri.set(n,e.currentSequenceNumber),$.resolve()}ui(e){let n=e.key.toString().length;return e.isFoundDocument()&&(n+=yu(e.data.value)),n}gr(e,n,s){return $.or([()=>this.persistence.Pi(e,n),()=>this.persistence.getTargetCache().containsKey(e,n),()=>{const a=this.Ri.get(n);return $.resolve(a!==void 0&&a>s)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xd{constructor(e,n,s,a){this.targetId=e,this.fromCache=n,this.ls=s,this.hs=a}static Ps(e,n){let s=Vt(),a=Vt();for(const u of n.docChanges)switch(u.type){case 0:s=s.add(u.doc.key);break;case 1:a=a.add(u.doc.key)}return new Xd(e,n.fromCache,s,a)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class AR{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class RR{constructor(){this.Ts=!1,this.Is=!1,this.Es=100,this.ds=function(){return uw()?8:rA(Mt())>0?6:4}()}initialize(e,n){this.As=e,this.indexManager=n,this.Ts=!0}getDocumentsMatchingQuery(e,n,s,a){const u={result:null};return this.Rs(e,n).next(h=>{u.result=h}).next(()=>{if(!u.result)return this.Vs(e,n,a,s).next(h=>{u.result=h})}).next(()=>{if(u.result)return;const h=new AR;return this.fs(e,n,h).next(m=>{if(u.result=m,this.Is)return this.gs(e,n,h,m.size)})}).next(()=>u.result)}gs(e,n,s,a){return s.documentReadCount<this.Es?(Js()<=Se.DEBUG&&oe("QueryEngine","SDK will not create cache indexes for query:",ha(n),"since it only creates cache indexes for collection contains","more than or equal to",this.Es,"documents"),$.resolve()):(Js()<=Se.DEBUG&&oe("QueryEngine","Query:",ha(n),"scans",s.documentReadCount,"local documents and returns",a,"documents as results."),s.documentReadCount>this.ds*a?(Js()<=Se.DEBUG&&oe("QueryEngine","The SDK decides to create cache indexes for query:",ha(n),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Gi(n))):$.resolve())}Rs(e,n){if(Tg(n))return $.resolve(null);let s=Gi(n);return this.indexManager.getIndexType(e,s).next(a=>a===0?null:(n.limit!==null&&a===1&&(n=dd(n,null,"F"),s=Gi(n)),this.indexManager.getDocumentsMatchingTarget(e,s).next(u=>{const h=Vt(...u);return this.As.getDocuments(e,h).next(m=>this.indexManager.getMinOffset(e,s).next(g=>{const _=this.ps(n,m);return this.ys(n,_,h,g.readTime)?this.Rs(e,dd(n,null,"F")):this.ws(e,_,n,g)}))})))}Vs(e,n,s,a){return Tg(n)||a.isEqual(Ke.min())?$.resolve(null):this.As.getDocuments(e,s).next(u=>{const h=this.ps(n,u);return this.ys(n,h,s,a)?$.resolve(null):(Js()<=Se.DEBUG&&oe("QueryEngine","Re-using previous result from %s to execute query: %s",a.toString(),ha(n)),this.ws(e,h,n,JS(a,Aa)).next(m=>m))})}ps(e,n){let s=new Rt(CA(e));return n.forEach((a,u)=>{Wd(e,u)&&(s=s.add(u))}),s}ys(e,n,s,a){if(e.limit===null)return!1;if(s.size!==n.size)return!0;const u=e.limitType==="F"?n.last():n.first();return!!u&&(u.hasPendingWrites||u.version.compareTo(a)>0)}fs(e,n,s){return Js()<=Se.DEBUG&&oe("QueryEngine","Using full collection scan to execute query:",ha(n)),this.As.getDocumentsMatchingQuery(e,n,li.min(),s)}ws(e,n,s,a){return this.As.getDocumentsMatchingQuery(e,s,a).next(u=>(n.forEach(h=>{u=u.insert(h.key,h)}),u))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const CR="LocalStore";class PR{constructor(e,n,s,a){this.persistence=e,this.bs=n,this.serializer=a,this.Ss=new Yt(Oe),this.Ds=new ss(u=>$d(u),Hd),this.vs=new Map,this.Cs=e.getRemoteDocumentCache(),this.ai=e.getTargetCache(),this.ci=e.getBundleCache(),this.Fs(s)}Fs(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new gR(this.Cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Cs.setIndexManager(this.indexManager),this.bs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",n=>e.collect(n,this.Ss))}}function kR(i,e,n,s){return new PR(i,e,n,s)}async function By(i,e){const n=Be(i);return await n.persistence.runTransaction("Handle user change","readonly",s=>{let a;return n.mutationQueue.getAllMutationBatches(s).next(u=>(a=u,n.Fs(e),n.mutationQueue.getAllMutationBatches(s))).next(u=>{const h=[],m=[];let g=Vt();for(const _ of a){h.push(_.batchId);for(const w of _.mutations)g=g.add(w.key)}for(const _ of u){m.push(_.batchId);for(const w of _.mutations)g=g.add(w.key)}return n.localDocuments.getDocuments(s,g).next(_=>({Ms:_,removedBatchIds:h,addedBatchIds:m}))})})}function NR(i,e){const n=Be(i);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",s=>{const a=e.batch.keys(),u=n.Cs.newChangeBuffer({trackRemovals:!0});return function(m,g,_,w){const T=_.batch,D=T.keys();let B=$.resolve();return D.forEach(W=>{B=B.next(()=>w.getEntry(g,W)).next(q=>{const j=_.docVersions.get(W);Ye(j!==null,48541),q.version.compareTo(j)<0&&(T.applyToRemoteDocument(q,_),q.isValidDocument()&&(q.setReadTime(_.commitVersion),w.addEntry(q)))})}),B.next(()=>m.mutationQueue.removeMutationBatch(g,T))}(n,s,e,u).next(()=>u.apply(s)).next(()=>n.mutationQueue.performConsistencyCheck(s)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(s,a,e.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(s,function(m){let g=Vt();for(let _=0;_<m.mutationResults.length;++_)m.mutationResults[_].transformResults.length>0&&(g=g.add(m.batch.mutations[_].key));return g}(e))).next(()=>n.localDocuments.getDocuments(s,a))})}function OR(i){const e=Be(i);return e.persistence.runTransaction("Get last remote snapshot version","readonly",n=>e.ai.getLastRemoteSnapshotVersion(n))}function DR(i,e){const n=Be(i);return n.persistence.runTransaction("Get next mutation batch","readonly",s=>(e===void 0&&(e=bd),n.mutationQueue.getNextMutationBatchAfterBatchId(s,e)))}class Og{constructor(){this.activeTargetIds=xA()}$s(e){this.activeTargetIds=this.activeTargetIds.add(e)}Us(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Qs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class xR{constructor(){this.So=new Og,this.Do={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,n,s){}addLocalQueryTarget(e,n=!0){return n&&this.So.$s(e),this.Do[e]||"not-current"}updateQueryState(e,n,s){this.Do[e]=n}removeLocalQueryTarget(e){this.So.Us(e)}isLocalQueryTarget(e){return this.So.activeTargetIds.has(e)}clearQueryState(e){delete this.Do[e]}getAllActiveQueryTargets(){return this.So.activeTargetIds}isActiveQueryTarget(e){return this.So.activeTargetIds.has(e)}start(){return this.So=new Og,Promise.resolve()}handleUserChange(e,n,s){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class LR{vo(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dg="ConnectivityMonitor";class xg{constructor(){this.Co=()=>this.Fo(),this.Mo=()=>this.xo(),this.Oo=[],this.No()}vo(e){this.Oo.push(e)}shutdown(){window.removeEventListener("online",this.Co),window.removeEventListener("offline",this.Mo)}No(){window.addEventListener("online",this.Co),window.addEventListener("offline",this.Mo)}Fo(){oe(Dg,"Network connectivity changed: AVAILABLE");for(const e of this.Oo)e(0)}xo(){oe(Dg,"Network connectivity changed: UNAVAILABLE");for(const e of this.Oo)e(1)}static C(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let du=null;function gd(){return du===null?du=function(){return 268435456+Math.round(2147483648*Math.random())}():du++,"0x"+du.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hh="RestConnection",VR={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class MR{get Bo(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const n=e.ssl?"https":"http",s=encodeURIComponent(this.databaseId.projectId),a=encodeURIComponent(this.databaseId.database);this.Lo=n+"://"+e.host,this.ko=`projects/${s}/databases/${a}`,this.qo=this.databaseId.database===Du?`project_id=${s}`:`project_id=${s}&database_id=${a}`}Qo(e,n,s,a,u){const h=gd(),m=this.$o(e,n.toUriEncodedString());oe(Hh,`Sending RPC '${e}' ${h}:`,m,s);const g={"google-cloud-resource-prefix":this.ko,"x-goog-request-params":this.qo};return this.Uo(g,a,u),this.Ko(e,m,g,s).then(_=>(oe(Hh,`Received RPC '${e}' ${h}: `,_),_),_=>{throw Ku(Hh,`RPC '${e}' ${h} failed with error: `,_,"url: ",m,"request:",s),_})}Wo(e,n,s,a,u,h){return this.Qo(e,n,s,a,u)}Uo(e,n,s){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+mo}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),n&&n.headers.forEach((a,u)=>e[u]=a),s&&s.headers.forEach((a,u)=>e[u]=a)}$o(e,n){const s=VR[e];return`${this.Lo}/v1/${n}:${s}`}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class UR{constructor(e){this.Go=e.Go,this.zo=e.zo}jo(e){this.Ho=e}Jo(e){this.Yo=e}Zo(e){this.Xo=e}onMessage(e){this.e_=e}close(){this.zo()}send(e){this.Go(e)}t_(){this.Ho()}n_(){this.Yo()}r_(e){this.Xo(e)}i_(e){this.e_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xt="WebChannelConnection";class bR extends MR{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}Ko(e,n,s,a){const u=gd();return new Promise((h,m)=>{const g=new ny;g.setWithCredentials(!0),g.listenOnce(ry.COMPLETE,()=>{try{switch(g.getLastErrorCode()){case vu.NO_ERROR:const w=g.getResponseJson();oe(xt,`XHR for RPC '${e}' ${u} received:`,JSON.stringify(w)),h(w);break;case vu.TIMEOUT:oe(xt,`RPC '${e}' ${u} timed out`),m(new ge(Q.DEADLINE_EXCEEDED,"Request time out"));break;case vu.HTTP_ERROR:const T=g.getStatus();if(oe(xt,`RPC '${e}' ${u} failed with status:`,T,"response text:",g.getResponseText()),T>0){let D=g.getResponseJson();Array.isArray(D)&&(D=D[0]);const B=D==null?void 0:D.error;if(B&&B.status&&B.message){const W=function(j){const ne=j.toLowerCase().replace(/_/g,"-");return Object.values(Q).indexOf(ne)>=0?ne:Q.UNKNOWN}(B.status);m(new ge(W,B.message))}else m(new ge(Q.UNKNOWN,"Server responded with status "+g.getStatus()))}else m(new ge(Q.UNAVAILABLE,"Connection failed."));break;default:Te(9055,{s_:e,streamId:u,o_:g.getLastErrorCode(),__:g.getLastError()})}}finally{oe(xt,`RPC '${e}' ${u} completed.`)}});const _=JSON.stringify(a);oe(xt,`RPC '${e}' ${u} sending request:`,a),g.send(n,"POST",_,s,15)})}a_(e,n,s){const a=gd(),u=[this.Lo,"/","google.firestore.v1.Firestore","/",e,"/channel"],h=oy(),m=sy(),g={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},_=this.longPollingOptions.timeoutSeconds;_!==void 0&&(g.longPollingTimeout=Math.round(1e3*_)),this.useFetchStreams&&(g.useFetchStreams=!0),this.Uo(g.initMessageHeaders,n,s),g.encodeInitMessageHeaders=!0;const w=u.join("");oe(xt,`Creating RPC '${e}' stream ${a}: ${w}`,g);const T=h.createWebChannel(w,g);let D=!1,B=!1;const W=new UR({Go:j=>{B?oe(xt,`Not sending because RPC '${e}' stream ${a} is closed:`,j):(D||(oe(xt,`Opening RPC '${e}' stream ${a} transport.`),T.open(),D=!0),oe(xt,`RPC '${e}' stream ${a} sending:`,j),T.send(j))},zo:()=>T.close()}),q=(j,ne,ce)=>{j.listen(ne,le=>{try{ce(le)}catch(ve){setTimeout(()=>{throw ve},0)}})};return q(T,pa.EventType.OPEN,()=>{B||(oe(xt,`RPC '${e}' stream ${a} transport opened.`),W.t_())}),q(T,pa.EventType.CLOSE,()=>{B||(B=!0,oe(xt,`RPC '${e}' stream ${a} transport closed`),W.r_())}),q(T,pa.EventType.ERROR,j=>{B||(B=!0,Ku(xt,`RPC '${e}' stream ${a} transport errored. Name:`,j.name,"Message:",j.message),W.r_(new ge(Q.UNAVAILABLE,"The operation could not be completed")))}),q(T,pa.EventType.MESSAGE,j=>{var ne;if(!B){const ce=j.data[0];Ye(!!ce,16349);const le=ce,ve=(le==null?void 0:le.error)||((ne=le[0])===null||ne===void 0?void 0:ne.error);if(ve){oe(xt,`RPC '${e}' stream ${a} received error:`,ve);const Ve=ve.status;let Re=function(R){const P=rt[R];if(P!==void 0)return GA(P)}(Ve),N=ve.message;Re===void 0&&(Re=Q.INTERNAL,N="Unknown error status: "+Ve+" with message "+ve.message),B=!0,W.r_(new ge(Re,N)),T.close()}else oe(xt,`RPC '${e}' stream ${a} received:`,ce),W.i_(ce)}}),q(m,iy.STAT_EVENT,j=>{j.stat===od.PROXY?oe(xt,`RPC '${e}' stream ${a} detected buffering proxy`):j.stat===od.NOPROXY&&oe(xt,`RPC '${e}' stream ${a} detected no buffering proxy`)}),setTimeout(()=>{W.n_()},0),W}}function Wh(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yu(i){return new KA(i,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $y{constructor(e,n,s=1e3,a=1.5,u=6e4){this.bi=e,this.timerId=n,this.u_=s,this.c_=a,this.l_=u,this.h_=0,this.P_=null,this.T_=Date.now(),this.reset()}reset(){this.h_=0}I_(){this.h_=this.l_}E_(e){this.cancel();const n=Math.floor(this.h_+this.d_()),s=Math.max(0,Date.now()-this.T_),a=Math.max(0,n-s);a>0&&oe("ExponentialBackoff",`Backing off for ${a} ms (base delay: ${this.h_} ms, delay with jitter: ${n} ms, last attempt: ${s} ms ago)`),this.P_=this.bi.enqueueAfterDelay(this.timerId,a,()=>(this.T_=Date.now(),e())),this.h_*=this.c_,this.h_<this.u_&&(this.h_=this.u_),this.h_>this.l_&&(this.h_=this.l_)}A_(){this.P_!==null&&(this.P_.skipDelay(),this.P_=null)}cancel(){this.P_!==null&&(this.P_.cancel(),this.P_=null)}d_(){return(Math.random()-.5)*this.h_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lg="PersistentStream";class FR{constructor(e,n,s,a,u,h,m,g){this.bi=e,this.R_=s,this.V_=a,this.connection=u,this.authCredentialsProvider=h,this.appCheckCredentialsProvider=m,this.listener=g,this.state=0,this.m_=0,this.f_=null,this.g_=null,this.stream=null,this.p_=0,this.y_=new $y(e,n)}w_(){return this.state===1||this.state===5||this.b_()}b_(){return this.state===2||this.state===3}start(){this.p_=0,this.state!==4?this.auth():this.S_()}async stop(){this.w_()&&await this.close(0)}D_(){this.state=0,this.y_.reset()}v_(){this.b_()&&this.f_===null&&(this.f_=this.bi.enqueueAfterDelay(this.R_,6e4,()=>this.C_()))}F_(e){this.M_(),this.stream.send(e)}async C_(){if(this.b_())return this.close(0)}M_(){this.f_&&(this.f_.cancel(),this.f_=null)}x_(){this.g_&&(this.g_.cancel(),this.g_=null)}async close(e,n){this.M_(),this.x_(),this.y_.cancel(),this.m_++,e!==4?this.y_.reset():n&&n.code===Q.RESOURCE_EXHAUSTED?(Ji(n.toString()),Ji("Using maximum backoff delay to prevent overloading the backend."),this.y_.I_()):n&&n.code===Q.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.O_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.Zo(n)}O_(){}auth(){this.state=1;const e=this.N_(this.m_),n=this.m_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([s,a])=>{this.m_===n&&this.B_(s,a)},s=>{e(()=>{const a=new ge(Q.UNKNOWN,"Fetching auth token failed: "+s.message);return this.L_(a)})})}B_(e,n){const s=this.N_(this.m_);this.stream=this.k_(e,n),this.stream.jo(()=>{s(()=>this.listener.jo())}),this.stream.Jo(()=>{s(()=>(this.state=2,this.g_=this.bi.enqueueAfterDelay(this.V_,1e4,()=>(this.b_()&&(this.state=3),Promise.resolve())),this.listener.Jo()))}),this.stream.Zo(a=>{s(()=>this.L_(a))}),this.stream.onMessage(a=>{s(()=>++this.p_==1?this.q_(a):this.onNext(a))})}S_(){this.state=5,this.y_.E_(async()=>{this.state=0,this.start()})}L_(e){return oe(Lg,`close with error: ${e}`),this.stream=null,this.close(4,e)}N_(e){return n=>{this.bi.enqueueAndForget(()=>this.m_===e?n():(oe(Lg,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class jR extends FR{constructor(e,n,s,a,u,h){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",n,s,a,h),this.serializer=u}get W_(){return this.p_>0}start(){this.lastStreamToken=void 0,super.start()}O_(){this.W_&&this.G_([])}k_(e,n){return this.connection.a_("Write",e,n)}q_(e){return Ye(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,Ye(!e.writeResults||e.writeResults.length===0,55816),this.listener.z_()}onNext(e){Ye(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.y_.reset();const n=tR(e.writeResults,e.commitTime),s=io(e.commitTime);return this.listener.j_(s,n)}H_(){const e={};e.database=JA(this.serializer),this.F_(e)}G_(e){const n={streamToken:this.lastStreamToken,writes:e.map(s=>eR(this.serializer,s))};this.F_(n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zR{}class BR extends zR{constructor(e,n,s,a){super(),this.authCredentials=e,this.appCheckCredentials=n,this.connection=s,this.serializer=a,this.J_=!1}Y_(){if(this.J_)throw new ge(Q.FAILED_PRECONDITION,"The client has already been terminated.")}Qo(e,n,s,a){return this.Y_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([u,h])=>this.connection.Qo(e,pd(n,s),a,u,h)).catch(u=>{throw u.name==="FirebaseError"?(u.code===Q.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),u):new ge(Q.UNKNOWN,u.toString())})}Wo(e,n,s,a,u){return this.Y_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([h,m])=>this.connection.Wo(e,pd(n,s),a,h,m,u)).catch(h=>{throw h.name==="FirebaseError"?(h.code===Q.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),h):new ge(Q.UNKNOWN,h.toString())})}terminate(){this.J_=!0,this.connection.terminate()}}class $R{constructor(e,n){this.asyncQueue=e,this.onlineStateHandler=n,this.state="Unknown",this.Z_=0,this.X_=null,this.ea=!0}ta(){this.Z_===0&&(this.na("Unknown"),this.X_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.X_=null,this.ra("Backend didn't respond within 10 seconds."),this.na("Offline"),Promise.resolve())))}ia(e){this.state==="Online"?this.na("Unknown"):(this.Z_++,this.Z_>=1&&(this.sa(),this.ra(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.na("Offline")))}set(e){this.sa(),this.Z_=0,e==="Online"&&(this.ea=!1),this.na(e)}na(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}ra(e){const n=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.ea?(Ji(n),this.ea=!1):oe("OnlineStateTracker",n)}sa(){this.X_!==null&&(this.X_.cancel(),this.X_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ba="RemoteStore";class HR{constructor(e,n,s,a,u){this.localStore=e,this.datastore=n,this.asyncQueue=s,this.remoteSyncer={},this.oa=[],this._a=new Map,this.aa=new Set,this.ua=[],this.ca=u,this.ca.vo(h=>{s.enqueueAndForget(async()=>{Ha(this)&&(oe(Ba,"Restarting streams for network reachability change."),await async function(g){const _=Be(g);_.aa.add(4),await $a(_),_.la.set("Unknown"),_.aa.delete(4),await Ju(_)}(this))})}),this.la=new $R(s,a)}}async function Ju(i){if(Ha(i))for(const e of i.ua)await e(!0)}async function $a(i){for(const e of i.ua)await e(!1)}function Ha(i){return Be(i).aa.size===0}async function Hy(i,e,n){if(!ja(e))throw e;i.aa.add(1),await $a(i),i.la.set("Offline"),n||(n=()=>OR(i.localStore)),i.asyncQueue.enqueueRetryable(async()=>{oe(Ba,"Retrying IndexedDB access"),await n(),i.aa.delete(1),await Ju(i)})}function Wy(i,e){return e().catch(n=>Hy(i,n,e))}async function Zu(i){const e=Be(i),n=ci(e);let s=e.oa.length>0?e.oa[e.oa.length-1].batchId:bd;for(;WR(e);)try{const a=await DR(e.localStore,s);if(a===null){e.oa.length===0&&n.v_();break}s=a.batchId,GR(e,a)}catch(a){await Hy(e,a)}Gy(e)&&Ky(e)}function WR(i){return Ha(i)&&i.oa.length<10}function GR(i,e){i.oa.push(e);const n=ci(i);n.b_()&&n.W_&&n.G_(e.mutations)}function Gy(i){return Ha(i)&&!ci(i).w_()&&i.oa.length>0}function Ky(i){ci(i).start()}async function KR(i){ci(i).H_()}async function qR(i){const e=ci(i);for(const n of i.oa)e.G_(n.mutations)}async function QR(i,e,n){const s=i.oa.shift(),a=Kd.from(s,e,n);await Wy(i,()=>i.remoteSyncer.applySuccessfulWrite(a)),await Zu(i)}async function XR(i,e){e&&ci(i).W_&&await async function(s,a){if(function(h){return WA(h)&&h!==Q.ABORTED}(a.code)){const u=s.oa.shift();ci(s).D_(),await Wy(s,()=>s.remoteSyncer.rejectFailedWrite(u.batchId,a)),await Zu(s)}}(i,e),Gy(i)&&Ky(i)}async function Vg(i,e){const n=Be(i);n.asyncQueue.verifyOperationInProgress(),oe(Ba,"RemoteStore received new credentials");const s=Ha(n);n.aa.add(3),await $a(n),s&&n.la.set("Unknown"),await n.remoteSyncer.handleCredentialChange(e),n.aa.delete(3),await Ju(n)}async function YR(i,e){const n=Be(i);e?(n.aa.delete(2),await Ju(n)):e||(n.aa.add(2),await $a(n),n.la.set("Unknown"))}function ci(i){return i.Ta||(i.Ta=function(n,s,a){const u=Be(n);return u.Y_(),new jR(s,u.connection,u.authCredentials,u.appCheckCredentials,u.serializer,a)}(i.datastore,i.asyncQueue,{jo:()=>Promise.resolve(),Jo:KR.bind(null,i),Zo:XR.bind(null,i),z_:qR.bind(null,i),j_:QR.bind(null,i)}),i.ua.push(async e=>{e?(i.Ta.D_(),await Zu(i)):(await i.Ta.stop(),i.oa.length>0&&(oe(Ba,`Stopping write stream with ${i.oa.length} pending writes`),i.oa=[]))})),i.Ta}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yd{constructor(e,n,s,a,u){this.asyncQueue=e,this.timerId=n,this.targetTimeMs=s,this.op=a,this.removalCallback=u,this.deferred=new Wi,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(h=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,n,s,a,u){const h=Date.now()+s,m=new Yd(e,n,h,a,u);return m.start(s),m}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new ge(Q.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function qy(i,e){if(Ji("AsyncQueue",`${e}: ${i}`),ja(i))return new ge(Q.UNAVAILABLE,`${e}: ${i}`);throw i}class JR{constructor(){this.queries=Mg(),this.onlineState="Unknown",this.fa=new Set}terminate(){(function(n,s){const a=Be(n),u=a.queries;a.queries=Mg(),u.forEach((h,m)=>{for(const g of m.Ra)g.onError(s)})})(this,new ge(Q.ABORTED,"Firestore shutting down"))}}function Mg(){return new ss(i=>Ry(i),Ay)}function ZR(i){i.fa.forEach(e=>{e.next()})}var Ug,bg;(bg=Ug||(Ug={})).ya="default",bg.Cache="cache";const eC="SyncEngine";class tC{constructor(e,n,s,a,u,h){this.localStore=e,this.remoteStore=n,this.eventManager=s,this.sharedClientState=a,this.currentUser=u,this.maxConcurrentLimboResolutions=h,this.nu={},this.ru=new ss(m=>Ry(m),Ay),this.iu=new Map,this.su=new Set,this.ou=new Yt(_e.comparator),this._u=new Map,this.au=new qd,this.uu={},this.cu=new Map,this.lu=co.ir(),this.onlineState="Unknown",this.hu=void 0}get isPrimaryClient(){return this.hu===!0}}async function nC(i,e,n){const s=oC(i);try{const a=await function(h,m){const g=Be(h),_=yt.now(),w=m.reduce((B,W)=>B.add(W.key),Vt());let T,D;return g.persistence.runTransaction("Locally write mutations","readwrite",B=>{let W=Mu(),q=Vt();return g.Cs.getEntries(B,w).next(j=>{W=j,W.forEach((ne,ce)=>{ce.isValidDocument()||(q=q.add(ne))})}).next(()=>g.localDocuments.getOverlayedDocuments(B,W)).next(j=>{T=j;const ne=[];for(const ce of m){const le=zA(ce,T.get(ce.key).overlayedDocument);le!=null&&ne.push(new pi(ce.key,le,yy(le.value.mapValue),Zn.exists(!0)))}return g.mutationQueue.addMutationBatch(B,_,ne,m)}).next(j=>{D=j;const ne=j.applyToLocalDocumentSet(T,q);return g.documentOverlayCache.saveOverlays(B,j.batchId,ne)})}).then(()=>({batchId:D.batchId,changes:Py(T)}))}(s.localStore,e);s.sharedClientState.addPendingMutation(a.batchId),function(h,m,g){let _=h.uu[h.currentUser.toKey()];_||(_=new Yt(Oe)),_=_.insert(m,g),h.uu[h.currentUser.toKey()]=_}(s,a.batchId,n),await ec(s,a.changes),await Zu(s.remoteStore)}catch(a){const u=qy(a,"Failed to persist write");n.reject(u)}}function Fg(i,e,n){const s=Be(i);if(s.isPrimaryClient&&n===0||!s.isPrimaryClient&&n===1){const a=[];s.ru.forEach((u,h)=>{const m=h.view.ga(e);m.snapshot&&a.push(m.snapshot)}),function(h,m){const g=Be(h);g.onlineState=m;let _=!1;g.queries.forEach((w,T)=>{for(const D of T.Ra)D.ga(m)&&(_=!0)}),_&&ZR(g)}(s.eventManager,e),a.length&&s.nu.Q_(a),s.onlineState=e,s.isPrimaryClient&&s.sharedClientState.setOnlineState(e)}}async function rC(i,e){const n=Be(i),s=e.batch.batchId;try{const a=await NR(n.localStore,e);Xy(n,s,null),Qy(n,s),n.sharedClientState.updateMutationState(s,"acknowledged"),await ec(n,a)}catch(a){await Md(a)}}async function iC(i,e,n){const s=Be(i);try{const a=await function(h,m){const g=Be(h);return g.persistence.runTransaction("Reject batch","readwrite-primary",_=>{let w;return g.mutationQueue.lookupMutationBatch(_,m).next(T=>(Ye(T!==null,37113),w=T.keys(),g.mutationQueue.removeMutationBatch(_,T))).next(()=>g.mutationQueue.performConsistencyCheck(_)).next(()=>g.documentOverlayCache.removeOverlaysForBatchId(_,w,m)).next(()=>g.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(_,w)).next(()=>g.localDocuments.getDocuments(_,w))})}(s.localStore,e);Xy(s,e,n),Qy(s,e),s.sharedClientState.updateMutationState(e,"rejected",n),await ec(s,a)}catch(a){await Md(a)}}function Qy(i,e){(i.cu.get(e)||[]).forEach(n=>{n.resolve()}),i.cu.delete(e)}function Xy(i,e,n){const s=Be(i);let a=s.uu[s.currentUser.toKey()];if(a){const u=a.get(e);u&&(n?u.reject(n):u.resolve(),a=a.remove(e)),s.uu[s.currentUser.toKey()]=a}}async function ec(i,e,n){const s=Be(i),a=[],u=[],h=[];s.ru.isEmpty()||(s.ru.forEach((m,g)=>{h.push(s.Pu(g,e,n).then(_=>{var w;if((_||n)&&s.isPrimaryClient){const T=_?!_.fromCache:(w=void 0)===null||w===void 0?void 0:w.current;s.sharedClientState.updateQueryState(g.targetId,T?"current":"not-current")}if(_){a.push(_);const T=Xd.Ps(g.targetId,_);u.push(T)}}))}),await Promise.all(h),s.nu.Q_(a),await async function(g,_){const w=Be(g);try{await w.persistence.runTransaction("notifyLocalViewChanges","readwrite",T=>$.forEach(_,D=>$.forEach(D.ls,B=>w.persistence.referenceDelegate.addReference(T,D.targetId,B)).next(()=>$.forEach(D.hs,B=>w.persistence.referenceDelegate.removeReference(T,D.targetId,B)))))}catch(T){if(!ja(T))throw T;oe(CR,"Failed to update sequence numbers: "+T)}for(const T of _){const D=T.targetId;if(!T.fromCache){const B=w.Ss.get(D),W=B.snapshotVersion,q=B.withLastLimboFreeSnapshotVersion(W);w.Ss=w.Ss.insert(D,q)}}}(s.localStore,u))}async function sC(i,e){const n=Be(i);if(!n.currentUser.isEqual(e)){oe(eC,"User change. New user:",e.toKey());const s=await By(n.localStore,e);n.currentUser=e,function(u,h){u.cu.forEach(m=>{m.forEach(g=>{g.reject(new ge(Q.CANCELLED,h))})}),u.cu.clear()}(n,"'waitForPendingWrites' promise is rejected due to a user change."),n.sharedClientState.handleUserChange(e,s.removedBatchIds,s.addedBatchIds),await ec(n,s.Ms)}}function oC(i){const e=Be(i);return e.remoteStore.remoteSyncer.applySuccessfulWrite=rC.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=iC.bind(null,e),e}class Fu{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Yu(e.databaseInfo.databaseId),this.sharedClientState=this.Au(e),this.persistence=this.Ru(e),await this.persistence.start(),this.localStore=this.Vu(e),this.gcScheduler=this.mu(e,this.localStore),this.indexBackfillerScheduler=this.fu(e,this.localStore)}mu(e,n){return null}fu(e,n){return null}Vu(e){return kR(this.persistence,new RR,e.initialUser,this.serializer)}Ru(e){return new zy(Qd.Ei,this.serializer)}Au(e){return new xR}async terminate(){var e,n;(e=this.gcScheduler)===null||e===void 0||e.stop(),(n=this.indexBackfillerScheduler)===null||n===void 0||n.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Fu.provider={build:()=>new Fu};class aC extends Fu{constructor(e){super(),this.cacheSizeBytes=e}mu(e,n){Ye(this.persistence.referenceDelegate instanceof bu,46915);const s=this.persistence.referenceDelegate.garbageCollector;return new hR(s,e.asyncQueue,n)}Ru(e){const n=this.cacheSizeBytes!==void 0?Xt.withCacheSize(this.cacheSizeBytes):Xt.DEFAULT;return new zy(s=>bu.Ei(s,n),this.serializer)}}class vd{async initialize(e,n){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(n),this.remoteStore=this.createRemoteStore(n),this.eventManager=this.createEventManager(n),this.syncEngine=this.createSyncEngine(n,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=s=>Fg(this.syncEngine,s,1),this.remoteStore.remoteSyncer.handleCredentialChange=sC.bind(null,this.syncEngine),await YR(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new JR}()}createDatastore(e){const n=Yu(e.databaseInfo.databaseId),s=function(u){return new bR(u)}(e.databaseInfo);return function(u,h,m,g){return new BR(u,h,m,g)}(e.authCredentials,e.appCheckCredentials,s,n)}createRemoteStore(e){return function(s,a,u,h,m){return new HR(s,a,u,h,m)}(this.localStore,this.datastore,e.asyncQueue,n=>Fg(this.syncEngine,n,0),function(){return xg.C()?new xg:new LR}())}createSyncEngine(e,n){return function(a,u,h,m,g,_,w){const T=new tC(a,u,h,m,g,_);return w&&(T.hu=!0),T}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,n)}async terminate(){var e,n;await async function(a){const u=Be(a);oe(Ba,"RemoteStore shutting down."),u.aa.add(5),await $a(u),u.ca.shutdown(),u.la.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(n=this.eventManager)===null||n===void 0||n.terminate()}}vd.provider={build:()=>new vd};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hi="FirestoreClient";class lC{constructor(e,n,s,a,u){this.authCredentials=e,this.appCheckCredentials=n,this.asyncQueue=s,this.databaseInfo=a,this.user=Lt.UNAUTHENTICATED,this.clientId=uy.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=u,this.authCredentials.start(s,async h=>{oe(hi,"Received user=",h.uid),await this.authCredentialListener(h),this.user=h}),this.appCheckCredentials.start(s,h=>(oe(hi,"Received new app check token=",h),this.appCheckCredentialListener(h,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Wi;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(n){const s=qy(n,"Failed to shutdown persistence");e.reject(s)}}),e.promise}}async function Gh(i,e){i.asyncQueue.verifyOperationInProgress(),oe(hi,"Initializing OfflineComponentProvider");const n=i.configuration;await e.initialize(n);let s=n.initialUser;i.setCredentialChangeListener(async a=>{s.isEqual(a)||(await By(e.localStore,a),s=a)}),e.persistence.setDatabaseDeletedListener(()=>i.terminate()),i._offlineComponents=e}async function jg(i,e){i.asyncQueue.verifyOperationInProgress();const n=await uC(i);oe(hi,"Initializing OnlineComponentProvider"),await e.initialize(n,i.configuration),i.setCredentialChangeListener(s=>Vg(e.remoteStore,s)),i.setAppCheckTokenChangeListener((s,a)=>Vg(e.remoteStore,a)),i._onlineComponents=e}async function uC(i){if(!i._offlineComponents)if(i._uninitializedComponentsProvider){oe(hi,"Using user provided OfflineComponentProvider");try{await Gh(i,i._uninitializedComponentsProvider._offline)}catch(e){const n=e;if(!function(a){return a.name==="FirebaseError"?a.code===Q.FAILED_PRECONDITION||a.code===Q.UNIMPLEMENTED:!(typeof DOMException<"u"&&a instanceof DOMException)||a.code===22||a.code===20||a.code===11}(n))throw n;Ku("Error using user provided cache. Falling back to memory cache: "+n),await Gh(i,new Fu)}}else oe(hi,"Using default OfflineComponentProvider"),await Gh(i,new aC(void 0));return i._offlineComponents}async function cC(i){return i._onlineComponents||(i._uninitializedComponentsProvider?(oe(hi,"Using user provided OnlineComponentProvider"),await jg(i,i._uninitializedComponentsProvider._online)):(oe(hi,"Using default OnlineComponentProvider"),await jg(i,new vd))),i._onlineComponents}function hC(i){return cC(i).then(e=>e.syncEngine)}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yy(i){const e={};return i.timeoutSeconds!==void 0&&(e.timeoutSeconds=i.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zg=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dC(i,e,n){if(!n)throw new ge(Q.INVALID_ARGUMENT,`Function ${i}() cannot be called with an empty ${e}.`)}function fC(i,e,n,s){if(e===!0&&s===!0)throw new ge(Q.INVALID_ARGUMENT,`${i} and ${n} cannot be used together.`)}function Bg(i){if(!_e.isDocumentKey(i))throw new ge(Q.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${i} has ${i.length}.`)}function Jd(i){if(i===void 0)return"undefined";if(i===null)return"null";if(typeof i=="string")return i.length>20&&(i=`${i.substring(0,20)}...`),JSON.stringify(i);if(typeof i=="number"||typeof i=="boolean")return""+i;if(typeof i=="object"){if(i instanceof Array)return"an array";{const e=function(s){return s.constructor?s.constructor.name:null}(i);return e?`a custom ${e} object`:"an object"}}return typeof i=="function"?"a function":Te(12329,{type:typeof i})}function Na(i,e){if("_delegate"in i&&(i=i._delegate),!(i instanceof e)){if(e.name===i.constructor.name)throw new ge(Q.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=Jd(i);throw new ge(Q.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jy="firestore.googleapis.com",$g=!0;class Hg{constructor(e){var n,s;if(e.host===void 0){if(e.ssl!==void 0)throw new ge(Q.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Jy,this.ssl=$g}else this.host=e.host,this.ssl=(n=e.ssl)!==null&&n!==void 0?n:$g;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=jy;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<uR)throw new ge(Q.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}fC("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Yy((s=e.experimentalLongPollingOptions)!==null&&s!==void 0?s:{}),function(u){if(u.timeoutSeconds!==void 0){if(isNaN(u.timeoutSeconds))throw new ge(Q.INVALID_ARGUMENT,`invalid long polling timeout: ${u.timeoutSeconds} (must not be NaN)`);if(u.timeoutSeconds<5)throw new ge(Q.INVALID_ARGUMENT,`invalid long polling timeout: ${u.timeoutSeconds} (minimum allowed value is 5)`);if(u.timeoutSeconds>30)throw new ge(Q.INVALID_ARGUMENT,`invalid long polling timeout: ${u.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(s,a){return s.timeoutSeconds===a.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Zd{constructor(e,n,s,a){this._authCredentials=e,this._appCheckCredentials=n,this._databaseId=s,this._app=a,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Hg({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new ge(Q.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new ge(Q.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Hg(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(s){if(!s)return new BS;switch(s.type){case"firstParty":return new GS(s.sessionIndex||"0",s.iamToken||null,s.authTokenFactory||null);case"provider":return s.client;default:throw new ge(Q.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(n){const s=zg.get(n);s&&(oe("ComponentProvider","Removing Datastore"),zg.delete(n),s.terminate())}(this),Promise.resolve()}}function pC(i,e,n,s={}){var a;const u=(i=Na(i,Zd))._getSettings(),h=Object.assign(Object.assign({},u),{emulatorOptions:i._getEmulatorOptions()}),m=`${e}:${n}`;u.host!==Jy&&u.host!==m&&Ku("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const g=Object.assign(Object.assign({},u),{host:m,ssl:!1,emulatorOptions:s});if(!Ki(g,h)&&(i._setSettings(g),s.mockUserToken)){let _,w;if(typeof s.mockUserToken=="string")_=s.mockUserToken,w=Lt.MOCK_USER;else{_=nw(s.mockUserToken,(a=i._app)===null||a===void 0?void 0:a.options.projectId);const T=s.mockUserToken.sub||s.mockUserToken.user_id;if(!T)throw new ge(Q.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");w=new Lt(T)}i._authCredentials=new $S(new ly(_,w))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ef{constructor(e,n,s){this.converter=n,this._query=s,this.type="query",this.firestore=e}withConverter(e){return new ef(this.firestore,e,this._query)}}class er{constructor(e,n,s){this.converter=n,this._key=s,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Oa(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new er(this.firestore,e,this._key)}}class Oa extends ef{constructor(e,n,s){super(e,n,SA(s)),this._path=s,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new er(this.firestore,null,new _e(e))}withConverter(e){return new Oa(this.firestore,e,this._path)}}function DC(i,e,...n){if(i=Ut(i),arguments.length===1&&(e=uy.newId()),dC("doc","path",e),i instanceof Zd){const s=it.fromString(e,...n);return Bg(s),new er(i,null,new _e(s))}{if(!(i instanceof er||i instanceof Oa))throw new ge(Q.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const s=i._path.child(it.fromString(e,...n));return Bg(s),new er(i.firestore,i instanceof Oa?i.converter:null,new _e(s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wg="AsyncQueue";class Gg{constructor(e=Promise.resolve()){this.Qu=[],this.$u=!1,this.Uu=[],this.Ku=null,this.Wu=!1,this.Gu=!1,this.zu=[],this.y_=new $y(this,"async_queue_retry"),this.ju=()=>{const s=Wh();s&&oe(Wg,"Visibility state changed to "+s.visibilityState),this.y_.A_()},this.Hu=e;const n=Wh();n&&typeof n.addEventListener=="function"&&n.addEventListener("visibilitychange",this.ju)}get isShuttingDown(){return this.$u}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.Ju(),this.Yu(e)}enterRestrictedMode(e){if(!this.$u){this.$u=!0,this.Gu=e||!1;const n=Wh();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this.ju)}}enqueue(e){if(this.Ju(),this.$u)return new Promise(()=>{});const n=new Wi;return this.Yu(()=>this.$u&&this.Gu?Promise.resolve():(e().then(n.resolve,n.reject),n.promise)).then(()=>n.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Qu.push(e),this.Zu()))}async Zu(){if(this.Qu.length!==0){try{await this.Qu[0](),this.Qu.shift(),this.y_.reset()}catch(e){if(!ja(e))throw e;oe(Wg,"Operation failed with retryable error: "+e)}this.Qu.length>0&&this.y_.E_(()=>this.Zu())}}Yu(e){const n=this.Hu.then(()=>(this.Wu=!0,e().catch(s=>{throw this.Ku=s,this.Wu=!1,Ji("INTERNAL UNHANDLED ERROR: ",Kg(s)),s}).then(s=>(this.Wu=!1,s))));return this.Hu=n,n}enqueueAfterDelay(e,n,s){this.Ju(),this.zu.indexOf(e)>-1&&(n=0);const a=Yd.createAndSchedule(this,e,n,s,u=>this.Xu(u));return this.Uu.push(a),a}Ju(){this.Ku&&Te(47125,{ec:Kg(this.Ku)})}verifyOperationInProgress(){}async tc(){let e;do e=this.Hu,await e;while(e!==this.Hu)}nc(e){for(const n of this.Uu)if(n.timerId===e)return!0;return!1}rc(e){return this.tc().then(()=>{this.Uu.sort((n,s)=>n.targetTimeMs-s.targetTimeMs);for(const n of this.Uu)if(n.skipDelay(),e!=="all"&&n.timerId===e)break;return this.tc()})}sc(e){this.zu.push(e)}Xu(e){const n=this.Uu.indexOf(e);this.Uu.splice(n,1)}}function Kg(i){let e=i.message||"";return i.stack&&(e=i.stack.includes(i.message)?i.stack:i.message+`
`+i.stack),e}class tf extends Zd{constructor(e,n,s,a){super(e,n,s,a),this.type="firestore",this._queue=new Gg,this._persistenceKey=(a==null?void 0:a.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Gg(e),this._firestoreClient=void 0,await e}}}function mC(i,e){const n=typeof i=="object"?i:yv(),s=typeof i=="string"?i:Du,a=Sd(n,"firestore").getImmediate({identifier:s});if(!a._initialized){const u=ew("firestore");u&&pC(a,...u)}return a}function gC(i){if(i._terminated)throw new ge(Q.FAILED_PRECONDITION,"The client has already been terminated.");return i._firestoreClient||vC(i),i._firestoreClient}function vC(i){var e,n,s;const a=i._freezeSettings(),u=function(m,g,_,w){return new uA(m,g,_,w.host,w.ssl,w.experimentalForceLongPolling,w.experimentalAutoDetectLongPolling,Yy(w.experimentalLongPollingOptions),w.useFetchStreams)}(i._databaseId,((e=i._app)===null||e===void 0?void 0:e.options.appId)||"",i._persistenceKey,a);i._componentsProvider||!((n=a.localCache)===null||n===void 0)&&n._offlineComponentProvider&&(!((s=a.localCache)===null||s===void 0)&&s._onlineComponentProvider)&&(i._componentsProvider={_offline:a.localCache._offlineComponentProvider,_online:a.localCache._onlineComponentProvider}),i._firestoreClient=new lC(i._authCredentials,i._appCheckCredentials,i._queue,u,i._componentsProvider&&function(m){const g=m==null?void 0:m._online.build();return{_offline:m==null?void 0:m._offline.build(g),_online:g}}(i._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Da{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Da(tr.fromBase64String(e))}catch(n){throw new ge(Q.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+n)}}static fromUint8Array(e){return new Da(tr.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nf{constructor(...e){for(let n=0;n<e.length;++n)if(e[n].length===0)throw new ge(Q.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new At(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tc{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zy{constructor(e,n){if(!isFinite(e)||e<-90||e>90)throw new ge(Q.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(n)||n<-180||n>180)throw new ge(Q.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+n);this._lat=e,this._long=n}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return Oe(this._lat,e._lat)||Oe(this._long,e._long)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class e_{constructor(e){this._values=(e||[]).map(n=>n)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(s,a){if(s.length!==a.length)return!1;for(let u=0;u<s.length;++u)if(s[u]!==a[u])return!1;return!0}(this._values,e._values)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yC=/^__.*__$/;class _C{constructor(e,n,s){this.data=e,this.fieldMask=n,this.fieldTransforms=s}toMutation(e,n){return this.fieldMask!==null?new pi(e,this.data,this.fieldMask,n,this.fieldTransforms):new za(e,this.data,n,this.fieldTransforms)}}class t_{constructor(e,n,s){this.data=e,this.fieldMask=n,this.fieldTransforms=s}toMutation(e,n){return new pi(e,this.data,this.fieldMask,n,this.fieldTransforms)}}function n_(i){switch(i){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw Te(40011,{oc:i})}}class rf{constructor(e,n,s,a,u,h){this.settings=e,this.databaseId=n,this.serializer=s,this.ignoreUndefinedProperties=a,u===void 0&&this._c(),this.fieldTransforms=u||[],this.fieldMask=h||[]}get path(){return this.settings.path}get oc(){return this.settings.oc}ac(e){return new rf(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}uc(e){var n;const s=(n=this.path)===null||n===void 0?void 0:n.child(e),a=this.ac({path:s,cc:!1});return a.lc(e),a}hc(e){var n;const s=(n=this.path)===null||n===void 0?void 0:n.child(e),a=this.ac({path:s,cc:!1});return a._c(),a}Pc(e){return this.ac({path:void 0,cc:!0})}Tc(e){return ju(e,this.settings.methodName,this.settings.Ic||!1,this.path,this.settings.Ec)}contains(e){return this.fieldMask.find(n=>e.isPrefixOf(n))!==void 0||this.fieldTransforms.find(n=>e.isPrefixOf(n.field))!==void 0}_c(){if(this.path)for(let e=0;e<this.path.length;e++)this.lc(this.path.get(e))}lc(e){if(e.length===0)throw this.Tc("Document fields must not be empty");if(n_(this.oc)&&yC.test(e))throw this.Tc('Document fields cannot begin and end with "__"')}}class EC{constructor(e,n,s){this.databaseId=e,this.ignoreUndefinedProperties=n,this.serializer=s||Yu(e)}dc(e,n,s,a=!1){return new rf({oc:e,methodName:n,Ec:s,path:At.emptyPath(),cc:!1,Ic:a},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function r_(i){const e=i._freezeSettings(),n=Yu(i._databaseId);return new EC(i._databaseId,!!e.ignoreUndefinedProperties,n)}function wC(i,e,n,s,a,u={}){const h=i.dc(u.merge||u.mergeFields?2:0,e,n,a);of("Data must be an object, but it was:",h,s);const m=i_(s,h);let g,_;if(u.merge)g=new an(h.fieldMask),_=h.fieldTransforms;else if(u.mergeFields){const w=[];for(const T of u.mergeFields){const D=yd(e,T,n);if(!h.contains(D))throw new ge(Q.INVALID_ARGUMENT,`Field '${D}' is specified in your field mask but missing from your input data.`);a_(w,D)||w.push(D)}g=new an(w),_=h.fieldTransforms.filter(T=>g.covers(T.field))}else g=null,_=h.fieldTransforms;return new _C(new on(m),g,_)}class nc extends tc{_toFieldTransform(e){if(e.oc!==2)throw e.oc===1?e.Tc(`${this._methodName}() can only appear at the top level of your update data`):e.Tc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof nc}}class sf extends tc{_toFieldTransform(e){return new UA(e.path,new Ca)}isEqual(e){return e instanceof sf}}function TC(i,e,n,s){const a=i.dc(1,e,n);of("Data must be an object, but it was:",a,s);const u=[],h=on.empty();is(s,(g,_)=>{const w=o_(e,g,n);_=Ut(_);const T=a.hc(w);if(_ instanceof nc)u.push(w);else{const D=rc(_,T);D!=null&&(u.push(w),h.set(w,D))}});const m=new an(u);return new t_(h,m,a.fieldTransforms)}function IC(i,e,n,s,a,u){const h=i.dc(1,e,n),m=[yd(e,s,n)],g=[a];if(u.length%2!=0)throw new ge(Q.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let D=0;D<u.length;D+=2)m.push(yd(e,u[D])),g.push(u[D+1]);const _=[],w=on.empty();for(let D=m.length-1;D>=0;--D)if(!a_(_,m[D])){const B=m[D];let W=g[D];W=Ut(W);const q=h.hc(B);if(W instanceof nc)_.push(B);else{const j=rc(W,q);j!=null&&(_.push(B),w.set(B,j))}}const T=new an(_);return new t_(w,T,h.fieldTransforms)}function rc(i,e){if(s_(i=Ut(i)))return of("Unsupported field value:",e,i),i_(i,e);if(i instanceof tc)return function(s,a){if(!n_(a.oc))throw a.Tc(`${s._methodName}() can only be used with update() and set()`);if(!a.path)throw a.Tc(`${s._methodName}() is not currently supported inside arrays`);const u=s._toFieldTransform(a);u&&a.fieldTransforms.push(u)}(i,e),null;if(i===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),i instanceof Array){if(e.settings.cc&&e.oc!==4)throw e.Tc("Nested arrays are not supported");return function(s,a){const u=[];let h=0;for(const m of s){let g=rc(m,a.Pc(h));g==null&&(g={nullValue:"NULL_VALUE"}),u.push(g),h++}return{arrayValue:{values:u}}}(i,e)}return function(s,a){if((s=Ut(s))===null)return{nullValue:"NULL_VALUE"};if(typeof s=="number")return LA(a.serializer,s);if(typeof s=="boolean")return{booleanValue:s};if(typeof s=="string")return{stringValue:s};if(s instanceof Date){const u=yt.fromDate(s);return{timestampValue:fd(a.serializer,u)}}if(s instanceof yt){const u=new yt(s.seconds,1e3*Math.floor(s.nanoseconds/1e3));return{timestampValue:fd(a.serializer,u)}}if(s instanceof Zy)return{geoPointValue:{latitude:s.latitude,longitude:s.longitude}};if(s instanceof Da)return{bytesValue:qA(a.serializer,s._byteString)};if(s instanceof er){const u=a.databaseId,h=s.firestore._databaseId;if(!h.isEqual(u))throw a.Tc(`Document reference is for database ${h.projectId}/${h.database} but should be for database ${u.projectId}/${u.database}`);return{referenceValue:by(s.firestore._databaseId||a.databaseId,s._key.path)}}if(s instanceof e_)return function(h,m){return{mapValue:{fields:{[gy]:{stringValue:vy},[ld]:{arrayValue:{values:h.toArray().map(_=>{if(typeof _!="number")throw m.Tc("VectorValues must only contain numeric values.");return Gd(m.serializer,_)})}}}}}}(s,a);throw a.Tc(`Unsupported field value: ${Jd(s)}`)}(i,e)}function i_(i,e){const n={};return hy(i)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):is(i,(s,a)=>{const u=rc(a,e.uc(s));u!=null&&(n[s]=u)}),{mapValue:{fields:n}}}function s_(i){return!(typeof i!="object"||i===null||i instanceof Array||i instanceof Date||i instanceof yt||i instanceof Zy||i instanceof Da||i instanceof er||i instanceof tc||i instanceof e_)}function of(i,e,n){if(!s_(n)||!function(a){return typeof a=="object"&&a!==null&&(Object.getPrototypeOf(a)===Object.prototype||Object.getPrototypeOf(a)===null)}(n)){const s=Jd(n);throw s==="an object"?e.Tc(i+" a custom object"):e.Tc(i+" "+s)}}function yd(i,e,n){if((e=Ut(e))instanceof nf)return e._internalPath;if(typeof e=="string")return o_(i,e);throw ju("Field path arguments must be of type string or ",i,!1,void 0,n)}const SC=new RegExp("[~\\*/\\[\\]]");function o_(i,e,n){if(e.search(SC)>=0)throw ju(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,i,!1,void 0,n);try{return new nf(...e.split("."))._internalPath}catch{throw ju(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,i,!1,void 0,n)}}function ju(i,e,n,s,a){const u=s&&!s.isEmpty(),h=a!==void 0;let m=`Function ${e}() called with invalid data`;n&&(m+=" (via `toFirestore()`)"),m+=". ";let g="";return(u||h)&&(g+=" (found",u&&(g+=` in field ${s}`),h&&(g+=` in document ${a}`),g+=")"),new ge(Q.INVALID_ARGUMENT,m+i+g)}function a_(i,e){return i.some(n=>n.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function AC(i,e,n){let s;return s=i?i.toFirestore(e):e,s}function xC(i,e,n){i=Na(i,er);const s=Na(i.firestore,tf),a=AC(i.converter,e);return l_(s,[wC(r_(s),"setDoc",i._key,a,i.converter!==null,n).toMutation(i._key,Zn.none())])}function LC(i,e,n,...s){i=Na(i,er);const a=Na(i.firestore,tf),u=r_(a);let h;return h=typeof(e=Ut(e))=="string"||e instanceof nf?IC(u,"updateDoc",i._key,e,n,s):TC(u,"updateDoc",i._key,e),l_(a,[h.toMutation(i._key,Zn.exists(!0))])}function l_(i,e){return function(s,a){const u=new Wi;return s.asyncQueue.enqueueAndForget(async()=>nC(await hC(s),a,u)),u.promise}(gC(i),e)}function VC(){return new sf("serverTimestamp")}(function(e,n=!0){(function(a){mo=a})(fo),so(new qi("firestore",(s,{instanceIdentifier:a,options:u})=>{const h=s.getProvider("app").getImmediate(),m=new tf(new HS(s.getProvider("auth-internal")),new KS(h,s.getProvider("app-check-internal")),function(_,w){if(!Object.prototype.hasOwnProperty.apply(_.options,["projectId"]))throw new ge(Q.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new xu(_.options.projectId,w)}(h,a),h);return u=Object.assign({useFetchStreams:n},u),m._setSettings(u),m},"PUBLIC").setMultipleInstances(!0)),ai(ag,lg,e),ai(ag,lg,"esm2017")})();const RC={apiKey:"AIzaSyCj9bjaoQUopBGdATQ-U1PnGIKxke6qUY4",authDomain:"digital-coop-a3083.firebaseapp.com",projectId:"digital-coop-a3083",storageBucket:"digital-coop-a3083.appspot.com",messagingSenderId:"925403828694",appId:"1:925403828694:web:26224650e09df2a2531477",measurementId:"G-CCWK2CWY7L"},u_=vv(RC),Kh=ty(u_),MC=mC(u_),c_=Y.createContext();function UC(){return Y.useContext(c_)}function CC({children:i}){const[e,n]=Y.useState(null),[s,a]=Y.useState(!0);Y.useEffect(()=>CI(Kh,_=>{n(_||null),a(!1)}),[]);const m={user:e,loading:s,login:(g,_)=>SI(Kh,g,_),logout:()=>PI(Kh)};return Ie.jsx(c_.Provider,{value:m,children:i})}const h_=Y.createContext(),bC=()=>Y.useContext(h_),PC=({children:i})=>{const[e,n]=Y.useState([]),[s,a]=Y.useState({summary:null,classification:null,plan:null,messagingGuide:null,name:""}),g={campaigns:e,fetchCampaigns:async()=>{const w=ty().currentUser;if(!w){console.warn("⚠️ No user logged in, loading mock campaigns.");const T=[{id:"mock001",name:"Mock Campaign",summary:{purpose:"Test",audience:"Developers",goals:["issue awareness"]},classification:{primary_type:"Union",sub_type:"Workplace"}}];return n(T),T}try{const T=await w.getIdToken(),D=await fetch("/api/campaigns",{headers:{Authorization:`Bearer ${T}`}});if(!D.ok)throw new Error(`Server responded with ${D.status}`);const B=await D.json();return n(B),console.log("✅ Campaigns loaded:",B),B}catch(T){throw console.error("❌ Error loading campaigns:",T),T}},campaignData:s,updateCampaignData:_=>{a(w=>{const T={...w,..._};return console.log("✅ Campaign Context Updated:",T),T})},resetCampaignData:()=>{a({summary:null,classification:null,plan:null,messagingGuide:null,name:""}),console.log("🔄 Campaign Context Reset")}};return Ie.jsx(h_.Provider,{value:g,children:i})};AE.createRoot(document.getElementById("root")).render(Ie.jsx(Qg.StrictMode,{children:Ie.jsxs(R0,{children:[Ie.jsxs(CC,{children:["        ",Ie.jsxs(PC,{children:["    ",Ie.jsx(W0,{})]}),"   "]}),"       "]})}));export{kC as L,Qg as R,Kh as a,UC as b,NC as c,bC as d,Bu as e,xC as f,ty as g,DC as h,MC as i,Ie as j,VC as k,LC as l,Y as r,SI as s,n0 as u};
//# sourceMappingURL=index-D6efte17.js.map
