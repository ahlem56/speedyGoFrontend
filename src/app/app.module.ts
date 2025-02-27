import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// *************** FrontOffice Components ***************
import { TripListFrontOfficeComponent } from './Components/FrontOffice/trip/trip-list/trip-list.component';
import { TripCreateFrontOfficeComponent } from './Components/FrontOffice/trip/trip-create/trip-create.component';
import { TripDetailFrontOfficeComponent } from './Components/FrontOffice/trip/trip-detail/trip-detail.component';

import { CarpoolingListFrontOfficeComponent } from './Components/FrontOffice/carpool/carpooling-list/carpooling-list.component';
import { CarpoolingCreateFrontOfficeComponent } from './Components/FrontOffice/carpool/carpooling-create/carpooling-create.component';
import { CarpoolingDetailFrontOfficeComponent } from './Components/FrontOffice/carpool/carpooling-detail/carpooling-detail.component';
import { CarpoolingJoinFrontOfficeComponent } from './Components/FrontOffice/carpool/carpooling-join/carpooling-join.component';

import { ParcelListFrontOfficeComponent } from './Components/FrontOffice/parcel/parcel-list/parcel-list.component';
import { ParcelTrackFrontOfficeComponent } from './Components/FrontOffice/parcel/parcel-track/parcel-track.component';
import { ParcelCreateFrontOfficeComponent } from './Components/FrontOffice/parcel/parcel-create/parcel-create.component';
import { ParcelDetailFrontOfficeComponent } from './Components/FrontOffice/parcel/parcel-detail/parcel-detail.component';

import { VehicleDetailFrontOfficeComponent } from './Components/FrontOffice/vehicle/vehicle-detail/vehicle-detail.component';

import { PaymentCreationFrontOfficeComponent } from './Components/FrontOffice/payment/payment-creation/payment-creation.component';
import { PaymentHistoryFrontOfficeComponent } from './Components/FrontOffice/payment/payment-history/payment-history.component';
import { PaymentMethodFrontOfficeComponent } from './Components/FrontOffice/payment/payment-method/payment-method.component';

import { EventListFrontOfficeComponent } from './Components/FrontOffice/event/event-list/event-list.component';
import { EventDetailFrontOfficeComponent } from './Components/FrontOffice/event/event-detail/event-detail.component';
import { EventNotifyFrontOfficeComponent } from './Components/FrontOffice/event/event-notify/event-notify.component';

import { ChatFrontOfficeComponent } from './Components/FrontOffice/chat/chat/chat.component';
import { ChatListFrontOfficeComponent } from './Components/FrontOffice/chat/chat-list/chat-list.component';

import { ChatMessageCreationFrontOfficeComponent } from './Components/FrontOffice/chat-message/chat-message-creation/chat-message-creation.component';
import { ChatMessageEditFrontOfficeComponent } from './Components/FrontOffice/chat-message/chat-message-edit/chat-message-edit.component';

import { ComplaintCreationFrontOfficeComponent } from './Components/FrontOffice/complaint/complaint-creation/complaint-creation.component';
import { ComplaintListFrontOfficeComponent } from './Components/FrontOffice/complaint/complaint-list/complaint-list.component';
import { ComplaintDetailsFrontOfficeComponent } from './Components/FrontOffice/complaint/complaint-details/complaint-details.component';

import { SubscriptionCreationFrontOfficeComponent } from './Components/FrontOffice/subscription/subscription-creation/subscription-creation.component';
import { SubscriptionDetailsFrontOfficeComponent } from './Components/FrontOffice/subscription/subscription-details/subscription-details.component';

import { PromotionDetailsFrontOfficeComponent } from './Components/FrontOffice/promotion/promotion-details/promotion-details.component';

import { SignupComponent } from './Components/FrontOffice/signup/signup.component';

// *************** BackOffice Components ***************
import { DashboardModule } from './Components/BackOffice/dashboard/dashboard.module';  // Import the module where DashboardComponent is declared
import { RuleCreationBackOfficeComponent } from './Components/BackOffice/rule/rule-creation/rule-creation.component';
import { RuleDetailsBackOfficeComponent } from './Components/BackOffice/rule/rule-details/rule-details.component';
import { PromotionCreationBackOfficeComponent } from './Components/BackOffice/promotion/promotion-creation/promotion-creation.component';
import { PromotionEditBackOfficeComponent } from './Components/BackOffice/promotion/promotion-edit/promotion-edit.component';

