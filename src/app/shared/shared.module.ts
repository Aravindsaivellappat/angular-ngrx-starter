import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AccountService, AuthServiceProvider, Principal, HasAnyAuthorityDirective, EventManager } from './';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { WindowRef } from './util/window.service';

@NgModule({
    declarations: [HasAnyAuthorityDirective],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, NgbModule],
    providers: [AccountService, AuthServiceProvider, Principal, EventManager, WindowRef],
    exports: [FormsModule, ReactiveFormsModule, CommonModule, NgbModule]
})
export class AppSharedModule {}
