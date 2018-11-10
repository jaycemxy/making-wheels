class Dialog {
    constructor(options){
        this.options = options;
        this.init();
    }
    get template() {
      let { title, content } = this.options
      return `
            <div class="joyceDialog">
              <div class="joyceDialog-wrapper">
                <header class="joyceDialog-header">${title}</header>
                <main class="joyceDialog-main">${content}</main>
                <footer class="joyceDialog-footer"></footer>
              </div>
            </div>
        `
    }
    generateButtons() {
      let { buttons } = this.options
      let $buttons = buttons.map((buttonOption) => {
            let $b = $('<button></button>');
            $b.text(buttonOption.text);
            $b.on('click', buttonOption.action);
            return $b
        })
      return $buttons
    }
    init() {
        var $dialog = $(this.template)
        $dialog.find('footer').append(this.generateButtons())
        this.$dialog = $dialog
    }
    open() {
        this.$dialog.appendTo('body')
    }
    close() {
        this.$dialog.detach()
    }
}

/* 使用 */
x.onclick = function() {
  var dialog = new Dialog({
    title: '消息提示',
    content: '2018年已经过去大半，还不努力？？！',
    buttons: [{
      text: '继续努力',
      action: function(){
        setTimeout(() => {
          dialog.close();
        })
      }
    },{
      text: '轻易放弃',
      action: function(){
        dialog.close();
      }
    }]
  })
  dialog.open()
}