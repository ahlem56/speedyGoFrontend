import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import components
import { NotFoundComponent } from './components/not-found/not-found.component';

// Trip components
import { TripListComponent } from './trip/trip-list/trip-list.component';
import { TripCreateComponent } from './trip/trip-create/trip-create.component';
import { TripDetailComponent } from './trip/trip-detail/trip-detail.component';

// Reservation components
import { ReservationListComponent } from './reservation/reservation-list/reservation-list.component';
import { ReservationDetailComponent } from './reservation/reservation-detail/reservation-detail.component';

// Carpool components
import { CarpoolingListComponent } from './carpool/carpooling-list/carpooling-list.component';
import { CarpoolingCreateComponent } from './carpool/carpooling-create/carpooling-create.component';
import { CarpoolingDetailComponent } from './carpool/carpooling-detail/carpooling-detail.component';
import { CarpoolingJoinComponent } from './carpool/carpooling-join/carpooling-join.component';

// Parcel components
import { ParcelListComponent } from './parcel/parcel-list/parcel-list.component';
import { ParcelTrackComponent } from './parcel/parcel-track/parcel-track.component';
import { ParcelCreateComponent } from './parcel/parcel-create/parcel-create.component';
import { ParcelDetailComponent } from './parcel/parcel-detail/parcel-detail.component';

// Vehicle components
import { VehicleListComponent } from './vehicle/vehicle-list/vehicle-list.component';
import { VehicleCreateComponent } from './vehicle/vehicle-create/vehicle-create.component';
import { VehicleEditComponent } from './vehicle/vehicle-edit/vehicle-edit.component';
import { VehicleDetailComponent } from './vehicle/vehicle-detail/vehicle-detail.component';

// Payment components
import { PaymentCreationComponent } from './payment/payment-creation/payment-creation.component';
import { PaymentHistoryComponent } from './payment/payment-history/payment-history.component';
import { PaymentMethodComponent } from './payment/payment-method/payment-method.component';

// Partner components
import { PartnerListComponent } from './partner/partner-list/partner-list.component';
import { PartnerCreateComponent } from './partner/partner-create/partner-create.component';
import { PartnerEditComponent } from './partner/partner-edit/partner-edit.component';

// Event components
import { EventListComponent } from './event/event-list/event-list.component';
import { EventCreateComponent } from './event/event-create/event-create.component';
import { EventDetailComponent } from './event/event-detail/event-detail.component';
import { EventNotifyComponent } from './event/event-notify/event-notify.component';

// Chat components
import { ChatComponent } from './chat/chat/chat.component';
import { ChatListComponent } from './chat/chat-list/chat-list.component';

// Chat Message components
import { ChatMessageCreationComponent } from './chat-message/chat-message-creation/chat-message-creation.component';
import { ChatMessageEditComponent } from './chat-message/chat-message-edit/chat-message-edit.component';

// Complaint components
import { ComplaintCreationComponent } from './complaint/complaint-creation/complaint-creation.component';
import { ComplaintListComponent } from './complaint/complaint-list/complaint-list.component';
import { ComplaintDetailsComponent } from './complaint/complaint-details/complaint-details.component';

// Subscription components
import { SubscriptionCreationComponent } from './subscription/subscription-creation/subscription-creation.component';
import { SubscriptionDetailsComponent } from './subscription/subscription-details/subscription-details.component';

// Promotion components
import { PromotionCreationComponent } from './promotion/promotion-creation/promotion-creation.component';
import { PromotionDetailsComponent } from './promotion/promotion-details/promotion-details.component';
import { PromotionEditComponent } from './promotion/promotion-edit/promotion-edit.component';

// Rule components
import { RuleCreationComponent } from './rule/rule-creation/rule-creation.component';
import { RuleDetailsComponent } from './rule/rule-details/rule-details.component';
import { RuleEditComponent } from './rule/rule-edit/rule-edit.component';

// Import components
import { FullComponent } from './layouts/full/full.component'; // Template's FullComponent  

// Define routes
const routes: Routes = [
  {
    path: '',
    component: FullComponent, // Use FullComponent as the layout for main pages
    children: [
      // Template routes
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'about',
        loadChildren: () =>
          import('./about/about.module').then((m) => m.AboutModule),
      },
      {
        path: 'component',
        loadChildren: () =>
          import('./component/component.module').then((m) => m.ComponentsModule),
      },

      // Your project's routes
      { path: 'trips', component: TripListComponent },
      { path: 'trips/create', component: TripCreateComponent },
      { path: 'trips/:id', component: TripDetailComponent },
      { path: 'reservations', component: ReservationListComponent },
      { path: 'reservations/:id', component: ReservationDetailComponent },
      { path: 'carpooling', component: CarpoolingListComponent },
      { path: 'carpooling/create', component: CarpoolingCreateComponent },
      { path: 'carpooling/:id', component: CarpoolingDetailComponent },
      { path: 'carpooling/join/:id', component: CarpoolingJoinComponent },
      { path: 'parcels', component: ParcelListComponent },
      { path: 'parcels/track', component: ParcelTrackComponent },
      { path: 'parcels/create', component: ParcelCreateComponent },
      { path: 'parcels/:id', component: ParcelDetailComponent },
      { path: 'vehicles', component: VehicleListComponent },
      { path: 'vehicles/create', component: VehicleCreateComponent },
      { path: 'vehicles/edit/:id', component: VehicleEditComponent },
      { path: 'vehicles/:id', component: VehicleDetailComponent },
      { path: 'payments/create', component: PaymentCreationComponent },
      { path: 'payments/history', component: PaymentHistoryComponent },
      { path: 'payments/method', component: PaymentMethodComponent },
      { path: 'partners', component: PartnerListComponent },
      { path: 'partners/create', component: PartnerCreateComponent },
      { path: 'partners/edit/:id', component: PartnerEditComponent },
      { path: 'events', component: EventListComponent },
      { path: 'events/create', component: EventCreateComponent },
      { path: 'events/:id', component: EventDetailComponent },
      { path: 'events/notify', component: EventNotifyComponent },
      { path: 'chat', component: ChatComponent },
      { path: 'chat/list', component: ChatListComponent },
      { path: 'chat-message/create', component: ChatMessageCreationComponent },
      { path: 'chat-message/edit/:id', component: ChatMessageEditComponent },
      { path: 'complaints/create', component: ComplaintCreationComponent },
      { path: 'complaints/list', component: ComplaintListComponent },
      { path: 'complaints/:id', component: ComplaintDetailsComponent },
      { path: 'subscriptions/create', component: SubscriptionCreationComponent },
      { path: 'subscriptions/:id', component: SubscriptionDetailsComponent },
      { path: 'promotions/create', component: PromotionCreationComponent },
      { path: 'promotions/:id', component: PromotionDetailsComponent },
      { path: 'promotions/edit/:id', component: PromotionEditComponent },
      { path: 'rules/create', component: RuleCreationComponent },
      { path: 'rules/:id', component: RuleDetailsComponent },
      { path: 'rules/edit/:id', component: RuleEditComponent },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}