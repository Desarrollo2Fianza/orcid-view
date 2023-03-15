import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';

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
      
    console.dir(this.orcidForm.controls.orcid.value);

    this.orcidService.createOrcid(this.orcidForm.controls.orcid.value)
      .subscribe((data) => {
        console.dir(data);

        this.ngOnInit();
      })
  }

  get orcid() { return this.orcidForm.controls.orcid }
}
