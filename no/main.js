(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "+aPS":
/*!******************************************************************!*\
  !*** ./src/app/tasks/pages/panel-tasks/panel-tasks.component.ts ***!
  \******************************************************************/
/*! exports provided: PanelTasksComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PanelTasksComponent", function() { return PanelTasksComponent; });
/* harmony import */ var _components_main_table_main_table_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../components/main-table/main-table.component */ "Lx6T");
/* harmony import */ var _components_history_table_history_table_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/history-table/history-table.component */ "dGXp");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _services_tasks_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/tasks.service */ "2tJE");
/* harmony import */ var _services_chart_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/chart.service */ "jnhf");
/* harmony import */ var _components_main_controls_main_controls_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/main-controls/main-controls.component */ "Qw9e");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _components_chart_chart_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../components/chart/chart.component */ "Rmni");










function PanelTasksComponent_div_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "app-history-table", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("data", ctx_r0.CompleteTasks);
} }
class PanelTasksComponent {
    constructor(_servicio, _servicioGrafica) {
        this._servicio = _servicio;
        this._servicioGrafica = _servicioGrafica;
        this.TableCurrency = false;
        this.listTask = [];
        this.PendingTasks = [];
        this.CompleteTasks = [];
        this.idFristElement = "";
    }
    ngOnInit() {
        this.getTasks();
    }
    changeFilter(param) {
        if (param == "all") {
            this.CompleteTasks = this.listTask.filter((x) => x.completed !== false);
        }
        else if (param == "bajo") {
            this.CompleteTasks = this.listTask.filter((x) => x.completed !== false && x.durationS <= (30 * 60));
        }
        else if (param == "medio") {
            this.CompleteTasks = this.listTask.filter((x) => x.completed !== false && x.durationS > (30 * 60) && x.durationS <= (60 * 60));
        }
        else if (param == "alto") {
            this.CompleteTasks = this.listTask.filter((x) => x.completed !== false && x.durationS > (60 * 60));
        }
        this.HistoryTableComponent.updateHistoryTable(this.CompleteTasks);
    }
    getTasks() {
        this._servicio.getTasks().subscribe((data) => {
            this.listTask = [];
            data.forEach((x, index) => {
                const auxdat = x.payload.doc.data();
                const objTask = {
                    id: x.payload.doc.id,
                    description: auxdat.description,
                    durationS: auxdat.durationS,
                    timeS: auxdat.timeS,
                    completed: auxdat.completed,
                    orden: auxdat.orden,
                };
                if (index == 0) {
                    this.idFristElement = x.payload.doc.id;
                }
                if (auxdat.dateComplete != undefined) {
                    objTask.dateComplete = auxdat.dateComplete;
                }
                this.listTask.push(objTask);
                this.listTask.sort((a, b) => a.orden - b.orden);
            });
            this.PendingTasks = this.listTask.filter((x) => x.completed !== true);
            this.CompleteTasks = this.listTask.filter((x) => x.completed !== false);
            this.dataChart = this._servicioGrafica.organizedata(data);
            this.MainTableComponent.updateTable(this.PendingTasks);
        });
    }
    toogleTable(status) {
        this.TableCurrency = !status;
        if (!status) {
            this.MainTableComponent.updateTable(this.PendingTasks);
        }
        else {
            this.HistoryTableComponent.updateHistoryTable(this.CompleteTasks);
        }
    }
    deleteTask(task) {
        this._servicio.deleteTask(task);
        this.MainTableComponent.updateTable(this.PendingTasks);
    }
    completeTask(task) {
        task.completed = true;
        const f = new Date();
        task.dateComplete = f.getDate() + "-" + f.getMonth() + "-" + f.getFullYear();
        this._servicio.editTask(task);
        this.MainTableComponent.updateTable(this.PendingTasks).then(() => {
            this.MainTableComponent.updateTable(this.PendingTasks);
        }).catch((error) => {
            console.log(error);
        });
    }
    saveTask(task) {
        const newTask = task;
        task.orden = this.listTask.reduce((x, y) => { return (x.orden > y.orden) ? x : y; }).orden + 1;
        var result = this._servicio.saveTask(task).then(() => {
            this.MainTableComponent.updateTable(this.PendingTasks);
        }).catch((error) => {
            console.log(error);
        });
    }
    updateTime(task) { }
    editTask(task) {
        this._servicio.editTask(task).then((x) => {
            this.MainTableComponent.updateTable(this.PendingTasks);
        }).catch((error) => {
            console.log(error);
        });
    }
    editTaskfroModal(data) {
        let task;
        task = this.PendingTasks.filter((x) => x.id == data.id)[0];
        task.description = data.description;
        if (data.resultSelect !== "Personalizada") {
            task.timeS = parseInt(data.resultSelect);
            task.durationS = parseInt(data.resultSelect);
        }
        else {
            task.durationS = data.durationS;
        }
        this._servicio.editTask(task).then((x) => {
            this.MainTableComponent.updateTable(this.PendingTasks);
        }).catch((error) => {
            console.log(error);
        });
    }
}
PanelTasksComponent.ɵfac = function PanelTasksComponent_Factory(t) { return new (t || PanelTasksComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_services_tasks_service__WEBPACK_IMPORTED_MODULE_3__["TasksService"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_services_chart_service__WEBPACK_IMPORTED_MODULE_4__["ChartService"])); };
PanelTasksComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: PanelTasksComponent, selectors: [["app-PanelTasks"]], viewQuery: function PanelTasksComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_components_main_table_main_table_component__WEBPACK_IMPORTED_MODULE_0__["MainTableComponent"], 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_components_history_table_history_table_component__WEBPACK_IMPORTED_MODULE_1__["HistoryTableComponent"], 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.MainTableComponent = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.HistoryTableComponent = _t.first);
    } }, decls: 7, vars: 5, consts: [[3, "status", "newTaskEvent", "clickBtn", "changeFilter"], [3, "hidden"], [3, "data", "idFristElement", "deleteTaskEvent", "completeTaskEvent", "saveTaskEvent", "updateTimeEvent", "editTaskfroModal"], [4, "ngIf"], ["data", "dataChart"], [3, "data"]], template: function PanelTasksComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "app-main-controls", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("newTaskEvent", function PanelTasksComponent_Template_app_main_controls_newTaskEvent_0_listener($event) { return ctx.saveTask($event); })("clickBtn", function PanelTasksComponent_Template_app_main_controls_clickBtn_0_listener($event) { return ctx.toogleTable($event); })("changeFilter", function PanelTasksComponent_Template_app_main_controls_changeFilter_0_listener($event) { return ctx.changeFilter($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "app-main-table", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("deleteTaskEvent", function PanelTasksComponent_Template_app_main_table_deleteTaskEvent_2_listener($event) { return ctx.deleteTask($event); })("completeTaskEvent", function PanelTasksComponent_Template_app_main_table_completeTaskEvent_2_listener($event) { return ctx.completeTask($event); })("saveTaskEvent", function PanelTasksComponent_Template_app_main_table_saveTaskEvent_2_listener($event) { return ctx.editTask($event); })("updateTimeEvent", function PanelTasksComponent_Template_app_main_table_updateTimeEvent_2_listener($event) { return ctx.updateTime($event); })("editTaskfroModal", function PanelTasksComponent_Template_app_main_table_editTaskfroModal_2_listener($event) { return ctx.editTaskfroModal($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](4, PanelTasksComponent_div_4_Template, 2, 1, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](6, "app-chart", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("status", ctx.TableCurrency);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("hidden", ctx.TableCurrency);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("data", ctx.PendingTasks)("idFristElement", ctx.idFristElement);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.TableCurrency);
    } }, directives: [_components_main_controls_main_controls_component__WEBPACK_IMPORTED_MODULE_5__["MainControlsComponent"], _components_main_table_main_table_component__WEBPACK_IMPORTED_MODULE_0__["MainTableComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["NgIf"], _components_chart_chart_component__WEBPACK_IMPORTED_MODULE_7__["ChartComponent"], _components_history_table_history_table_component__WEBPACK_IMPORTED_MODULE_1__["HistoryTableComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwYW5lbC10YXNrcy5jb21wb25lbnQuc2NzcyJ9 */"] });


/***/ }),

/***/ "/Sa1":
/*!*****************************************************!*\
  !*** ./src/app/tasks/pipes/minutes-seconds.pipe.ts ***!
  \*****************************************************/
/*! exports provided: MinuteSecondsPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MinuteSecondsPipe", function() { return MinuteSecondsPipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

class MinuteSecondsPipe {
    transform(value) {
        let minutes = Math.floor(value / 60);
        let segundos = value - minutes * 60;
        let horas = Math.floor(minutes / 60);
        minutes = minutes - horas * 60;
        if (horas > 0) {
            return horas + ':' + minutes + ':' + segundos;
        }
        else {
            return minutes + ':' + segundos;
        }
    }
}
MinuteSecondsPipe.ɵfac = function MinuteSecondsPipe_Factory(t) { return new (t || MinuteSecondsPipe)(); };
MinuteSecondsPipe.ɵpipe = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefinePipe"]({ name: "minuteSeconds", type: MinuteSecondsPipe, pure: true });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\Usuario\Proyectos\cargamos\task-manager\src\main.ts */"zUnb");


/***/ }),

/***/ "065y":
/*!***********************************************!*\
  !*** ./src/app/tasks/tasks-routing.module.ts ***!
  \***********************************************/
/*! exports provided: TasksRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TasksRoutingModule", function() { return TasksRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _pages_panel_tasks_panel_tasks_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pages/panel-tasks/panel-tasks.component */ "+aPS");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");




const routes = [
    {
        path: '',
        children: [
            { path: '', component: _pages_panel_tasks_panel_tasks_component__WEBPACK_IMPORTED_MODULE_1__["PanelTasksComponent"] },
            { path: '**', redirectTo: 'tasks' }
        ]
    }
];
class TasksRoutingModule {
}
TasksRoutingModule.ɵfac = function TasksRoutingModule_Factory(t) { return new (t || TasksRoutingModule)(); };
TasksRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: TasksRoutingModule });
TasksRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [[
            _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(routes)
        ], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](TasksRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ }),

/***/ "1Y7w":
/*!************************************************************************!*\
  !*** ./src/app/shared/components/main-button/main-button.component.ts ***!
  \************************************************************************/
