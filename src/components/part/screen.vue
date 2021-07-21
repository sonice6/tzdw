<template>
  <div class="screen">
    <div class="screenBox">
      <el-select v-model="value" placeholder="设备类型">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="screachBox">
        <el-input v-model="input" placeholder='' onkeyup="this.value=this.value.replace(/\s+/g,'')"></el-input>
        <i class="el-icon-search"></i>
    </div>

  </div>
</template>

<script>
export default {
     data() {
      return {
        options: [{
          value: 'workWell',
          label: '检查井（工井）'
        },
        {
          value: 'pipeline',
          label: '管道'
        }, {
          value: 'cableFurrow',
          label: '电缆沟'
        }, {
          value: 'cableBridge',
          label: '电缆桥'
        }, {
          value: 'tunnel',
          label: '隧道'
        }],
        value: '',
        input: ''
      }
    }
}
</script>

<style>
.screen{
    width: 400px;
    height: 50px;
}
.screenBox{
    width: 120px;
    float: left;
    margin-right: 9%;
}
.screachBox{
    width: 240px;
    float: left;
    position: relative;
}
.el-icon-search{
    font-size: 20px;
    color: #989898;
    position: absolute;
    top: 11px;
    right: 8px;
    cursor:pointer;
}

</style>