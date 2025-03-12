# Bookingeek - Backend

Bookingeek's backend consists of a REST API made with Nest.js, connected with a MongoDB database.

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

- Retrieve resources (used for displaying all resources of a business)

## Modules

- Business: responsible for businesses and users registration and authentication.
- Resources: responsible for resources management.
- Reservations: responsible for reservations management.
- Stripe: facade for Stripe's API. Creates checkout sessions and handle Stripe webook events.
- Database: responsible for data persistency.
- Files: responsible for file uploads (for now, only resources' and businesses' pictures).

## Observations

- All services' methods should execute the flow considering the "happy path". It's up to the _guards_ (not to the services) to implement the validation logic (like checking for not found entities or invalid DTOs) in order to ensure that the services' logic can be executed without issues.

- A reservation can be cancelled at any moment, by either the customer or the business, regardless of its payment status. However, refunds can only be done by the business, and may be subject to their own refuding policies (some may offer partial refunds, others may offer no refunding at all, etc).

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

### Google Sign In

1. F: user clicks the Google Sign In button and signs in with Google, which sends an access token.
2. F: sends the access token to the backend (to the specific google sign in rendpoint).
3. B: uses the access token to call Google's OAuth API and retrieve user's e-mail address.
4. B: checks if a user with the given e-mail address exists. If so, signs in as normal. If not, returns the e-mail address.
5. F: if received an access token, signs in as normal. If received an email address, redirect the user to the sign up page with e-mail address input filled and the 'google' provider, 'name' and 'email' parameters (all passed by the query string) so the sign up form can operate in 'google' provider mode.

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