/*! exports provided: MainButtonComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MainButtonComponent", function() { return MainButtonComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "ofXK");


const _c0 = function (a1) { return { "maunButton": true, "maunButton--segundary": a1 }; };
class MainButtonComponent {
    constructor() {
        this.text = 'boton';
        this.modification = '';
    }
    ngOnInit() {
    }
}
MainButtonComponent.ɵfac = function MainButtonComponent_Factory(t) { return new (t || MainButtonComponent)(); };
MainButtonComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: MainButtonComponent, selectors: [["main-button"]], inputs: { text: "text", modification: "modification" }, decls: 2, vars: 4, consts: [[3, "ngClass"]], template: function MainButtonComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](2, _c0, ctx.modification == "segundary"));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.text, " ");
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["NgClass"]], styles: [".maunButton[_ngcontent-%COMP%] {\n  color: white;\n  background-color: black;\n  display: inline-block;\n  width: 200px;\n  padding: 12px;\n  box-sizing: border-box;\n  border: 0px;\n  font-family: \"Poppins\";\n  border-radius: 5px;\n  height: 48px;\n  cursor: pointer;\n  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.15);\n}\n\n.maunButton--segundary[_ngcontent-%COMP%] {\n  color: black;\n  background-color: white;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFwuLlxcbWFpbi1idXR0b24uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUM7RUFDRyxZQUFBO0VBQ0EsdUJBQUE7RUFDQSxxQkFBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxXQUFBO0VBQ0Esc0JBQUE7RUFDQSxrQkFBQTtFQUNBLFlBQUE7RUFDQSxlQUFBO0VBQ0EsMkNBQUE7QUFDSjs7QUFFQztFQUNHLFlBQUE7RUFDQSx1QkFBQTtBQUNKIiwiZmlsZSI6Im1haW4tYnV0dG9uLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiIC5tYXVuQnV0dG9ue1xyXG4gICAgY29sb3I6IHdoaXRlO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XHJcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICB3aWR0aDogMjAwcHg7XHJcbiAgICBwYWRkaW5nOiAxMnB4O1xyXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxuICAgIGJvcmRlcjogMHB4O1xyXG4gICAgZm9udC1mYW1pbHk6ICdQb3BwaW5zJztcclxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcclxuICAgIGhlaWdodDogNDhweDtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgIGJveC1zaGFkb3c6IDNweCAzcHggM3B4IHJnYmEoMCwgMCwgMCwgMC4xNSk7XHJcbiB9XHJcblxyXG4gLm1hdW5CdXR0b24tLXNlZ3VuZGFyeXtcclxuICAgIGNvbG9yOiBibGFjaztcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xyXG4gfSJdfQ== */"] });


/***/ }),

/***/ "2tJE":
/*!*************************************************!*\
  !*** ./src/app/tasks/services/tasks.service.ts ***!
  \*************************************************/
/*! exports provided: TasksService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TasksService", function() { return TasksService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/fire/firestore */ "I/3d");


class TasksService {
    constructor(fireStore) {
        this.fireStore = fireStore;
    }
    getTasks() {
        return this.fireStore.collection("task").snapshotChanges();
    }
    deleteTask(task) {
        const TaskRef = this.fireStore.doc(`task/${task.id}`);
        return TaskRef.delete();
    }
    saveTask(task) {
        return this.fireStore.collection('task').add(task);
    }
    editTask(task) {
        const TaskRef = this.fireStore.doc(`task/${task.id}`);
        return TaskRef.update(task);
    }
}
TasksService.ɵfac = function TasksService_Factory(t) { return new (t || TasksService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_1__["AngularFirestore"])); };
TasksService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: TasksService, factory: TasksService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "4ax4":
/*!*********************************************************************!*\
  !*** ./src/app/tasks/components/modal-task/modal-task.component.ts ***!
  \*********************************************************************/
/*! exports provided: ModalTaskComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModalTaskComponent", function() { return ModalTaskComponent; });
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/button */ "bTqV");








function ModalTaskComponent_mat_form_field_22_Template(rf, ctx) { if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-form-field", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Ingresaer la duraci\u00F3n en segundos");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "input", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngModelChange", function ModalTaskComponent_mat_form_field_22_Template_input_ngModelChange_3_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r2); const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return ctx_r1.data.durationS = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngModel", ctx_r0.data.durationS);
} }
class ModalTaskComponent {
    constructor(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    ngOnInit() { }
}
ModalTaskComponent.ɵfac = function ModalTaskComponent_Factory(t) { return new (t || ModalTaskComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_0__["MatDialogRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_0__["MAT_DIALOG_DATA"])); };
ModalTaskComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: ModalTaskComponent, selectors: [["app-modal-task"]], decls: 25, vars: 5, consts: [["mat-dialog-content", ""], [1, "example-full-width"], ["matInput", "", "required", "", "placeholder", "descripcion...", 3, "ngModel", "ngModelChange"], ["appearance", "fill"], ["matNativeControl", "", 3, "ngModel", "ngModelChange"], ["value", "1800"], ["value", "2700"], ["value", "3600"], ["value", "Personalizada"], ["class", "example-full-width", 4, "ngIf"], ["mat-button", "", "color", "primary", 3, "disabled", "mat-dialog-close"], ["matInput", "", "type", "number", "placeholder", "Duracion", 3, "ngModel", "ngModelChange"]], template: function ModalTaskComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Crear Tarea");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "Form");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "mat-form-field", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7, "Descripcion");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "input", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngModelChange", function ModalTaskComponent_Template_input_ngModelChange_8_listener($event) { return ctx.data.description = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "mat-form-field", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11, "Duracion");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "select", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngModelChange", function ModalTaskComponent_Template_select_ngModelChange_12_listener($event) { return ctx.data.resultSelect = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](13, "option");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "option", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](15, "Corta 30 min");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "option", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](17, "Media 45 min ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](18, "option", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](19, "Larga 1 Hora");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](20, "option", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](21, "Personalizada");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](22, ModalTaskComponent_mat_form_field_22_Template, 4, 1, "mat-form-field", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](23, "button", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](24, "Guardar");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngModel", ctx.data.description);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngModel", ctx.data.resultSelect);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.data.resultSelect == "Personalizada");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("disabled", !ctx.data.resultSelect || ctx.data.description == "" || ctx.data.resultSelect == "Personalizada" && ctx.data.durationS == 0)("mat-dialog-close", ctx.data);
    } }, directives: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_0__["MatDialogContent"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_2__["MatFormField"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_2__["MatLabel"], _angular_material_input__WEBPACK_IMPORTED_MODULE_3__["MatInput"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["RequiredValidator"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgModel"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["SelectControlValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgSelectOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ɵangular_packages_forms_forms_z"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"], _angular_material_button__WEBPACK_IMPORTED_MODULE_6__["MatButton"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_0__["MatDialogClose"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NumberValueAccessor"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJtb2RhbC10YXNrLmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ "6epW":
/*!*********************************************!*\
  !*** ./src/app/auth/auth-routing.module.ts ***!
  \*********************************************/
/*! exports provided: AuthRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthRoutingModule", function() { return AuthRoutingModule; });
/* harmony import */ var _components_login_login_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/login/login.component */ "OuDC");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");




const routes = [
    {
        path: '',
        children: [
            { path: 'login', component: _components_login_login_component__WEBPACK_IMPORTED_MODULE_0__["LoginComponent"] },
            { path: '**', redirectTo: 'login' }
        ]
    }
];
class AuthRoutingModule {
}
AuthRoutingModule.ɵfac = function AuthRoutingModule_Factory(t) { return new (t || AuthRoutingModule)(); };
AuthRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: AuthRoutingModule });
AuthRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [[
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)
        ], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](AuthRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();


/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false,
    firebase: {
        apiKey: "AIzaSyBH8Y2DEMeS5HnOGBefIa7WWdpV85X2JBc",
        authDomain: "taskmanager-47dff.firebaseapp.com",
        projectId: "taskmanager-47dff",
        storageBucket: "taskmanager-47dff.appspot.com",
        messagingSenderId: "903125752563",
        appId: "1:903125752563:web:7cc06b9d0e3ec65c847586",
        measurementId: "G-BJPC6R3WBZ"
    }
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "Lx6T":
/*!*********************************************************************!*\
  !*** ./src/app/tasks/components/main-table/main-table.component.ts ***!
  \*********************************************************************/
/*! exports provided: MainTableComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MainTableComponent", function() { return MainTableComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/paginator */ "M9IT");
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/table */ "+0xr");
/* harmony import */ var _modal_task_modal_task_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../modal-task/modal-task.component */ "4ax4");
/* harmony import */ var _modal_delete_task_modal_delete_task_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../modal-delete-task/modal-delete-task.component */ "wsGx");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/menu */ "STbY");
/* harmony import */ var _pipes_minutes_seconds_pipe__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../pipes/minutes-seconds.pipe */ "/Sa1");













