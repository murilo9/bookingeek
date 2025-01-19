# Bookingeek - Frontend

Bookingeek's frontend is an SPA made with React Vite, using Styled Components for styling It is essentially divided into 3 concepts: pages, views and components. A page loads all necessary data then renders a view. A view gets all necessary data loaded by the page and renders its components (lists, buttons, menus, etc). We use React Router's routes and outlets to ensure that the page/view hierarchy works as expected and they're navigable through the URL path.
The code is split between feature modules, each module being resposible for holding code that belongs to a specific domain.

## Pages

### Page: Sign Up

Displays the sign up form.

### Page: Sign In

Displays the sign in form.

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
+-- DesktopHeader
+-- MobileHeader
+-- PanelLateralNavigationMenu
+-- PanelMobileNavigationMenu
```

**View: Resources Management**

Used for managing resources

Components:

```
+-- ResourcesListView
+---- ResourceItem
+-- ResourceMenuView
+-- ResourceBasicInfoView
+---- ResourceItem
+-- ResourceExtraDataFieldsView
+---- ExtraDataFieldForm
+-- ResourceScheduleTypeView
+-- ResourceAvailabilityView
+---- AvailabilityRangeRuleForm
+---- AvailabilitySlotRuleForm
+-- ResourceUnavailabilityView
+---- DateUnavailabilityForm
+-- ResourceCustomPricesView
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
