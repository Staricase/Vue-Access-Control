<style scoped></style>

<template>
  <div v-loading="loading">
    <!-- 操作 -->
    <div class="operation">
      <el-button
        size="small"
        type="primary"
        v-has="[goods.request]"
        @click="fetchData"
        >查询</el-button
      >
      <el-button size="small" type="primary" @click="addNewGood"
        >新增</el-button
      >

      <!-- <el-button size="small" type="primary" @click="importFromFile"
        >导入xls</el-button
      > -->
      <div><br /></div>
      <el-upload
        size="small"
        class="upload-goods"
        action
        :http-request="importFromFile"
        :on-change="handleChange"
        :file-list="fileList"
        :before-upload="validateFile"
      >
        <el-button size="small" type="primary">导入xls</el-button>
        <div slot="tip" class="el-upload__tip">
          只能上传xls/xlsx文件
        </div>
      </el-upload>

      <!-- <el-button size="small" v-if="$_has([goods.request]) && canReset">重置</el-button> -->
      <!-- <el-button size="small" type="info" @click="requestNotAllowed">尝试发起越权请求</el-button> -->
    </div>
    <!-- list -->
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="fruitId" label="商品编号" width="120">
      </el-table-column>
      <el-table-column prop="fruitName" label="商品名称"> </el-table-column>
      <!-- <el-table-column prop="pinyin" label="拼音识别码"> -->
      <!-- </el-table-column> -->
      <!-- <el-table-column prop="barcode" label="条形码"> -->
      <!-- </el-table-column> -->
      <el-table-column prop="fruitLevel" label="等级" width="60">
      </el-table-column>
      <el-table-column prop="fruitFrom" label="产地"> </el-table-column>
      <el-table-column prop="fruitUnit" label="计价单位"> </el-table-column>
      <el-table-column prop="fruitPrice" label="价格"> </el-table-column>
      <el-table-column prop="fruitVipPrice" label="会员价格"> </el-table-column>
      <el-table-column prop="fruitPrePrice" label="促销信息"> </el-table-column>

      <el-table-column
        prop="createTime"
        label="创建时间"
        align="center"
        width="120"
        :formatter="formateDate"
      ></el-table-column>

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="info" @click="editGood(scope.row.id)"
            >编辑</el-button
          >

          <el-button size="mini" type="danger" @click="askDelete(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- table end  -->

    <el-dialog title="新增商品信息" :visible.sync="dialogFormVisible">
      <add-goods v-on:insertGoods="insertNewGoods" />
    </el-dialog>

    <el-dialog title="编辑商品信息" :visible.sync="editFormVisible">
      <add-goods
        :goodInfo="selectedGoodInfo"
        :dataInit="dataInit"
        v-on:modifyGoods="modifyGoods"
      />
    </el-dialog>
  </div>
</template>

<script>
import * as goods from "../api/goods";
import * as util from "../assets/util";
import addGoods from "./add-goods.vue";

let myMixin = {
  data: function() {
    return { goods };
  },
};

export default {
  components: { addGoods },
  mixins: [myMixin],
  data() {
    return {
      list: [],
      loading: false,
      canReset: false,
      dialogFormVisible: false,
      editFormVisible: false,
      selectedGoodInfo: null,
      dataInit: false,
      fileList: [],
    };
  },
  methods: {
    fetchData: function() {
      let vm = this;
      vm.loading = true;
      goods.request.r(vm.queryParam).then((res) => {
        vm.list = res.data.result.reverse();
        vm.loading = false;
      });
    },

    importFromFile(params) {
      let vm = this;
      const form = new FormData();
      form.append("file", params.file);
      goods.importFile.r(form).then((resp) => {
        vm.fileList = [];
        vm.$message.success("上传成功");
        vm.fetchData();
      }, util.catchError);
    },

    validateFile(file) {
      if (
        file.type ==
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.type == "application/vnd.ms-excel"
      ) {
        return true;
      }
      this.$message.warning("请上传xls/xlsx类型的文件");
      return false;
    },

    handleChange(file, filelist) {
      this.fileList = filelist;
    },

    insertNewGoods(goods) {
      let vm = this;
      vm.list.splice(0, 0, goods);
      vm.dialogFormVisible = false;
    },

    modifyGoods(goods) {
      const index = this.list.findIndex((info) => {
        return info.id == goods.id;
      });
      this.list.splice(index, 1, goods);
      this.editFormVisible = false;
    },

    requestNotAllowed: function() {
      goods.notAllowed.r();
    },
    formateDate(row, col, value, index) {
      return util.formatDate(value, "MM/dd hh:mm");
    },
    addNewGood() {
      this.dialogFormVisible = true;
    },

    editGood(goodsId) {
      const item = this.list.find((info) => {
        return info.id == goodsId;
      });
      this.dataInit = false;
      this.selectedGoodInfo = item;
      this.editFormVisible = true;
      let vm = this;
      this.$nextTick(() => {
        vm.dataInit = true;
      });
    },

    askDelete(item) {
      let vm = this;
      vm.$confirm("确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info",
      })
        .then(() => {
          vm.deleteGood(item);
        })
        .catch(() => {});
    },
    deleteGood(item) {
      let vm = this;
      vm.$loading = true;
      goods.remove.r({ id: item }).then((resp) => {
        vm.$loading = false;
        const index = vm.list.findIndex((info) => {
          return info.id == item;
        });
        vm.list.splice(index, 1);
        vm.$message.success("删除成功");
      }, util.catchError);
    },
  },
  created() {
    this.fetchData();
  },
};
</script>
