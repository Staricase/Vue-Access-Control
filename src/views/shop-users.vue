<style scoped></style>

<template>
  <div v-loading="loading">
    <!-- 操作 -->
    <div class="operation">
      <el-button
        size="small"
        type="primary"
        v-has="[account.request]"
        @click="fetchData"
        >刷新</el-button
      >
      <el-button size="small" type="success" @click="dialogFormVisible = true"
        >新增</el-button
      >
    </div>
    <!-- table start  -->
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="name" label="账号" width="150"> </el-table-column>
      <!-- <el-table-column prop="role" label="角色" width="100"> </el-table-column> -->
      <el-table-column prop="id" label="ID" width="200"> </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        :formatter="formateDate"
      ></el-table-column>
      <!-- <el-table-column label="角色">
        <template slot-scope="scope">
          <el-tag
            type="success"
            style="margin:0 .5em .5em 0"
            v-for="role in scope.row.roles"
            :key="role.id"
            >{{ role.name }}</el-tag
          >
        </template>
      </el-table-column> -->
      <!-- <el-table-column label="状态" width="80" align="center">
        <template slot-scope="scope">
          <template v-if="scope.row.suspended">
            <span style="color:#ff4949">已禁用</span>
          </template>
          <template v-else>
            <span style="color:#13ce66">已启用</span>
          </template>
        </template>
      </el-table-column> -->
      <el-table-column label="操作" width="300" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="info"
            v-has="[account.edit]"
            @click="editAdmin(scope.row.id)"
            >编辑</el-button
          >

          <!-- <el-button size="mini" type="warning" v-has="[account.edit]"
            >重置密码</el-button
          > -->
          <el-button
            size="mini"
            type="danger"
            v-has="[account.remove]"
            @click="askDelete(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- table end  -->

    <el-dialog title="新增店员账号" :visible.sync="dialogFormVisible">
      <add-admin v-on:insertAdmin="insertNewAdmin" />
    </el-dialog>

    <el-dialog
      title="编辑店员账号"
      :visible.sync="editFormVisible"
      :before-close="closeEdit"
    >
      <add-admin
        :adminInfo="selectedAdminInfo"
        :dataInit="dataInit"
        v-on:modifyPwd="modifyPwd"
      />
    </el-dialog>
  </div>
</template>

<script>
import * as account from "../api/shopuser";
import * as util from "../assets/util";
import addAdmin from "./add-user.vue";

let myMixin = {
  data: function() {
    return { account };
  },
};
export default {
  components: {
    addAdmin,
  },
  mixins: [myMixin],
  data() {
    return {
      canReset: false,
      list: [],
      loading: false,
      dialogFormVisible: false,
      editFormVisible: false,
      selectedAdminInfo: null,
      dataInit: false,
    };
  },
  methods: {
    fetchData() {
      let vm = this;
      vm.loading = true;
      account.request
        .r()
        .then((res) => {
          vm.list = res.data.result.data.reverse();
          vm.loading = false;
        })
        .catch((err) => {
          vm.loading = false;
          util.catchError(err);
        });
    },

    editAdmin(info) {
      const user = this.list.find((user) => {
        return user.id == info;
      });
      this.dataInit = false;
      this.selectedAdminInfo = user;
      this.editFormVisible = true;
      let vm = this;
      this.$nextTick(() => {
        vm.dataInit = true;
      });
    },

    modifyPwd(user) {
      const index = this.list.findIndex((info) => {
        return info.id == user.id;
      });
      this.list.splice(index, 1, user);
      this.editFormVisible = false;
    },

    closeEdit(done) {
    //   this.dataInit = false;
      done();
    },

    insertNewAdmin(info) {
      let vm = this;
      vm.list.splice(0, 0, info);
      vm.dialogFormVisible = false;
    },

    formateDate(row, col, value, index) {
      return util.formatDate(value, "MM/dd hh:mm");
    },

    askDelete(uid) {
      let vm = this;
      vm.$confirm("确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info",
      })
        .then(() => {
          vm.deleteAdmin(uid);
        })
        .catch(() => {});
    },

    deleteAdmin(uid) {
      let vm = this;
      vm.$loading = true;
      account.remove.r({ id: uid }).then((resp) => {
        vm.$loading = false;
        const index = vm.list.findIndex((info) => {
          return info.id == uid;
        });
        vm.list.splice(index, 1);
      }, util.catchError);
    },
  },
  created() {
    this.fetchData();
  },
};
</script>
