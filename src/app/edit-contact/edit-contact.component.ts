import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MyContact } from '../models/myContact';
import { MyGroup } from '../models/myGroup';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss'],
})
export class EditContactComponent implements OnInit {
  public loading: boolean = false;
  public contactId: string | null = null;
  public contact: MyContact = {} as MyContact;
  public errorMessage!: string | null;
  public groups: MyGroup[] = [] as MyGroup[];

  constructor(
    private activatedRouter: ActivatedRoute,
    private contService: ContactService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRouter.paramMap.subscribe((param) => {
      this.contactId = param.get('contactId');
    });

    this.contService.getAllGroups().subscribe((data: MyGroup[]) => {
      this.groups = data;
    },(error)=>{
      this.errorMessage = error;
    })


    if (this.contactId) {
      this.contService.getContacts(this.contactId).subscribe(
        (data: MyContact) => {
          this.contact = data;
          this.loading = false;
        },
        (error) => {
          this.errorMessage = error;
          this.loading = false;
        }
      );
    }
  }
  submitUpdate() {
    if (this.contactId) {
      this.contService.updateContacts(this.contact, this.contactId).subscribe(
        (data: MyContact[]) => {
          this.router.navigate(['/']).then();
        },
        (error) => {
          this.errorMessage = error;
          this.router.navigate([`/contacts/edit/${this.contact}`]).then();
        }
      );
    }
  }
}
