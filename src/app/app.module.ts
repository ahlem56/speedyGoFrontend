import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TripListComponent } from './trip/trip-list/trip-list.component';
import { TripCreateComponent } from './trip/trip-create/trip-create.component';
import { TripDetailComponent } from './trip/trip-detail/trip-detail.component';
import { ReservationListComponent } from './reservation/reservation-list/reservation-list.component';
import { ReservationDetailComponent } from './reservation/reservation-detail/reservation-detail.component';
import { CarpoolingListComponent } from './carpool/carpooling-list/carpooling-list.component';
import { CarpoolingCreateComponent } from './carpool/carpooling-create/carpooling-create.component';
import { CarpoolingDetailComponent } from './carpool/carpooling-detail/carpooling-detail.component';
import { CarpoolingJoinComponent } from './carpool/carpooling-join/carpooling-join.component';
import { ParcelListComponent } from './parcel/parcel-list/parcel-list.component';
import { ParcelTrackComponent } from './parcel/parcel-track/parcel-track.component';
import { ParcelCreateComponent } from './parcel/parcel-create/parcel-create.component';
import { ParcelDetailComponent } from './parcel/parcel-detail/parcel-detail.component';
import { VehicleListComponent } from './vehicle/vehicle-list/vehicle-list.component';
import { VehicleCreateComponent } from './vehicle/vehicle-create/vehicle-create.component';
import { VehicleEditComponent } from './vehicle/vehicle-edit/vehicle-edit.component';
import { VehicleDetailComponent } from './vehicle/vehicle-detail/vehicle-detail.component';
import { PaymentCreationComponent } from './payment/payment-creation/payment-creation.component';
import { PaymentHistoryComponent } from './payment/payment-history/payment-history.component';
import { PaymentMethodComponent } from './payment/payment-method/payment-method.component';
import { PartnerListComponent } from './partner/partner-list/partner-list.component';
import { PartnerCreateComponent } from './partner/partner-create/partner-create.component';
import { PartnerEditComponent } from './partner/partner-edit/partner-edit.component';
import { EventListComponent } from './event/event-list/event-list.component';
import { EventCreateComponent } from './event/event-create/event-create.component';
import { EventDetailComponent } from './event/event-detail/event-detail.component';
import { EventNotifyComponent } from './event/event-notify/event-notify.component';
import { ChatComponent } from './chat/chat/chat.component';
import { ChatListComponent } from './chat/chat-list/chat-list.component';
import { ChatMessageCreationComponent } from './chat-message/chat-message-creation/chat-message-creation.component';
import { ChatMessageEditComponent } from './chat-message/chat-message-edit/chat-message-edit.component';
import { ComplaintCreationComponent } from './complaint/complaint-creation/complaint-creation.component';
import { ComplaintListComponent } from './complaint/complaint-list/complaint-list.component';
import { ComplaintDetailsComponent } from './complaint/complaint-details/complaint-details.component';
import { SubscriptionCreationComponent } from './subscription/subscription-creation/subscription-creation.component';
import { SubscriptionDetailsComponent } from './subscription/subscription-details/subscription-details.component';
import { PromotionCreationComponent } from './promotion/promotion-creation/promotion-creation.component';
import { PromotionDetailsComponent } from './promotion/promotion-details/promotion-details.component';
import { PromotionEditComponent } from './promotion/promotion-edit/promotion-edit.component';
import { RuleCreationComponent } from './rule/rule-creation/rule-creation.component';
import { RuleDetailsComponent } from './rule/rule-details/rule-details.component';
import { RuleEditComponent } from './rule/rule-edit/rule-edit.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

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
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
