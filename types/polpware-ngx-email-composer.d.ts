import * as i0 from '@angular/core';
import { EventEmitter } from '@angular/core';
import * as i1 from 'ngx-chips';
import { TagInputComponent } from 'ngx-chips';
import { Observable } from 'rxjs';

declare class NgxEmailComposerModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NgxEmailComposerModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NgxEmailComposerModule, never, [typeof i1.TagInputModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NgxEmailComposerModule>;
}

declare function isValidEmail(control: {
    value: any;
}): {
    isValidEmail: boolean;
};
/**
 * Parses the given string into an array of email entries.
 * Each entry is like user<user@gmail.com>
 * @param addr_list
 */
declare function parseEmails(addr_list: string): any[];
/**
 * Parses the given string into a list of email entries.
 * Each entry is just an email.
 * @param addr_list
 */
declare function parseOnlyEmails(addr_list: string): any[];
interface IAutoCompleteModel {
    value: any;
    display: string;
}
declare enum AlertTypeEnum {
    none = 0,
    info = 1,
    warning = 2,
    running = 3,
    success = 4,
    error = 5
}
interface IEmailSenderInput {
    confirmed?: boolean;
    emailReceivers?: string[];
    emailBody?: string;
    emailTitle?: string;
    succeed?: boolean;
}
interface IEmailComposerInput {
    messageTitle?: string;
    messageBody?: string;
    autocompleteItemsAsync: Observable<Array<IAutoCompleteModel>>;
    emails?: Array<any>;
}
declare abstract class EmailFormAbstractComponent {
    emailInputBox: TagInputComponent;
    emailBody: any;
    messageTitle: string;
    messageBody: string;
    autocompleteItemsAsync: Observable<Array<IAutoCompleteModel>>;
    sender: (a: IEmailSenderInput) => Promise<any>;
    onTextChange: EventEmitter<any>;
    onSubmit: EventEmitter<IEmailSenderInput>;
    onSent: EventEmitter<{
        success: boolean;
    }>;
    alertMessage: string;
    alertSubMessage: string;
    alertType: AlertTypeEnum;
    alertDismissible: boolean;
    emails: Array<any>;
    validators: (typeof isValidEmail)[];
    errorMessages: {
        isValidEmail: string;
    };
    showCloseBtn: boolean;
    private disableFocusEvent;
    constructor();
    get isSubmitDisabled(): boolean;
    textChanged(evt: any): void;
    otherFieldChanged(): void;
    submit(): void;
    onOutOfTagInput(evt: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<EmailFormAbstractComponent, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<EmailFormAbstractComponent, never, never, { "messageTitle": { "alias": "messageTitle"; "required": false; }; "messageBody": { "alias": "messageBody"; "required": false; }; "autocompleteItemsAsync": { "alias": "autocompleteItemsAsync"; "required": false; }; "sender": { "alias": "sender"; "required": false; }; }, { "onTextChange": "onTextChange"; "onSubmit": "onSubmit"; "onSent": "onSent"; }, never, never, true, never>;
}

export { AlertTypeEnum, EmailFormAbstractComponent, NgxEmailComposerModule, isValidEmail, parseEmails, parseOnlyEmails };
export type { IAutoCompleteModel, IEmailComposerInput, IEmailSenderInput };
//# sourceMappingURL=polpware-ngx-email-composer.d.ts.map
