<template>
  <div class="recommend">
    <div class="re-title">
      <span>请填写下面的表格</span>
    </div>
    <div class="re-card">
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
        <input type="text" placeholder="请输入客户姓名" v-model="name" />
      </div>

      <div class="form-item">
        <div class="icon">
          <i class="iconfont icon-shouji" />
        </div>
        <span class="title">手机号码<span class="required">*</span></span>
        <input type="number" placeholder="请输入手机号码" v-model="phone" />
      </div>
    </div>

    <div class="re-card">
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

    <button class="submit" @click="onClick">提交</button>

    <v-overlay :value="overlay" :dark="false">
      <v-date-picker
        class="date-picker"
        v-model="date"
        no-title
        color="var(--main-bg-color)"
        @change="onDateChange"
        :first-day-of-week="0"
        locale="zh-cn"
      ></v-date-picker>
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

    <v-snackbar v-model="snackbar" timeout="1000" top :color="color" centered>{{ message }}</v-snackbar>
  </div>
</template>

<script>
  import { submitForm } from '@/api/recommend.js';
  export default {
    name: 'Recommend',
    data() {
      return {
        project: '香和·南方花园',
        name: '',
        phone: '',
        gender: '',
        date: '',
        remark: '',
        overlay: false,
        sheet: false,
        snackbar: false,
        message: '',
        color: '',
        valid: false,
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
      onClick() {
        const formData = {
          bind_project: this.project === '香和·南方花园' ? 1 : 0,
          customer_name: this.name,
          customer_phone: this.phone,
          sex: this.gender,
          plan_time: this.date,
        };
        for (let key in formData) {
          if (formData[key] !== '') {
            this.valid = true;
          } else {
            this.message = '请填写所有信息';
            this.color = 'error';
            this.snackbar = true;
            return;
          }
        }
        this.submit(formData);
      },
      async submit(data) {
        if (this.valid) {
          if (!/^1[3-9]\d{9}$/.test(data.customer_phone)) {
            this.message = '请填写正确的手机号';
            this.color = 'error';
            this.snackbar = true;
            return;
          }
          try {
            const res = await submitForm(data);
            if (res && res.status === 200) {
              this.name = '';
              this.phone = '';
              this.gender = '';
              this.date = '';
              this.message = '推荐成功';
              this.color = 'success';
              this.snackbar = true;
            }
          } catch (error) {
            console.log(error);
            this.message = '推荐失败';
            this.color = 'error';
            this.snackbar = true;
          }
        } else {
          return;
        }
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
      height: 100%;
      outline: none;

      &::placeholder {
        color: #808080;
      }
    }

    .re-title {
      width: 100%;
      height: 56px;
      line-height: 56px;
      text-align: center;
      background-color: #ffffff;
      font-size: 18px;
    }

    .re-card {
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
    .v-snack__content {
      text-align: center;
    }
  }
</style>
