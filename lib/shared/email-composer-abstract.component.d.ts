import { ElementRef, EventEmitter } from '@angular/core';
import { TagInputComponent } from 'ngx-chips';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
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
export declare function parseEmails(addr_list: string): any[];
/**
 * Parses the given string into a list of email entries.
 * Each entry is just an email.
 * @param addr_list
 */
export declare function parseOnlyEmails(addr_list: string): any[];
export interface IAutoCompleteModel {
    value: any;
    display: string;
}
export declare enum AlertTypeEnum {
    none = 0,
    info = 1,
    warning = 2,
    running = 3,
    success = 4,
    error = 5
}
export interface IEmailSenderInput {
    confirmed?: boolean;
    emailReceivers?: string[];
    emailBody?: string;
    emailTitle?: string;
    succeed?: boolean;
}
export declare abstract class EmailFormAbstractComponent {
    emailInputBox: TagInputComponent;
    emailBody: ElementRef;
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
    private disableFocusEvent;
    constructor();
    get isSubmitDisabled(): boolean;
    submit(): void;
    onOutOfTagInput(evt: any): void;
    static ɵfac: i0.ɵɵFactoryDef<EmailFormAbstractComponent, never>;
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<EmailFormAbstractComponent, never, never, { "messageTitle": "messageTitle"; "messageBody": "messageBody"; "autocompleteItemsAsync": "autocompleteItemsAsync"; "sender": "sender"; }, { "onTextChange": "onTextChange"; "onSubmit": "onSubmit"; "onSent": "onSent"; }, never>;
}
export {};