function MainTableComponent_th_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "th", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Descripci\u00F3n");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function MainTableComponent_td_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "td", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const element_r12 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", element_r12.description, " ");
} }
function MainTableComponent_th_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "th", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Tiempo asignado");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function MainTableComponent_td_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "td", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "minuteSeconds");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const element_r13 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](2, 1, element_r13.durationS), " ");
} }
function MainTableComponent_th_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "th", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Tiempo restante");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function MainTableComponent_td_10_span_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "minuteSeconds");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](2, 1, ctx_r16.timer));
} }
function MainTableComponent_td_10_span_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "minuteSeconds");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const element_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](2, 1, element_r14.timeS));
} }
function MainTableComponent_td_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "td", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, MainTableComponent_td_10_span_1_Template, 3, 3, "span", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, MainTableComponent_td_10_span_2_Template, 3, 3, "span", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const element_r14 = ctx.$implicit;
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r5.StatusPlay && ctx_r5.idFristE == element_r14.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r5.StatusPlay == false || ctx_r5.idFristE !== element_r14.id);
} }
function MainTableComponent_th_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "th", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Controles ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function MainTableComponent_td_13_div_1_img_1_Template(rf, ctx) { if (rf & 1) {
    const _r28 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "img", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function MainTableComponent_td_13_div_1_img_1_Template_img_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r28); const element_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2).$implicit; const ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r26.stopTime(element_r19); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function MainTableComponent_td_13_div_1_img_2_Template(rf, ctx) { if (rf & 1) {
    const _r31 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "img", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function MainTableComponent_td_13_div_1_img_2_Template_img_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r31); const element_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2).$implicit; const ctx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r29.playTimer(element_r19); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function MainTableComponent_td_13_div_1_img_3_Template(rf, ctx) { if (rf & 1) {
    const _r34 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "img", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function MainTableComponent_td_13_div_1_img_3_Template_img_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r34); const element_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2).$implicit; const ctx_r32 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r32.resetTime(element_r19); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function MainTableComponent_td_13_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, MainTableComponent_td_13_div_1_img_1_Template, 1, 0, "img", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, MainTableComponent_td_13_div_1_img_2_Template, 1, 0, "img", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, MainTableComponent_td_13_div_1_img_3_Template, 1, 0, "img", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r21.StatusPlay);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r21.StatusPlay == false);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r21.StatusPlay == false);
} }
function MainTableComponent_td_13_div_2_img_1_Template(rf, ctx) { if (rf & 1) {
    const _r39 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "img", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function MainTableComponent_td_13_div_2_img_1_Template_img_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r39); const element_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2).$implicit; const ctx_r37 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r37.moveTask(element_r19, true); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function MainTableComponent_td_13_div_2_img_2_Template(rf, ctx) { if (rf & 1) {
    const _r42 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "img", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function MainTableComponent_td_13_div_2_img_2_Template_img_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r42); const element_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2).$implicit; const ctx_r40 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r40.moveTask(element_r19, false); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function MainTableComponent_td_13_div_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, MainTableComponent_td_13_div_2_img_1_Template, 1, 0, "img", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, MainTableComponent_td_13_div_2_img_2_Template, 1, 0, "img", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const i_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().index;
    const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !(1 == i_r20 && ctx_r22.StatusPlay == true));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", i_r20 !== 0);
} }
function MainTableComponent_td_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "td", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, MainTableComponent_td_13_div_1_Template, 4, 3, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, MainTableComponent_td_13_div_2_Template, 3, 2, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const element_r19 = ctx.$implicit;
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r7.idFristE == element_r19.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r7.idFristE !== element_r19.id);
} }
function MainTableComponent_th_15_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "th", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Opciones ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function MainTableComponent_td_16_button_7_Template(rf, ctx) { if (rf & 1) {
    const _r52 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function MainTableComponent_td_16_button_7_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r52); const element_r44 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit; const ctx_r50 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r50.openDialog(element_r44); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Editar");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function MainTableComponent_td_16_button_8_Template(rf, ctx) { if (rf & 1) {
    const _r55 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function MainTableComponent_td_16_button_8_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r55); const element_r44 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit; const ctx_r53 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r53.openDialogDelete(element_r44); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Borrar");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function MainTableComponent_td_16_button_9_Template(rf, ctx) { if (rf & 1) {
    const _r58 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function MainTableComponent_td_16_button_9_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r58); const element_r44 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit; const ctx_r56 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r56.completeTask(element_r44); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Finalizar");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function MainTableComponent_td_16_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "td", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "button", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "img", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, " Opciones ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "mat-menu", null, 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, MainTableComponent_td_16_button_7_Template, 2, 0, "button", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, MainTableComponent_td_16_button_8_Template, 2, 0, "button", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, MainTableComponent_td_16_button_9_Template, 2, 0, "button", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const element_r44 = ctx.$implicit;
    const _r46 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](5);
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matMenuTriggerFor", _r46);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r9.StatusPlay == false || ctx_r9.idFristE != element_r44.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r9.StatusPlay == false || ctx_r9.idFristE != element_r44.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r9.idFristE == element_r44.id);
} }
function MainTableComponent_tr_17_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "tr", 32);
} }
function MainTableComponent_tr_18_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "tr", 33);
} }
const _c0 = function () { return [5, 10, 20]; };
class MainTableComponent {
    constructor(dialog) {
        this.dialog = dialog;
        this.displayedColumns = ['descripcion', 'durationS', 'Controles', 'timeS', 'opciones'];
        this.TablePendingTasks = null;
        this.StatusPlay = false;
        this.timer = 0;
        this.idFristElement = "";
        this.deleteTaskEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.completeTaskEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.saveTaskEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.updateTimeEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.editTaskfroModal = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    ngOnInit() {
        //this.updateTable(this.PendingTasks);
        if (localStorage.getItem('timer') != null) {
            let task = JSON.parse(localStorage.getItem('pengindTask') || '');
            let timer = JSON.parse(localStorage.getItem('timer') || '');
            task.timeS = timer.timer;
            setTimeout(() => {
                this.editTask(task);
            }, 500);
            localStorage.removeItem('pengindTask');
            localStorage.removeItem('timer');
        }
        ;
    }
    updateTable(PendingTasks) {
        this.TablePendingTasks = new _angular_material_table__WEBPACK_IMPORTED_MODULE_2__["MatTableDataSource"](PendingTasks);
        this.idFristE = PendingTasks[0].id;
        this.TablePendingTasks.paginator = this.paginator;
    }
    playTimer(task) {
        if (this.StatusPlay == false) {
            this.updateTimer(task.timeS);
            this.StatusPlay = true;
            var id = setInterval(() => {
                if (this.timer < 1) {
                    this.StatusPlay = false;
                    task.completed = true;
                    task.timeS = 0;
                    const f = new Date();
                    task.dateComplete = f.getDate() + "-" + f.getMonth() + "-" + f.getFullYear();
                    this.saveTaskEvent.emit(task);
                    this.removeTimerLocalS();
                    clearInterval(id);
                }
                if (this.StatusPlay == false) {
                    this.StatusPlay = false;
                    task.timeS = this.timer;
                    clearInterval(id);
                    this.removeTimerLocalS();
                    this.saveTaskEvent.emit(task);
                }
                this.updateTimer(this.timer - 1);
                this.saveTimerLocalS(task, this.timer);
            }, 1000);
        }
    }
    saveTimerLocalS(task, timer) {
        localStorage.setItem('pengindTask', JSON.stringify(task));
        localStorage.setItem('timer', JSON.stringify({ timer: timer }));
    }
    removeTimerLocalS() {
        localStorage.removeItem('pengindTask');
        localStorage.removeItem('timer');
    }
    stopTime(task) {
        task.timeS = this.timer;
        this.saveTaskEvent.emit(task);
        this.StatusPlay = false;
    }
    resetTime(task) {
        task.timeS = task.durationS;
        this.saveTaskEvent.emit(task);
    }
    updateTimer(num) {
        this.timer = num;
    }
    completeTask(task) {
        if (this.StatusPlay) {
            task.timeS = this.timer;
            this.StatusPlay = false;
        }
        this.completeTaskEvent.emit(task);
    }
    editTask(task) {
        this.saveTaskEvent.emit(task);
    }
    openDialogDelete(task) {
        const dialogRef = this.dialog.open(_modal_delete_task_modal_delete_task_component__WEBPACK_IMPORTED_MODULE_4__["ModalTaskDeleteComponent"], {
            width: '250px',
            data: {
                description: task.description
            }
        });
        dialogRef.afterClosed().subscribe(data => {
            if (data) {
                this.deleteTaskEvent.emit(task);
            }
        });
    }
    moveTask(task, direction) {
        let afterTask;
        let CurrencyTask;
        let beforeTask;
        let indexOf = this.PendingTasks.map((x) => x.id).indexOf(task.id);
        CurrencyTask = this.PendingTasks[indexOf];
        if (direction) {
            afterTask = this.PendingTasks[indexOf - 1];
            let temp = CurrencyTask.orden;
            CurrencyTask.orden = afterTask.orden;
            afterTask.orden = temp;
            this.saveTaskEvent.emit(CurrencyTask);
            this.saveTaskEvent.emit(afterTask);
        }
        else {
            beforeTask = this.PendingTasks[indexOf + 1];
            let temp = CurrencyTask.orden;
            CurrencyTask.orden = beforeTask.orden;
            beforeTask.orden = temp;
            this.saveTaskEvent.emit(CurrencyTask);
            this.saveTaskEvent.emit(beforeTask);
        }
    }
    openDialog(task) {
        const resultSelect = (task.durationS === 0 || task.durationS === 1800 || task.durationS === 2700 || task.durationS === 3600 ? task.durationS.toString() : "Personalizada");
        const dialogRef = this.dialog.open(_modal_task_modal_task_component__WEBPACK_IMPORTED_MODULE_3__["ModalTaskComponent"], {
            width: '250px',
            data: {
                id: task.id,
                description: task.description,
                durationS: task.durationS,
                resultSelect: resultSelect,
            }
        });
        dialogRef.afterClosed().subscribe(data => {
            this.editTaskfroModal.emit(data);
        });
    }
}
MainTableComponent.ɵfac = function MainTableComponent_Factory(t) { return new (t || MainTableComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__["MatDialog"])); };
MainTableComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: MainTableComponent, selectors: [["app-main-table"]], viewQuery: function MainTableComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_angular_material_paginator__WEBPACK_IMPORTED_MODULE_1__["MatPaginator"], 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.paginator = _t.first);
    } }, inputs: { PendingTasks: ["data", "PendingTasks"], idFristElement: "idFristElement" }, outputs: { deleteTaskEvent: "deleteTaskEvent", completeTaskEvent: "completeTaskEvent", saveTaskEvent: "saveTaskEvent", updateTimeEvent: "updateTimeEvent", editTaskfroModal: "editTaskfroModal" }, decls: 20, vars: 5, consts: [[1, "mainTable"], ["mat-table", "", 3, "dataSource"], ["matColumnDef", "descripcion"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "durationS"], ["matColumnDef", "timeS"], ["matColumnDef", "Controles"], ["matColumnDef", "opciones"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], [3, "pageSizeOptions"], ["mat-header-cell", ""], ["mat-cell", ""], [4, "ngIf"], ["class", "mainTable-option", 4, "ngIf"], [1, "mainTable-option"], ["src", "./assets/images/pausa.svg", "class", "Header-Img", 3, "click", 4, "ngIf"], ["src", "./assets/images/play.svg", "class", "Header-Img", 3, "click", 4, "ngIf"], ["src", "./assets/images/repeat.svg", "class", "Header-Img", 3, "click", 4, "ngIf"], ["src", "./assets/images/pausa.svg", 1, "Header-Img", 3, "click"], ["src", "./assets/images/play.svg", 1, "Header-Img", 3, "click"], ["src", "./assets/images/repeat.svg", 1, "Header-Img", 3, "click"], ["src", "./assets/images/up.png", "class", "Header-Img", 3, "click", 4, "ngIf"], ["src", "./assets/images/down.png", "class", "Header-Img", 3, "click", 4, "ngIf"], ["src", "./assets/images/up.png", 1, "Header-Img", 3, "click"], ["src", "./assets/images/down.png", 1, "Header-Img", 3, "click"], ["mat-button", "", 3, "matMenuTriggerFor"], ["src", "./assets/images/down.svg", 1, "Header-Img"], ["menu", "matMenu"], ["mat-menu-item", "", 3, "click", 4, "ngIf"], ["mat-menu-item", "", 3, "click"], ["mat-header-row", ""], ["mat-row", ""]], template: function MainTableComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "table", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](2, 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, MainTableComponent_th_3_Template, 2, 0, "th", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, MainTableComponent_td_4_Template, 2, 1, "td", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](5, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, MainTableComponent_th_6_Template, 2, 0, "th", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, MainTableComponent_td_7_Template, 3, 3, "td", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](8, 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, MainTableComponent_th_9_Template, 2, 0, "th", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](10, MainTableComponent_td_10_Template, 3, 2, "td", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](11, 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](12, MainTableComponent_th_12_Template, 2, 0, "th", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](13, MainTableComponent_td_13_Template, 3, 2, "td", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](14, 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](15, MainTableComponent_th_15_Template, 2, 0, "th", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](16, MainTableComponent_td_16_Template, 10, 4, "td", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](17, MainTableComponent_tr_17_Template, 1, 0, "tr", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](18, MainTableComponent_tr_18_Template, 1, 0, "tr", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](19, "mat-paginator", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("dataSource", ctx.TablePendingTasks);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matHeaderRowDef", ctx.displayedColumns);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matRowDefColumns", ctx.displayedColumns);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("pageSizeOptions", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](4, _c0));
    } }, directives: [_angular_material_table__WEBPACK_IMPORTED_MODULE_2__["MatTable"], _angular_material_table__WEBPACK_IMPORTED_MODULE_2__["MatColumnDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_2__["MatHeaderCellDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_2__["MatCellDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_2__["MatHeaderRowDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_2__["MatRowDef"], _angular_material_paginator__WEBPACK_IMPORTED_MODULE_1__["MatPaginator"], _angular_material_table__WEBPACK_IMPORTED_MODULE_2__["MatHeaderCell"], _angular_material_table__WEBPACK_IMPORTED_MODULE_2__["MatCell"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["NgIf"], _angular_material_button__WEBPACK_IMPORTED_MODULE_7__["MatButton"], _angular_material_menu__WEBPACK_IMPORTED_MODULE_8__["MatMenuTrigger"], _angular_material_menu__WEBPACK_IMPORTED_MODULE_8__["MatMenu"], _angular_material_menu__WEBPACK_IMPORTED_MODULE_8__["MatMenuItem"], _angular_material_table__WEBPACK_IMPORTED_MODULE_2__["MatHeaderRow"], _angular_material_table__WEBPACK_IMPORTED_MODULE_2__["MatRow"]], pipes: [_pipes_minutes_seconds_pipe__WEBPACK_IMPORTED_MODULE_9__["MinuteSecondsPipe"]], styles: [".mainTable-option[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  margin-left: 8px;\n  cursor: pointer;\n}\n\ntable[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n}\n\nth.mat-header-cell[_ngcontent-%COMP%] {\n  background: #000000;\n  color: white;\n  text-align: center;\n  font-family: \"Poppins\";\n  font-weight: 500;\n}\n\n.mat-header-cell[_ngcontent-%COMP%]:after {\n  content: \"\";\n  float: right;\n  height: 20px;\n  width: 1px;\n  background-color: white;\n}\n\n.mat-column-opciones[_ngcontent-%COMP%]:after {\n  width: 0px;\n}\n\ntd.mat-cell[_ngcontent-%COMP%] {\n  text-align: center;\n}\n\ntr.mat-row[_ngcontent-%COMP%]:first-child {\n  border: 3px solid rgba(0, 0, 0, 0.87) !important;\n  font-weight: bold;\n  border-radius: 26px !important;\n  border-top-left-radius: 10px;\n  border-bottom-right-radius: 10px;\n}\n\ntr.mat-row[_ngcontent-%COMP%]:first-child   button[_ngcontent-%COMP%] {\n  font-weight: bold;\n}\n\n.mat-row[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  background-color: transparent;\n  border: 0;\n}\n\n.mat-menu-panel[_ngcontent-%COMP%] {\n  padding: 0 5px;\n}\n\ntr.mat-row[_ngcontent-%COMP%]:first-child {\n  border: 3px solid rgba(0, 0, 0, 0.87) !important;\n  font-weight: bold !important;\n  border-radius: 26px !important;\n  border-top-left-radius: 10px !important;\n  border-bottom-right-radius: 10px !important;\n}\n\ntr.mat-row[_ngcontent-%COMP%]:first-child   button[_ngcontent-%COMP%] {\n  font-weight: bold !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFwuLlxcbWFpbi10YWJsZS5jb21wb25lbnQuc2NzcyIsIi4uXFwuLlxcLi5cXC4uXFwuLlxcLi5cXC4uXFwuLlxcc2hhcmVkXFxzdHlsZVxcY29sb3JzLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBSUU7RUFDRSxnQkFBQTtFQUNBLGVBQUE7QUFISjs7QUFPQTtFQUNJLFdBQUE7RUFDQSx5QkFBQTtBQUpKOztBQU9FO0VBQ0UsbUJDaEJrQjtFRGlCbEIsWUNma0I7RURnQmxCLGtCQUFBO0VBQ0Esc0JBQUE7RUFDQSxnQkFBQTtBQUpKOztBQU9BO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSxZQUFBO0VBQ0EsVUFBQTtFQUNBLHVCQzFCb0I7QURzQnRCOztBQU9BO0VBQ0UsVUFBQTtBQUpGOztBQU9BO0VBQ0Usa0JBQUE7QUFKRjs7QUFPQTtFQUNFLGdEQUFBO0VBQ0EsaUJBQUE7RUFDQSw4QkFBQTtFQUNBLDRCQUFBO0VBQ0EsZ0NBQUE7QUFKRjs7QUFPQTtFQUNFLGlCQUFBO0FBSkY7O0FBT0E7RUFDRSw2QkFBQTtFQUNBLFNBQUE7QUFKRjs7QUFPQTtFQUNFLGNBQUE7QUFKRjs7QUFPQTtFQUNFLGdEQUFBO0VBQ0EsNEJBQUE7RUFDQSw4QkFBQTtFQUNBLHVDQUFBO0VBQ0EsMkNBQUE7QUFKRjs7QUFPQTtFQUNFLDRCQUFBO0FBSkYiLCJmaWxlIjoibWFpbi10YWJsZS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5AaW1wb3J0ICcuLi8uLi8uLi9zaGFyZWQvc3R5bGUvY29sb3JzLnNjc3MnO1xyXG5cclxuLm1haW5UYWJsZS1vcHRpb257XHJcbiAgJiBpbWcge1xyXG4gICAgbWFyZ2luLWxlZnQ6IDhweDtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICB9XHJcbn1cclxuXHJcbnRhYmxlIHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcclxuICB9XHJcbiAgXHJcbiAgdGgubWF0LWhlYWRlci1jZWxsIHtcclxuICAgIGJhY2tncm91bmQ6ICRCcmFuQ29sb3ItUHJpbmNpcGFsO1xyXG4gICAgY29sb3I6ICRCcmFuQ29sb3ItdGVydGlhcnk7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBmb250LWZhbWlseTogJ1BvcHBpbnMnO1xyXG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcclxufVxyXG5cclxuLm1hdC1oZWFkZXItY2VsbDphZnRlciB7XHJcbiAgY29udGVudDogJyc7XHJcbiAgZmxvYXQ6IHJpZ2h0O1xyXG4gIGhlaWdodDogMjBweDtcclxuICB3aWR0aDogMXB4O1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICRCcmFuQ29sb3ItdGVydGlhcnk7XHJcbn1cclxuXHJcbi5tYXQtY29sdW1uLW9wY2lvbmVzOmFmdGVye1xyXG4gIHdpZHRoOiAwcHg7XHJcbn1cclxuXHJcbnRkLm1hdC1jZWxse1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG5cclxudHIubWF0LXJvdzpmaXJzdC1jaGlsZCB7XHJcbiAgYm9yZGVyOiAzcHggc29saWQgcmdiKDAgMCAwIC8gODclKSAhaW1wb3J0YW50O1xyXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gIGJvcmRlci1yYWRpdXM6IDI2cHggIWltcG9ydGFudDtcclxuICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAxMHB4O1xyXG4gIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAxMHB4O1xyXG59XHJcblxyXG50ci5tYXQtcm93OmZpcnN0LWNoaWxkIGJ1dHRvbntcclxuICBmb250LXdlaWdodDogYm9sZDtcclxufVxyXG5cclxuLm1hdC1yb3cgYnV0dG9ue1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xyXG4gIGJvcmRlcjogMDtcclxufVxyXG5cclxuLm1hdC1tZW51LXBhbmVse1xyXG4gIHBhZGRpbmc6IDAgNXB4O1xyXG59XHJcblxyXG50ci5tYXQtcm93OmZpcnN0LWNoaWxkIHtcclxuICBib3JkZXI6IDNweCBzb2xpZCByZ2IoMCAwIDAgLyA4NyUpICFpbXBvcnRhbnQ7XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQgIWltcG9ydGFudDs7XHJcbiAgYm9yZGVyLXJhZGl1czogMjZweCAhaW1wb3J0YW50O1xyXG4gIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDEwcHggIWltcG9ydGFudDs7XHJcbiAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDEwcHggIWltcG9ydGFudDs7XHJcbiAgfVxyXG5cclxudHIubWF0LXJvdzpmaXJzdC1jaGlsZCBidXR0b257XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQgIWltcG9ydGFudDs7IFxyXG4gIH0iLCIkQnJhbkNvbG9yLVByaW5jaXBhbDogIzAwMDAwMDtcclxuJEJyYW5Db2xvci1TZWd1bmRhcnk6ICNGRERBMjU7XHJcbiRCcmFuQ29sb3ItdGVydGlhcnkgOiB3aGl0ZTtcclxuXHJcbiRUZXh0Q29sb3ItMTojMDAwMDtcclxuJFRleHRDb2xvci0yOiMzNzM3Mzc7XHJcbiRUZXh0Q29sb3ItMzojQTBBMEEwO1xyXG5cclxuJGluZGljYXRpb24taW5mbzojMjE3NkZGO1xyXG4kaW5kaWNhdGlvbi1zdWNjZXNzOiMwMDg3OTY7XHJcbiRpbmRpY2F0aW9uLWVycm9yOiNGRjZBMzk7XHJcblxyXG4kYmFja2dyb3VkOiNFNUU1RTU7XHJcblxyXG4iXX0= */"] });


/***/ }),

