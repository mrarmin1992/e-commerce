import { Component, OnInit } from '@angular/core';
import { IProduct } from '../shared/models/product';
import { ShopParams } from '../shared/models/shopParams';
import { ShopService } from '../shop/shop.service';
import { AdminService } from './admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  products: IProduct[];
  totalCount: number;
  shopParams: ShopParams;

  constructor(
    private shopService: ShopService,
    private adminService: AdminService
  ) {
    this.shopParams = this.shopService.getShopParams();
  }

  ngOnInit(): void {
    this.GetProducts();
  }

  // tslint:disable-next-line: typedef
  GetProducts(useCache = false) {
    // tslint:disable-next-line: deprecation
    this.shopService.getProducts(useCache).subscribe(
      (response) => {
        this.products = response.data;
        this.totalCount = response.count;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // tslint:disable-next-line: typedef
  onPageChanged(event: any) {
    const params = this.shopService.getShopParams();
    if (params.pageNumber !== event) {
      params.pageNumber = event;
      this.shopService.setShopParams(params);
      this.GetProducts(true);
    }
  }

  // tslint:disable-next-line: typedef
  deleteProduct(id: number) {
    // tslint:disable-next-line: deprecation
    this.adminService.deleteProduct(id).subscribe((response: any) => {
      this.products.splice(
        this.products.findIndex((p) => p.id === id),
        1
      );
      this.totalCount--;
    });
  }
}
