import * as i0 from '@angular/core';
import { NgModule, EventEmitter, Directive, ViewChild, Input, Output } from '@angular/core';
import { TagInputModule } from 'ngx-chips';

class NgxEmailComposerModule {
}
NgxEmailComposerModule.ɵfac = function NgxEmailComposerModule_Factory(t) { return new (t || NgxEmailComposerModule)(); };
NgxEmailComposerModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: NgxEmailComposerModule });
NgxEmailComposerModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [[
            TagInputModule
        ]] });
(function () {
    (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NgxEmailComposerModule, [{
            type: NgModule,
            args: [{
                    declarations: [],
                    imports: [
                        TagInputModule
                    ],
                    exports: []
                }]
        }], null, null);
})();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(NgxEmailComposerModule, { imports: [TagInputModule] }); })();

const _c0 = ["emailInputBox"];
const _c1 = ["emailBody"];
function isValidEmail(control) {
    const value = control.value;
    const re = /\S+@\S+\.\S+/;
    if (re.test(value)) {
        return null;
    }
    return {
        'isValidEmail': true
    };
}
function display_name(text) {
    /* Remove all quotes
       Remove whitespace, brackets, and commas from the ends. */
    return text.replace(/(^[\s,>]+)|"|([\s,<]+$)/g, '');
}
const EmailPattern = /[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*/g;
/**
 * Parses the given string into an array of email entries.
 * Each entry is like user<user@gmail.com>
 * @param addr_list
 */
function parseEmails(addr_list) {
    /* Regex source:
        https://html.spec.whatwg.org/multipage/forms.html#valid-e-mail-address
    */
    const emails = [];
    let idx = 0;
    let match;
    while (match = EmailPattern.exec(addr_list)) {
        let display;
        if (display = display_name(addr_list.substring(idx, match['index']))) {
            emails.push('"' + display + '" ' + '<' + match[0] + '>');
        }
        else {
            emails.push(match[0]);
        }
        idx = match['index'] + match[0].length;
    }
    return emails;
}
/**
 * Parses the given string into a list of email entries.
 * Each entry is just an email.
 * @param addr_list
 */
function parseOnlyEmails(addr_list) {
    const emails = [];
    let match;
    while (match = EmailPattern.exec(addr_list)) {
        emails.push(match[0]);
    }
    return emails;
}
var AlertTypeEnum;
(function (AlertTypeEnum) {
    AlertTypeEnum[AlertTypeEnum["none"] = 0] = "none";
    AlertTypeEnum[AlertTypeEnum["info"] = 1] = "info";
    AlertTypeEnum[AlertTypeEnum["warning"] = 2] = "warning";
    AlertTypeEnum[AlertTypeEnum["running"] = 3] = "running";
    AlertTypeEnum[AlertTypeEnum["success"] = 4] = "success";
    AlertTypeEnum[AlertTypeEnum["error"] = 5] = "error";
})(AlertTypeEnum || (AlertTypeEnum = {}));
class EmailFormAbstractComponent {
    constructor() {
        this.onTextChange = new EventEmitter();
        this.onSubmit = new EventEmitter();
        this.onSent = new EventEmitter();
        this.validators = [isValidEmail];
        this.errorMessages = {
            'isValidEmail': 'Please input a valid email'
        };
        this.messageTitle = '';
        this.emails = [];
        this.messageBody = '';
        this.disableFocusEvent = false;
    }
    get isSubmitDisabled() {
        return this.emails.length === 0 || this.alertType === AlertTypeEnum.running;
    }
    textChanged(evt) {
        this.showCloseBtn = false;
        this.onTextChange.emit(evt);
    }
    otherFieldChanged() {
        this.showCloseBtn = false;
    }
    submit() {
        const emails = [];
        this.emails.forEach(elem => {
            let x = elem || (elem.value);
            const y = parseOnlyEmails(x);
            y.forEach(m => {
                emails.push(m);
            });
        });
        const outputs = {
            confirmed: true,
            emailReceivers: emails,
            emailBody: this.messageBody,
            emailTitle: this.messageTitle
        };
        if (this.sender) {
            this.alertType = AlertTypeEnum.running;
            this.alertMessage = 'The email is being sent out ...';
            this.alertSubMessage = '';
            this.alertDismissible = false;
            this.sender(outputs).then(() => {
                this.alertType = AlertTypeEnum.info;
                this.alertMessage = 'Emails have been successfully sent out.';
                this.alertDismissible = true;
                this.showCloseBtn = true;
                this.onSent && this.onSent.emit({ success: true });
            }, (error) => {
                this.alertType = AlertTypeEnum.error;
                this.alertMessage = 'Something went wrong.';
                this.alertDismissible = true;
                this.alertSubMessage = (error && error.errorInfo) ? error.errorInfo : '';
                this.onSent && this.onSent.emit({ success: false });
            });
        }
        this.onSubmit && this.onSubmit.emit(outputs);
    }
    onOutOfTagInput(evt) {
        if (this.emailInputBox.dropdown && this.emailInputBox.dropdown.isVisible) {
            return;
        }
        if (this.disableFocusEvent) {
            return;
        }
        evt.preventDefault();
        evt.stopPropagation();
        // A tempory hack for fixing the focus issue
        // on invoking the onAddingRequested method ...
        const emails = parseEmails(this.emailInputBox.formValue);
        emails.forEach(v => {
            this.emails.push(v);
        });
        this.emailInputBox.setInputValue('');
        // Jump to other place
        this.disableFocusEvent = true;
        if (this.emailBody && this.emailBody.nativeElement) {
            this.emailBody.nativeElement.focus();
        }
        else if (this.emailBody && this.emailBody.focus) {
            this.emailBody.focus();
        }
        this.disableFocusEvent = false;
    }
}
EmailFormAbstractComponent.ɵfac = function EmailFormAbstractComponent_Factory(t) { return new (t || EmailFormAbstractComponent)(); };
EmailFormAbstractComponent.ɵdir = /*@__PURE__*/ i0.ɵɵdefineDirective({ type: EmailFormAbstractComponent, viewQuery: function EmailFormAbstractComponent_Query(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵviewQuery(_c0, 5);
            i0.ɵɵviewQuery(_c1, 5);
        }
        if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.emailInputBox = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.emailBody = _t.first);
        }
    }, inputs: { messageTitle: "messageTitle", messageBody: "messageBody", autocompleteItemsAsync: "autocompleteItemsAsync", sender: "sender" }, outputs: { onTextChange: "onTextChange", onSubmit: "onSubmit", onSent: "onSent" } });
(function () {
    (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(EmailFormAbstractComponent, [{
            type: Directive
        }], function () { return []; }, { emailInputBox: [{
                type: ViewChild,
                args: ['emailInputBox']
            }], emailBody: [{
                type: ViewChild,
                args: ['emailBody']
            }], messageTitle: [{
                type: Input
            }], messageBody: [{
                type: Input
            }], autocompleteItemsAsync: [{
                type: Input
            }], sender: [{
                type: Input
            }], onTextChange: [{
                type: Output
            }], onSubmit: [{
                type: Output
            }], onSent: [{
                type: Output
            }] });
})();

/*
 * Public API Surface of ngx-email-composer
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AlertTypeEnum, EmailFormAbstractComponent, NgxEmailComposerModule, isValidEmail, parseEmails, parseOnlyEmails };
//# sourceMappingURL=polpware-ngx-email-composer.mjs.map
