import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EditorService } from '@app/core/services/editor.service';
import { Subject, throwError } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

/**
 * Table edit component
 */
@Component({
  selector: 'collection-editor-frontend-table-edit',
  templateUrl: './table-edit.component.html',
  styleUrls: ['./table-edit.component.scss'],
})
export class TableEditComponent implements OnInit, OnDestroy {
  /**
   * Table id
   */
  tableId: number;
  /**
   * Data table
   */
  dataTable;
  /**
   * Column names
   */
  headings = [];
  /**
   * Data table settings
   */
  dtOptions: DataTables.Settings;
  /**
   * Data table trigger
   */
  dtTrigger: Subject<any> = new Subject();
  /**
   * Is open
   */
  isOpen = false;
  /**
   * Row details
   */
  rowDetails;
  /**
   * Datatable directive
   */
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective;

  /**
   * Table edit constructor
   * @param route Route
   * @param editorService Editor service
   */
  constructor(private route: ActivatedRoute, private editorService: EditorService) {}

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
    };
    this.route.params.subscribe((param) => {
      this.tableId = param.id;
      this.getData(this.tableId);
    });
  }

  /**
   * Fetch data from API and set up column filtering
   * @param id id
   */
  getData(id: number) {
    this.editorService.getDataTableById(id).subscribe((response) => {
      this.dataTable = response.results;
      this.headings = Object.keys(this.dataTable[0]);
      this.headings.splice(this.headings.indexOf('_id'), 1);
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 2,
      };
      this.dtTrigger.next();

      this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.columns().every(function () {
          const that = this;
          $('input', this.footer()).on('keyup change', function () {
            if (that.search() !== this['value']) {
              that.search(this['value']).draw();
            }
          });
        });
      });
    });
  }

  /**
   * Delete row in table
   * @param rowId Row id
   */
  deleteRow(rowId: string) {
    this.editorService.deleteRowById(this.tableId, rowId).subscribe(
      (response) => {
        this.getData(this.tableId);
      },
      (error) => {
        throwError(error.error);
      }
    );
  }

  /**
   * Add row to table
   */
  addRow() {
    const temp = {};
    this.headings.forEach((heading) => {
      temp[heading] = ' ';
    });
    this.editorService.addNewRow(this.tableId, temp).subscribe(
      (response) => {
        this.getData(this.tableId);
      },
      (error) => {
        throwError(error.error);
      }
    );
  }

  /**
   * Edit table row
   * @param rowId Row id
   */
  editRow(row: any) {
    this.isOpen = !this.isOpen;
    this.rowDetails = row;
  }

  /**
   * Unsubscribe to datatable trigger
   */
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
