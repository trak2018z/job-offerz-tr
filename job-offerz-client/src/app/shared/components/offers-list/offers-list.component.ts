import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Offer} from "../../../models/offer";
import {Page} from "../../../models/pagination/page";
import {PageRequest} from "../../../models/pagination/page-request";
import {AppConsts} from "../../../utils/app-consts";

@Component({
  selector: 'app-offers-list',
  templateUrl: 'offers-list.component.html',
  styleUrls: ['offers-list.component.scss']
})
export class OffersListComponent implements OnInit {

  @Input('offers')
  offers: Page<Offer>;

  @Input('loading')
  loading: boolean = false;

  @Input('editEnabled')
  editEnabled: boolean = false;

  @Input('favEnabled')
  favEnabled: boolean = false;

  @Output()
  pageChange: EventEmitter<PageRequest> = new EventEmitter<PageRequest>();

  @Output()
  actionClick: EventEmitter<{_id: string, type: string}> = new EventEmitter<{_id: string, type: string}>();

  constructor() { }

  ngOnInit() {
  }

  setPage({pageSize, pageIndex}) {
    const pageRequest = new PageRequest();
    pageRequest.limit = pageSize;
    pageRequest.page = pageIndex + 1;
    this.pageChange.next(pageRequest);
  }

  emitFavClick(_id: string) {
    this.actionClick.next({_id, type: AppConsts.ACTION_FAVORITE});
  }

  onDeleteClick(event: Event, _id: string) {
    event.stopPropagation();
    this.actionClick.next({_id, type: AppConsts.ACTION_DELETE});
  }

  onEditClick(event: Event, _id: string) {
    event.stopPropagation();
    this.actionClick.next({_id, type: AppConsts.ACTION_EDIT});
  }

}
