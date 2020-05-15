(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{1017:function(e,n,t){"use strict";t.r(n);var r=t(267),d=t.n(r),o=(t(280),t(281),t(109)),c=t(251),l=t.n(c),m={layout:"admin",components:{SlideYUpTransition:o.b},data:function(){return{orders:[]}},apollo:{$subscribe:{pickup_orders:{query:d.a,variables:function(){return{ID:this.$route.params.id}},result:function(e){var data=e.data;this.orders=data.pickup_orders}}}},methods:{calcOrderTotal:function(e){var n=0;return e.forEach((function(e){n+=parseFloat(e.menu_item.price)})),n}},computed:{completed_orders:function(){return l.a.filter(this.orders,{completed:!0})}}},f=(t(419),t(13)),component=Object(f.a)(m,(function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{},[t("adminNav",{attrs:{active:"past-orders"}}),e._v(" "),t("div",{staticClass:"container pt-6"},[t("h2",{staticClass:"text-3xl font-black mb-4"},[e._v("Past Orders")]),e._v(" "),t("xInput",{attrs:{type:"text",placeholder:"Search"}}),e._v(" "),t("div",e._l(e.completed_orders,(function(n,r){return t("div",{key:r,staticClass:"cursor-pointer text-gray-500 hover:text-gray-800 hover:shadow rounded bg-white p-4 mb-2",on:{click:function(t){return e.showPopup(n)}}},[t("h1",{staticClass:"text-sm"},[e._v("#"+e._s(n.id))]),e._v(" "),t("div",{staticClass:"flex items-center text-lg  justify-between font-medium"},[t("div",[t("h3",[e._v(e._s(n.customer_name))])]),e._v(" "),t("div",[e._v("$"+e._s(e.calcOrderTotal(n.order_items)))])])])})),0)],1)],1)}),[],!1,null,"0211b92c",null);n.default=component.exports},267:function(e,n){var t={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"subscription",name:{kind:"Name",value:"getAllOrders"},variableDefinitions:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"pickup_orders"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"customer_name"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"customer_phone_number"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"confirmed"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"completed"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"order_items"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"menu_item"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"description"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"price"},arguments:[],directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"notes"},arguments:[],directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"order_items_aggregate"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"aggregate"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"count"},arguments:[],directives:[]}]}}]}}]}}]}}],loc:{start:0,end:336}};t.loc.source={body:"subscription getAllOrders {\r\n  pickup_orders {\r\n    id\r\n    customer_name\r\n    customer_phone_number\r\n    confirmed\r\n    completed\r\n    order_items {\r\n      menu_item {\r\n        name\r\n        description\r\n        price\r\n      }\r\n      notes\r\n    }\r\n    order_items_aggregate {\r\n      aggregate {\r\n        count\r\n      }\r\n    }\r\n  }\r\n}\r\n",name:"GraphQL request",locationOffset:{line:1,column:1}};var r={};function d(e,n){for(var i=0;i<e.definitions.length;i++){var element=e.definitions[i];if(element.name&&element.name.value==n)return element}}t.definitions.forEach((function(e){if(e.name){var n=new Set;!function e(n,t){if("FragmentSpread"===n.kind)t.add(n.name.value);else if("VariableDefinition"===n.kind){var r=n.type;"NamedType"===r.kind&&t.add(r.name.value)}n.selectionSet&&n.selectionSet.selections.forEach((function(n){e(n,t)})),n.variableDefinitions&&n.variableDefinitions.forEach((function(n){e(n,t)})),n.definitions&&n.definitions.forEach((function(n){e(n,t)}))}(e,n),r[e.name.value]=n}})),e.exports=t,e.exports.getAllOrders=function(e,n){var t={kind:e.kind,definitions:[d(e,n)]};e.hasOwnProperty("loc")&&(t.loc=e.loc);var o=r[n]||new Set,c=new Set,l=new Set;for(o.forEach((function(e){l.add(e)}));l.size>0;){var m=l;l=new Set,m.forEach((function(e){c.has(e)||(c.add(e),(r[e]||new Set).forEach((function(e){l.add(e)})))}))}return c.forEach((function(n){var r=d(e,n);r&&t.definitions.push(r)})),t}(t,"getAllOrders")},280:function(e,n){var t={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"confirmOrder"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"ID"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"update_pickup_orders"},arguments:[{kind:"Argument",name:{kind:"Name",value:"where"},value:{kind:"ObjectValue",fields:[{kind:"ObjectField",name:{kind:"Name",value:"id"},value:{kind:"ObjectValue",fields:[{kind:"ObjectField",name:{kind:"Name",value:"_eq"},value:{kind:"Variable",name:{kind:"Name",value:"ID"}}}]}}]}},{kind:"Argument",name:{kind:"Name",value:"_set"},value:{kind:"ObjectValue",fields:[{kind:"ObjectField",name:{kind:"Name",value:"confirmed"},value:{kind:"BooleanValue",value:!0}}]}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"affected_rows"},arguments:[],directives:[]}]}}]}}],loc:{start:0,end:138}};t.loc.source={body:"mutation confirmOrder($ID: Int) {\r\n  update_pickup_orders(where: {id: {_eq: $ID}}, _set: {confirmed: true}) {\r\n    affected_rows\r\n  }\r\n}\r\n",name:"GraphQL request",locationOffset:{line:1,column:1}};var r={};function d(e,n){for(var i=0;i<e.definitions.length;i++){var element=e.definitions[i];if(element.name&&element.name.value==n)return element}}t.definitions.forEach((function(e){if(e.name){var n=new Set;!function e(n,t){if("FragmentSpread"===n.kind)t.add(n.name.value);else if("VariableDefinition"===n.kind){var r=n.type;"NamedType"===r.kind&&t.add(r.name.value)}n.selectionSet&&n.selectionSet.selections.forEach((function(n){e(n,t)})),n.variableDefinitions&&n.variableDefinitions.forEach((function(n){e(n,t)})),n.definitions&&n.definitions.forEach((function(n){e(n,t)}))}(e,n),r[e.name.value]=n}})),e.exports=t,e.exports.confirmOrder=function(e,n){var t={kind:e.kind,definitions:[d(e,n)]};e.hasOwnProperty("loc")&&(t.loc=e.loc);var o=r[n]||new Set,c=new Set,l=new Set;for(o.forEach((function(e){l.add(e)}));l.size>0;){var m=l;l=new Set,m.forEach((function(e){c.has(e)||(c.add(e),(r[e]||new Set).forEach((function(e){l.add(e)})))}))}return c.forEach((function(n){var r=d(e,n);r&&t.definitions.push(r)})),t}(t,"confirmOrder")},281:function(e,n){var t={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"complateOrder"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"ID"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"update_pickup_orders"},arguments:[{kind:"Argument",name:{kind:"Name",value:"where"},value:{kind:"ObjectValue",fields:[{kind:"ObjectField",name:{kind:"Name",value:"id"},value:{kind:"ObjectValue",fields:[{kind:"ObjectField",name:{kind:"Name",value:"_eq"},value:{kind:"Variable",name:{kind:"Name",value:"ID"}}}]}}]}},{kind:"Argument",name:{kind:"Name",value:"_set"},value:{kind:"ObjectValue",fields:[{kind:"ObjectField",name:{kind:"Name",value:"completed"},value:{kind:"BooleanValue",value:!0}}]}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"affected_rows"},arguments:[],directives:[]}]}}]}}],loc:{start:0,end:139}};t.loc.source={body:"mutation complateOrder($ID: Int) {\r\n  update_pickup_orders(where: {id: {_eq: $ID}}, _set: {completed: true}) {\r\n    affected_rows\r\n  }\r\n}\r\n",name:"GraphQL request",locationOffset:{line:1,column:1}};var r={};function d(e,n){for(var i=0;i<e.definitions.length;i++){var element=e.definitions[i];if(element.name&&element.name.value==n)return element}}t.definitions.forEach((function(e){if(e.name){var n=new Set;!function e(n,t){if("FragmentSpread"===n.kind)t.add(n.name.value);else if("VariableDefinition"===n.kind){var r=n.type;"NamedType"===r.kind&&t.add(r.name.value)}n.selectionSet&&n.selectionSet.selections.forEach((function(n){e(n,t)})),n.variableDefinitions&&n.variableDefinitions.forEach((function(n){e(n,t)})),n.definitions&&n.definitions.forEach((function(n){e(n,t)}))}(e,n),r[e.name.value]=n}})),e.exports=t,e.exports.complateOrder=function(e,n){var t={kind:e.kind,definitions:[d(e,n)]};e.hasOwnProperty("loc")&&(t.loc=e.loc);var o=r[n]||new Set,c=new Set,l=new Set;for(o.forEach((function(e){l.add(e)}));l.size>0;){var m=l;l=new Set,m.forEach((function(e){c.has(e)||(c.add(e),(r[e]||new Set).forEach((function(e){l.add(e)})))}))}return c.forEach((function(n){var r=d(e,n);r&&t.definitions.push(r)})),t}(t,"complateOrder")},298:function(e,n,t){var content=t(420);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,t(36).default)("7246820a",content,!0,{sourceMap:!1})},419:function(e,n,t){"use strict";var r=t(298);t.n(r).a},420:function(e,n,t){(n=t(35)(!1)).push([e.i,".pendingBlock[data-v-0211b92c]{height:20px;width:20px;border-radius:20px;margin-right:10px}[data-v-0211b92c]::-webkit-scrollbar{width:12px}[data-v-0211b92c]::-webkit-scrollbar-track{background:#edf2f7;border-radius:10px}[data-v-0211b92c]::-webkit-scrollbar-thumb{border-radius:10px;background:#a0aec0}.container[data-v-0211b92c]{margin:0 auto;max-width:960px}",""]),e.exports=n}}]);