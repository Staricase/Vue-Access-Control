(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d21ab96"],{bd75:function(e,t,n){"use strict";n.r(t);var i={};n.r(i),n.d(i,"request",(function(){return l})),n.d(i,"addAdmin",(function(){return d})),n.d(i,"remove",(function(){return c})),n.d(i,"edit",(function(){return u})),n.d(i,"notAllowed",(function(){return m}));var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}]},[n("div",{staticClass:"operation"},[n("el-button",{directives:[{name:"has",rawName:"v-has",value:[e.account.request],expression:"[account.request]"}],attrs:{size:"small",type:"primary"},on:{click:e.fetchData}},[e._v("刷新")]),n("el-button",{attrs:{size:"small",type:"success"},on:{click:function(t){e.dialogFormVisible=!0}}},[e._v("新增")])],1),n("el-table",{staticStyle:{width:"100%"},attrs:{data:e.list,border:""}},[n("el-table-column",{attrs:{prop:"name",label:"账号",width:"150"}}),n("el-table-column",{attrs:{prop:"role",label:"角色",width:"100"}}),n("el-table-column",{attrs:{prop:"id",label:"ID",width:"200"}}),n("el-table-column",{attrs:{prop:"createTime",label:"创建时间",formatter:e.formateDate}}),n("el-table-column",{attrs:{label:"操作",width:"300",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{directives:[{name:"has",rawName:"v-has",value:[e.account.edit],expression:"[account.edit]"}],attrs:{size:"mini",type:"info"},on:{click:function(n){return e.editAdmin(t.row.id)}}},[e._v("编辑")]),n("el-button",{directives:[{name:"has",rawName:"v-has",value:[e.account.remove],expression:"[account.remove]"}],attrs:{size:"mini",type:"danger"},on:{click:function(n){return e.askDelete(t.row.id)}}},[e._v("删除")])]}}])})],1),n("el-dialog",{attrs:{title:"新增管理员",visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[n("add-admin",{on:{insertAdmin:e.insertNewAdmin}})],1),n("el-dialog",{attrs:{title:"编辑管理员",visible:e.editFormVisible},on:{"update:visible":function(t){e.editFormVisible=t}}},[n("add-admin",{attrs:{adminInfo:e.selectedAdminInfo},on:{modifyPwd:e.modifyPwd}})],1)],1)},o=[],a=n("365c"),s="/admin",l={p:["post,/accounts"],r:function(e){return a["a"].post("".concat(s,"/page"),e)}},d={p:["post,/accounts/**"],r:function(e){return a["a"].post("".concat(s,"/add"),e)}},c={p:["post,/account/**"],r:function(e){return a["a"].post("".concat(s,"/delete"),e)}},u={p:["post,/account/**"],r:function(e){return a["a"].post("".concat(s,"/update"),e)}},m={p:["get,/roles/notAllowed"],r:function(e){return a["a"].get("".concat(s,"/roles/notAllowed"),{params:e})}},f=n("3da7"),p=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,"status-icon":"",rules:e.rules,"label-width":"100px"}},[n("el-form-item",{attrs:{label:"用户名",prop:"name"}},[n("el-input",{attrs:{disabled:1==e.isDisabled},model:{value:e.ruleForm.name,callback:function(t){e.$set(e.ruleForm,"name",t)},expression:"ruleForm.name"}})],1),n("el-form-item",{attrs:{label:"密码",prop:"pass"}},[n("el-input",{attrs:{type:"password",autocomplete:"off","show-password":""},model:{value:e.ruleForm.pass,callback:function(t){e.$set(e.ruleForm,"pass",t)},expression:"ruleForm.pass"}})],1),n("el-form-item",{attrs:{label:"确认密码",prop:"checkPass"}},[n("el-input",{attrs:{type:"password",autocomplete:"off","show-password":""},model:{value:e.ruleForm.checkPass,callback:function(t){e.$set(e.ruleForm,"checkPass",t)},expression:"ruleForm.checkPass"}})],1),n("el-form-item",[n("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm")}}},[e._v("提交")]),n("el-button",{on:{click:function(t){return e.resetForm("ruleForm")}}},[e._v("重置")])],1)],1)},h=[],b={data:function(){var e=this,t=function(e,t,n){""===t&&n(new Error("用户名不能为空")),n()},n=function(t,n,i){""===n?i(new Error("请输入密码")):(""!==e.ruleForm.checkPass&&e.$refs.ruleForm.validateField("checkPass"),i())},i=function(t,n,i){""===n?i(new Error("请再次输入密码")):n!==e.ruleForm.pass?i(new Error("两次输入密码不一致!")):i()};return{ruleForm:{pass:this.adminInfo?this.adminInfo.password:"",checkPass:this.adminInfo?this.adminInfo.password:"",name:this.adminInfo?this.adminInfo.name:""},rules:{pass:[{validator:n,trigger:"blur"}],checkPass:[{validator:i,trigger:"blur"}],name:[{validator:t,trigger:"blur"}]}}},props:["adminInfo"],computed:{isDisabled:function(){return this.ruleForm={pass:this.adminInfo?this.adminInfo.password:"",checkPass:this.adminInfo?this.adminInfo.password:"",name:this.adminInfo?this.adminInfo.name:""},this.adminInfo?1:0}},methods:{submitForm:function(e){var t=this,n=this;this.$refs[e].validate((function(i){if(!i)return console.log("error submit!!"),!1;n.$loading=!0,t.adminInfo?u.r({password:t.ruleForm.pass,id:t.adminInfo.id}).then((function(e){t.$message.success("密码修改成功"),n.$loading=!1,n.adminInfo.password=n.ruleForm.pass,t.$emit("modifyPwd",n.adminInfo)}),f["b"]):d.r({name:t.ruleForm.name,fullName:t.ruleForm.name,password:t.ruleForm.pass}).then((function(n){t.$message.success("添加成功"),t.$loading=!1,t.$refs[e].resetFields(),t.$emit("insertAdmin",n.data.result)}),f["b"])}))},resetForm:function(e){this.$refs[e].resetFields()}}},v=b,w=n("2877"),F=Object(w["a"])(v,p,h,!1,null,"09090a1c",null),g=F.exports,I={data:function(){return{account:i}}},k={components:{addAdmin:g},mixins:[I],data:function(){return{canReset:!1,list:[],loading:!1,dialogFormVisible:!1,editFormVisible:!1,selectedAdminInfo:null}},methods:{fetchData:function(){var e=this;e.loading=!0,l.r().then((function(t){e.list=t.data.result.data.reverse(),e.loading=!1})).catch((function(t){e.loading=!1,f["b"](t)}))},editAdmin:function(e){var t=this.list.find((function(t){return t.id==e}));this.selectedAdminInfo=t,this.editFormVisible=!0},modifyPwd:function(e){var t=this.list.findIndex((function(t){return t.id==e.id}));this.list.splice(t,1,e),this.editFormVisible=!1},insertNewAdmin:function(e){var t=this;t.list.splice(0,0,e),t.dialogFormVisible=!1},requestNotAllowed:function(){m.r()},formateDate:function(e,t,n,i){return f["d"](n,"MM/dd hh:mm")},askDelete:function(e){var t=this;t.$confirm("确定删除?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"info"}).then((function(){t.deleteAdmin(e)})).catch((function(){}))},deleteAdmin:function(e){var t=this;t.$loading=!0,c.r({id:e}).then((function(n){t.$loading=!1;var i=t.list.findIndex((function(t){return t.id==e}));t.list.splice(i,1)}),f["b"])}},created:function(){this.fetchData()}},$=k,A=Object(w["a"])($,r,o,!1,null,"628a9bf3",null);t["default"]=A.exports}}]);
//# sourceMappingURL=chunk-2d21ab96.4d1f2d86.js.map