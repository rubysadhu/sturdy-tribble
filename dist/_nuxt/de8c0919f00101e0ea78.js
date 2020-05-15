(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{1015:function(e,n,t){"use strict";t.r(n);t(29),t(37);var r=t(8),o=(t(267),t(280),t(281),t(109)),d=(t(251),{layout:"admin",components:{SlideYUpTransition:o.b},data:function(){return{menu:null,selectedMenu:null,selectedID:null,selectedMenuItem:null,selectedMenuItemID:null,editMenuItemPopup:!1}},asyncData:function(e){return Object(r.a)(regeneratorRuntime.mark((function n(){var t,r;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return t=e.$axios,e.store,e.params,t.setHeader("x-hasura-admin-secret","soupnazi"),n.next=4,t.$post("https://hasura-3udj.onrender.com/v1/graphql",{query:"query {\n            categories {\n              name\n              description\n              id\n              menus {\n                name\n                price\n                description\n                id\n              }\n            }\n          }"});case 4:return r=n.sent.data,console.log(r),n.abrupt("return",{menu:r,selectedMenu:r.categories[0],selectedID:r.categories[0].id});case 7:case"end":return n.stop()}}),n)})))()},methods:{saveChanges:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return e.$axios.setHeader("x-hasura-admin-secret","soupnazi"),n.next=3,e.$axios.$post("https://hasura-3udj.onrender.com/v1/graphql",{query:'mutation {\n            update_categories(where: {id: {_eq: "'.concat(e.selectedMenu.id,'"}}, _set: {name: "').concat(e.selectedMenu.name,'", description: "').concat(e.selectedMenu.description,'"}) {\n              returning {\n                id\n              }\n            }\n          }\n          ')});case 3:n.sent.data;case 4:case"end":return n.stop()}}),n)})))()},saveNewCategory:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return e.$axios.setHeader("x-hasura-admin-secret","soupnazi"),n.next=3,e.$axios.$post("https://hasura-3udj.onrender.com/v1/graphql",{query:'mutation {\n                    insert_categories_one(object: {description: "'.concat(e.selectedMenu.description,'", name: "').concat(e.selectedMenu.name,'"}) {\n                      id\n                    }\n                  }')});case 3:n.sent.data,e.$router.go({path:"/edit-menu",force:!0});case 5:case"end":return n.stop()}}),n)})))()},updateMenuItem:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return e.$axios.setHeader("x-hasura-admin-secret","soupnazi"),n.next=3,e.$axios.$post("https://hasura-3udj.onrender.com/v1/graphql",{query:'mutation {\n            update_menu_items(where: {id: {_eq: "'.concat(e.selectedMenuItem.id,'"}}, _set: {name: "').concat(e.selectedMenuItem.name,'", description: "').concat(e.selectedMenuItem.description,'", price: "').concat(e.selectedMenuItem.price,'"}) {\n              returning {\n                id\n              }\n            }\n          }\n          ')});case 3:n.sent.data,e.editMenuItemPopup=!1;case 5:case"end":return n.stop()}}),n)})))()},saveNewMenuItem:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return e.$axios.setHeader("x-hasura-admin-secret","soupnazi"),n.next=3,e.$axios.$post("https://hasura-3udj.onrender.com/v1/graphql",{query:'mutation {\n            insert_menu_items_one(object: {category: "'.concat(e.selectedID,'", name: "').concat(e.selectedMenuItem.name,'", description: "').concat(e.selectedMenuItem.description,'", price: "').concat(e.selectedMenuItem.price,'"}) {\n              id\n            }\n          }\n          ')});case 3:n.sent.data,e.editMenuItemPopup=!1;case 5:case"end":return n.stop()}}),n)})))()},deleteMenuItem:function(e){var n=this;return Object(r.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n.$axios.setHeader("x-hasura-admin-secret","soupnazi"),t.next=3,n.$axios.$post("https://hasura-3udj.onrender.com/v1/graphql",{query:'mutation {\n                    delete_menu_items_by_pk(id: "'.concat(e.id,'") {\n                      id\n                    }\n                  }')});case 3:t.sent.data;case 4:case"end":return t.stop()}}),t)})))()},getCategory:function(e){this.selectedMenu=this.menu.categories[e],this.selectedID=this.selectedMenu.id,this.selectedMenuItemID=this.menu.categories[e].id},newCategory:function(){this.selectedID=null,this.selectedMenu={}},editMenuItem:function(e){this.selectedMenuItem=e,this.editMenuItemPopup=!0},newMenuItem:function(){this.selectedMenuItemID=null,this.selectedMenuItem={},this.editMenuItemPopup=!0},closePopup:function(){this.editMenuItemPopup=!1}},computed:{}}),c=(t(415),t(13)),component=Object(c.a)(d,(function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{},[e.editMenuItemPopup?t("div",{staticClass:"bg-gray-900 opacity-75 transition ease-in-out duration-200",staticStyle:{left:"0",top:"0",position:"fixed",width:"100%",height:"100vh","z-index":"999"},attrs:{id:"overlay"}}):e._e(),e._v(" "),t("slide-y-up-transition",[e.editMenuItemPopup?t("div",{staticClass:"bg-white relative rounded-md p-6 shadow-md",staticStyle:{left:"25%",top:"5%",position:"fixed",width:"50%","z-index":"999"}},[t("i",{staticClass:"cursor-pointer absolute top-0 right-0 py-2 px-4 text-5xl leading-none tracking-none text-gray-800 far fa-times",on:{click:function(n){return e.closePopup()}}}),e._v(" "),t("div",[t("h3",{staticClass:"text-2xl leading-6 font-bold mb-6 text-gray-900"},[e._v("Edit Menu Item")]),e._v(" "),t("label",{staticClass:"font-medium mb-2"},[e._v("Name")]),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.selectedMenuItem.name,expression:"selectedMenuItem.name"}],staticClass:"appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-3",attrs:{type:"text"},domProps:{value:e.selectedMenuItem.name},on:{input:function(n){n.target.composing||e.$set(e.selectedMenuItem,"name",n.target.value)}}}),e._v(" "),t("label",{staticClass:"font-medium mb-2"},[e._v("Description")]),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.selectedMenuItem.description,expression:"selectedMenuItem.description"}],staticClass:"appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-3",attrs:{type:"text"},domProps:{value:e.selectedMenuItem.description},on:{input:function(n){n.target.composing||e.$set(e.selectedMenuItem,"description",n.target.value)}}}),e._v(" "),t("label",{staticClass:"font-medium mb-2"},[e._v("Price")]),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.selectedMenuItem.price,expression:"selectedMenuItem.price"}],staticClass:"appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-3",attrs:{type:"text"},domProps:{value:e.selectedMenuItem.price},on:{input:function(n){n.target.composing||e.$set(e.selectedMenuItem,"price",n.target.value)}}}),e._v(" "),null!=e.selectedMenuItemID?t("button",{staticClass:"bg-green-500 rounded p-2 px-4 font-bold uppercase text-white",on:{click:function(n){return e.updateMenuItem()}}},[e._v("Save")]):t("button",{staticClass:"bg-green-500 rounded p-2 px-4 font-bold uppercase text-white",on:{click:function(n){return e.saveNewMenuItem()}}},[e._v("Create")])])]):e._e()]),e._v(" "),t("adminNav",{attrs:{active:"edit-menu"}}),e._v(" "),t("div",{staticClass:"container pt-6"},[t("div",{staticClass:"flex -mx-2"},[t("div",{staticClass:"w-1/4 px-2"},[t("h2",{staticClass:"text-3xl font-black mb-4"},[e._v("Menu")]),e._v(" "),t("nav",{staticClass:"mb-6"},e._l(e.menu.categories,(function(n,r){return t("a",{staticClass:"mb-2 leading-5 font-medium text-gray-900 block rounded-md  focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150",attrs:{href:"#","aria-current":"page"}},[e.selectedMenu.name==n.name?t("span",{staticClass:"block p-2 rounded bg-gray-300 text-gray-900 truncate",on:{click:function(n){return e.getCategory(r)}}},[e._v("\n                                "+e._s(n.name)+"\n                            ")]):t("span",{staticClass:"block p-2 truncate",on:{click:function(n){return e.getCategory(r)}}},[e._v("\n                                "+e._s(n.name)+"\n                            ")])])})),0),e._v(" "),t("button",{staticClass:"bg-gray-600 rounded p-2 px-4 font-bold uppercase text-white",on:{click:function(n){return e.newCategory()}}},[t("i",{staticClass:"fas fa-plus"})])]),e._v(" "),t("div",{staticClass:"w-3/4 px-2"},[t("div",{staticClass:"p-4 rounded-md bg-white mb-3"},[null!=e.selectedID?t("h4",{staticClass:"text-xl font-medium mb-4"},[e._v("Edit Category")]):t("h4",{staticClass:"text-xl font-medium mb-4"},[e._v("New Category")]),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.selectedMenu.name,expression:"selectedMenu.name"}],staticClass:"appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-3 text-lg",attrs:{type:"text"},domProps:{value:e.selectedMenu.name},on:{input:function(n){n.target.composing||e.$set(e.selectedMenu,"name",n.target.value)}}}),e._v(" "),t("textarea",{directives:[{name:"model",rawName:"v-model",value:e.selectedMenu.description,expression:"selectedMenu.description"}],staticClass:"appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-3 text-lg",staticStyle:{height:"100px"},domProps:{value:e.selectedMenu.description},on:{input:function(n){n.target.composing||e.$set(e.selectedMenu,"description",n.target.value)}}}),e._v(" "),null!=e.selectedID?t("button",{staticClass:"bg-green-500 rounded p-2 px-6 font-bold uppercase text-white",on:{click:function(n){return e.saveChanges()}}},[e._v("Save Changes")]):t("button",{staticClass:"bg-green-500 rounded p-2 px-6 font-bold uppercase text-white",on:{click:function(n){return e.saveNewCategory()}}},[e._v("Save Category")])]),e._v(" "),e.selectedMenu.name?t("div",{staticClass:"p-4 rounded-md bg-white"},[t("h4",{staticClass:"text-xl font-medium mb-4"},[e._v("Menu Items")]),e._v(" "),e._l(e.selectedMenu.menus,(function(n){return t("div",{staticClass:"p-3 border-2 border-gray-400 rounded bg-white mb-3"},[t("button",{staticClass:"float-right bg-gray-500 rounded p-2 px-6 font-bold uppercase text-white",on:{click:function(t){return e.deleteMenuItem(n)}}},[t("i",{staticClass:"fal fa-trash-alt"})]),e._v(" "),t("button",{staticClass:"float-right ml-6 bg-gray-500 rounded p-2 px-6 font-bold uppercase text-white mr-2",on:{click:function(t){return e.editMenuItem(n)}}},[e._v("Edit")]),e._v(" "),t("h4",{staticClass:"font-bold text-lg"},[e._v(e._s(n.name)+" - $"+e._s(n.price))]),e._v(" "),t("p",{staticClass:"text-gray-600"},[e._v(e._s(n.description))])])})),e._v(" "),t("button",{staticClass:"bg-blue-500 rounded p-2 px-4 font-bold uppercase text-white",on:{click:function(n){return e.newMenuItem(e.selectedMenu.menus)}}},[t("i",{staticClass:"fas fa-plus"})])],2):e._e()])])])],1)}),[],!1,null,"6c764922",null);n.default=component.exports},267:function(e,n){var t={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"subscription",name:{kind:"Name",value:"getAllOrders"},variableDefinitions:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"pickup_orders"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"customer_name"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"customer_phone_number"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"confirmed"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"completed"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"order_items"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"menu_item"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"description"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"price"},arguments:[],directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"notes"},arguments:[],directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"order_items_aggregate"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"aggregate"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"count"},arguments:[],directives:[]}]}}]}}]}}]}}],loc:{start:0,end:336}};t.loc.source={body:"subscription getAllOrders {\r\n  pickup_orders {\r\n    id\r\n    customer_name\r\n    customer_phone_number\r\n    confirmed\r\n    completed\r\n    order_items {\r\n      menu_item {\r\n        name\r\n        description\r\n        price\r\n      }\r\n      notes\r\n    }\r\n    order_items_aggregate {\r\n      aggregate {\r\n        count\r\n      }\r\n    }\r\n  }\r\n}\r\n",name:"GraphQL request",locationOffset:{line:1,column:1}};var r={};function o(e,n){for(var i=0;i<e.definitions.length;i++){var element=e.definitions[i];if(element.name&&element.name.value==n)return element}}t.definitions.forEach((function(e){if(e.name){var n=new Set;!function e(n,t){if("FragmentSpread"===n.kind)t.add(n.name.value);else if("VariableDefinition"===n.kind){var r=n.type;"NamedType"===r.kind&&t.add(r.name.value)}n.selectionSet&&n.selectionSet.selections.forEach((function(n){e(n,t)})),n.variableDefinitions&&n.variableDefinitions.forEach((function(n){e(n,t)})),n.definitions&&n.definitions.forEach((function(n){e(n,t)}))}(e,n),r[e.name.value]=n}})),e.exports=t,e.exports.getAllOrders=function(e,n){var t={kind:e.kind,definitions:[o(e,n)]};e.hasOwnProperty("loc")&&(t.loc=e.loc);var d=r[n]||new Set,c=new Set,l=new Set;for(d.forEach((function(e){l.add(e)}));l.size>0;){var m=l;l=new Set,m.forEach((function(e){c.has(e)||(c.add(e),(r[e]||new Set).forEach((function(e){l.add(e)})))}))}return c.forEach((function(n){var r=o(e,n);r&&t.definitions.push(r)})),t}(t,"getAllOrders")},280:function(e,n){var t={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"confirmOrder"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"ID"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"update_pickup_orders"},arguments:[{kind:"Argument",name:{kind:"Name",value:"where"},value:{kind:"ObjectValue",fields:[{kind:"ObjectField",name:{kind:"Name",value:"id"},value:{kind:"ObjectValue",fields:[{kind:"ObjectField",name:{kind:"Name",value:"_eq"},value:{kind:"Variable",name:{kind:"Name",value:"ID"}}}]}}]}},{kind:"Argument",name:{kind:"Name",value:"_set"},value:{kind:"ObjectValue",fields:[{kind:"ObjectField",name:{kind:"Name",value:"confirmed"},value:{kind:"BooleanValue",value:!0}}]}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"affected_rows"},arguments:[],directives:[]}]}}]}}],loc:{start:0,end:138}};t.loc.source={body:"mutation confirmOrder($ID: Int) {\r\n  update_pickup_orders(where: {id: {_eq: $ID}}, _set: {confirmed: true}) {\r\n    affected_rows\r\n  }\r\n}\r\n",name:"GraphQL request",locationOffset:{line:1,column:1}};var r={};function o(e,n){for(var i=0;i<e.definitions.length;i++){var element=e.definitions[i];if(element.name&&element.name.value==n)return element}}t.definitions.forEach((function(e){if(e.name){var n=new Set;!function e(n,t){if("FragmentSpread"===n.kind)t.add(n.name.value);else if("VariableDefinition"===n.kind){var r=n.type;"NamedType"===r.kind&&t.add(r.name.value)}n.selectionSet&&n.selectionSet.selections.forEach((function(n){e(n,t)})),n.variableDefinitions&&n.variableDefinitions.forEach((function(n){e(n,t)})),n.definitions&&n.definitions.forEach((function(n){e(n,t)}))}(e,n),r[e.name.value]=n}})),e.exports=t,e.exports.confirmOrder=function(e,n){var t={kind:e.kind,definitions:[o(e,n)]};e.hasOwnProperty("loc")&&(t.loc=e.loc);var d=r[n]||new Set,c=new Set,l=new Set;for(d.forEach((function(e){l.add(e)}));l.size>0;){var m=l;l=new Set,m.forEach((function(e){c.has(e)||(c.add(e),(r[e]||new Set).forEach((function(e){l.add(e)})))}))}return c.forEach((function(n){var r=o(e,n);r&&t.definitions.push(r)})),t}(t,"confirmOrder")},281:function(e,n){var t={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"complateOrder"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"ID"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"update_pickup_orders"},arguments:[{kind:"Argument",name:{kind:"Name",value:"where"},value:{kind:"ObjectValue",fields:[{kind:"ObjectField",name:{kind:"Name",value:"id"},value:{kind:"ObjectValue",fields:[{kind:"ObjectField",name:{kind:"Name",value:"_eq"},value:{kind:"Variable",name:{kind:"Name",value:"ID"}}}]}}]}},{kind:"Argument",name:{kind:"Name",value:"_set"},value:{kind:"ObjectValue",fields:[{kind:"ObjectField",name:{kind:"Name",value:"completed"},value:{kind:"BooleanValue",value:!0}}]}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"affected_rows"},arguments:[],directives:[]}]}}]}}],loc:{start:0,end:139}};t.loc.source={body:"mutation complateOrder($ID: Int) {\r\n  update_pickup_orders(where: {id: {_eq: $ID}}, _set: {completed: true}) {\r\n    affected_rows\r\n  }\r\n}\r\n",name:"GraphQL request",locationOffset:{line:1,column:1}};var r={};function o(e,n){for(var i=0;i<e.definitions.length;i++){var element=e.definitions[i];if(element.name&&element.name.value==n)return element}}t.definitions.forEach((function(e){if(e.name){var n=new Set;!function e(n,t){if("FragmentSpread"===n.kind)t.add(n.name.value);else if("VariableDefinition"===n.kind){var r=n.type;"NamedType"===r.kind&&t.add(r.name.value)}n.selectionSet&&n.selectionSet.selections.forEach((function(n){e(n,t)})),n.variableDefinitions&&n.variableDefinitions.forEach((function(n){e(n,t)})),n.definitions&&n.definitions.forEach((function(n){e(n,t)}))}(e,n),r[e.name.value]=n}})),e.exports=t,e.exports.complateOrder=function(e,n){var t={kind:e.kind,definitions:[o(e,n)]};e.hasOwnProperty("loc")&&(t.loc=e.loc);var d=r[n]||new Set,c=new Set,l=new Set;for(d.forEach((function(e){l.add(e)}));l.size>0;){var m=l;l=new Set,m.forEach((function(e){c.has(e)||(c.add(e),(r[e]||new Set).forEach((function(e){l.add(e)})))}))}return c.forEach((function(n){var r=o(e,n);r&&t.definitions.push(r)})),t}(t,"complateOrder")},296:function(e,n,t){var content=t(416);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,t(36).default)("648fc7b8",content,!0,{sourceMap:!1})},415:function(e,n,t){"use strict";var r=t(296);t.n(r).a},416:function(e,n,t){(n=t(35)(!1)).push([e.i,".pendingBlock[data-v-6c764922]{height:20px;width:20px;border-radius:20px;margin-right:10px}[data-v-6c764922]::-webkit-scrollbar{width:12px}[data-v-6c764922]::-webkit-scrollbar-track{background:#edf2f7;border-radius:10px}[data-v-6c764922]::-webkit-scrollbar-thumb{border-radius:10px;background:#a0aec0}.container[data-v-6c764922]{margin:0 auto;max-width:960px}",""]),e.exports=n}}]);