Feature: Security schedule and timesheet Management
        

    @securitySchedule
    Scenario: Create security schedule, Create timesheet, verify functionalities and validations
        Given Security management user logged into the application
        When User navigates to security schedule page
        When User selects date, shift and clicks GO button
        And Select staffing from Staffing for Operations list and fill the steady name, radio and vehicle
        And Enter notes, sergeant name and click on save
        Then User should see success message for security schedule
        Then click on view different schedule button
        Then Select 2nd shift and click on go button
        And Select staffing from Staffing for Operations list and fill the steady name, radio and vehicle
        And Enter notes, sergeant name and click on save
        Then click on view different schedule button
        Then Select 3RD shift and click on go button
        And Select staffing from Staffing for Operations list and fill the steady name, radio and vehicle
        And Enter notes, sergeant name and click on save
        Then copy the rolling code from the schedule
        Then user click on logout button
        Then Security sergeant user logged into the application
        Then Open the timesheet menu
        Then Verify the validations for ST and OT hr.
        Then Enter correct ST and OT hr.
        Then user click on logout button
        Then Security manager user logged into the application
        Then Open the timesheet menu on security management user
        Then verify save without submit functionality
        Then verify submit functionality
        Then Verify remove approval functionality
        Then verify submit functionality
        Then verify approve functionality
        Then Verify reject functionality
        Then verify approve functionality

    @securityLaborOrderValidation
    Scenario: Verify Mandatory field validations
        Given Security management user logged into the application
        When User navigates to security schedule page
        When User selects date, shift and clicks GO button
        And User clicks Save button


    Scenario: Verify Individual row deletion in security schedule
        Given Security management user logged into the application
        When User navigates to security schedule page
        When User selects date, shift and clicks GO button
        And Select staffing from Staffing for Operations list and fill the steady name, radio and vehicle
        And Enter notes, sergeant name and click on save
        Then User should see success message for security schedule
        Then Delete one row from the security schedule and click on save

