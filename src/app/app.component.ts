import {Component, OnInit} from '@angular/core';
import {NewServiceService} from "./new-service.service";
import {arrayTable} from "../jsonArray/arrayTable"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public tableArr = arrayTable
  public parentsArray: any[] = []

  constructor(private service: NewServiceService) {
  }

  ngOnInit() {
    this.parentsArray = arrayTable.filter(f => !f.parentId);
    this.service.status$.subscribe((statusFilter) => {
      switch (statusFilter) {
            case 1:
              return this.parentsArray = arrayTable.filter(f => f.isActive && !f.parentId)
            case 2:
              return this.parentsArray = arrayTable.filter(f => !f.isActive && !f.parentId)
            default:
              return this.parentsArray = arrayTable.filter(f => !f.parentId)
          }
    })
  }


  getChildren(parentId: number) {
    return this.tableArr.filter(f => f.parentId === parentId)
  }
}
