import { Component } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { OrcidService } from '../orcid.service';

@Component({
  selector: 'app-orcid-detail',
  templateUrl: './orcid-detail.component.html',
  styleUrls: ['./orcid-detail.component.css']
})
export class OrcidDetailComponent {
  orcidDetails: any;
  orcidExists = false;
  message: any;

  constructor(
    private route: ActivatedRoute,
    private orcidService: OrcidService
  ) { }

  ngOnInit()
  {
    this.getOrcid();
  }

  getOrcid()
  {
    const id = this.route.snapshot.paramMap.get('id');

    this.orcidService.getOrcid(id!)
      .subscribe((response) => {
        if (this.existsOrcid(response,'data'))
          this.orcidDetails = response.data;
        else
          this.message = response.message;
      })
  }

  existsOrcid(object: any, property: string)
  {
    return this.orcidExists = object.hasOwnProperty(property);
  }
}