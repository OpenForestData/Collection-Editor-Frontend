import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryComponent } from './history.component';
import { ListHistoryComponent } from './list-history/list-history.component';
import { HistoryRoutingModule } from './history-routing.module';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  imports: [CommonModule, HistoryRoutingModule, SharedModule],
  declarations: [HistoryComponent, ListHistoryComponent],
})
export class HistoryModule {}
