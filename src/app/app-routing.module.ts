import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// *************** Imports FrontOffice Components ***************

// Trip components
import { TripListFrontOfficeComponent } from './Components/FrontOffice/trip/trip-list/trip-list.component';
import { TripCreateFrontOfficeComponent } from './Components/FrontOffice/trip/trip-create/trip-create.component';
import { TripDetailFrontOfficeComponent } from './Components/FrontOffice/trip/trip-detail/trip-detail.component';

// Carpool components
import { CarpoolingListFrontOfficeComponent } from './Components/FrontOffice/carpool/carpooling-list/carpooling-list.component';
import { CarpoolingCreateFrontOfficeComponent } from './Components/FrontOffice/carpool/carpooling-create/carpooling-create.component';
import { CarpoolingDetailFrontOfficeComponent } from './Components/FrontOffice/carpool/carpooling-detail/carpooling-detail.component';
import { CarpoolingJoinFrontOfficeComponent } from './Components/FrontOffice/carpool/carpooling-join/carpooling-join.component';

// Parcel components
import { ParcelListFrontOfficeComponent } from './Components/FrontOffice/parcel/parcel-list/parcel-list.component';
import { ParcelTrackFrontOfficeComponent } from './Components/FrontOffice/parcel/parcel-track/parcel-track.component';
import { ParcelCreateFrontOfficeComponent } from './Components/FrontOffice/parcel/parcel-create/parcel-create.component';
import { ParcelDetailFrontOfficeComponent } from './Components/FrontOffice/parcel/parcel-detail/parcel-detail.component';

// Vehicle components
import { VehicleDetailFrontOfficeComponent } from './Components/FrontOffice/vehicle/vehicle-detail/vehicle-detail.component';

// Payment components
import { PaymentCreationFrontOfficeComponent } from './Components/FrontOffice/payment/payment-creation/payment-creation.component';
import { PaymentHistoryFrontOfficeComponent } from './Components/FrontOffice/payment/payment-history/payment-history.component';
import { PaymentMethodFrontOfficeComponent } from './Components/FrontOffice/payment/payment-method/payment-method.component';


// Event components
import { EventListFrontOfficeComponent } from './Components/FrontOffice/event/event-list/event-list.component';
import { EventDetailFrontOfficeComponent } from './Components/FrontOffice/event/event-detail/event-detail.component';
import { EventNotifyFrontOfficeComponent } from './Components/FrontOffice/event/event-notify/event-notify.component';

// Chat components
import { ChatFrontOfficeComponent } from './Components/FrontOffice/chat/chat/chat.component';
import { ChatListFrontOfficeComponent } from './Components/FrontOffice/chat/chat-list/chat-list.component';

// Chat Message components
import { ChatMessageCreationFrontOfficeComponent } from './Components/FrontOffice/chat-message/chat-message-creation/chat-message-creation.component';
import { ChatMessageEditFrontOfficeComponent } from './Components/FrontOffice/chat-message/chat-message-edit/chat-message-edit.component';

// Complaint components
import { ComplaintCreationFrontOfficeComponent } from './Components/FrontOffice/complaint/complaint-creation/complaint-creation.component';
import { ComplaintListFrontOfficeComponent } from './Components/FrontOffice/complaint/complaint-list/complaint-list.component';
import { ComplaintDetailsFrontOfficeComponent } from './Components/FrontOffice/complaint/complaint-details/complaint-details.component';

// Subscription components
import { SubscriptionCreationFrontOfficeComponent } from './Components/FrontOffice/subscription/subscription-creation/subscription-creation.component';
import { SubscriptionDetailsFrontOfficeComponent } from './Components/FrontOffice/subscription/subscription-details/subscription-details.component';

// Promotion components
import { PromotionDetailsFrontOfficeComponent } from './Components/FrontOffice/promotion/promotion-details/promotion-details.component';

//Sign Up Component
import { SignupComponent } from './Components/FrontOffice/signup/signup.component';




// *************** Imports BackOffice Components ***************

