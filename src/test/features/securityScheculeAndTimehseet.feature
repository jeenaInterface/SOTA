Feature: Security schedule and timesheet Management
        

    @securitySchedule
    Scenario: Create security schedule, Create timesheet, verify functionalities and validations
        Given Security management user logged into the application
        When User navigates to security schedule page
        When User selects date, shift and clicks GO button
        And Select staffing from Staffing for Operations list and fill the steady name, radio and vehicle
        And Enter notes and sergeant name
        And User clicks Save button
        Then User should see success message for security schedule
        Then Delete one row from the security schedule
        Then click on view different schedule button
        Then Select 2nd shift and click on go button
        And Select staffing from Staffing for Operations list and fill the steady name, radio and vehicle
        And Enter notes and sergeant name
        And User clicks Save button
        Then Select 3rd shift and click on go button
        And Select staffing from Staffing for Operations list and fill the steady name, radio and vehicle
        And Enter notes and sergeant name
        And User clicks Save button
        Then copy the rolling code from the schedule
        Then Logged in as security sergeant user
        Then Open the timesheet menu
        Then Verify the validations for ST and OT hr.
        Then Enter correct ST and OT hr.
        Then Click on save button
        Then Verify the success message for timesheet
        Given Security management user logged into the application
        Then Open the timesheet menu
        Then submit the timesheet
        Then Verify the success message for timesheet submission
        Then Approve the timesheet
        Then Verify the success message for timesheet approval
        Then Verify reject functionality
        Then Approve the timesheet

    @securityLaborOrderValidation
    Scenario: Verify Mandatory field validations
        Given Security management user logged into the application
        When User navigates to security schedule page
        When User selects date, shift and clicks GO button
        And User clicks Save button

