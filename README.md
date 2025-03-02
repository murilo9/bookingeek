# Bookingeek

Bookingeek is a simple scheduling platform (similar to Calendly) where customers can easily schedule appointments/bookings of services, vehicles, venues and people.

Figma wireframes: https://www.figma.com/design/pMVdc3Qzz2htje5C1H3MZg/Bookingeek?node-id=0-1&t=V8XPE5VmtDbAqNky-1

- [Frontend docs](/apps/bookingeek-app/README.md)
- [Backend docs](/apps/bookingeek-api/README.md)

## How it works

Everything comes up to 4 things: **businesses**, **users**, **resources** and **reservations**.

- Business: a business.
- Resource: anything that can be booked/reserved (services, venues, vehicles, people, etc).
- User: a business' employee (NOT a customer).
- Reservation: a reservation made in a resource by a customer.

> Customers technically don't exist as an entity in the platform. We only keep some of their data in the reservations.

> As an entity, a "user" is any person that can sign in to the platform and manage the business on its behalf. I've decided to not call them "employees" as in some business an employee is techcnically a resource (like barbers in barber shops, alwyers in a law firm, etc).

**Who can do what**

- Businesses can register in the platform and create resources (services, venues, vehicles, people, etc) which are bookeable.
- Businesses can register several users (employees) that may sign in to the platform with username and password and manage their resources. At least 1 user is mandatory.
- Customers can make reservations on resources.
- Businesses' users can see reservations, as well as cancel or modify them.

## References

- [Monorepo setup](https://fazalerabbi.medium.com/monorepo-using-pnpm-workspaces-cb23ed332127)

## Setup

This is a monorepo configured with pnpm. Each package (api, app, website) can be executed as a Docker container, or individually throught their respective npm scripts. The best way to run the development environment is to use docker-compose:

```
# Install dependencies of all packages, if not installed already
pnpm install
# Starts all Docker containers at once
docker-compose up
```

- The REST API runs on port 4000.
- The web application runs on port 5173.
- The website runs on port 3000.
- Storybook runs on port 6006.
- A MongoDB databse must be available on port 27017.

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

**DTOs and decorators**

Since classes with decoratos don't work properly on Nest.js when imported from the bookingeek-core build, all DTOs are located in the backend package. Their frontend equivalent is a "Payload"-sufixed class identical to the DTO, but without decorators.
