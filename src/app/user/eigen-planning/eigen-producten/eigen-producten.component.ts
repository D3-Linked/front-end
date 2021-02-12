import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-eigen-producten',
  templateUrl: './eigen-producten.component.html',
  styleUrls: ['./eigen-producten.component.scss'],
})
export class EigenProductenComponent implements OnInit {
  @Input() leveringId: string;
  producten : Product[];

  constructor(private userService: UserService) {}

  //Laad alle producten van een bepaalde levering
  ngOnInit(): void {
    this.userService.getProductenByLeveringId(parseInt(this.leveringId)).subscribe(result => {
      this.producten = result;
      console.log(result);
    })
  }
}
