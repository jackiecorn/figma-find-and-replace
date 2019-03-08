(function(e){function t(t){for(var n,o,s=t[0],c=t[1],l=t[2],u=0,h=[];u<s.length;u++)o=s[u],r[o]&&h.push(r[o][0]),r[o]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(e[n]=c[n]);d&&d(t);while(h.length)h.shift()();return i.push.apply(i,l||[]),a()}function a(){for(var e,t=0;t<i.length;t++){for(var a=i[t],n=!0,s=1;s<a.length;s++){var c=a[s];0!==r[c]&&(n=!1)}n&&(i.splice(t--,1),e=o(o.s=a[0]))}return e}var n={},r={app:0},i=[];function o(t){if(n[t])return n[t].exports;var a=n[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,o),a.l=!0,a.exports}o.m=e,o.c=n,o.d=function(e,t,a){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(o.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)o.d(a,n,function(t){return e[t]}.bind(null,n));return a},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/";var s=window["findAndReplace"]=window["findAndReplace"]||[],c=s.push.bind(s);s.push=t,s=s.slice();for(var l=0;l<s.length;l++)t(s[l]);var d=c;i.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("56d7")},"56d7":function(e,t,a){"use strict";a.r(t);a("cadf"),a("551c"),a("097d");var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"tab-content"},[a("div",{staticClass:"section"},[a("h3",[e._v("Find")]),a("div",{attrs:{id:"findControl"}},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.findText,expression:"findText"}],ref:"findInput",attrs:{id:"findInput"},domProps:{value:e.findText},on:{keydown:e.findInputKeyboard,input:function(t){t.target.composing||(e.findText=t.target.value)}}}),a("div",{attrs:{id:"resultCount"}},[e._v(e._s(e.resultText))]),a("div",{ref:"prevButton",staticClass:"figma-icon chevron-up",class:{disabled:e.disabled},attrs:{id:"prevButton"},on:{click:e.prev}}),a("div",{ref:"nextButton",staticClass:"figma-icon chevron-down",class:{disabled:e.disabled},attrs:{id:"nextButton"},on:{click:e.next}}),a("div",{ref:"findSettingsButton",staticClass:"figma-icon-button more",on:{click:function(t){e.showFindSettings=!e.showFindSettings}}})]),a("div",{directives:[{name:"show",rawName:"v-show",value:e.showFindSettings,expression:"showFindSettings"}],attrs:{id:"findSettings"}},[a("div",{attrs:{id:"wherePicker"}},[a("div",{ref:"startButton",staticClass:"figma-icon align-left",class:{active:"start"===e.matchWhere},on:{click:function(t){e.matchWhere="start"}}}),a("div",{ref:"anywhereButton",staticClass:"figma-icon align-center",class:{active:"anywhere"===e.matchWhere},on:{click:function(t){e.matchWhere="anywhere"}}}),a("div",{ref:"endButton",staticClass:"figma-icon align-right",class:{active:"end"===e.matchWhere},on:{click:function(t){e.matchWhere="end"}}}),a("div",{ref:"exactButton",staticClass:"figma-icon align-justified",class:{active:"exact"===e.matchWhere},on:{click:function(t){e.matchWhere="exact"}}})]),a("div",{ref:"caseButton",class:{active:e.caseSensitive},attrs:{id:"caseButton"},on:{click:function(t){e.caseSensitive=!e.caseSensitive}}},[a("svg",{staticClass:"svg",attrs:{width:"30",height:"24",xmlns:"http://www.w3.org/2000/svg"}},[a("path",{attrs:{d:"M19 15c1.105 0 2-.895 2-2 0-1.105-.895-2-2-2-1.104 0-2 .895-2 2 0 1.105.896 2 2 2zm0 1c1.657 0 3-1.343 3-3 0-1.657-1.343-3-3-3-1.656 0-3 1.343-3 3 0 1.657 1.344 3 3 3z","fill-rule":"evenodd",fill:"#fff"}}),a("path",{attrs:{d:"M21 10h1v6h-1v-6z",fill:"#fff"}}),a("path",{attrs:{d:"M11.25 8h-.344l-.123.322L7.85 16h1.07l2.58-6.754L14.083 16h1.07l-2.936-7.679L12.095 8h-.845zm2.605 6h-4.5v-1h4.5v1z","fill-rule":"evenodd",fill:"#fff"}})])]),a("div",{ref:"wholeButton",class:{active:e.matchWhole},attrs:{id:"wholeButton"},on:{click:function(t){e.matchWhole=!e.matchWhole}}},[e._v("[ A ]")])])]),a("div",{staticClass:"section"},[a("h3",[e._v("Replace with")]),a("div",{attrs:{id:"replaceControl"}},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.replaceText,expression:"replaceText"}],attrs:{id:"replaceInput"},domProps:{value:e.replaceText},on:{keydown:e.replaceInputKeyboard,input:function(t){t.target.composing||(e.replaceText=t.target.value)}}}),a("div",{ref:"replaceSettingsButton",staticClass:"figma-icon-button more",on:{click:function(t){e.showReplaceSettings=!e.showReplaceSettings}}})]),a("div",{attrs:{id:"previewText"}},[e._v(e._s(e.previewText))]),a("div",{directives:[{name:"show",rawName:"v-show",value:e.showReplaceSettings,expression:"showReplaceSettings"}],attrs:{id:"replaceSettings"}},[a("div",{staticClass:"checkboxGroup"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.keepCase,expression:"keepCase"}],attrs:{type:"checkbox",id:"keepCaseCheckbox"},domProps:{checked:Array.isArray(e.keepCase)?e._i(e.keepCase,null)>-1:e.keepCase},on:{change:function(t){var a=e.keepCase,n=t.target,r=!!n.checked;if(Array.isArray(a)){var i=null,o=e._i(a,i);n.checked?o<0&&(e.keepCase=a.concat([i])):o>-1&&(e.keepCase=a.slice(0,o).concat(a.slice(o+1)))}else e.keepCase=r}}}),a("label",{attrs:{for:"keepCaseCheckbox"}},[e._v("Keep original case")])]),a("div",{directives:[{name:"show",rawName:"v-show",value:"text"===e.mode,expression:'mode === "text"'}],staticClass:"checkboxGroup"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.replaceLayerName,expression:"replaceLayerName"}],attrs:{type:"checkbox",id:"replaceLayerNameCheckbox"},domProps:{checked:Array.isArray(e.replaceLayerName)?e._i(e.replaceLayerName,null)>-1:e.replaceLayerName},on:{change:function(t){var a=e.replaceLayerName,n=t.target,r=!!n.checked;if(Array.isArray(a)){var i=null,o=e._i(a,i);n.checked?o<0&&(e.replaceLayerName=a.concat([i])):o>-1&&(e.replaceLayerName=a.slice(0,o).concat(a.slice(o+1)))}else e.replaceLayerName=r}}}),a("label",{attrs:{for:"replaceLayerNameCheckbox"}},[e._v("Update layer name")])]),a("div",{directives:[{name:"show",rawName:"v-show",value:"text"!==e.mode,expression:'mode !== "text"'}],staticClass:"checkboxGroup"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.replaceWholeLayerName,expression:"replaceWholeLayerName"}],attrs:{type:"checkbox",id:"replaceWholeLayerNameCheckbox"},domProps:{checked:Array.isArray(e.replaceWholeLayerName)?e._i(e.replaceWholeLayerName,null)>-1:e.replaceWholeLayerName},on:{change:function(t){var a=e.replaceWholeLayerName,n=t.target,r=!!n.checked;if(Array.isArray(a)){var i=null,o=e._i(a,i);n.checked?o<0&&(e.replaceWholeLayerName=a.concat([i])):o>-1&&(e.replaceWholeLayerName=a.slice(0,o).concat(a.slice(o+1)))}else e.replaceWholeLayerName=r}}}),a("label",{attrs:{for:"replaceWholeLayerNameCheckbox"}},[e._v("Replace whole layer name")])])])]),a("div",{attrs:{id:"footer"}},[a("button",{attrs:{disabled:e.replaceDisabled},on:{click:e.replace}},[e._v("Replace")]),a("button",{staticClass:"primary",attrs:{disabled:e.replaceDisabled},on:{click:e.replaceAll,keydown:e.replaceAllButtonKeyboard}},[e._v("Replace all")])])])},r=[],i=(a("6762"),a("2fdb"),a("28a5"),a("ac6a"),a("3b2b"),a("7f7f"),a("7514"),a("a481"),{watch:{findText:function(e){e=e.replace(/'/g,"’"),self.currentText="",""!==e?this.find(e):App.sendMessage("clearSelection")},currentNode:function(e){e&&void 0!==e.id&&(this.currentText="text"===this.mode?e.characters:e.name,figmaPlus.scene.panToNode(e),figmaPlus.scene.selection=[e])},caseSensitive:function(){this.find(this.findText)},matchWhole:function(){this.find(this.findText)},matchWhere:function(){this.find(this.findText)}},props:["mode"],data:function(){return{treeObj:[],foundNodes:[],findText:"",replaceText:"",currentText:"",currentNode:{},caseSensitive:!1,matchWhole:!1,matchWhere:"anywhere",keepCase:!0,replaceLayerName:!0,replaceWholeLayerName:!1,showFindSettings:!1,showReplaceSettings:!1}},computed:{resultText:function(){var e=this;return""===e.findText?"":0===e.foundNodes.length?"0/0":e.foundNodes.indexOf(e.currentNode)+1+"/"+e.foundNodes.length},disabled:function(){return this.foundNodes.length<2||""===this.findText},replaceDisabled:function(){return this.foundNodes.length<1||""===this.findText},newText:function(){var e=this;if(void 0===e.currentText)return"";if(e.replaceWholeLayerName)return o(e.currentText,e.replaceText,e.keepCase);var t=e.currentText.replace(new RegExp(e.findText,"gi"),function(t){return o(t,e.replaceText,e.keepCase)});return t=t.replace(/\n/g," "),t},foundText:function(){return""===this.findText||void 0===this.currentText?"":this.currentText},previewText:function(){return this.replaceWholeLayerName&&""===this.replaceText&&"layerName"===this.mode?"Reset to default layer name":""===this.findText||""===this.replaceText||void 0===this.currentText||this.replaceDisabled?"":"Preview: "+this.newText}},mounted:function(){this.$refs.findInput.focus(),window.figmaPlus.addTooltip(this.$refs.startButton,"Beginning of text",!1),window.figmaPlus.addTooltip(this.$refs.anywhereButton,"Anywhere in text",!1),window.figmaPlus.addTooltip(this.$refs.endButton,"End of text",!1),window.figmaPlus.addTooltip(this.$refs.exactButton,"Exact match",!1),window.figmaPlus.addTooltip(this.$refs.caseButton,"Match case",!1),window.figmaPlus.addTooltip(this.$refs.wholeButton,"Whole words only",!1)},methods:{hide:function(){figmaPlus.hideUI("Find and Replace")},find:function(e){var t=this;t.foundNodes=[];var a=figmaPlus.scene.currentPage.getAllDescendents().reverse(),n=t.caseSensitive?"g":"gi";e=(e+"").trim(),"text"===this.mode&&(a=a.filter(function(e){return"TEXT"===e.type})),a.forEach(function(a){var r="text"===t.mode?a.characters:a.name;switch(t.matchWhere){case"anywhere":t.matchWhole?r.split(" ").some(function(a){return t.caseSensitive?a===e:a.toLowerCase()===e.toLowerCase()})&&t.foundNodes.push(a):t.caseSensitive?r.includes(e)&&t.foundNodes.push(a):("2491:69"===a.id&&console.log(r.toLowerCase()),"2491:69"===a.id&&console.log(e.toLowerCase()),r.toLowerCase().includes(e.toLowerCase())&&t.foundNodes.push(a));break;case"exact":t.caseSensitive?r===e&&t.foundNodes.push(a):r.toLowerCase()===e.toLowerCase()&&t.foundNodes.push(a);break;case"start":var i=t.matchWhole?new RegExp("^\\b"+e+"\\b",n):new RegExp("^"+e,n);i.test(r)&&t.foundNodes.push(a);break;case"end":var o=t.matchWhole?new RegExp("\\b"+e+"\\b$",n):new RegExp(e+"$",n);o.test(r)&&t.foundNodes.push(a)}}),t.foundNodes.length>0?t.currentNode=t.foundNodes[0]:App.sendMessage("clearSelection")},next:function(){var e,t=this.foundNodes.indexOf(this.currentNode);e=t===this.foundNodes.length-1?0:t+1;var a=this.foundNodes[e];this.currentNode=a},prev:function(){var e,t=this.foundNodes.indexOf(this.currentNode);e=0===t?this.foundNodes.length-1:t-1;var a=this.foundNodes[e];this.currentNode=a},findInputKeyboard:function(e){13===e.which&&e.shiftKey&&(this.disabled?this.find(this.findText):this.prev()),13!==e.which||e.shiftKey||(this.disabled?this.find(this.findText):this.next()),e.metaKey&&70===e.keyCode&&(e.preventDefault(),document.querySelector("#findInput").focus()),9===e.which&&e.shiftKey&&(e.preventDefault(),document.querySelector("#replaceAllButton").focus())},replaceInputKeyboard:function(e){13!==e.which||e.metaKey||this.replace(),13===e.which&&e.metaKey&&this.replaceAll(),e.metaKey&&70===e.keyCode&&(e.preventDefault(),document.querySelector("#findInput").focus()),9!==e.which||e.shiftKey||(e.preventDefault(),document.querySelector("#replaceButton").focus())},replaceAllButtonKeyboard:function(e){9!==e.which||e.shiftKey||(e.preventDefault(),document.querySelector("#findInput").focus())},replace:function(){var e=this;"text"===this.mode&&(this.currentNode.characters=this.newText,this.replaceLayerName&&(this.currentNode.name=this.newText)),"layerName"===this.mode&&(this.replaceWholeLayerName&&""===this.newText&&(this.newText=""),this.currentNode.name=this.newText),setTimeout(function(){var t=e.foundNodes.indexOf(e.currentNode);e.foundNodes.splice(e.foundNodes.indexOf(e.currentNode),1),e.foundNodes.length>0?(t>=e.foundNodes.length&&(t=0),e.currentNode=e.foundNodes[t]):(e.currentNode=void 0,e.currentText="",figmaPlus.scene.selection=[]),document.querySelector("#replaceInput").focus()},500)},replaceAll:function(){var e=this,t=this;t.foundNodes.forEach(function(a){var n,r="text"===t.mode?a.characters:a.name;t.replaceWholeLayerName?n=o(r,t.replaceText,t.keepCase):(n=r.replace(new RegExp(t.findText,"gi"),function(e){return o(e,t.replaceText,t.keepCase)}),n=n.replace(/\n/g," ")),"text"===t.mode&&(a.characters=n,e.replaceLayerName&&(a.name=n)),"layerName"===t.mode&&(t.replaceWholeLayerName&&""===t.replaceText&&(n=""),a.name=n)}),figmaPlus.scene.selection=[],t.foundNodes=[],t.currentNode=void 0,t.currentText="",t.find(t.findText)}}});function o(e,t,a){var n=t;return a&&(e.charAt(0)===e.charAt(0).toLowerCase()&&(n=t.charAt(0).toLowerCase()+t.slice(1)),e.charAt(0)===e.charAt(0).toUpperCase()&&(n=t.charAt(0).toUpperCase()+t.slice(1)),e===e.toLowerCase()&&(n=t.toLowerCase()),e===e.toUpperCase()&&(n=t.toUpperCase())),n}var s=i,c=(a("5c0b"),a("2877")),l=Object(c["a"])(s,n,r,!1,null,null,null);l.options.__file="App.vue";var d=l.exports,u={mac:{command:!0,key:"F"},windows:{control:!0,key:"F"}},h=function(){figmaPlus.showUI("Find and Replace",function(e,t){new figmaPlus.Vue({el:e,components:{App:d},template:"<App :mode='mode'></App>",data:function(){return{mode:"text"}}}),new figmaPlus.Vue({el:t,components:{App:d},template:"<App :mode='mode'></App>",data:function(){return{mode:"layerName"}}})},360,null,1,.08,!1,null,["Text","Layer Name"])};figmaPlus.createPluginsMenuItem("Find and Replace",h,null,u),figmaPlus.createContextMenuItem.Canvas("Find and Replace",h,null,u),figmaPlus.createKeyboardShortcut(u,h)},"5c0b":function(e,t,a){"use strict";var n=a("5e27"),r=a.n(n);r.a},"5e27":function(e,t,a){}});