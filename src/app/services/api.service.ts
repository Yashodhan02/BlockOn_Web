import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://127.0.0.1:8000/api/';


  constructor(private http: HttpClient) { }

  getLoginDetail(formData: any): Observable<any> {

    // let params = new HttpParams()
    // .set('userName', userName)
    // .set('password', password);

    return this.http.post(`${this.baseUrl}corporateApp/GetCorporateLogin/`, formData)
  }

  insertUser(formData: any) : Observable<any>{
    return this.http.post(`${this.baseUrl}corporateApp/RegisterCorporateUser/`, formData)
  }


  getCorporateUserDetail(val: any): Observable<any> {
    return this.http.post(`${this.baseUrl}corporateApp/GetCorporateLogin/`, val)
  }

  InsertBrandDiscountScheme(formData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}corporateApp/InsertBrandSchemeWithRate/`, formData)
  }


  UpdateValidityOfBrandSchemeByBlokCatID(formData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}corporateApp/UpdateValidityOfBrandSchemeByBlokCatID/`, formData)
  }


  getBrandDiscountBlocksByBrandID(brandId: any): Observable<any> {
    let params = new HttpParams().set('BrandID', brandId);
    const myToken = sessionStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${myToken}`  })

    return this.http.get(`${this.baseUrl}corporateApp/GetBrandDiscountBloksByBrandID/`, { params,headers});
  }

  getBrandDiscountBlocksBySchemeID(brandId: any, schemeId: any): Observable<any> {
    let params = new HttpParams().set('BrandID', brandId)
      .set('SchemeID', schemeId);
    return this.http.get(`${this.baseUrl}corporateApp/GetBrandDiscountBlokBySchemeID/`, { params });
  }

  ExportBrandSchemeDiscountBlok(brandId: any, schemeId: any): Observable<any> {
    let params = new HttpParams().set('BrandID', brandId)
      .set('SchemeID', schemeId);
    return this.http.get(`${this.baseUrl}corporateApp/ExportBrandSchemeDiscountBlok/`, { params });
  }

  issueBlocksToStore(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}corporateApp/IssueBlocksToStore/`, data)
  }

  GetCorporateOwnOrPartnerStoreByCorpUserID(UserId: any): Observable<any> {
    let params = new HttpParams().set('CorpUserID', UserId);
    return this.http.get(`${this.baseUrl}corporateApp/GetBrandOwnOrPartnerStores/`, { params });
  }


  uploadMultipleImages(formData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}corporateApp/YourUploadView/`, formData)
  }

  GetBrandAllDetail(brandId: any): Observable<any> {
    let params = new HttpParams().set('BrandID', brandId)
    return this.http.get(`${this.baseUrl}corporateApp/GetCroporateUserDetail/`, { params });
  }

  GetBrandPhotos(brandId: any): Observable<any> {
    let params = new HttpParams().set('BrandID', brandId)
    return this.http.get(`${this.baseUrl}corporateApp/GetCroporateUserPhotos/`, { params });
  }

  DeleteCorporatePhotosByID(PhotoID: any): Observable<any> {
    let params = new HttpParams().set('PhotoID', PhotoID)
    return this.http.get(`${this.baseUrl}corporateApp/DeleteBarandPhotoByID/`, { params });
  }

  EditCorporateProfile(formData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}corporateApp/EditCorporateProfile/`, formData)
  }

  GetBrandOwnOrPartnerStores(CorpUserID: any): Observable<any> {
    let params = new HttpParams().set('CorpUserID', CorpUserID)
    return this.http.get(`${this.baseUrl}corporateApp/GetBrandOwnOrPartnerStores/`, { params });
  }


  GetPendingBloksByBrandIDAndBlockCatID(brandId: any, BlockCatID: any): Observable<any> {
    let params = new HttpParams().set('BrandID', brandId)
      .set('BlockCatID', BlockCatID);
    return this.http.get(`${this.baseUrl}corporateApp/GetBrandPendingBloksByBrandID/`, { params });
  }

  GetTermsAndConditionsBySchemeIDAndBlokCatID(brandId: any, SchemeId: any, BlockCatID: any): Observable<any> {
    let params = new HttpParams().set('BrandID', brandId)
      .set('SchemeID', SchemeId)
      .set('BlokCatID', BlockCatID);
    return this.http.get(`${this.baseUrl}corporateApp/GetBrandTermsAndConditionsBySchemeIdAndBlokCatId/`, { params });
  }


  //Co Branded 

  InsertCoBrandedBrandScheme(formData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}corporateApp/InsertCobrandedBrandSchemeWithRate/`, formData)
  }

  getBrandCobrandedBlocksByBrandID(brandId: any): Observable<any> {
    let params = new HttpParams().set('BrandID', brandId);
    return this.http.get(`${this.baseUrl}corporateApp/GetBrandCobrandedBloksByBrandID/`, { params });
  }

  getBrandCobrandedBlocksBySchemeID(schemeId: any): Observable<any> {
    let params = new HttpParams()
      .set('SchemeID', schemeId);
    return this.http.get(`${this.baseUrl}corporateApp/GetBrandCobrandedBlokBySchemeID/`, { params });
  }


  issueCoBrandedBlocksToStore(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}corporateApp/issueCoBrandedBlocksToStore/`, data)
  }

  // Cashback Flow
  InsertBrandCashbackScheme(formData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}corporateApp/InsertBrandCashbackScheme/`, formData)
  }

  getBrandCashbackBloksByBrandID(brandId: any): Observable<any> {
    let params = new HttpParams().set('BrandID', brandId);
    return this.http.get(`${this.baseUrl}corporateApp/GetBrandCashbackBloksByBrandID/`, { params });
  }

  getBrandCashBackBlocksBySchemeID(brandId: any, schemeId: any): Observable<any> {
    let params = new HttpParams().set('BrandID', brandId)
      .set('SchemeID', schemeId);
    return this.http.get(`${this.baseUrl}corporateApp/GetBrandCashbackBlokBySchemeID/`, { params });
  }

  issueCashbackBlocksToStore(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}corporateApp/IssueCashbackBlocksToStore/`, data)
  }

  ImportOwnOrPartnerStore(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}corporateApp/ImportOwnOrPartnerStore/`, data)
  }

  //Lookup Values 

  getLookupValuesByBaseLookUpID(BaseLookUpID: any): Observable<any> {
    let params = new HttpParams().set('BaseLookUpID', BaseLookUpID);
    return this.http.get(`${this.baseUrl}corporateApp/GetCampaingnSource/`, { params });
  }


  GetBlockOnInputerList(): Observable<any> {
    return this.http.get(`${this.baseUrl}corporateApp/GetBlockOnInputerList/`);
  }

  GetTermsAndConditions(): Observable<any> {
    return this.http.get(`${this.baseUrl}corporateApp/GetTermsAndConditions/`);
  }

}