import { EventCreateBackOfficeComponent } from './Components/BackOffice/event/event-createBackOffice/event-createBackOffice.component';
import { EventListBackOfficeComponent } from './Components/BackOffice/event/event-listBackOffice/event-listBackOffice.component';
import { EventDetailBackOfficeComponent } from './Components/BackOffice/event/event-detailBackOffice/event-detailBackOffice.component';
import { EventNotifyBackOfficeComponent } from './Components/BackOffice/event/event-notify/event-notify.component';

import { PartnerListBackOfficeComponent } from './Components/BackOffice/partner/partner-list/partner-list.component';
import { PartnerCreateBackOfficeComponent } from './Components/BackOffice/partner/partner-create/partner-create.component';
import { PartnerEditBackOfficeComponent } from './Components/BackOffice/partner/partner-edit/partner-edit.component';

import { CarpoolingListBackOfficeComponent } from './Components/BackOffice/carpoolBackOffice/carpooling-listBackOffice/carpooling-listBackOffice.component';
import { CarpoolingDetailBackOfficeComponent } from './Components/BackOffice/carpoolBackOffice/carpooling-detailBackOffice/carpooling-detailBackOffice.component';

import { ComplaintListBackOfficeComponent } from './Components/BackOffice/complaintBackOffice/complaint-listBackOffice/complaint-listBackOffice.component';
import { ComplaintDetailsBackOfficeComponent } from './Components/BackOffice/complaintBackOffice/complaint-detailsBackOffice/complaint-detailsBackOffice.component';

import { ParcelListBackOfficeComponent } from './Components/BackOffice/parcelBackOffice/parcel-listBackOffice/parcel-listBackOffice.component';
import { ParcelDetailBackOfficeComponent } from './Components/BackOffice/parcelBackOffice/parcel-detailBackOffice/parcel-detailBackOffice.component';
import { ParcelTrackBackOfficeComponent } from './Components/BackOffice/parcelBackOffice/parcel-trackBackOffice/parcel-trackBackOffice.component';

import { PaymentHistoryBackOfficeComponent } from './Components/BackOffice/payment/payment-history/payment-history.component';
import { PaymentMethodBackOfficeComponent } from './Components/BackOffice/payment/payment-method/payment-method.component';

import { SubscriptionDetailsBackOfficeComponent } from './Components/BackOffice/subscription/subscription-details/subscription-details.component';

import { TripListBackOfficeComponent } from './Components/BackOffice/tripBackOffice/trip-listBackOffice/trip-listBackOffice.component';
import { TripDetailBackOfficeComponent } from './Components/BackOffice/tripBackOffice/trip-detailBackOffice/trip-detailBackOffice.component';

import { VehicleListBackOfficeComponent } from './Components/BackOffice/vehicle/vehicle-list/vehicle-list.component';
import { VehicleCreateBackOfficeComponent } from './Components/BackOffice/vehicle/vehicle-create/vehicle-create.component';
import { VehicleEditBackOfficeComponent } from './Components/BackOffice/vehicle/vehicle-edit/vehicle-edit.component';
import { VehicleDetailBackOfficeComponent } from './Components/BackOffice/vehicle/vehicle-detail/vehicle-detail.component';

// *************** Driver Interface Components ***************
import { ChatDriverInterfaceComponent } from './Components/DriverInterface/chat/chat/chat.component';
import { ChatListDriverInterfaceComponent } from './Components/DriverInterface/chat/chat-list/chat-list.component';
import { ChatMessageCreationDriverInterfaceComponent } from './Components/DriverInterface/chat-message/chat-message-creation/chat-message-creation.component';
import { ChatMessageEditDriverInterfaceComponent } from './Components/DriverInterface/chat-message/chat-message-edit/chat-message-edit.component';
import { TripListDriverInterfaceComponent } from './Components/DriverInterface/trip/trip-list/trip-list.component';
import { TripDetailDriverInterfaceComponent } from './Components/DriverInterface/trip/trip-detail/trip-detail.component';
import { ParcelListDriverInterfaceComponent } from './Components/DriverInterface/parcel/parcel-list/parcel-list.component';
import { ParcelDetailDriverInterfaceComponent } from './Components/DriverInterface/parcel/parcel-detail/parcel-detail.component';
import { ParcelTrackDriverInterfaceComponent } from './Components/DriverInterface/parcel/parcel-track/parcel-track.component';
import { VehicleListDriverInterfaceComponent } from './Components/DriverInterface/vehicle/vehicle-list/vehicle-list.component';
import { VehicleDetailDriverInterfaceComponent } from './Components/DriverInterface/vehicle/vehicle-detail/vehicle-detail.component';

