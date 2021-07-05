<style scoped></style>

<template>
  <el-form
    :model="ruleForm"
    status-icon
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item label="用户名" prop="name">
      <el-input v-model="ruleForm.name" :disabled="isDisabled == 1"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pass">
      <el-input
        type="password"
        v-model="ruleForm.pass"
        autocomplete="off"
        show-password
      ></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPass">
      <el-input
        type="password"
        v-model="ruleForm.checkPass"
        autocomplete="off"
        show-password
      ></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import * as account from "../api/account";
import { catchError } from "../assets/util";

export default {
  data() {
    var checkName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("用户名不能为空"));
      }
      callback();
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: this.adminInfo ? this.adminInfo.password : "",
        checkPass: this.adminInfo ? this.adminInfo.password : "",
        name: this.adminInfo ? this.adminInfo.name : "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        name: [{ validator: checkName, trigger: "blur" }],
      },
    };
  },

  props: ["adminInfo"],

  computed: {
    isDisabled() {
      //   alert(this.adminInfo.name);
      this.ruleForm = {
        pass: this.adminInfo ? this.adminInfo.password : "",
        checkPass: this.adminInfo ? this.adminInfo.password : "",
        name: this.adminInfo ? this.adminInfo.name : "",
      };
      if (this.adminInfo) return 1;
      return 0;
    },
  },

  methods: {
    submitForm(formName) {
      let vm = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //   alert("submit!");
          vm.$loading = true;
          if (this.adminInfo) {
            //edit api
            account.edit
              .r({ password: this.ruleForm.pass, id: this.adminInfo.id })
              .then((resp) => {
                this.$message.success("密码修改成功");
                vm.$loading = false;
                vm.adminInfo.password = vm.ruleForm.pass;

                this.$emit("modifyPwd", vm.adminInfo);
              }, catchError);
          } else {
            account.addAdmin
              .r({
                name: this.ruleForm.name,
                fullName: this.ruleForm.name,
                password: this.ruleForm.pass,
              })
              .then((resp) => {
                this.$message.success("添加成功");
                this.$loading = false;
                this.$refs[formName].resetFields();

                this.$emit("insertAdmin", resp.data.result);
              }, catchError);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
