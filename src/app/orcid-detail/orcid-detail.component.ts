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
        console.log(response);
      })
  }
}