/***/ "N/25":
/*!***********************************************!*\
  !*** ./src/app/auth/services/auth.service.ts ***!
  \***********************************************/
/*! exports provided: AuthService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthService", function() { return AuthService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! firebase/app */ "Wcq6");
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(firebase_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_fire_auth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/fire/auth */ "UbJi");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "tyNb");





class AuthService {
    constructor(afAuth, router) {
        this.afAuth = afAuth;
        this.router = router;
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.user = user;
                localStorage.setItem('user', JSON.stringify(this.user));
                this.router.navigate(['']);
            }
            else {
                localStorage.removeItem('user');
                this.router.navigate(['auth']);
            }
        });
    }
    loginGoogle() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            try {
                return this.afAuth.signInWithPopup(new firebase_app__WEBPACK_IMPORTED_MODULE_1__["auth"].GoogleAuthProvider());
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });
    }
    logout() {
        return this.afAuth.signOut();
    }
    get isLoggedIn() {
        const internalUser = localStorage.getItem('user');
        if (internalUser !== null) {
            const user = internalUser;
            return (user.emailVerified !== false) ? true : false;
        }
        else {
            return false;
        }
    }
}
AuthService.ɵfac = function AuthService_Factory(t) { return new (t || AuthService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_fire_auth__WEBPACK_IMPORTED_MODULE_3__["AngularFireAuth"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"])); };
AuthService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({ token: AuthService, factory: AuthService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "OuDC":
/*!**********************************************************!*\
  !*** ./src/app/auth/components/login/login.component.ts ***!
  \**********************************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/auth.service */ "N/25");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "tyNb");




class LoginComponent {
    constructor(authSvc, router) {
        this.authSvc = authSvc;
        this.router = router;
    }
    ngOnInit() {
    }
    onGoogleLogin() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            try {
                this.authSvc.loginGoogle();
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
LoginComponent.ɵfac = function LoginComponent_Factory(t) { return new (t || LoginComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"])); };
LoginComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: LoginComponent, selectors: [["app-login"]], decls: 6, vars: 0, consts: [["Class", "login"], ["Class", "login-title"], ["Class", "login-btn", 3, "click"], ["Class", "login-img", "src", "./assets/images/g.png"]], template: function LoginComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "h1", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Task Manager");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function LoginComponent_Template_button_click_3_listener() { return ctx.onGoogleLogin(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](4, "img", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, " Logear con google");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } }, styles: [".login[_ngcontent-%COMP%] {\n  max-width: 500px;\n  padding: 20px;\n  background: #d0d0d0;\n  border-radius: 10px;\n  margin: 0 auto;\n  margin-top: 10%;\n  text-align: center;\n}\n\n.login-btn[_ngcontent-%COMP%] {\n  font-size: 16px;\n  padding: 20px;\n  background: white;\n  border-radius: 10px;\n  border: 1px solid;\n}\n\n.login-img[_ngcontent-%COMP%] {\n  width: 20px;\n  vertical-align: middle;\n  margin-right: 5px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFwuLlxcbG9naW4uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxnQkFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLG1CQUFBO0VBQ0EsY0FBQTtFQUNBLGVBQUE7RUFDQSxrQkFBQTtBQUNKOztBQUNBO0VBQ0ksZUFBQTtFQUNBLGFBQUE7RUFDQSxpQkFBQTtFQUNBLG1CQUFBO0VBQ0EsaUJBQUE7QUFFSjs7QUFBQTtFQUNJLFdBQUE7RUFDQSxzQkFBQTtFQUNBLGlCQUFBO0FBR0oiLCJmaWxlIjoibG9naW4uY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubG9naW57XHJcbiAgICBtYXgtd2lkdGg6IDUwMHB4O1xyXG4gICAgcGFkZGluZzogMjBweDtcclxuICAgIGJhY2tncm91bmQ6ICNkMGQwZDA7XHJcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG4gICAgbWFyZ2luOiAwIGF1dG87XHJcbiAgICBtYXJnaW4tdG9wOiAxMCU7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbn1cclxuLmxvZ2luLWJ0bntcclxuICAgIGZvbnQtc2l6ZTogMTZweDtcclxuICAgIHBhZGRpbmc6IDIwcHg7XHJcbiAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZDtcclxufVxyXG4ubG9naW4taW1ne1xyXG4gICAgd2lkdGg6IDIwcHg7XHJcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xyXG4gICAgbWFyZ2luLXJpZ2h0OiA1cHg7XHJcbn0iXX0= */"] });


/***/ }),

/***/ "PCNd":
/*!*****************************************!*\
  !*** ./src/app/shared/shared.module.ts ***!
  \*****************************************/
/*! exports provided: SharedModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SharedModule", function() { return SharedModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _components_header_header_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/header/header.component */ "aZ8m");
/* harmony import */ var _components_main_button_main_button_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/main-button/main-button.component */ "1Y7w");






class SharedModule {
}
SharedModule.ɵfac = function SharedModule_Factory(t) { return new (t || SharedModule)(); };
SharedModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: SharedModule });
SharedModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormsModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClientModule"],
        ], _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormsModule"],
        _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClientModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](SharedModule, { declarations: [_components_header_header_component__WEBPACK_IMPORTED_MODULE_4__["HeaderComponent"], _components_main_button_main_button_component__WEBPACK_IMPORTED_MODULE_5__["MainButtonComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormsModule"],
        _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClientModule"]], exports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormsModule"],
        _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClientModule"], _components_header_header_component__WEBPACK_IMPORTED_MODULE_4__["HeaderComponent"], _components_main_button_main_button_component__WEBPACK_IMPORTED_MODULE_5__["MainButtonComponent"]] }); })();


/***/ }),