// Rule components
import { RuleCreationBackOfficeComponent } from './Components/BackOffice/rule/rule-creation/rule-creation.component';
import { RuleDetailsBackOfficeComponent } from './Components/BackOffice/rule/rule-details/rule-details.component';
import { RuleEditBackOfficeComponent } from './Components/BackOffice/rule/rule-edit/rule-edit.component';

// Promotion components
import { PromotionCreationBackOfficeComponent } from './Components/BackOffice/promotion/promotion-creation/promotion-creation.component';
import { PromotionEditBackOfficeComponent } from './Components/BackOffice/promotion/promotion-edit/promotion-edit.component';

//Event components
import { EventCreateBackOfficeComponent } from './Components/BackOffice/event/event-createBackOffice/event-createBackOffice.component';
import { EventListBackOfficeComponent } from './Components/BackOffice/event/event-listBackOffice/event-listBackOffice.component';
import { EventDetailBackOfficeComponent } from './Components/BackOffice/event/event-detailBackOffice/event-detailBackOffice.component';
import { EventNotifyBackOfficeComponent } from './Components/BackOffice/event/event-notify/event-notify.component';

// Partner components
import { PartnerListBackOfficeComponent } from './Components/BackOffice/partner/partner-list/partner-list.component';
import { PartnerCreateBackOfficeComponent } from './Components/BackOffice/partner/partner-create/partner-create.component';
import { PartnerEditBackOfficeComponent } from './Components/BackOffice/partner/partner-edit/partner-edit.component';

// Carpool components
import { CarpoolingListBackOfficeComponent } from './Components/BackOffice/carpoolBackOffice/carpooling-listBackOffice/carpooling-listBackOffice.component';
import { CarpoolingDetailBackOfficeComponent } from './Components/BackOffice/carpoolBackOffice/carpooling-detailBackOffice/carpooling-detailBackOffice.component';

// Complaint components
import { ComplaintListBackOfficeComponent } from './Components/BackOffice/complaintBackOffice/complaint-listBackOffice/complaint-listBackOffice.component';
import { ComplaintDetailsBackOfficeComponent } from './Components/BackOffice/complaintBackOffice/complaint-detailsBackOffice/complaint-detailsBackOffice.component';

// dashboard components
import { DashboardComponent } from './Components/BackOffice/dashboard/dashboard.component';

// parcel components
import { ParcelListBackOfficeComponent } from './Components/BackOffice/parcelBackOffice/parcel-listBackOffice/parcel-listBackOffice.component';
import { ParcelDetailBackOfficeComponent } from './Components/BackOffice/parcelBackOffice/parcel-detailBackOffice/parcel-detailBackOffice.component';
import { ParcelTrackBackOfficeComponent } from './Components/BackOffice/parcelBackOffice/parcel-trackBackOffice/parcel-trackBackOffice.component';

// payment components
import { PaymentHistoryBackOfficeComponent } from './Components/BackOffice/payment/payment-history/payment-history.component';
import { PaymentMethodBackOfficeComponent } from './Components/BackOffice/payment/payment-method/payment-method.component';

// subscription components
import { SubscriptionDetailsBackOfficeComponent } from './Components/BackOffice/subscription/subscription-details/subscription-details.component';

//trip components
import { TripListBackOfficeComponent } from './Components/BackOffice/tripBackOffice/trip-listBackOffice/trip-listBackOffice.component';
import { TripDetailBackOfficeComponent } from './Components/BackOffice/tripBackOffice/trip-detailBackOffice/trip-detailBackOffice.component';

//vehicle components
import { VehicleListBackOfficeComponent } from './Components/BackOffice/vehicle/vehicle-list/vehicle-list.component';
import { VehicleCreateBackOfficeComponent } from './Components/BackOffice/vehicle/vehicle-create/vehicle-create.component';
import { VehicleEditBackOfficeComponent } from './Components/BackOffice/vehicle/vehicle-edit/vehicle-edit.component';
import { VehicleDetailBackOfficeComponent } from './Components/BackOffice/vehicle/vehicle-detail/vehicle-detail.component';


//************* Imports Driver Interface Components *************
// Chat components
import { ChatDriverInterfaceComponent } from './Components/DriverInterface/chat/chat/chat.component';
import { ChatListDriverInterfaceComponent } from './Components/DriverInterface/chat/chat-list/chat-list.component';

