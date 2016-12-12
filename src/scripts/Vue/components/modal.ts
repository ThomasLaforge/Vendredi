let template = `<!-- template for the modal component -->
<script type="x/template" id="modal-template">
    <div class="modal-mask" @click="close" v-show="show" transition="modal">
        <div class="modal-container" @click.stop>
            <div class="modal-header">
                <h3>New Post</h3>
            </div>

            <div class="modal-body">
                <label class="form-label">
                    Title
                    <input v-model="title" class="form-control">
                </label>
                <label class="form-label">
                    Body
                    <textarea v-model="body" rows="5" class="form-control"></textarea>
                </label>
            </div>

            <div class="modal-footer text-right">
                <button class="modal-default-button" @click="savePost()">
                    Save
                </button>
            </div>
        </div>
    </div>
</script>`

const modal = {
  template: '#modal-template',
  props: ['show'],
  data: function () {
  	return {
        title: '',
        body: ''
    };
  },
  methods: {
    close: function () {
      this.show = false;
      this.title = '';
      this.body = '';
    },
    savePost: function () {
      // Insert AJAX call here...
      this.close();
    }
  },
  ready: function () {
    document.addEventListener("keydown", (e) => {
      if (this.show && e.keyCode == 27) {
        this.close();
      }
    });
  }
};

// new Vue({
//   el: '#app',
//   data: {
//     showModal: false
//   }
// });

// <!-- app -->
// <div id="app">
//     <modal :show.sync="showModal"></modal>
//     <button id="show-modal" @click="showModal = true">New Post</button>
// </div>

export { modal }