/***/ "Qw9e":
/*!***************************************************************************!*\
  !*** ./src/app/tasks/components/main-controls/main-controls.component.ts ***!
  \***************************************************************************/
/*! exports provided: MainControlsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MainControlsComponent", function() { return MainControlsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _modal_task_modal_task_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modal-task/modal-task.component */ "4ax4");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _shared_components_main_button_main_button_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../shared/components/main-button/main-button.component */ "1Y7w");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "3Pt+");








function MainControlsComponent_main_button_2_Template(rf, ctx) { if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "main-button", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function MainControlsComponent_main_button_2_Template_main_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5); const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r4.openDialog(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("text", "CREAR NUEVA TAREA");
} }
function MainControlsComponent_main_button_4_Template(rf, ctx) { if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "main-button", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function MainControlsComponent_main_button_4_Template_main_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r7); const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r6.onclick(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("modification", "segundary")("text", "VER HISTORIAL");
} }
function MainControlsComponent_main_button_5_Template(rf, ctx) { if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "main-button", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function MainControlsComponent_main_button_5_Template_main_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r9); const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r8.onclick(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("modification", "segundary")("text", "Ver BACKLOG ");
} }
function MainControlsComponent_select_6_Template(rf, ctx) { if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "select", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("change", function MainControlsComponent_select_6_Template_select_change_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r11); const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r10.changeSelect(); })("ngModelChange", function MainControlsComponent_select_6_Template_select_ngModelChange_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r11); const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r12.orderby = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "option", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, " Todos");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "option", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Corta 30 min");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "option", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Media 30 min a 1 hora ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "option", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "larga mas de 1 Hora");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx_r3.orderby);
} }
class MainControlsComponent {
    constructor(dialog) {
        this.dialog = dialog;
        this.newTaskEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.clickBtn = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.changeFilter = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.orderby = "all";
    }
    ngOnInit() {
    }
    addNewItem(task) {
        this.newTaskEvent.emit(task);
    }
    onclick() {
        this.clickBtn.emit(this.TableCurrency);
    }
    changeSelect() {
        this.changeFilter.emit(this.orderby);
    }
    openDialog() {
        const dialogRef = this.dialog.open(_modal_task_modal_task_component__WEBPACK_IMPORTED_MODULE_1__["ModalTaskComponent"], {
            width: '250px',
            data: { description: "",
                durationS: "0",
                resultSelect: "",
            }
        });
        dialogRef.afterClosed().subscribe(data => {
            console.log('The dialog was closed');
            const time = parseInt(data.resultSelect == "Personalizada" ? data.durationS : data.resultSelect);
            this.addNewItem({
                description: data.description,
                durationS: time,
                timeS: time,
                completed: false,
            });
        });
        ;
    }
}
MainControlsComponent.ɵfac = function MainControlsComponent_Factory(t) { return new (t || MainControlsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialog"])); };
MainControlsComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: MainControlsComponent, selectors: [["app-main-controls"]], inputs: { TableCurrency: ["status", "TableCurrency"] }, outputs: { newTaskEvent: "newTaskEvent", clickBtn: "clickBtn", changeFilter: "changeFilter" }, decls: 7, vars: 4, consts: [[1, "MainControls"], [3, "text", "click", 4, "ngIf"], [1, "MainControls-r"], [3, "modification", "text", "click", 4, "ngIf"], ["matNativeControl", "", "class", "button MainControls-input", 3, "ngModel", "change", "ngModelChange", 4, "ngIf"], [3, "text", "click"], [3, "modification", "text", "click"], ["matNativeControl", "", 1, "button", "MainControls-input", 3, "ngModel", "change", "ngModelChange"], ["value", "all"], ["value", "bajo"], ["value", "medio"], ["value", "alto"]], template: function MainControlsComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, MainControlsComponent_main_button_2_Template, 1, 1, "main-button", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, MainControlsComponent_main_button_4_Template, 1, 2, "main-button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, MainControlsComponent_main_button_5_Template, 1, 2, "main-button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, MainControlsComponent_select_6_Template, 9, 1, "select", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.TableCurrency);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.TableCurrency);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.TableCurrency);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.TableCurrency);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["NgIf"], _shared_components_main_button_main_button_component__WEBPACK_IMPORTED_MODULE_4__["MainButtonComponent"], _angular_material_input__WEBPACK_IMPORTED_MODULE_5__["MatInput"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["SelectControlValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NgModel"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NgSelectOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ɵangular_packages_forms_forms_z"]], styles: [".MainControls[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  margin-bottom: 58px;\n  margin-top: 63px;\n}\n.MainControls-input[_ngcontent-%COMP%] {\n  width: 300px;\n  height: 35px;\n  background-color: transparent;\n  border: 0px;\n  border-bottom: 1px solid #A0A0A0;\n  margin-left: 50px;\n}\n.MainControls-input[_ngcontent-%COMP%]:focus-visible {\n  border: 0px;\n  border-bottom: 2px solid rgba(0, 0, 0, 0.87);\n  outline: none;\n}\n@media (max-width: 680px) {\n  .MainControls-input[_ngcontent-%COMP%] {\n    width: 180px;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFwuLlxcbWFpbi1jb250cm9scy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTtFQUNJLGFBQUE7RUFDQSw4QkFBQTtFQUNBLG1CQUFBO0VBQ0EsZ0JBQUE7QUFESjtBQUVJO0VBQ0ksWUFBQTtFQUNBLFlBQUE7RUFDQSw2QkFBQTtFQUNBLFdBQUE7RUFDQSxnQ0FBQTtFQUNBLGlCQUFBO0FBQVI7QUFHSTtFQUNJLFdBQUE7RUFDQSw0Q0FBQTtFQUNBLGFBQUE7QUFEUjtBQUtBO0VBQ0k7SUFDSSxZQUFBO0VBRk47QUFDRiIsImZpbGUiOiJtYWluLWNvbnRyb2xzLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiQGltcG9ydCAnLi4vLi4vLi4vc2hhcmVkL3N0eWxlL2NvbG9ycy5zY3NzJztcclxuXHJcbi5NYWluQ29udHJvbHMge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICAgIG1hcmdpbi1ib3R0b206IDU4cHg7XHJcbiAgICBtYXJnaW4tdG9wOjYzcHg7XHJcbiAgICAmLWlucHV0e1xyXG4gICAgICAgIHdpZHRoOiAzMDBweDtcclxuICAgICAgICBoZWlnaHQ6IDM1cHg7XHJcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XHJcbiAgICAgICAgYm9yZGVyOiAwcHg7XHJcbiAgICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICRUZXh0Q29sb3ItMztcclxuICAgICAgICBtYXJnaW4tbGVmdDogNTBweDtcclxuICAgIH1cclxuXHJcbiAgICAmLWlucHV0OmZvY3VzLXZpc2libGV7XHJcbiAgICAgICAgYm9yZGVyOiAwcHg7XHJcbiAgICAgICAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkIHJnYigwIDAgMCAvIDg3JSk7XHJcbiAgICAgICAgb3V0bGluZTogbm9uZTtcclxuICAgIH1cclxufVxyXG5cclxuQG1lZGlhIChtYXgtd2lkdGg6IDY4MHB4KSB7XHJcbiAgICAuTWFpbkNvbnRyb2xzLWlucHV0e1xyXG4gICAgICAgIHdpZHRoOiAxODBweDtcclxuICAgIH1cclxuICB9Il19 */"] });


/***/ }),

/***/ "RiuD":
/*!*************************************************!*\
  !*** ./src/app/shared/guard/auth.guardLogin.ts ***!
  \*************************************************/
/*! exports provided: AuthGuardlogin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthGuardlogin", function() { return AuthGuardlogin; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_auth_services_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/auth/services/auth.service */ "N/25");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");



