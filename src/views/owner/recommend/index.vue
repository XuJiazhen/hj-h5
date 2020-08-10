<template>
  <div class="recommend">
    <div class="banner">
      <span>请填写下面的表格</span>
    </div>
    <div class="card">
      <div class="form-item">
        <div class="icon">
          <i class="iconfont icon-jianzhu" />
        </div>
        <span class="title">意向楼盘<span class="required">*</span></span>
        <span class="placeholder">{{ project ? project : '请选择意向楼盘' }}</span>
        <i v-if="!project" class="iconfont icon-jiantou_liebiaoxiangyou" />
      </div>

      <div class="form-item">
        <div class="icon">
          <i class="iconfont icon-gerentouxiang" />
        </div>
        <span class="title">客户姓名<span class="required">*</span></span>
        <input type="text" placeholder="请输入客户姓名" v-model="userName" />
      </div>

      <div class="form-item">
        <div class="icon">
          <i class="iconfont icon-shouji" />
        </div>
        <span class="title">手机号码<span class="required">*</span></span>
        <input type="text" placeholder="请输入手机号码" v-model="phoneNumber" />
      </div>
    </div>

    <div class="card">
      <div class="form-item" @click="onSelectGender">
        <div class="icon">
          <i class="iconfont icon-gerentouxiang" />
        </div>
        <span class="title">性别</span>
        <span class="placeholder">{{ gender ? gender : '请选择性别' }}</span>
        <i class="iconfont icon-jiantou_liebiaoxiangyou" />
      </div>

      <div class="form-item" @click="onPickDate">
        <div class="icon">
          <i class="iconfont icon-rili" />
        </div>
        <span class="title">预约日期</span>
        <span class="placeholder">{{ date ? date : '请选择预约日期' }}</span>
        <i class="iconfont icon-jiantou_liebiaoxiangyou" />
      </div>
    </div>

    <button class="submit">提交</button>

    <v-overlay :value="overlay" :dark="false">
      <v-date-picker class="date-picker" v-model="date" no-title color="var(--main-bg-color)" @change="onDateChange"></v-date-picker>
      <v-btn icon @click="overlay = false" color="#ffffff">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-overlay>

    <v-bottom-sheet v-model="sheet">
      <v-sheet class="text-center" height="100px">
        <v-radio-group v-model="gender" :mandatory="false">
          <v-radio style="margin: 10px auto;" label="男" value="男"></v-radio>
          <v-radio style="margin: 10px auto;" label="女" value="女"></v-radio>
        </v-radio-group>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script>
  export default {
    name: 'Recommend',
    data() {
      return {
        project: '南方花园',
        userName: '',
        phoneNumber: '',
        gender: '',
        date: '',
        remark: '',
        overlay: false,
        sheet: false,
      };
    },
    methods: {
      onPickDate() {
        this.overlay = true;
      },
      onOverlayClick() {
        this.overlay = false;
      },
      onDateChange() {
        this.overlay = false;
      },
      onSelectGender() {
        this.sheet = true;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .recommend {
    overflow: scroll;
    height: calc(100vh - 55px);

    input {
      border: none;
      text-align: right;

      &::placeholder {
        color: #808080;
      }
    }

    .banner {
      width: 100%;
      height: 55px;
      line-height: 55px;
      text-align: center;
      background-color: #ffffff;
      font-size: 18px;
    }

    .card {
      width: 95%;
      margin: 10px auto;
      background-color: #ffffff;
      border-radius: 3px;
      display: flex;
      flex-direction: column;

      .form-item {
        box-sizing: border-box;
        border-bottom: 1px solid #f4f4f4;
        height: 55px;
        display: flex;
        align-items: center;
        padding: 10px 15px;

        .icon-jiantou_liebiaoxiangyou {
          font-size: 28px;
          color: #808080;
        }

        .placeholder {
          color: #808080;
        }

        .title {
          flex: 1;

          .required {
            color: red;
            height: 100%;
          }
        }

        .icon {
          width: 35px;
          height: 35px;
          background-color: var(--main-bg-color);
          color: #ffffff;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 3px;
          margin-right: 5px;
        }
      }

      .form-item:last-child {
        border-bottom: none;
      }
    }

    button.submit {
      display: block;
      width: 95%;
      margin: 20px auto;
      border: none;
      height: 55px;
      background-color: var(--main-bg-color);
      color: #ffffff;
      text-align: center;
      line-height: 55px;
      box-sizing: border-box;
      border-radius: 3px;
    }
  }
</style>

<style lang="scss">
  .recommend {
    .v-overlay__content {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
</style>
