import { Component } from '@angular/core';
import { ColDef, GridApi, GridOptions } from 'ag-grid-community';
import { AuthFacade } from '../../facade/auth.facade';

@Component({
  selector: 'app-list-info',
  standalone: false,
  templateUrl: './list-info.component.html',
  styleUrl: './list-info.component.scss',
})
export class ListInfoComponent {
  collections = [
    'projects',
    'organizations',
    'repositories',
    'users',
    'events',
    'issues',
    'pull',
  ];

  rowData = [
    {
      projectName: 'name',
      projectId: 565884,
      manager: 'manager',
      progress: 80,
      status: 'new',
    },
    {
      projectName: 'name',
      projectId: 565884,
      manager: 'manager',
      progress: 80,
      status: 'new',
    },
  ];

  colDefs: ColDef[] = [];

  gridApi!: GridApi<any>;
  lastPage: number = 1;

  token$: string | null = null;

  constructor(public authFacade: AuthFacade) {}

  ngOnInit(): void {
    Object.keys(this.rowData[0]).forEach((key) => {
      this.colDefs.push({
        headerName: key.toString(),
        field: key.toString(),
        filter: true,
        sortable: false,
      });
    });
    this.authFacade.token$.subscribe((token) => {
      this.token$ = token;
    });
  }

  onGridReady = (params: any) => {
    params.api.sizeColumnsToFit();
    this.gridApi = params.api;
  };

  gridOptions: GridOptions = {
    columnDefs: this.colDefs,
    rowData: this.rowData,
    domLayout: 'autoHeight',
    rowSelection: 'multiple',

    // pagination: true,
    // paginationPageSize: 12,
    // paginationAutoPageSize: true,
    // suppressPaginationPanel: true,

    defaultColDef: {
      flex: 1,
      minWidth: 100,
      resizable: true,
    },
    onGridReady: this.onGridReady,
  };
}
