import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TripListComponent } from './FrontOffice/trip/trip-list/trip-list.component';
import { TripCreateComponent } from './FrontOffice/trip/trip-create/trip-create.component';
import { TripDetailComponent } from './FrontOffice/trip/trip-detail/trip-detail.component';
import { ReservationListComponent } from './FrontOffice/reservation/reservation-list/reservation-list.component';
import { ReservationDetailComponent } from './FrontOffice/reservation/reservation-detail/reservation-detail.component';
import { CarpoolingListComponent } from './FrontOffice/carpool/carpooling-list/carpooling-list.component';
import { CarpoolingCreateComponent } from './FrontOffice/carpool/carpooling-create/carpooling-create.component';
import { CarpoolingDetailComponent } from './FrontOffice/carpool/carpooling-detail/carpooling-detail.component';
import { CarpoolingJoinComponent } from './FrontOffice/carpool/carpooling-join/carpooling-join.component';
import { ParcelListComponent } from './FrontOffice/parcel/parcel-list/parcel-list.component';
import { ParcelTrackComponent } from './FrontOffice/parcel/parcel-track/parcel-track.component';
import { ParcelCreateComponent } from './FrontOffice/parcel/parcel-create/parcel-create.component';
import { ParcelDetailComponent } from './FrontOffice/parcel/parcel-detail/parcel-detail.component';
import { VehicleListComponent } from './BackOffice/vehicle/vehicle-list/vehicle-list.component';
import { VehicleCreateComponent } from './BackOffice/vehicle/vehicle-create/vehicle-create.component';
import { VehicleEditComponent } from './BackOffice/vehicle/vehicle-edit/vehicle-edit.component';
import { VehicleDetailComponent } from './FrontOffice/vehicle/vehicle-detail/vehicle-detail.component';
import { PaymentCreationComponent } from './FrontOffice/payment/payment-creation/payment-creation.component';
import { PaymentHistoryComponent } from './FrontOffice/payment/payment-history/payment-history.component';
import { PaymentMethodComponent } from './FrontOffice/payment/payment-method/payment-method.component';
import { PartnerListComponent } from './BackOffice/partner/partner-list/partner-list.component';
import { PartnerCreateComponent } from './BackOffice/partner/partner-create/partner-create.component';
import { PartnerEditComponent } from './BackOffice/partner/partner-edit/partner-edit.component';
import { EventListComponent } from './FrontOffice/event/event-list/event-list.component';
import { EventCreateComponent } from './BackOffice/event/event-createBackOffice/event-createBackOffice.component';
import { EventDetailComponent } from './FrontOffice/event/event-detail/event-detail.component';
import { EventNotifyComponent } from './FrontOffice/event/event-notify/event-notify.component';
import { ChatComponent } from './FrontOffice/chat/chat/chat.component';
import { ChatListComponent } from './FrontOffice/chat/chat-list/chat-list.component';
import { ChatMessageCreationComponent } from './FrontOffice/chat-message/chat-message-creation/chat-message-creation.component';
import { ChatMessageEditComponent } from './FrontOffice/chat-message/chat-message-edit/chat-message-edit.component';
import { ComplaintCreationComponent } from './FrontOffice/complaint/complaint-creation/complaint-creation.component';
import { ComplaintListComponent } from './FrontOffice/complaint/complaint-list/complaint-list.component';
import { ComplaintDetailsComponent } from './FrontOffice/complaint/complaint-details/complaint-details.component';
import { SubscriptionCreationComponent } from './FrontOffice/subscription/subscription-creation/subscription-creation.component';
import { SubscriptionDetailsComponent } from './FrontOffice/subscription/subscription-details/subscription-details.component';
import { PromotionCreationComponent } from './BackOffice/promotion/promotion-creation/promotion-creation.component';
import { PromotionDetailsComponent } from './FrontOffice/promotion/promotion-details/promotion-details.component';
import { PromotionEditComponent } from './BackOffice/promotion/promotion-edit/promotion-edit.component';
import { RuleCreationComponent } from './BackOffice/rule/rule-creation/rule-creation.component';
import { RuleDetailsComponent } from './BackOffice/rule/rule-details/rule-details.component';
import { RuleEditComponent } from './BackOffice/rule/rule-edit/rule-edit.component';
import { NotFoundComponent } from './FrontOffice/components/not-found/not-found.component';
import { SignupComponent } from './FrontOffice/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    TripListComponent,
    TripCreateComponent,
    TripDetailComponent,
    ReservationListComponent,
    ReservationDetailComponent,
    CarpoolingListComponent,
    CarpoolingCreateComponent,
    CarpoolingDetailComponent,
    CarpoolingJoinComponent,
    ParcelListComponent,
    ParcelTrackComponent,
    ParcelCreateComponent,
    ParcelDetailComponent,
    VehicleListComponent,
    VehicleCreateComponent,
    VehicleEditComponent,
    VehicleDetailComponent,
    PaymentCreationComponent,
    PaymentHistoryComponent,
    PaymentMethodComponent,
    PartnerListComponent,
    PartnerCreateComponent,
    PartnerEditComponent,
    EventListComponent,
    EventCreateComponent,
    EventDetailComponent,
    EventNotifyComponent,
    ChatComponent,
    ChatListComponent,
    ChatMessageCreationComponent,
    ChatMessageEditComponent,
    ComplaintCreationComponent,
    ComplaintListComponent,
    ComplaintDetailsComponent,
    SubscriptionCreationComponent,
    SubscriptionDetailsComponent,
    PromotionCreationComponent,
    PromotionDetailsComponent,
    PromotionEditComponent,
    RuleCreationComponent,
    RuleDetailsComponent,
    RuleEditComponent,
    NotFoundComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