// *************** Shared Components ***************
import { NotFoundComponent } from './Shared/components/not-found/not-found.component';
import { FullComponent } from './Shared/layouts/full/full.component';
import { LoginComponent } from './Shared/login/login.component';


// Define routes
@NgModule({
  declarations: [
    
    AppComponent,
    TripListFrontOfficeComponent,
    TripCreateFrontOfficeComponent,
    TripDetailFrontOfficeComponent,
    CarpoolingListFrontOfficeComponent,
    CarpoolingCreateFrontOfficeComponent,
    CarpoolingDetailFrontOfficeComponent,
    CarpoolingJoinFrontOfficeComponent,
    ParcelListFrontOfficeComponent,
    ParcelTrackFrontOfficeComponent,
    ParcelCreateFrontOfficeComponent,
    ParcelDetailFrontOfficeComponent,
    VehicleDetailFrontOfficeComponent,
    PaymentCreationFrontOfficeComponent,
    PaymentHistoryFrontOfficeComponent,
    PaymentMethodFrontOfficeComponent,
    EventListFrontOfficeComponent,
    EventDetailFrontOfficeComponent,
    EventNotifyFrontOfficeComponent,
    ChatFrontOfficeComponent,
    ChatListFrontOfficeComponent,
    ChatMessageCreationFrontOfficeComponent,
    ChatMessageEditFrontOfficeComponent,
    ComplaintCreationFrontOfficeComponent,
    ComplaintListFrontOfficeComponent,
    ComplaintDetailsFrontOfficeComponent,
    SubscriptionCreationFrontOfficeComponent,
    SubscriptionDetailsFrontOfficeComponent,
    PromotionDetailsFrontOfficeComponent,
    

    RuleCreationBackOfficeComponent,
    RuleDetailsBackOfficeComponent,
    PromotionCreationBackOfficeComponent,
    PromotionEditBackOfficeComponent,
    EventCreateBackOfficeComponent,
    EventListBackOfficeComponent,
    EventDetailBackOfficeComponent,
    EventNotifyBackOfficeComponent,
    PartnerListBackOfficeComponent,
    PartnerCreateBackOfficeComponent,
    PartnerEditBackOfficeComponent,
    CarpoolingListBackOfficeComponent,
    CarpoolingDetailBackOfficeComponent,
    ComplaintListBackOfficeComponent,
    ComplaintDetailsBackOfficeComponent,
    ParcelListBackOfficeComponent,
    ParcelDetailBackOfficeComponent,
    ParcelTrackBackOfficeComponent,
    PaymentHistoryBackOfficeComponent,
    PaymentMethodBackOfficeComponent,
    SubscriptionDetailsBackOfficeComponent,
    TripListBackOfficeComponent,
    TripDetailBackOfficeComponent,
    VehicleListBackOfficeComponent,
    VehicleCreateBackOfficeComponent,
    VehicleEditBackOfficeComponent,
    VehicleDetailBackOfficeComponent,

    ChatDriverInterfaceComponent,
    ChatListDriverInterfaceComponent,
    ChatMessageCreationDriverInterfaceComponent,
    ChatMessageEditDriverInterfaceComponent,
    TripListDriverInterfaceComponent,
    TripDetailDriverInterfaceComponent,
    ParcelListDriverInterfaceComponent,
    ParcelDetailDriverInterfaceComponent,
    ParcelTrackDriverInterfaceComponent,
    VehicleListDriverInterfaceComponent,
    VehicleDetailDriverInterfaceComponent,
    
    NotFoundComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    DashboardModule  ,
    FormsModule,
    HttpClientModule,
    CommonModule,
    FullComponent,   // Import standalone component
    SignupComponent,
    LoginComponent  // Import standalone component
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
