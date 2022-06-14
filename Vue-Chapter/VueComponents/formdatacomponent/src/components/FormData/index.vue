<template>
  <div>
    <Form :model="model"
          :rules="rules"
          ref="form">
      <form-item label="用户名"
                 prop="username">
        <c-input v-model="model.username" />
      </form-item>
      <form-item label="密码"
                 prop="password">
        <c-input v-model="model.password" />
      </form-item>
    </Form>
    {{model}}
    <br />
    <button size="mini"
            @click="validateModel">submit</button>
  </div>
</template>

<script>
import { CInput, Form, FormItem } from './components'
import { Notice } from '@/components'
import { create } from '@/utils/tools'
export default {
  components: {
    CInput, Form, FormItem,
  },
  data() {
    return {
      model: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ required: true, message: "请输入用户名" }],
        password: [{ required: true, message: "请输入密码" }],
      },
    }
  },
  methods: {
    validateModel() {
      this.$refs.form.validate((valid, state) => {
        if (valid) {
          const notice = create(Notice, {
            title: "state",
            message: valid ? "登陆成功!" : "校验失败!",
            duration: 20000
          })

          console.log('ok', notice)

          notice.show()
          // console.log('xxx', valid)

        } else {
          console.log('error=>', state)
        }
      })
    }
  },
}
</script>

<style lang="scss" scoped>
</style>