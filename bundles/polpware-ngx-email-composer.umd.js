(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('ngx-chips')) :
    typeof define === 'function' && define.amd ? define('@polpware/ngx-email-composer', ['exports', '@angular/core', 'ngx-chips'], factory) :
    (global = global || self, factory((global.polpware = global.polpware || {}, global.polpware['ngx-email-composer'] = {}), global.ng.core, global.ngxChips));
}(this, (function (exports, core, ngxChips) { 'use strict';

    var NgxEmailComposerModule = /** @class */ (function () {
        function NgxEmailComposerModule() {
        }
        NgxEmailComposerModule.ɵmod = core.ɵɵdefineNgModule({ type: NgxEmailComposerModule });
        NgxEmailComposerModule.ɵinj = core.ɵɵdefineInjector({ factory: function NgxEmailComposerModule_Factory(t) { return new (t || NgxEmailComposerModule)(); }, imports: [[
                    ngxChips.TagInputModule
                ]] });
        return NgxEmailComposerModule;
    }());
    (function () { (typeof ngJitMode === "undefined" || ngJitMode) && core.ɵɵsetNgModuleScope(NgxEmailComposerModule, { imports: [ngxChips.TagInputModule] }); })();
    /*@__PURE__*/ (function () { core.ɵsetClassMetadata(NgxEmailComposerModule, [{
            type: core.NgModule,
            args: [{
                    declarations: [],
                    imports: [
                        ngxChips.TagInputModule
                    ],
                    exports: []
                }]
        }], null, null); })();

    var _c0 = ["emailInputBox"];
    var _c1 = ["emailBody"];
    function isValidEmail(control) {
        var value = control.value;
        var re = /\S+@\S+\.\S+/;
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
    var EmailPattern = /[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*/g;
    /**
     * Parses the given string into an array of email entries.
     * Each entry is like user<user@gmail.com>
     * @param addr_list
     */
    function parseEmails(addr_list) {
        /* Regex source:
            https://html.spec.whatwg.org/multipage/forms.html#valid-e-mail-address
        */
        var emails = [];
        var idx = 0;
        var match;
        while (match = EmailPattern.exec(addr_list)) {
            var display = void 0;
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
        var emails = [];
        var match;
        while (match = EmailPattern.exec(addr_list)) {
            emails.push(match[0]);
        }
        return emails;
    }
    var EmailFormAbstractComponent = /** @class */ (function () {
        function EmailFormAbstractComponent() {
            this.validators = [isValidEmail];
            this.errorMessages = {
                'isValidEmail': 'Please input a valid email'
            };
            this.title = 'Send out an email';
            this.emails = [];
            this.messageBody = '';
            this.disableFocusEvent = false;
        }
        Object.defineProperty(EmailFormAbstractComponent.prototype, "isSubmitDisabled", {
            get: function () {
                return this.emails.length === 0;
            },
            enumerable: true,
            configurable: true
        });
        EmailFormAbstractComponent.prototype.onOutOfTagInput = function (evt) {
            var _this = this;
            if (this.disableFocusEvent) {
                return;
            }
            evt.preventDefault();
            evt.stopPropagation();
            // A tempory hack for fixing the focus issue
            // on invoking the onAddingRequested method ...
            var emails = parseEmails(this.emailInputBox.formValue);
            emails.forEach(function (v) {
                _this.emails.push(v);
            });
            this.emailInputBox.setInputValue('');
            // Jump to other place
            this.disableFocusEvent = true;
            this.emailBody.nativeElement.focus();
            this.disableFocusEvent = false;
        };
        EmailFormAbstractComponent.ɵfac = function EmailFormAbstractComponent_Factory(t) { return new (t || EmailFormAbstractComponent)(); };
        EmailFormAbstractComponent.ɵdir = core.ɵɵdefineDirective({ type: EmailFormAbstractComponent, viewQuery: function EmailFormAbstractComponent_Query(rf, ctx) { if (rf & 1) {
                core.ɵɵviewQuery(_c0, true);
                core.ɵɵviewQuery(_c1, true);
            } if (rf & 2) {
                var _t;
                core.ɵɵqueryRefresh(_t = core.ɵɵloadQuery()) && (ctx.emailInputBox = _t.first);
                core.ɵɵqueryRefresh(_t = core.ɵɵloadQuery()) && (ctx.emailBody = _t.first);
            } } });
        return EmailFormAbstractComponent;
    }());

    exports.EmailFormAbstractComponent = EmailFormAbstractComponent;
    exports.NgxEmailComposerModule = NgxEmailComposerModule;
    exports.parseEmails = parseEmails;
    exports.parseOnlyEmails = parseOnlyEmails;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=polpware-ngx-email-composer.umd.js.map
