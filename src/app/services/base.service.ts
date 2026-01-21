import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, last, map, merge, tap } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { environment } from '../../environments/environment';
import { ApplicationDetails, Customer, CustomerDetails, Dealer, DocumentResponse, Document, Manufacturer, RefreshTokenRespsonse, Reports, Scheme, VehicleLoan } from '../../app/models/vehicleLoan';
import { AuthService } from './auth.service';
import { formatDate } from '@angular/common';

@Injectable()
export abstract class BaseService {
    
}