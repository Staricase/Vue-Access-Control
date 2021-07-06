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
    <el-form-item label="用户权限">
      <el-checkbox
        :indeterminate="isIndeterminate"
        v-model="checkAll"
        @change="handleCheckAllChange"
        >全选</el-checkbox
      >
      <div style="margin: 15px 0;"></div>
      <el-checkbox-group
        v-model="checkedOptions"
        @change="handleCheckedPowerChange"
      >
        <el-checkbox
          v-for="option in userPower"
          :label="option"
          :key="option"
          >{{ option }}</el-checkbox
        >
      </el-checkbox-group>
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
import * as account from "../api/shopuser";
import { catchError } from "../assets/util";
const queryItem = "查看商品",
  addItem = "添加商品",
  modifyItem = "编辑商品",
  dropItem = "删除商品";
const authorityOptions = [queryItem, addItem, modifyItem, dropItem];
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

      checkAll: false,
      checkedOptions: [queryItem],
      userPower: authorityOptions,
      isIndeterminate: true,
      //   dataInit: false,
    };
  },

  props: ["adminInfo", "dataInit"],

  computed: {
    isDisabled() {
      //   alert(this.adminInfo.name);
      this.ruleForm = {
        pass: this.adminInfo ? this.adminInfo.password : "",
        checkPass: this.adminInfo ? this.adminInfo.password : "",
        name: this.adminInfo ? this.adminInfo.name : "",
      };
      if (this.adminInfo) {
        this.checkData();

        return 1;
      }
      return 0;
    },
  },

  methods: {
    checkData() {
      if (this.dataInit) {
        return;
      }
      this.checkedOptions = [];
      if (this.adminInfo.queryPower) {
        this.checkedOptions.push(queryItem);
      }
      if (this.adminInfo.addPower) {
        this.checkedOptions.push(addItem);
      }
      if (this.adminInfo.modifyPower) {
        this.checkedOptions.push(modifyItem);
      }
      if (this.adminInfo.dropPower) {
        this.checkedOptions.push(dropItem);
      }
      if (this.checkedOptions.length == this.userPower.length) {
        this.checkAll = true;
        this.isIndeterminate = false;
      } else {
        this.checkAll = false;
        this.isIndeterminate = true;
      }
    },

    checkValue(optionItem) {
      return this.checkedOptions.includes(optionItem)
        ? "BOOLEAN_TRUE"
        : "BOOLEAN_FALSE";
    },

    submitForm(formName) {
      let vm = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //   alert("submit!");
          vm.$loading = true;
          if (this.adminInfo) {
            //edit api
            account.edit
              .r({
                password: this.ruleForm.pass,
                id: this.adminInfo.id,

                queryPower: this.checkValue(queryItem),
                addPower: this.checkValue(addItem),
                modifyPower: this.checkValue(modifyItem),
                dropPower: this.checkValue(dropItem),
              })
              .then((resp) => {
                this.$message.success("信息修改成功");
                vm.$loading = false;
                vm.adminInfo.password = vm.ruleForm.pass;
                vm.adminInfo.queryPower = this.checkedOptions.includes(
                  queryItem
                );
                vm.adminInfo.addPower = this.checkedOptions.includes(addItem);
                vm.adminInfo.modifyPower = this.checkedOptions.includes(
                  modifyItem
                );
                vm.adminInfo.dropPower = this.checkedOptions.includes(dropItem);

                this.$emit("modifyPwd", vm.adminInfo);
              }, catchError);
          } else {
            account.addAdmin
              .r({
                name: this.ruleForm.name,
                fullName: this.ruleForm.name,
                password: this.ruleForm.pass,
                queryPower: this.checkValue(queryItem),
                addPower: this.checkValue(addItem),
                modifyPower: this.checkValue(modifyItem),
                dropPower: this.checkValue(dropItem),
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

    handleCheckAllChange(val) {
      this.checkedOptions = val ? authorityOptions : [];
      this.isIndeterminate = false;
    },

    handleCheckedPowerChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.userPower.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.userPower.length;
    },
  },
};
</script>
