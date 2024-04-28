# Open Source Projects (27 April 2024 - 27 May 2024)

- [ ] Schema Form
- [ ] Schema Table
- [ ] Layouts
  - FlexboxGrid
    - FlexboxGrid.Item
  - Grid
    - Grid.Row
    - Grid.Column
  - PageContainer
    - PageContainer.Section
    - PageContainer.Sidebar
    - PageContainer.Header
    - PageContainer.Content
    - PageContainer.Footer
  - Stack (Both Horizontal and Vertical)
    - Stack.Item
  - Resource Content
    - Table List Layout
    - Card List Layout
    - Form Layout
- [ ] Schema Sidebar
- [ ] Schema Dashboard
- [ ] Saas web boilerplate built using above packages
  - [ ] Stripe Subscription Integration
  - [ ] Supabase Database, Auth and Storage Integration
  - [ ] Product based Access Control
  - [ ] Auth and No Auth Page Layout using Page Container
  - [ ] Auth Pages Content using Schema Form.
  - [ ] Analytics Dashboard Page Content using Schema Dashboard Package.
  - [ ] Contacts Resource Page Content using Resource Tabular List Layout with it's create and edit page created using Resource Form Layout (`PBAC Implemented`).
  - [ ] AI Playground Page built using components from shadcn and Grid Layout (`PBAC Implemented`).

## Schema Form

### Technical Features

- [x] State Persist: By default persist the form response in localstorage, and can switch between sessionStorage or nothing using `persistFormResponse: 'localStorage' | 'sessionStorage' | null` of `ISchemaFormProps`.
- [x] Predefined Field Zod Validation: Dynamically generate validation schema for all the predefined field based on provided `validations` of `IFieldSchema` for zodResolver to be used as a resolver for useForm of React Hook Form.
- [x] Render Custom Fields: Render custom form fields using a render prop.
- [x] Multi Step Form: Pass the `steps: string[]` prop in ISchemaFormProps split the form fields into groups and present the form as a multi step form, with each step having it's own group.
- [x] Panel: Form inside a Card.
- [x] Custom Field Zod Validation: Dynamically generate validation schema for field rendered using `render` prop of `IFieldSchema` based on provided `validations` of `IFieldSchema` for zodResolver to be used as a resolver for useForm of React Hook Form.
- [x] Conditional Field Display: Display the field only if a certain condition is met.
- [x] Conditional Validation Check Toggle: Toggle the validation check for a field, if defined, based on whether a certain condition is met.

- [ ] FIXME: Checbox validation not working

### Form Fields

All fields include all functionalities from either the rsuite or any popular package based on the field type.

- [ ] Input
- [ ] Input Number
- [ ] OTP Input
- [ ] Textarea Input
- [ ] Select Picker
- [ ] Radio Group
- [ ] Toggle
- [ ] Checkbox
- [ ] File Uploader
- [ ] Date Picker
- [ ] Date Range Picker
- [ ] Captcha/ReCaptcha
- [ ] Color Picker
- [ ] Tag Picker
- [ ] Slider
<!-- - [ ] Currency Picker
- [ ] Phone Number Picker
- [ ] Time Picker
- [ ] Time Range Picker
- [ ] Map Picker
- [ ] Credit Card Picker -->
