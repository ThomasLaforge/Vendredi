let template = `
<div class="modal-mask" @click="close" v-show="show" transition="modal">
    <div class="modal-container" @click.stop>
        <slot></slot>
    </div>
</div>
`

const modal = {
  template: template,
  props: ['show', 'onClose'],
  methods: {
    close: function () {
      this.onClose();
    }
  }
};

export { modal }