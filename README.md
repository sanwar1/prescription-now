# prescription-now

Online clinical consultation application for drafting, saving and exporting the prescription, designed for doctors. Project commissioned by Dr Anam Aftab, MD (Ay.), IMS BHU.

## Features

The following are the features available in the application:

### Patient Details

1. Consultation initiation can be done with the phone number of the patient.
2. Existing patient's details will be pre-populated in the prescription form. New patient's phone number will be pre-populated in the prescription form, whereas other details will have to be added.
3. Patient details include, First Name, Last Name, Date of Birth, Gender, Phone Number, Email ID.

### Prescription Details

1. Chief complaint, symptoms/history, medications, diagnostic tests can be prescribed to each patient.
2. Medications will require three mandatory fields: Name of medicine, dosage (number of times a day), and duration (number of days).
3. Any number of medications can be prescribed to the patients.
4. Any number of diagnostic tests can be prescribed to the patients.

### Saving to Database

1. For new patients, the patient details will be automatically saved to the database.
2. For both existing and new patients, prescription data will be saved to the database.

### Viewing of Historical Data

1. List of patients view is available. All patient details are available for editing. Deletion of patient details is disabled.
2. List of case files view is available. All case files are available for editing and deleting.
3. Standard metrics are available for analysis on the home page dashboard.

## Security

1. Sign Up and Sign In options are available, with standard JWT token (SHA-256 authentication is implemented).
2. Password change options are NOT available.
3. For removal of users and password changes, contact the Application Administrator.

## Potential Features for Improvement

The following are the potential features that could be added for the benefit of the users.

1. Creating a doctor's profile for them to manage their professional qualifications, registration details, contact details, as well as passwords.
2. Doctors can be attached to specific prescriptions they have worked upon.
3. Creating a view for doctors to see their own prescriptions.
4. Creating a view for admins to see which patient's historical prescriptions.
5. Feature for doctors/admin to update their own passwords.
6. OTP verification for doctors to change their passwords.
7. Emailing of prescriptions and invoices to patients to their registered email IDs.
