import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { OrcidService } from '../orcid.service';

@Component({
  selector: 'app-orcid-list',
  templateUrl: './orcid-list.component.html',
  styleUrls: ['./orcid-list.component.css'],
})
export class OrcidListComponent implements OnInit {
  listOrcid: any;  

  orcidForm = this.fb.group({
    orcid: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private orcidService: OrcidService,
    private router: Router
  ) { }

  ngOnInit(): void 
  {
    this.orcidService.getOrcids()
      .subscribe((data) => {
        this.listOrcid = data;

        console.dir(this.listOrcid)
      })
  }

  onSubmit()
  {
    if (!(this.orcidForm.valid))
      return;

    this.orcidService.createOrcid(this.orcidForm.controls.orcid.value)
      .subscribe((data) => {
        console.dir(data);

        // this.orcidForm.controls.orcid.setValue('');
        this.orcidForm.reset();
        this.ngOnInit();
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
        console.dir(response);

        this.ngOnInit();
      });
  }

  goToPage(link: string)
  {
    this.orcidService.getPage(link)
      .subscribe(data => {
        this.listOrcid = data;

        console.dir(data);
      });
  }

  get orcid() { return this.orcidForm.controls.orcid }
}