class AuthGuardlogin {
    constructor(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    canActivate(next, state) {
        if (this.authService.isLoggedIn !== true) {
            this.router.navigate(['auth']);
            return false;
        }
        else {
            return true;
        }
    }
}
AuthGuardlogin.ɵfac = function AuthGuardlogin_Factory(t) { return new (t || AuthGuardlogin)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](src_app_auth_services_auth_service__WEBPACK_IMPORTED_MODULE_1__["AuthService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"])); };
AuthGuardlogin.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: AuthGuardlogin, factory: AuthGuardlogin.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "Rmni":
/*!***********************************************************!*\
  !*** ./src/app/tasks/components/chart/chart.component.ts ***!
  \***********************************************************/
/*! exports provided: ChartComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChartComponent", function() { return ChartComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

class ChartComponent {
    constructor() {
    }
    ngOnInit() {
    }
}
ChartComponent.ɵfac = function ChartComponent_Factory(t) { return new (t || ChartComponent)(); };
ChartComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ChartComponent, selectors: [["app-chart"]], inputs: { CompleteTasks: ["data", "CompleteTasks"] }, decls: 2, vars: 0, consts: [["id", "canvas"]], template: function ChartComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "canvas", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjaGFydC5jb21wb25lbnQuc2NzcyJ9 */"] });


/***/ }),

/***/ "S1vP":
/*!***************************************!*\
  !*** ./src/app/tasks/tasks.module.ts ***!
  \***************************************/
/*! exports provided: TasksModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TasksModule", function() { return TasksModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _pages_panel_tasks_panel_tasks_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pages/panel-tasks/panel-tasks.component */ "+aPS");
/* harmony import */ var _components_history_table_history_table_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/history-table/history-table.component */ "dGXp");
/* harmony import */ var _components_main_controls_main_controls_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/main-controls/main-controls.component */ "Qw9e");
/* harmony import */ var _components_main_table_main_table_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/main-table/main-table.component */ "Lx6T");
/* harmony import */ var _components_modal_task_modal_task_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/modal-task/modal-task.component */ "4ax4");
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/table */ "+0xr");
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/menu */ "STbY");
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/paginator */ "M9IT");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../shared/shared.module */ "PCNd");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _tasks_routing_module__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./tasks-routing.module */ "065y");
/* harmony import */ var _pipes_minutes_seconds_pipe__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./pipes/minutes-seconds.pipe */ "/Sa1");
/* harmony import */ var _components_modal_delete_task_modal_delete_task_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./components/modal-delete-task/modal-delete-task.component */ "wsGx");
/* harmony import */ var _components_chart_chart_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./components/chart/chart.component */ "Rmni");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/core */ "fXoL");




















class TasksModule {
}
TasksModule.ɵfac = function TasksModule_Factory(t) { return new (t || TasksModule)(); };
TasksModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵdefineNgModule"]({ type: TasksModule, bootstrap: [_pages_panel_tasks_panel_tasks_component__WEBPACK_IMPORTED_MODULE_1__["PanelTasksComponent"]] });
TasksModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            _tasks_routing_module__WEBPACK_IMPORTED_MODULE_15__["TasksRoutingModule"],
            _angular_material_paginator__WEBPACK_IMPORTED_MODULE_8__["MatPaginatorModule"],
            _angular_material_table__WEBPACK_IMPORTED_MODULE_6__["MatTableModule"],
            _shared_shared_module__WEBPACK_IMPORTED_MODULE_9__["SharedModule"],
            _angular_material_menu__WEBPACK_IMPORTED_MODULE_7__["MatMenuModule"],
            _angular_material_form_field__WEBPACK_IMPORTED_MODULE_14__["MatFormFieldModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_10__["FormsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_10__["ReactiveFormsModule"],
            _angular_material_input__WEBPACK_IMPORTED_MODULE_11__["MatInputModule"],
            _angular_material_button__WEBPACK_IMPORTED_MODULE_12__["MatButtonModule"],
            _angular_material_dialog__WEBPACK_IMPORTED_MODULE_13__["MatDialogModule"],
        ], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_14__["MatFormFieldModule"],
        _angular_material_input__WEBPACK_IMPORTED_MODULE_11__["MatInputModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵsetNgModuleScope"](TasksModule, { declarations: [_components_history_table_history_table_component__WEBPACK_IMPORTED_MODULE_2__["HistoryTableComponent"],
        _components_main_controls_main_controls_component__WEBPACK_IMPORTED_MODULE_3__["MainControlsComponent"],
        _components_main_table_main_table_component__WEBPACK_IMPORTED_MODULE_4__["MainTableComponent"],
        _pages_panel_tasks_panel_tasks_component__WEBPACK_IMPORTED_MODULE_1__["PanelTasksComponent"],
        _components_modal_task_modal_task_component__WEBPACK_IMPORTED_MODULE_5__["ModalTaskComponent"],
        _pipes_minutes_seconds_pipe__WEBPACK_IMPORTED_MODULE_16__["MinuteSecondsPipe"],
        _components_modal_delete_task_modal_delete_task_component__WEBPACK_IMPORTED_MODULE_17__["ModalTaskDeleteComponent"],
        _components_chart_chart_component__WEBPACK_IMPORTED_MODULE_18__["ChartComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
        _tasks_routing_module__WEBPACK_IMPORTED_MODULE_15__["TasksRoutingModule"],
        _angular_material_paginator__WEBPACK_IMPORTED_MODULE_8__["MatPaginatorModule"],
        _angular_material_table__WEBPACK_IMPORTED_MODULE_6__["MatTableModule"],
        _shared_shared_module__WEBPACK_IMPORTED_MODULE_9__["SharedModule"],
        _angular_material_menu__WEBPACK_IMPORTED_MODULE_7__["MatMenuModule"],
        _angular_material_form_field__WEBPACK_IMPORTED_MODULE_14__["MatFormFieldModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_10__["FormsModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_10__["ReactiveFormsModule"],
        _angular_material_input__WEBPACK_IMPORTED_MODULE_11__["MatInputModule"],
        _angular_material_button__WEBPACK_IMPORTED_MODULE_12__["MatButtonModule"],
        _angular_material_dialog__WEBPACK_IMPORTED_MODULE_13__["MatDialogModule"]], exports: [_components_modal_delete_task_modal_delete_task_component__WEBPACK_IMPORTED_MODULE_17__["ModalTaskDeleteComponent"],
        _angular_material_form_field__WEBPACK_IMPORTED_MODULE_14__["MatFormFieldModule"],
        _angular_material_input__WEBPACK_IMPORTED_MODULE_11__["MatInputModule"]] }); })();


/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _shared_components_header_header_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shared/components/header/header.component */ "aZ8m");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");



