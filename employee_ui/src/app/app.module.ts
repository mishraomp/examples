import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TreeTableModule } from 'primeng/treetable';
import { DialogModule } from 'primeng/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { PaginatorModule } from 'primeng/paginator';
import { routing } from './app.routing';
import { EmployeeComponent } from './employee/employee.component';
import {AccordionModule} from 'primeng/accordion';
import {MenuItem} from 'primeng/api';
@NgModule({
    declarations: [
        AppComponent,
        EmployeeComponent
    ],
    imports: [
        AccordionModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        TableModule,
        HttpClientModule,
        InputTextModule,
        DialogModule,
        ReactiveFormsModule,
        ButtonModule,
        TreeTableModule,
        PaginatorModule,
        routing
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