// Chat Message components
import { ChatMessageCreationDriverInterfaceComponent } from './Components/DriverInterface/chat-message/chat-message-creation/chat-message-creation.component';
import { ChatMessageEditDriverInterfaceComponent } from './Components/DriverInterface/chat-message/chat-message-edit/chat-message-edit.component';

// Trip components
import { TripListDriverInterfaceComponent } from './Components/DriverInterface/trip/trip-list/trip-list.component';
import { TripDetailDriverInterfaceComponent } from './Components/DriverInterface/trip/trip-detail/trip-detail.component';

// parcel components
import { ParcelListDriverInterfaceComponent } from './Components/DriverInterface/parcel/parcel-list/parcel-list.component';
import { ParcelDetailDriverInterfaceComponent } from './Components/DriverInterface/parcel/parcel-detail/parcel-detail.component';
import { ParcelTrackDriverInterfaceComponent } from './Components/DriverInterface/parcel/parcel-track/parcel-track.component';

// vehicle components
import { VehicleListDriverInterfaceComponent } from './Components/DriverInterface/vehicle/vehicle-list/vehicle-list.component';
import { VehicleDetailDriverInterfaceComponent } from './Components/DriverInterface/vehicle/vehicle-detail/vehicle-detail.component';




//************ Imports Shared Components ************
// not found component
import { NotFoundComponent } from './Shared/components/not-found/not-found.component';

// login component
import { LoginComponent } from './Shared/login/login.component';

//about component
import { AboutComponent } from './Shared/about/about.component';

// Import components
import { FullComponent } from './Shared/layouts/full/full.component'; // Template's FullComponent  
import { PromotionDetailsBackOfficeComponent } from './Components/BackOffice/promotion/promotion-details/promotion-details.component';
import { LandingPageComponent } from './Shared/landing-page/landing-page.component';
import { AuthGuard } from './auth.guard';



