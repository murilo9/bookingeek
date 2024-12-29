# Bookingeek

A simple B2B scheduling platform.

Drafts: https://www.figma.com/design/pMVdc3Qzz2htje5C1H3MZg/Bookingeek?node-id=0-1&t=V8XPE5VmtDbAqNky-1

## Principles

- Businesses can register in the platform and create resources, which are bookeable.
- Businesses can register several users that may sign in to the platform with username and password (at least 1 user is mandatory).
- Customers can make reservations on resources.
- Businesses' users can see reservations, as well as cancel or modify them.

## Endpoints

#### Called by business only

- Sign Up
- Sign In
- Update business
- Unregister business
- Create resource
- Update resource
- Delete resource
- Retrieve reservations (paginated)
- Update reservation
- Cancel reservation
- File upload

#### Called by customer only

- Retrieve resource availability
- Validate reservation
- Create reservation
- Cancel reservation
- Request update reservation

#### Called by anyone

- Retrieve resources

## Backend Modules

- Business: responsible for businesses and users registration and authentication.
- Resources: responsible for resources management.
- Reservations: responsible for reservations management.
- Stripe: facade for Stripe's API. Creates checkout sessions and handle Stripe webook events.
- Database: responsible for data persistency.
- Files: responsible for file uploads (for now, only resources' and businesses' pictures).

## Observations

- All services' methods should execute the flow considering the "happy path". It's up to the _guards_, and not to the services, to implement the validation logic (like checking for not found entities or invalid DTOs) in order to ensure that the services' logic can be executed without issues.

- A reservation can be cancelled at any moment, by either the customer or the business, regardless of its payment status. However, refunds can only be done by the business, and may be subject to their own refuding policies (some may offer partial refunds, others not, etc).

- Users are business' employees, not customers. Customers don't sign up in the platform in order to use it.

## Flows

F: frontend; B: backend; S: stripe

### Sign Up

1.  F: The business user fills the forms with all necessary info data to sign up, that generates a BusinessSignUpDto, which is sent to the backend.
2.  B: Validates the BusinessSignUpDto, then creates the business instance in the database, among with its admin user and password. It also signs a JWT token that is sent back to the frontend.
3.  F: Receives the JWT token and starts a session for the just-created business admin user.

### Sign In

1. F: user fills the form with sign in data, that generates a SignInDto, which is sent to the backend.
2. B: checks if user exists and password matches. If so, signs a JWT token that is sent to the frontend.
3. F: Persists the JWT token so the protected routes can be displayed.

### Reservation

1. F: The customer selects a resource and fills the necessary data to make a reservation, that generates a CreateReservationDto, which is sent to the backend.
2. B: Validates the CreateReservationDto and creates a reservation that is sent back to the frontend, and a reservation cancel key, that is sent to the customer's email as a query paramter in the cancel URL.
3. F: Receives the created reservation. If online checkout was chosen, renders Stripe's embedded checkout form. Otherwise, the flow ends here.
4. S: Once payment is done, emmits a checkout event via webhook.
5. B: Receives Stripe's checkout event and updates the reservation's payment status.

### Reservation Cancel (by Customer)

1. The customer clicks the URL to cancel the reservation (sent by email), that redirects to a page prompting for cancel confirmation.
2. F: The cancel confirmation page makes a request to the backend, sending the reservation ID and reservation cancel key, that generates a CustomerCancelReservationDto.
3. B: Validates the CustomerCancelReservationDto and changes the reservation's cancelledBy attribute to 'customer'. Sends a notification to the business users.

### Reservation Cancel (by Business)

1. F: The business user clicks the reservation cancel button, which calls an endpoint in the backend.
2. B: updates the reservation's cancelledBy attribute to 'business', and sends a notification to the customer's email.

### Refunding a Reservation

1. F: at any time a businees can refund a paid reservation (totally or partially) by going to the refund view and submitting the amount, which generates a RefundReservationDto.
2. B: validates the RefundReservationDto, creates a Stripe refund for the reservation's Stripe paymentIntent and updates the refund attribute of the reservation.

