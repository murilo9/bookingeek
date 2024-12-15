# Bookingeek

A simple B2B scheduling platform.

Drafts: https://www.figma.com/design/pMVdc3Qzz2htje5C1H3MZg/Bookingeek?node-id=0-1&t=V8XPE5VmtDbAqNky-1

## Principles

- Businesses can register in the platform and create resources, which are bookeable.
- Businesses can register several users that may sign in to the platform with username and password (at least 1 user is mandatory).
- Customers can make reservations on resources.
- Businesses' users can see reservations, as well as cancel or modify them.

## Endpoints

- Sign Up (register business and admin user) - business
- Sign In - business
- Update business - business
- Unregister business - business
- Retrieve resources - any
- Create resource - business
- Update resource - business
- Delete resource - business
- Retrieve reservations - business
- Update reservation - business
- Cancel reservation - business
- Request update reservation - customer
- Cancel reservation - customer
- File upload - business

## Modules

- Business: responsible for businesses and users registration and authentication.
- Resources: responsible for resources management.
- Reservations: responsible for reservations management.
- Stripe: facade for Stripe's API. Creates checkout sessions and handle Stripe webook events.
- Database: responsible for data persistency.
- Files: responsible for file uploads (for now, only resources' and businesses' pictures).

## Observations

- All services' methods should execute the flow considering the "happy path". It's up to the _guards_, and not to the services, to implement the validation logic (like checking for not found entities or invalid DTOs) in order to ensure that the services' logic can be executed without issues.

- A reservation can be cancelled at any moment, bi either the customer or the business, regardless of its payment status. However, refunds can only be done by the business, and may be subject to their own refuding policies (some may offer partial refunds, others not, etc).

## Flows

F: frontend

B: backend

S: stripe

### Sign Up

### Sign In

### Reservation

1. F: The customer selects a resource and fills the necessary data to make a reservation, that generates a CreateReservationDto, which is sent to the backend.
2. B: Validates the CreateReservationDto and creates a reservation, which is sent back to the frontend.
3. F: Receives the created reservation. If online checkout was chosen, renders Stripe's embedded checkout form. Otherwise, the flow ends here.
4. S: Once payment is done, emmits a checkout event via webhook.
5. B: Receives Stripe's checkout event and updates the reservation's payment status.

## References

- Monorepo setup: https://fazalerabbi.medium.com/monorepo-using-pnpm-workspaces-cb23ed332127

## Android build note

Android sdk can be installed via sudo apt install android-sdk.

In order to the Android build script work, the android/local.properties file (create it if not exists) must have the sdk.dir property pointing to the android-sdk folder (usually /usr/lib/android-sdk). Build the Android APK with the build:android script. If you got some error on having to accept license agreements, open android-sdk/tools/bin or android-sdk/cmdline-tools/latest/bin and run ./sdkmanager --licenses. If you're unfortunate enough (just like me) to sdkmanager not come in your android-sdk installation, download it [here](https://developer.android.com/tools/sdkmanager). Make sure to chmod -R 777 your android-sdk folder, just in case. The Android build result should generate .apk files inside android/app/build/outputs/apk.
