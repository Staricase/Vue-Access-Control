<style scoped>

</style>

<template>
  <el-row>
    <el-col :span="6">
      <!-- <dashboard-goods v-if="$_has([goods.request])" /> -->
      <dashboard-goods/>
    </el-col>
  </el-row>
</template>

<script>
import * as goods from '../api/goods';
import DashboardGoods from '../components/dashboard-goods.vue';

let myMixin = {
  data: function() {
    return { goods }
  }
}

export default {
  mixins: [myMixin],
  data() {
    return {
      
    }
  },
  components:{
    'dashboard-goods':  () => import('../components/dashboard-goods.vue')
  },
  methods: {
    
  },
  created() {
    
  }
};
</script>
