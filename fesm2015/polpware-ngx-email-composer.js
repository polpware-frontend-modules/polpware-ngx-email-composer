import { ɵɵdefineNgModule, ɵɵdefineInjector, ɵɵsetNgModuleScope, ɵsetClassMetadata, NgModule, ɵɵdefineDirective, ɵɵviewQuery, ɵɵqueryRefresh, ɵɵloadQuery } from '@angular/core';
import { TagInputModule } from 'ngx-chips';

class NgxEmailComposerModule {
}
NgxEmailComposerModule.ɵmod = ɵɵdefineNgModule({ type: NgxEmailComposerModule });
NgxEmailComposerModule.ɵinj = ɵɵdefineInjector({ factory: function NgxEmailComposerModule_Factory(t) { return new (t || NgxEmailComposerModule)(); }, imports: [[
            TagInputModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(NgxEmailComposerModule, { imports: [TagInputModule] }); })();
/*@__PURE__*/ (function () { ɵsetClassMetadata(NgxEmailComposerModule, [{
        type: NgModule,
        args: [{
                declarations: [],
                imports: [
                    TagInputModule
                ],
                exports: []
            }]
    }], null, null); })();

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
class EmailFormAbstractComponent {
    constructor() {
        this.validators = [isValidEmail];
        this.errorMessages = {
            'isValidEmail': 'Please input a valid email'
        };
        this.title = 'Send out an email';
        this.emails = [];
        this.messageBody = '';
        this.disableFocusEvent = false;
    }
    get isSubmitDisabled() {
        return this.emails.length === 0;
    }
    onOutOfTagInput(evt) {
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
        this.emailBody.nativeElement.focus();
        this.disableFocusEvent = false;
    }
}
EmailFormAbstractComponent.ɵfac = function EmailFormAbstractComponent_Factory(t) { return new (t || EmailFormAbstractComponent)(); };
EmailFormAbstractComponent.ɵdir = ɵɵdefineDirective({ type: EmailFormAbstractComponent, viewQuery: function EmailFormAbstractComponent_Query(rf, ctx) { if (rf & 1) {
        ɵɵviewQuery(_c0, true);
        ɵɵviewQuery(_c1, true);
    } if (rf & 2) {
        var _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.emailInputBox = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.emailBody = _t.first);
    } } });

/*
 * Public API Surface of ngx-email-composer
 */

/**
 * Generated bundle index. Do not edit.
 */

export { EmailFormAbstractComponent, NgxEmailComposerModule, parseEmails, parseOnlyEmails };
//# sourceMappingURL=polpware-ngx-email-composer.js.map
