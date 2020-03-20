class Todo {
  constructor(id, comment, status) {
    this.id = id
    this.comment = comment
    this.status = status
  }

  setStatus(status) {
    this.status = status
  }

  sameStatus(status) {
    return this.status == status
  }
}

const app = new Vue({
  el: '#app',
  data: {
    todos: [],
    options: [
      {value: -1, label: 'all'},
      {value: 0, label: 'working'},
      {value: 1, label: 'done'}
    ],
    current: -1
  },
  computed: {
    computedTodos: function () {
      // curent: -1の場合は全て
      // それ以外の場合はフィルタリングして出力
      return this.todos.filter(function (item) {
        return this.current == -1 ? true : item.sameStatus(this.current)
      }, this)
    },
    labels: function () {
      return this.options.reduce(function (a, b) {
        return Object.assign(a, {[b.value]: b.label})
      }, {})
    }
  },
  methods: {
    doAdd: function (event, value) {
      let comment = this.$refs.comment

      if (!comment.value.length) return alert('1文字以上でコメントを入れてください')

      this.todos.push(new Todo(this.todos.length + 1, comment.value, 0))

      // フォーム初期化
      comment.value = null
    },
    doChangeState: function (item) {
      item.setStatus(item.status ? 0 : 1)
    },
    doRemove: function (item) {
      if (!confirm('削除しますか？')) return

      let index = this.todos.indexOf(item)
      this.todos.splice(index, 1)
    }
  },
  // 変更検知
  watch: {
    todos: {
      handler: function (todos) {
        // ここで保存処理
        // console.log(todos);
      },
      deep: true
    }
  },
  // ライフサイクルイベント 初期化
  created() {
    // ここで取得処理
    this.todos = [new Todo(1, 'init comment', 0)]
  }
})

