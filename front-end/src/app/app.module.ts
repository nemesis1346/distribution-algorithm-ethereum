import { UpdateTrackPage } from './../pages/update-track/update-track';
import { AlertComponent } from './../resources/alertComponent';
import { DataInputPage } from './../pages/data-input/data-input';
import { TransactionListPage } from './../pages/transaction-list/transaction-list';
import { ProfilePage } from './../pages/profile/profile';
import { CreateAgreementPage } from './../pages/create-agreement/create-agreement';
import { TraderListPage } from './../pages/trader-list/trader-list';
import { TrackDetailPage } from './../pages/track-detail/track-detail';
import { TrackListPage } from './../pages/track-list/track-list';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

//Client
import { MenuClientPage } from '../pages/menu-client/menu-client';
import { TestDataPage } from '../pages/test-data/test-data';
//Services
import { LoginServiceProvider } from '../providers/login-service/login-service';
import { ApiProvider } from '../providers/api/api';
import { TrackServiceProvider } from '../providers/track-service/track-service';
import { OwnerServiceProvider } from '../providers/owner-service/owner-service';
import { TraderServiceProvider } from '../providers/trader-service/trader-service';
import { CreateTraderPage } from '../pages/create-trader/create-trader';
import { OrganizationServiceProvider } from '../providers/organization-service/organization-service';
import { CreateOrganizationAccountPage } from '../pages/create-organization-account/create-organization-account';
import { SignupPage } from '../pages/signup/signup';
import { TokenServiceProvider } from '../providers/token-service/token-service';
import { TraderDetailPage } from '../pages/trader-detail/trader-detail';
import { AgreementDetailPage } from '../pages/agreement-detail/agreement-detail';
import { TransactionProvider } from '../providers/transaction-service/transaction-provider';
import { UploadTrackPage } from '../pages/upload-track/upload-track';
import { ManualPaymentPage } from '../pages/manual-payment/manual-payment';
import { FlowDiagramPage } from '../pages/flow-diagram/flow-diagram';

import { NgxEchartsModule } from 'ngx-echarts';
import { AgreementListPage } from '../pages/agreement-list/agreement-list';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MenuClientPage,
    TestDataPage,
    TrackDetailPage,
    TrackListPage,
    CreateTraderPage,
    TraderListPage,
    CreateOrganizationAccountPage,
    SignupPage,
    CreateAgreementPage,
    TraderDetailPage,
    AgreementDetailPage,
    ProfilePage,
    TransactionListPage,
    UploadTrackPage,
    DataInputPage,
    ManualPaymentPage,
    UpdateTrackPage,
    FlowDiagramPage,
    AgreementListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    NgxEchartsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MenuClientPage,
    TestDataPage,
    TrackDetailPage,
    TrackListPage,
    CreateTraderPage,
    TraderListPage,
    CreateOrganizationAccountPage,
    SignupPage,
    CreateAgreementPage,
    TraderDetailPage,
    AgreementDetailPage,
    ProfilePage,
    TransactionListPage,
    UploadTrackPage,
    DataInputPage,
    ManualPaymentPage,
    UpdateTrackPage,
    FlowDiagramPage,
    AgreementListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ApiProvider,
    LoginServiceProvider,
    TrackServiceProvider,
    OwnerServiceProvider,
    TraderServiceProvider,
    OrganizationServiceProvider,
    TokenServiceProvider,
    TransactionProvider,
  
  ]
})
export class AppModule { }
