<style scoped></style>

<template>
  <el-form
    :model="ruleForm"
    status-icon
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
    size="small"
  >
    <el-form-item label="编号" prop="fruitId">
      <el-input v-model="ruleForm.fruitId"></el-input>
    </el-form-item>
    <el-form-item label="名称" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="产地" prop="from">
      <el-input v-model="ruleForm.from"></el-input>
    </el-form-item>
    <el-form-item label="等级" prop="level">
      <el-input v-model="ruleForm.level"></el-input>
    </el-form-item>
    <el-form-item label="计价单位" prop="unit">
      <el-input v-model="ruleForm.unit"></el-input>
    </el-form-item>
    <el-form-item label="价格" prop="price">
      <el-input v-model="ruleForm.price"></el-input>
    </el-form-item>
    <el-form-item label="会员价格" prop="vip-price">
      <el-input v-model="ruleForm.vip_price"></el-input>
    </el-form-item>
    <el-form-item label="促销信息" prop="promot">
      <el-input v-model="ruleForm.promotion"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import * as account from "../api/goods";
import { catchError } from "../assets/util";
import rolesVue from "./roles.vue";

export default {
  data() {
    var checkName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("商品名不能为空"));
      }
      callback();
    };

    var checkEmpty = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("此项不能为空"));
      }
      callback();
    };

    return {
      ruleForm: {
        name: this.goodInfo ? this.goodInfo.fruitName : "",
        from: this.goodInfo ? this.goodInfo.fruitFrom : "",
        level: this.goodInfo ? this.goodInfo.fruitLevel : "",
        unit: this.goodInfo ? this.goodInfo.fruitUnit : "",
        price: this.goodInfo ? this.goodInfo.fruitPrice : "",
        vip_price: this.goodInfo ? this.goodInfo.fruitVipPrice : "",
        promotion: this.goodInfo ? this.goodInfo.fruitPrePrice : "",
        fruitId: this.goodInfo ? this.goodInfo.fruitId : "",
      },
      rules: {
        name: [{ validator: checkName, trigger: "blur" }],
        fruitId: [{ validator: checkEmpty, trigger: "blur" }],
        from: [{ validator: checkEmpty, trigger: "blur" }],
        level: [{ validator: checkEmpty, trigger: "blur" }],
      },
    };
  },

  props: ["goodInfo", "dataInit"],

  computed: {
    isDisabled() {
      //   alert(this.adminInfo.name);
      this.ruleForm = {
        name: this.goodInfo ? this.goodInfo.fruitName : "",
        from: this.goodInfo ? this.goodInfo.fruitFrom : "",
        level: this.goodInfo ? this.goodInfo.fruitLevel : "",
        unit: this.goodInfo ? this.goodInfo.fruitUnit : "",
        price: this.goodInfo ? this.goodInfo.fruitPrice : "",
        vip_price: this.goodInfo ? this.goodInfo.fruitVipPrice : "",
        promotion: this.goodInfo ? this.goodInfo.fruitPrePrice : "",
        fruitId: this.goodInfo ? this.goodInfo.fruitId : "",
      };
      if (this.goodInfo) return 1;
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
          if (this.goodInfo) {
            //edit api
            account.edit
              .r({
                fruitName: this.ruleForm.name,
                fruitFrom: this.ruleForm.from,
                fruitLevel: this.ruleForm.level,
                fruitPrice: this.ruleForm.price,
                fruitVipPrice: this.ruleForm.vip_price,
                fruitPrePrice: this.ruleForm.promotion,
                fruitUnit: this.ruleForm.unit,
                fruitId: this.ruleForm.fruitId,
                id: this.goodInfo.id,
              })
              .then((resp) => {
                this.$message.success("信息修改成功");
                vm.$loading = false;
                vm.goodInfo.fruitName = vm.ruleForm.name;
                vm.goodInfo.fruitFrom = vm.ruleForm.from;
                vm.goodInfo.fruitLevel = vm.ruleForm.level;
                vm.goodInfo.fruitPrice = vm.ruleForm.price;
                vm.goodInfo.fruitVipPrice = vm.ruleForm.vip_price;
                vm.goodInfo.fruitPrePrice = vm.ruleForm.promotion;
                vm.goodInfo.fruitUnit = vm.ruleForm.unit;
                vm.goodInfo.fruitId = vm.ruleForm.fruitId;

                this.$emit("modifyGoods", vm.goodInfo);
              }, catchError);
          } else {
            account.add_good
              .r({
                fruitName: this.ruleForm.name,
                fruitFrom: this.ruleForm.from,
                fruitLevel: this.ruleForm.level,
                fruitPrice: this.ruleForm.price,
                fruitVipPrice: this.ruleForm.vip_price,
                fruitPrePrice: this.ruleForm.promotion,
                fruitUnit: this.ruleForm.unit,
                fruitId: this.ruleForm.fruitId,
              })
              .then((resp) => {
                this.$message.success("添加成功");
                this.$loading = false;
                this.$refs[formName].resetFields();

                this.$emit("insertGoods", resp.data.result);
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