class AppComponent {
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 4, vars: 0, consts: [[1, "body"], [1, "container"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "app-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "router-outlet");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_shared_components_header_header_component__WEBPACK_IMPORTED_MODULE_1__["HeaderComponent"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterOutlet"]], styles: [".body[_ngcontent-%COMP%] {\n  background-color: #E5E5E5;\n  font-family: \"Poppins\";\n  min-width: 460px;\n}\n\n.container[_ngcontent-%COMP%] {\n  padding: 0 60px;\n  height: calc(100vh - 80px);\n}\n\n.button[_ngcontent-%COMP%] {\n  background: #0000;\n  color: white;\n  border: 0px;\n}\n\n.mat-menu-panel[_ngcontent-%COMP%] {\n  padding: 0px 5px;\n  background: #373737;\n}\n\n@media (max-width: 600px) {\n  .container[_ngcontent-%COMP%] {\n    padding: 0 15px;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcYXBwLmNvbXBvbmVudC5zY3NzIiwiLi5cXC4uXFxzaGFyZWRcXHN0eWxlXFxjb2xvcnMuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFJQTtFQUNJLHlCQ09PO0VETlAsc0JBQUE7RUFDQSxnQkFBQTtBQUhKOztBQUtBO0VBQ0ksZUFBQTtFQUNBLDBCQUFBO0FBRko7O0FBS0E7RUFDSSxpQkNYUztFRFlULFlDZGtCO0VEZWxCLFdBQUE7QUFGSjs7QUFLQTtFQUNJLGdCQUFBO0VBQ0EsbUJDakJTO0FEZWI7O0FBTUU7RUFDRTtJQUNJLGVBQUE7RUFITjtBQUNGIiwiZmlsZSI6ImFwcC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5AaW1wb3J0ICcuL3NoYXJlZC9zdHlsZS9jb2xvcnMuc2Nzcyc7XHJcblxyXG5cclxuLmJvZHl7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkYmFja2dyb3VkO1xyXG4gICAgZm9udC1mYW1pbHk6ICdQb3BwaW5zJztcclxuICAgIG1pbi13aWR0aDogNDYwcHg7XHJcbn1cclxuLmNvbnRhaW5lcntcclxuICAgIHBhZGRpbmc6IDAgNjBweDtcclxuICAgIGhlaWdodDogY2FsYygxMDB2aCAtIDgwcHgpO1xyXG59XHJcblxyXG4uYnV0dG9uIHtcclxuICAgIGJhY2tncm91bmQ6ICRUZXh0Q29sb3ItMTtcclxuICAgIGNvbG9yOiAkQnJhbkNvbG9yLXRlcnRpYXJ5O1xyXG4gICAgYm9yZGVyOiAwcHg7XHJcbn1cclxuXHJcbi5tYXQtbWVudS1wYW5lbCB7XHJcbiAgICBwYWRkaW5nOiAwcHggNXB4O1xyXG4gICAgYmFja2dyb3VuZDogJFRleHRDb2xvci0yO1xyXG4gICAgXHJcbiAgfVxyXG4gIFxyXG4gIEBtZWRpYSAobWF4LXdpZHRoOiA2MDBweCkge1xyXG4gICAgLmNvbnRhaW5lcntcclxuICAgICAgICBwYWRkaW5nOiAwIDE1cHg7XHJcbiAgICB9XHJcbiAgfSIsIiRCcmFuQ29sb3ItUHJpbmNpcGFsOiAjMDAwMDAwO1xyXG4kQnJhbkNvbG9yLVNlZ3VuZGFyeTogI0ZEREEyNTtcclxuJEJyYW5Db2xvci10ZXJ0aWFyeSA6IHdoaXRlO1xyXG5cclxuJFRleHRDb2xvci0xOiMwMDAwO1xyXG4kVGV4dENvbG9yLTI6IzM3MzczNztcclxuJFRleHRDb2xvci0zOiNBMEEwQTA7XHJcblxyXG4kaW5kaWNhdGlvbi1pbmZvOiMyMTc2RkY7XHJcbiRpbmRpY2F0aW9uLXN1Y2Nlc3M6IzAwODc5NjtcclxuJGluZGljYXRpb24tZXJyb3I6I0ZGNkEzOTtcclxuXHJcbiRiYWNrZ3JvdWQ6I0U1RTVFNTtcclxuXHJcbiJdfQ== */"] });


/***/ }),

/***/ "Yj9t":
/*!*************************************!*\
  !*** ./src/app/auth/auth.module.ts ***!
  \*************************************/
/*! exports provided: AuthModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthModule", function() { return AuthModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _components_login_login_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/login/login.component */ "OuDC");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/shared.module */ "PCNd");
/* harmony import */ var _auth_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./auth-routing.module */ "6epW");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ "fXoL");








class AuthModule {
}
AuthModule.ɵfac = function AuthModule_Factory(t) { return new (t || AuthModule)(); };
AuthModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineNgModule"]({ type: AuthModule });
AuthModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjector"]({ imports: [[
            _angular_router__WEBPACK_IMPORTED_MODULE_6__["RouterModule"],
            _auth_routing_module__WEBPACK_IMPORTED_MODULE_5__["AuthRoutingModule"],
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            _angular_material_form_field__WEBPACK_IMPORTED_MODULE_2__["MatFormFieldModule"],
            _shared_shared_module__WEBPACK_IMPORTED_MODULE_4__["SharedModule"],
            _angular_material_input__WEBPACK_IMPORTED_MODULE_3__["MatInputModule"],
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵsetNgModuleScope"](AuthModule, { declarations: [_components_login_login_component__WEBPACK_IMPORTED_MODULE_1__["LoginComponent"]], imports: [_angular_router__WEBPACK_IMPORTED_MODULE_6__["RouterModule"],
        _auth_routing_module__WEBPACK_IMPORTED_MODULE_5__["AuthRoutingModule"],
        _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
        _angular_material_form_field__WEBPACK_IMPORTED_MODULE_2__["MatFormFieldModule"],
        _shared_shared_module__WEBPACK_IMPORTED_MODULE_4__["SharedModule"],
        _angular_material_input__WEBPACK_IMPORTED_MODULE_3__["MatInputModule"]] }); })();


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../environments/environment */ "AytR");
/* harmony import */ var _angular_fire__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/fire */ "spgP");
/* harmony import */ var _angular_fire_auth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/fire/auth */ "UbJi");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app-routing.module */ "vY5A");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser/animations */ "R1ws");
/* harmony import */ var _auth_auth_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./auth/auth.module */ "Yj9t");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./shared/shared.module */ "PCNd");
/* harmony import */ var _tasks_tasks_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./tasks/tasks.module */ "S1vP");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ "fXoL");












class AppModule {
}
AppModule.ɵfac = function AppModule_Factory(t) { return new (t || AppModule)(); };
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineInjector"]({ providers: [], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _angular_fire_auth__WEBPACK_IMPORTED_MODULE_3__["AngularFireAuthModule"],
            _angular_fire__WEBPACK_IMPORTED_MODULE_2__["AngularFireModule"].initializeApp(_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].firebase),
            _angular_fire_auth__WEBPACK_IMPORTED_MODULE_3__["AngularFireAuthModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_4__["AppRoutingModule"],
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["BrowserAnimationsModule"],
            // Own Modules
            _auth_auth_module__WEBPACK_IMPORTED_MODULE_7__["AuthModule"],
            _shared_shared_module__WEBPACK_IMPORTED_MODULE_8__["SharedModule"],
            _tasks_tasks_module__WEBPACK_IMPORTED_MODULE_9__["TasksModule"],
            _angular_fire_auth__WEBPACK_IMPORTED_MODULE_3__["AngularFireAuthModule"],
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _angular_fire_auth__WEBPACK_IMPORTED_MODULE_3__["AngularFireAuthModule"], _angular_fire__WEBPACK_IMPORTED_MODULE_2__["AngularFireModule"], _angular_fire_auth__WEBPACK_IMPORTED_MODULE_3__["AngularFireAuthModule"],
        _app_routing_module__WEBPACK_IMPORTED_MODULE_4__["AppRoutingModule"],
        _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["BrowserAnimationsModule"],
        // Own Modules
        _auth_auth_module__WEBPACK_IMPORTED_MODULE_7__["AuthModule"],
        _shared_shared_module__WEBPACK_IMPORTED_MODULE_8__["SharedModule"],
        _tasks_tasks_module__WEBPACK_IMPORTED_MODULE_9__["TasksModule"],
        _angular_fire_auth__WEBPACK_IMPORTED_MODULE_3__["AngularFireAuthModule"]] }); })();


/***/ }),

/***/ "aZ8m":
/*!**************************************************************!*\
  !*** ./src/app/shared/components/header/header.component.ts ***!
  \**************************************************************/
/*! exports provided: HeaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderComponent", function() { return HeaderComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_auth_services_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/auth/services/auth.service */ "N/25");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "ofXK");





function HeaderComponent_a_4_Template(rf, ctx) { if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "a", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function HeaderComponent_a_4_Template_a_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r3); const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return ctx_r2.logout(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, " Cerrar Sesion ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
class HeaderComponent {
    constructor(authSvc, router) {
        this.authSvc = authSvc;
        this.router = router;
        this.isLoggedIn = false;
        this.userCurrency = this.authSvc.afAuth.user;
    }
    ngOnInit() {
        this.isLoggedIn = this.authSvc.isLoggedIn;
    }
    logout() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            try {
                yield this.authSvc.logout();
                this.isLoggedIn = false;
                localStorage.removeItem('user');
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
HeaderComponent.ɵfac = function HeaderComponent_Factory(t) { return new (t || HeaderComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_auth_services_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"])); };
HeaderComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: HeaderComponent, selectors: [["app-header"]], decls: 6, vars: 3, consts: [[1, "Header"], [1, "Header-RContainer"], ["src", "./assets/images/logo.png", "alt", "CARGAMOS", 1, "Header-Img"], [1, "Header-LContainer"], ["class", "Header-Link", 3, "click", 4, "ngIf"], [1, "Header-Link", 3, "click"]], template: function HeaderComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "header", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "img", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, HeaderComponent_a_4_Template, 3, 0, "a", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](5, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](5, 1, ctx.userCurrency));
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["AsyncPipe"]], styles: [".Header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  background-color: #000000;\n  height: 80px;\n  padding: 0 60px;\n  justify-content: space-between;\n}\n.Header-Img[_ngcontent-%COMP%] {\n  height: 30px;\n}\n.Header-Link[_ngcontent-%COMP%] {\n  color: white;\n  cursor: pointer;\n}\n@media (max-width: 600px) {\n  .Header[_ngcontent-%COMP%] {\n    padding: 0 15px;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFwuLlxcaGVhZGVyLmNvbXBvbmVudC5zY3NzIiwiLi5cXC4uXFwuLlxcLi5cXC4uXFwuLlxcLi5cXHN0eWxlXFxjb2xvcnMuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFJQTtFQUNJLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHlCQ1BrQjtFRFFsQixZQUFBO0VBQ0EsZUFBQTtFQUNBLDhCQUFBO0FBSEo7QUFJSTtFQUNJLFlBQUE7QUFGUjtBQUlJO0VBQ0ksWUNiYztFRGNkLGVBQUE7QUFGUjtBQU1BO0VBQ0k7SUFDSSxlQUFBO0VBSE47QUFDRiIsImZpbGUiOiJoZWFkZXIuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuQGltcG9ydCAnLi4vLi4vc3R5bGUvY29sb3JzLnNjc3MnO1xyXG5cclxuXHJcbi5IZWFkZXJ7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICRCcmFuQ29sb3ItUHJpbmNpcGFsO1xyXG4gICAgaGVpZ2h0OiA4MHB4O1xyXG4gICAgcGFkZGluZzogMCA2MHB4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gICAgJi1JbWd7XHJcbiAgICAgICAgaGVpZ2h0OiAzMHB4OyAgICBcclxuICAgIH1cclxuICAgICYtTGlua3tcclxuICAgICAgICBjb2xvcjogJEJyYW5Db2xvci10ZXJ0aWFyeTtcclxuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICB9XHJcbn1cclxuXHJcbkBtZWRpYSAobWF4LXdpZHRoOiA2MDBweCkge1xyXG4gICAgLkhlYWRlcntcclxuICAgICAgICBwYWRkaW5nOiAwIDE1cHg7XHJcbiAgICB9XHJcbiAgfSIsIiRCcmFuQ29sb3ItUHJpbmNpcGFsOiAjMDAwMDAwO1xyXG4kQnJhbkNvbG9yLVNlZ3VuZGFyeTogI0ZEREEyNTtcclxuJEJyYW5Db2xvci10ZXJ0aWFyeSA6IHdoaXRlO1xyXG5cclxuJFRleHRDb2xvci0xOiMwMDAwO1xyXG4kVGV4dENvbG9yLTI6IzM3MzczNztcclxuJFRleHRDb2xvci0zOiNBMEEwQTA7XHJcblxyXG4kaW5kaWNhdGlvbi1pbmZvOiMyMTc2RkY7XHJcbiRpbmRpY2F0aW9uLXN1Y2Nlc3M6IzAwODc5NjtcclxuJGluZGljYXRpb24tZXJyb3I6I0ZGNkEzOTtcclxuXHJcbiRiYWNrZ3JvdWQ6I0U1RTVFNTtcclxuXHJcbiJdfQ== */"] });