// Define routes
const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      // FrontOffice Routes
      { path: '', redirectTo: '/landingPage', pathMatch: 'full' },
      {path : 'landingPage', component: LandingPageComponent},
      { path: 'login', component: LoginComponent },
      { path: 'about', component: AboutComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'trips', component: TripListFrontOfficeComponent },
      { path: 'trips/create', component: TripCreateFrontOfficeComponent },
      { path: 'trips/:id', component: TripDetailFrontOfficeComponent },
      { path: 'carpooling', component: CarpoolingListFrontOfficeComponent },
      { path: 'carpooling/create', component: CarpoolingCreateFrontOfficeComponent },
      { path: 'carpooling/:id', component: CarpoolingDetailFrontOfficeComponent },
      { path: 'carpooling/join/:id', component: CarpoolingJoinFrontOfficeComponent },
      { path: 'parcels', component: ParcelListFrontOfficeComponent },
      { path: 'parcels/track', component: ParcelTrackFrontOfficeComponent },
      { path: 'parcels/create', component: ParcelCreateFrontOfficeComponent },
      { path: 'parcels/:id', component: ParcelDetailFrontOfficeComponent },
      { path: 'vehicle/:id', component: VehicleDetailFrontOfficeComponent },
      { path: 'payments/create', component: PaymentCreationFrontOfficeComponent },
      { path: 'payments/history', component: PaymentHistoryFrontOfficeComponent },
      { path: 'payments/method', component: PaymentMethodFrontOfficeComponent },
      { path: 'events', component: EventListFrontOfficeComponent },
      { path: 'events/:id', component: EventDetailFrontOfficeComponent },
      { path: 'events/notify', component: EventNotifyFrontOfficeComponent },
      { path: 'chat', component: ChatFrontOfficeComponent },
      { path: 'chat/list', component: ChatListFrontOfficeComponent },
      { path: 'chat-message/create', component: ChatMessageCreationFrontOfficeComponent },
      { path: 'chat-message/edit/:id', component: ChatMessageEditFrontOfficeComponent },
      { path: 'complaints/create', component: ComplaintCreationFrontOfficeComponent },
      { path: 'complaints/list', component: ComplaintListFrontOfficeComponent },
      { path: 'complaints/:id', component: ComplaintDetailsFrontOfficeComponent },
      { path: 'subscriptions/create', component: SubscriptionCreationFrontOfficeComponent },
      { path: 'subscriptions/:id', component: SubscriptionDetailsFrontOfficeComponent },
      { path: 'promotions/:id', component: PromotionDetailsFrontOfficeComponent },

      // BackOffice Routes
      { path: 'back-office/dashboard', component: DashboardComponent ,canActivate: [AuthGuard] },
      { path: 'back-office/rules/create', component: RuleCreationBackOfficeComponent },
      { path: 'back-office/rules/:id', component: RuleDetailsBackOfficeComponent },
      { path: 'back-office/rules/edit/:id', component: RuleEditBackOfficeComponent },
      { path: 'back-office/promotions/create', component: PromotionCreationBackOfficeComponent },
      { path: 'back-office/promotions/:id', component: PromotionDetailsBackOfficeComponent },
      { path: 'back-office/promotions/edit/:id', component: PromotionEditBackOfficeComponent },
      { path: 'back-office/events/create', component: EventCreateBackOfficeComponent },
      { path: 'back-office/events/list', component: EventListBackOfficeComponent },
      { path: 'back-office/events/:id', component: EventDetailBackOfficeComponent },
      { path: 'back-office/events/notify', component: EventNotifyBackOfficeComponent },
      { path: 'back-office/partners', component: PartnerListBackOfficeComponent },
      { path: 'back-office/partners/create', component: PartnerCreateBackOfficeComponent },
      { path: 'back-office/partners/edit/:id', component: PartnerEditBackOfficeComponent },
      { path: 'back-office/carpool/list', component: CarpoolingListBackOfficeComponent },
      { path: 'back-office/carpool/:id', component: CarpoolingDetailBackOfficeComponent },
      { path: 'back-office/complaints', component: ComplaintListBackOfficeComponent },
      { path: 'back-office/complaints/:id', component: ComplaintDetailsBackOfficeComponent },
      { path: 'back-office/parcels', component: ParcelListBackOfficeComponent },
      { path: 'back-office/parcels/:id', component: ParcelDetailBackOfficeComponent },
      { path: 'back-office/parcels/track', component: ParcelTrackBackOfficeComponent },
      { path: 'back-office/payments/history', component: PaymentHistoryBackOfficeComponent },
      { path: 'back-office/payments/method', component: PaymentMethodBackOfficeComponent },
      { path: 'back-office/subscriptions', component: SubscriptionDetailsBackOfficeComponent },
      { path: 'back-office/trips', component: TripListBackOfficeComponent },
      { path: 'back-office/trips/:id', component: TripDetailBackOfficeComponent },
      { path: 'back-office/vehicles', component: VehicleListBackOfficeComponent },
      { path: 'back-office/vehicles/create', component: VehicleCreateBackOfficeComponent },
      { path: 'back-office/vehicles/edit/:id', component: VehicleEditBackOfficeComponent },
      { path: 'back-office/vehicles/:id', component: VehicleDetailBackOfficeComponent },

      // Driver Interface Routes
      { path: 'driver-interface/chat', component: ChatDriverInterfaceComponent },
      { path: 'driver-interface/chat/list', component: ChatListDriverInterfaceComponent },
      { path: 'driver-interface/chat-message/create', component: ChatMessageCreationDriverInterfaceComponent },
      { path: 'driver-interface/chat-message/edit/:id', component: ChatMessageEditDriverInterfaceComponent },
      { path: 'driver-interface/trips', component: TripListDriverInterfaceComponent },
      { path: 'driver-interface/trips/:id', component: TripDetailDriverInterfaceComponent },
      { path: 'driver-interface/parcels', component: ParcelListDriverInterfaceComponent },
      { path: 'driver-interface/parcels/:id', component: ParcelDetailDriverInterfaceComponent },
      { path: 'driver-interface/parcels/track', component: ParcelTrackDriverInterfaceComponent },
      { path: 'driver-interface/vehicles', component: VehicleListDriverInterfaceComponent },
      { path: 'driver-interface/vehicles/:id', component: VehicleDetailDriverInterfaceComponent },
    ]
  },

  // Wildcard route for 404
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}