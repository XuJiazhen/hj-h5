<template>
  <div class="report">
    <div class="banner">
      <span>请如实认证您的业主身份</span>
    </div>

    <v-form class="form" v-model="valid" ref="form">
      <v-text-field class="form-item" v-model="name" :counter="6" :rules="nameRules" label="姓名" required outlined />
      <v-text-field class="form-item" v-model="phone" :counter="11" :rules="phoneRules" label="电话" required outlined />
      <div class="form-item tower">
        <v-text-field class="tower-item" v-model="building" :counter="1" :rules="buildingRules" required outlined label="几栋" />
        <v-text-field class="tower-item" v-model="level" :counter="2" :rules="levelRules" required outlined label="几层" />
        <v-text-field class="tower-item" v-model="room" :counter="2" :rules="roomRules" required outlined label="几号" />
      </div>
    </v-form>

    <v-snackbar v-model="snackbar" timeout="1000" top :color="color" centered>{{ message }}</v-snackbar>

    <button class="submit" @click="onSubmitClick">提交</button>
  </div>
</template>

<script>
  import { getAuthInfo } from '@/api/user.js';
  import { submitForm } from '@/api/validate.js';

  export default {
    name: 'Report',
    data() {
      return {
        name: '',
        nameRules: [(v) => !!v || '请输入姓名', (v) => (v && v.length <= 6) || '姓名不得大于六个字符'],
        phone: '',
        phoneRules: [(v) => !!v || '请输入手机号', (v) => /^1[3-9]\d{9}$/.test(v) || '请输入正确的手机号'],
        building: '',
        buildingRules: [(v) => !!v || '请输入所在栋数'],
        level: '',
        levelRules: [(v) => !!v || '请输入所在楼层数'],
        room: '',
        roomRules: [(v) => !!v || '请输入所在房间号'],
        valid: true,
        message: '',
        color: '',
        snackbar: false,
        code: null,
      };
    },
    methods: {
      async onSubmitClick() {
        if (this.valid) {
          const room = this.getRoomId(this.level, this.room);
          const formData = {
            building_id: this.building,
            room_id: room,
            cellphone: this.phone,
            realname: this.name,
          };
          console.log('FORM DATA: ', formData);

          try {
            const res = await submitForm(formData);
            console.log('RESPONSE: ', res);
            if (res && res.status !== 200) {
              this.message = res.data.msg;
              this.color = 'error';
              this.snackbar = true;
              return;
            }
            this.message = '验证成功';
            this.color = 'success';
            this.snackbar = true;

            this.$store.dispatch('userRegistered', res.data);
            this.$router.replace('/owner');
          } catch (error) {
            console.log(error);
          }
        }
      },
      getRoomId(levelId, roomId) {
        if (roomId.toString().length < 2) {
          roomId = `0${roomId}`;
        }
        return `${levelId}${roomId}`;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .report {
    overflow: hidden;
    background-color: #ffffff;

    input {
      border: none;
      text-align: right;
      height: 100%;
      outline: none;

      &::placeholder {
        color: #808080;
      }
    }

    .banner {
      width: 100%;
      padding: 15px 0;
      text-align: center;
      background-color: #ffffff;
      font-size: 18px;
      border-bottom: 10px solid var(--main-border-color);
    }

    .form {
      background-color: var(--white);
      width: 95%;
      margin: 10px auto;
      border-radius: 3px;

      .form-item {
        margin: 0;
      }

      .form-item.tower {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        .tower-item {
          margin: 0 3px;
          border-radius: 3px;
        }
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