Obs: a business may do several refunds to the same reservation, as long as the total refunded amount does not get bigger than the charged total.

## Pages

A page loads all necessary data then renders one or more views. If rendering more than a view, a page will have the implementation of the proper navigation logic.
A note about components: some components are containers (accept children) while others are "final". Some components are pure/dumb (don't rely on external state other than props) while others are impure/smart (rely on the store).

### Page: Authentication

Displays sign in/up options.

**View: Authentication Landing**

Display the options for sign in/up

**View: Sign Up**

Displays the sign up form

**View: Sign In**

Displays the sign in form

### Page: Business Showcase

Displays business' resources so customers can make reservations

**View: Reservation Form**

Displays each step of a reservation form

Components:

```
+-- ReservationOverview
+-- ResourceSelectStep
+---- ResourceItem
+-- DateSelectStep
+---- Calendar
+---- TimeSelectForm
+-- ExtraDataStep
+-- ConfirmationStep
+-- CheckoutStep
+-- DoneStep
```

### Page: Business Panel

Used for business management. Can display several different views.

Components:

```
+-- PanelHeader
+-- PanelLateralNavigationMenu
+-- PanelMobileNavigationMenu
```

**View: Resources Manager**

Used for managing resources

Components:

```
+-- ResourcesList
+---- ResourceItem
+-- ResourceMenu
+-- ResourceBasicInfoSubView
+---- ResourceItem
+-- ResourceExtraDataFieldsSubView
+---- ExtraDataFieldForm
+-- ResourceScheduleTypeSubView
+-- ResourceAvailabilitySubView
+---- DayOfWeekAvailabilityForm
+-- ResourceUnavailabilitySubView
+---- DateUnavailabilityForm
+-- ResourceCustomPricesSubView
+---- DateUnavailabilityForm (with price)
```

**View: Reservations List**

Lists reservations

Components:

```
+-- ReservationItem
```

**View: Reservations Details**

Display details about a reservation.

**View: Business Data**

Used for managing business data (name, address, phone)

_No specific components_

**View: Users Management**

Used for managing users (adding/removing)

Components:

```
+-- UserItem
+-- AddUserForm
```

**View: Account Management**

Used for managing account data (email, name, password)

_No specific components_

## Reusable Components

- Button
- IconButton
- Input
- Textarea
- Select
- Radio
- Checkbox

## Store Slices

**Business**

Holds all information about a business.

**Resources**

Holds all data about the business' resources.

**Reservations**

Holds a paginated list of reservations (for displaying the reservations list in the business management only).

## References

- [Monorepo setup](https://fazalerabbi.medium.com/monorepo-using-pnpm-workspaces-cb23ed332127)

## Misc. Notes

**Steps to render calendar given a month on Calendar component**

1. Get the number of weeks in the month (date-fns).
2. Build the empty month array of weeks.
3. For each week in the month:
   1. If last filled day is null, gets the first day of month (date-fns), place it on its day of week, and fills the next days of week, updating last filled day.
   2. If last filled day is not null, fill each day of week, updating last filled month, until reaching last day of month.
4. FInally, fill empty (i.e. not belonging to this month) days of first and last weeks.

**Android build**

Android sdk can be installed via sudo apt install android-sdk.

In order to the Android build script work, the android/local.properties file (create it if not exists) must have the sdk.dir property pointing to the android-sdk folder (usually /usr/lib/android-sdk). Build the Android APK with the build:android script. If you got some error on having to accept license agreements, open android-sdk/tools/bin or android-sdk/cmdline-tools/latest/bin and run ./sdkmanager --licenses. If you're unfortunate enough (just like me) to sdkmanager not come in your android-sdk installation, download it [here](https://developer.android.com/tools/sdkmanager). Make sure to chmod -R 777 your android-sdk folder, just in case. The Android build result should generate .apk files inside android/app/build/outputs/apk.

Saved links:

https://www.reddit.com/r/reactjs/comments/15p0mfx/why_react_developers_dont_comment_their_code/
