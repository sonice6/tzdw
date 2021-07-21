<template>
  <div class="tableE">
    <div class="table">
      <el-table
    :data="tableData"
    size = 'small'
    height = "100%"
    border
    >
    <el-table-column
      prop="ID"
       align='center'
       width="80"
      label="序号"
     >
      <!-- <template slot-scope="scope">

        <span style="margin-left: 10px">{{ scope.row.date }}</span>
      </template> -->
    </el-table-column>

    <el-table-column
      prop="lxname"
       align='center'
      label="路线名称"
      width="120">
    </el-table-column>
    <el-table-column
      prop="DYDJ"
       align='center'
      label="DYDJ">
    </el-table-column>
     <el-table-column
      prop="sbname"
       align='center'
      label="设备名称">
    </el-table-column>
     <el-table-column
      prop="sbstype"
       align='center'
      label="设备类型">
    </el-table-column>
     <el-table-column
      prop="checkpop"
       align='center'
      label="巡检人">
    </el-table-column>
     <el-table-column
      prop="syncstype"
       align='center'
      label="同步类型">
      <template slot-scope="scope">
        <el-button :type= "scope.row.syncstype == 1 ? 'success' : 'warning'" size="small"> {{scope.row.syncstype == 1 ? '已同步':"未同步" }}</el-button>
      </template>
    </el-table-column>
     <el-table-column
      prop="synctime"
       align='center'
      label="同步时间"
      width="180">
    </el-table-column>
     <el-table-column
      prop="oper"
       align='center'
      label="操作">
      <img src="../../assets/img/anthoer/shuaxintongbu.png" class="poer">
    </el-table-column>
  </el-table>
    </div>
    
  </div>
</template>

<script>
export default {
      data() {
        return {
          tableData: [{
          ID: '1',
          lxname: '南京路线110',
          DYDJ:"10QF",
          sbname:'西公园路南01',
          sbstype:"箱式变",
          checkpop:"张三",
          syncstype:'1',
          synctime:'2021-07-05 17:00:00',
          oper:''
        }, {
          ID: '2',
          lxname: '南京路线110',
          DYDJ:"10QF",
          sbname:'西公园路南01',
          sbstype:"箱式变",
          checkpop:"张三",
          syncstype:'2',
          synctime:'2021-07-05 17:00:00',
          oper:''
        }, {
          ID: '3',
          lxname: '南京路线110',
          DYDJ:"10QF",
          sbname:'西公园路南01',
          sbstype:"箱式变",
          checkpop:"张三",
          syncstype:'1',
          synctime:'2021-07-05 17:00:00',
          oper:''
        }, {
          ID: '4',
          lxname: '南京路线110',
          DYDJ:"10QF",
          sbname:'西公园路南01',
          sbstype:"箱式变",
          checkpop:"张三",
          syncstype:'2',
          synctime:'2021-07-05 17:00:00',
          oper:''
        }, {
          ID: '5',
          lxname: '南京路线110',
          DYDJ:"10QF",
          sbname:'西公园路南01',
          sbstype:"箱式变",
          checkpop:"张三",
          syncstype:'1',
          synctime:'2021-07-05 17:00:00',
          oper:''
        }, {
          ID: '6',
          lxname: '南京路线110',
          DYDJ:"10QF",
          sbname:'西公园路南01',
          sbstype:"箱式变",
          checkpop:"张三",
          syncstype:'2',
          synctime:'2021-07-05 17:00:00',
          oper:''
        }, {
          ID: '7',
          lxname: '南京路线110',
          DYDJ:"10QF",
          sbname:'西公园路南01',
          sbstype:"箱式变",
          checkpop:"张三",
          syncstype:'1',
          synctime:'2021-07-05 17:00:00',
          oper:''
        },{
          ID: '8',
          lxname: '南京路线110',
          DYDJ:"10QF",
          sbname:'西公园路南01',
          sbstype:"箱式变",
          checkpop:"张三",
          syncstype:'1',
          synctime:'2021-07-05 17:00:00',
          oper:''
        }, {
          ID: '9',
          lxname: '南京路线110',
          DYDJ:"10QF",
          sbname:'西公园路南01',
          sbstype:"箱式变",
          checkpop:"张三",
          syncstype:'2',
          synctime:'2021-07-05 17:00:00',
          oper:''
        }, {
          ID: '10',
          lxname: '南京路线110',
          DYDJ:"10QF",
          sbname:'西公园路南01',
          sbstype:"箱式变",
          checkpop:"张三",
          syncstype:'1',
          synctime:'2021-07-05 17:00:00',
          oper:''
        }, {
          ID: '11',
          lxname: '南京路线110',
          DYDJ:"10QF",
          sbname:'西公园路南01',
          sbstype:"箱式变",
          checkpop:"张三",
          syncstype:'2',
          synctime:'2021-07-05 17:00:00',
          oper:''
        }, {
          ID: '12',
          lxname: '南京路线110',
          DYDJ:"10QF",
          sbname:'西公园路南01',
          sbstype:"箱式变",
          checkpop:"张三",
          syncstype:'1',
          synctime:'2021-07-05 17:00:00',
          oper:''
        }]
        }
      }
}
</script>
<style lang="scss" scoped>
.tableE{
    width: 100%;
    height: 100%;
    margin: 0 auto;
    // background: rgb(222, 232, 235);
    overflow: hidden;
    padding-top: 6%;
    box-sizing: border-box;

    .table{
      width: 86%;
      height: 80%;
      // background: white;
      margin: 0 auto;
    }
    .poer{ //操作图标
      width:15%;
      height:15%;
    }
   ::v-deep .el-table__row{
      height: 47px;
      padding: 0 !important;
      margin: 0;
      // background: #D7ECFF;
    }
   ::v-deep .el-table th, .el-table tr{
      background: #D7ECFF;
      height: 50px;
    }
    ::v-deep .el-table--small td, .el-table--small th {
    padding:0;
    }
  //  ::v-deep .el-table__body{
  //     border: 2px rgb(233, 233, 233) solid;
  //     box-sizing: border-box;
  //   }
}
</style>
