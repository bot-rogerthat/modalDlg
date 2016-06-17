class ModalDlg {
    constructor(title, message, ...buttons) {
        this.title = title;
        this.message = message;
        this.buttons = buttons;
        this.selector = $('<div>');
        this.overlay = $('<div>');
    }

    show() {
        this.createDialog();
        this.createOverlay();
        this.createButtons();

        $('.overlay').fadeIn(200, function () {
            $('.dialog').css('display', 'block').animate({opacity: 1, top: '50%'}, 100);
        });
        $('.overlay').on('click', this.hide);
    }

    hide() {
        $('.dialog').animate({opacity: 0, top: '45%'}, 100, function () {
            $('.dialog').css('display', 'none');
            $('.overlay').fadeOut(100);
            $('div.dialog').empty();
            $('div.dialog').remove();
            $('div.overlay').remove();
        });
    }

    createDialog() {
        this.selector.addClass('dialog');
        this.selector.appendTo('body');
        $('<h1>').html(this.title).appendTo(this.selector);
        $('<p>').text(this.message).appendTo(this.selector);
    }

    createOverlay() {
        this.overlay.addClass('overlay');
        this.overlay.appendTo('body');
    }

    createButtons() {
        var dlg = this.selector;
        var self = this;
        $.each(this.buttons, function (i, val) {
            $('<button/>').text(val.title).on('click', function () {
                val.func();
                self.hide();
            }).addClass('modalDlgButton').appendTo(dlg);
        });
    }
}


