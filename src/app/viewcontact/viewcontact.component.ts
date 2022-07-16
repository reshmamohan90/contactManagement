import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, switchMap, tap } from 'rxjs';
import { MyContact, UserDetails } from '../models/myContact';
import { MyGroup } from '../models/myGroup';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-viewcontact',
  templateUrl: 'viewcontact.component.html',
  styleUrls: ['viewcontact.component.scss'],
})
export class ViewcontactComponent implements OnInit {
  public contactId: string | null = null;
  public loading: boolean = false;
  public contact: MyContact = {} as MyContact;
  public errorMessage: string | null = null;
  public userDetails$!: Observable<UserDetails>;
  constructor(
    private activatedRoute: ActivatedRoute,
    private contService: ContactService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param) => {
      this.contactId = param.get('contactId');
    });
    if (this.contactId) {
      this.loading = true;
      // this.contService.getContacts(this.contactId).subscribe(
      //   (data: MyContact) => {
      //     this.contact = data;
      //     this.loading = false;
      //     this.contService.getGroup(data).subscribe(data1 => {
      //       this.group = data1;
      //     });
      //   },
      //   (error) => {
      //     this.errorMessage = error;
      //     this.loading = false;
      //   }
      // );

      this.userDetails$ = this.contService.getContacts(this.contactId).pipe(
        tap(() => this.loading = false),
        switchMap((data: MyContact) => this.contService.getGroup(data).pipe(
          map(res => ({...data, userName: data.name, ...res})
        ))
      ))
    }
  }
  // public isNotEmpty() {
  //   return Object.keys(this.contact).length > 0 && Object.keys(this.group).length>0;
  // }
}
