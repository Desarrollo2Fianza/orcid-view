import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { OrcidService } from '../orcid.service';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-orcid-list',
  templateUrl: './orcid-list.component.html',
  styleUrls: ['./orcid-list.component.css'],
  providers: [
    ConfirmationService, 
    MessageService,
  ],
})

export class OrcidListComponent implements OnInit {
  listOrcid: any;  

  orcidForm = this.fb.group({
    orcid: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private orcidService: OrcidService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit(): void 
  {
    this.orcidService.getOrcids()
      .subscribe((response) => {
        this.listOrcid = response;
      })
  }

  onSubmit()
  {
    if (!(this.orcidForm.valid))
      return;

    this.orcidService.createOrcid(this.orcidForm.controls.orcid.value)
      .subscribe((response) => {
        this.showMessage(response.response, response.message);

        if (response.response == "successful")
        {
          this.orcidForm.reset();
          this.ngOnInit();
        }
      })
  }

  orcidDetails(id: string)
  {
    this.router.navigate(['/orcid-detail', id]);
  }

  deleteOrcid(id: string)
  {
    this.orcidService.deleteOrcid(id)
      .subscribe((response) =>{
        this.messageService.add({
          severity:'error', 
          summary:'Confirmed', 
          detail:'The orcid was deleted'
        });

        this.ngOnInit();
      });
  }

  goToPage(link: string)
  {
    this.orcidService.getPage(link)
      .subscribe(response => {
        this.listOrcid = response;
      });
  }

  showMessage(severity: string, message: string) 
  {
    if (severity == 'unsuccessful')
      severity = 'warn';
    else
      severity = "success";

    this.messageService.add({
      severity: severity, 
      summary: message, 
    });
  }

  confirmDelete(orcid: string) {
    this.confirmationService.confirm({
        message: `Está seguro que desea eliminar el orcid: ${orcid}?`,
        header: 'Delete Orcid',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.deleteOrcid(orcid);
        },
        reject: () => { }
    });
  }

  makeLabel(indice: number)
  {
    let label: number | string = '';

    if (indice == 0)
      label = 'Prev.'
    else if(indice == (this.listOrcid.meta.links.length - 1))
      label = 'Next';
    else
      label = indice.toString();

    return label
  }

  get orcid() { return this.orcidForm.controls.orcid }
}