/***/ }),

/***/ "dGXp":
/*!***************************************************************************!*\
  !*** ./src/app/tasks/components/history-table/history-table.component.ts ***!
  \***************************************************************************/
/*! exports provided: HistoryTableComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HistoryTableComponent", function() { return HistoryTableComponent; });
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/material/table */ "+0xr");
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/paginator */ "M9IT");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _services_tasks_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/tasks.service */ "2tJE");
/* harmony import */ var _pipes_minutes_seconds_pipe__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../pipes/minutes-seconds.pipe */ "/Sa1");







function HistoryTableComponent_th_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "th", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " Descripci\u00F3n");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
function HistoryTableComponent_td_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "td", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const element_r10 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", element_r10.description, " ");
} }
function HistoryTableComponent_th_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "th", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " Tiempo asignado");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
function HistoryTableComponent_td_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "td", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](2, "minuteSeconds");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const element_r11 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](2, 1, element_r11.durationS), " ");
} }
function HistoryTableComponent_th_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "th", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " Tiempo restante");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
function HistoryTableComponent_td_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "td", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](2, "minuteSeconds");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const element_r12 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](2, 1, element_r12.timeS), " ");
} }
function HistoryTableComponent_th_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "th", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " Fecha de completuds");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
function HistoryTableComponent_td_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "td", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const element_r13 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", element_r13.dateComplete, " ");
} }
function HistoryTableComponent_tr_14_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "tr", 13);
} }
function HistoryTableComponent_tr_15_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "tr", 14);
} }
const _c0 = function () { return [5, 10, 20]; };
class HistoryTableComponent {
    constructor(_servicio) {
        this._servicio = _servicio;
        this.displayedColumns = ['descripcion', 'durationS', 'timeS', 'dateComplete'];
    }
    updateHistoryTable(CompleteTasks) {
        this.TableHistoryTasks = new _angular_material_table__WEBPACK_IMPORTED_MODULE_0__["MatTableDataSource"](CompleteTasks);
        this.TableHistoryTasks.paginator = this.paginator2;
    }
    ngOnInit() {
        this.updateHistoryTable(this.CompleteTasks);
    }
}
HistoryTableComponent.ɵfac = function HistoryTableComponent_Factory(t) { return new (t || HistoryTableComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_services_tasks_service__WEBPACK_IMPORTED_MODULE_3__["TasksService"])); };
HistoryTableComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: HistoryTableComponent, selectors: [["app-history-table"]], viewQuery: function HistoryTableComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_angular_material_paginator__WEBPACK_IMPORTED_MODULE_1__["MatPaginator"], 3);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.paginator2 = _t.first);
    } }, inputs: { CompleteTasks: ["data", "CompleteTasks"] }, decls: 17, vars: 5, consts: [[1, "mainTable"], ["mat-table", "", 3, "dataSource"], ["matColumnDef", "descripcion"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "durationS"], ["matColumnDef", "timeS"], ["matColumnDef", "dateComplete"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], [3, "pageSizeOptions"], ["mat-header-cell", ""], ["mat-cell", ""], ["mat-header-row", ""], ["mat-row", ""]], template: function HistoryTableComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "table", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](2, 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](3, HistoryTableComponent_th_3_Template, 2, 0, "th", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](4, HistoryTableComponent_td_4_Template, 2, 1, "td", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](5, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](6, HistoryTableComponent_th_6_Template, 2, 0, "th", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](7, HistoryTableComponent_td_7_Template, 3, 3, "td", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](8, 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](9, HistoryTableComponent_th_9_Template, 2, 0, "th", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](10, HistoryTableComponent_td_10_Template, 3, 3, "td", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](11, 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](12, HistoryTableComponent_th_12_Template, 2, 0, "th", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](13, HistoryTableComponent_td_13_Template, 2, 1, "td", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](14, HistoryTableComponent_tr_14_Template, 1, 0, "tr", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](15, HistoryTableComponent_tr_15_Template, 1, 0, "tr", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](16, "mat-paginator", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("dataSource", ctx.TableHistoryTasks);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](13);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("matHeaderRowDef", ctx.displayedColumns);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("matRowDefColumns", ctx.displayedColumns);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("pageSizeOptions", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](4, _c0));
    } }, directives: [_angular_material_table__WEBPACK_IMPORTED_MODULE_0__["MatTable"], _angular_material_table__WEBPACK_IMPORTED_MODULE_0__["MatColumnDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_0__["MatHeaderCellDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_0__["MatCellDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_0__["MatHeaderRowDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_0__["MatRowDef"], _angular_material_paginator__WEBPACK_IMPORTED_MODULE_1__["MatPaginator"], _angular_material_table__WEBPACK_IMPORTED_MODULE_0__["MatHeaderCell"], _angular_material_table__WEBPACK_IMPORTED_MODULE_0__["MatCell"], _angular_material_table__WEBPACK_IMPORTED_MODULE_0__["MatHeaderRow"], _angular_material_table__WEBPACK_IMPORTED_MODULE_0__["MatRow"]], pipes: [_pipes_minutes_seconds_pipe__WEBPACK_IMPORTED_MODULE_4__["MinuteSecondsPipe"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJoaXN0b3J5LXRhYmxlLmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ "jnhf":
/*!*************************************************!*\
  !*** ./src/app/tasks/services/chart.service.ts ***!
  \*************************************************/
/*! exports provided: ChartService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChartService", function() { return ChartService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

class ChartService {
    constructor() { }
    organizedata(data) {
    }
}
ChartService.ɵfac = function ChartService_Factory(t) { return new (t || ChartService)(); };
ChartService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: ChartService, factory: ChartService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "vY5A":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _shared_guard_auth_guardLogin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shared/guard/auth.guardLogin */ "RiuD");
/* harmony import */ var _shared_guard_auth_guardLogout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shared/guard/auth.guardLogout */ "xmUP");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");





const routes = [
    {
        path: 'tasks',
        loadChildren: () => Promise.resolve(/*! import() */).then(__webpack_require__.bind(null, /*! ./tasks/tasks.module */ "S1vP")).then(m => m.TasksModule), canActivate: [_shared_guard_auth_guardLogin__WEBPACK_IMPORTED_MODULE_1__["AuthGuardlogin"]]
    },
    {
        path: 'auth',
        loadChildren: () => Promise.resolve(/*! import() */).then(__webpack_require__.bind(null, /*! ./auth/auth.module */ "Yj9t")).then(m => m.AuthModule), canActivate: [_shared_guard_auth_guardLogout__WEBPACK_IMPORTED_MODULE_2__["AuthGuardlogout"]]
    },
    { path: '**', redirectTo: 'tasks' }
];
class AppRoutingModule {
}
AppRoutingModule.ɵfac = function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); };
AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ }),

/***/ "wsGx":
/*!***********************************************************************************!*\
  !*** ./src/app/tasks/components/modal-delete-task/modal-delete-task.component.ts ***!
  \***********************************************************************************/
/*! exports provided: ModalTaskDeleteComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModalTaskDeleteComponent", function() { return ModalTaskDeleteComponent; });
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/button */ "bTqV");




class ModalTaskDeleteComponent {
    constructor(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.description = "";
    }
    ngOnInit() {
        this.description = this.data.description;
    }
    confirmar(value) {
        this.dialogRef.close(value);
    }
}
ModalTaskDeleteComponent.ɵfac = function ModalTaskDeleteComponent_Factory(t) { return new (t || ModalTaskDeleteComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_0__["MatDialogRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_0__["MAT_DIALOG_DATA"])); };
ModalTaskDeleteComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: ModalTaskDeleteComponent, selectors: [["app-modal-delete-task"]], decls: 9, vars: 1, consts: [["mat-dialog-content", ""], ["mat-button", "", "color", "primary", "mat-dialog-close", "", 3, "click"]], template: function ModalTaskDeleteComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "button", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ModalTaskDeleteComponent_Template_button_click_5_listener() { return ctx.confirmar(true); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, "Confirmar");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "button", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ModalTaskDeleteComponent_Template_button_click_7_listener() { return ctx.confirmar(false); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8, "Cancelar");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("Desea Borrar la tarea ", ctx.description, " ");
    } }, directives: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_0__["MatDialogContent"], _angular_material_button__WEBPACK_IMPORTED_MODULE_2__["MatButton"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_0__["MatDialogClose"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJtb2RhbC1kZWxldGUtdGFzay5jb21wb25lbnQuc2NzcyJ9 */"] });


/***/ }),

/***/ "xmUP":
/*!**************************************************!*\
  !*** ./src/app/shared/guard/auth.guardLogout.ts ***!
  \**************************************************/
/*! exports provided: AuthGuardlogout */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthGuardlogout", function() { return AuthGuardlogout; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_auth_services_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/auth/services/auth.service */ "N/25");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");



class AuthGuardlogout {
    constructor(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    canActivate(next, state) {
        if (this.authService.isLoggedIn == true) {
            this.router.navigate(['task']);
            return false;
        }
        else {
            return true;
        }
    }
}
AuthGuardlogout.ɵfac = function AuthGuardlogout_Factory(t) { return new (t || AuthGuardlogout)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](src_app_auth_services_auth_service__WEBPACK_IMPORTED_MODULE_1__["AuthService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"])); };
AuthGuardlogout.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: AuthGuardlogout, factory: AuthGuardlogout.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "AytR");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map