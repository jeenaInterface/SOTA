Feature: Steady Schedule Functionalities
    As a user of the system
    I want to manage steady schedules
    So that I can maintain and track steady assignments

    Background: 
        Given TR user logged into the application
        And User navigates to the steady schedule page

    @steadyschedule @sanity
    Scenario: Update steady schedule
        And User clicks on GO button
        And Select Job code for some steadies under CO tab
        Then Enter remarks for first row
        And User clicks on Save button
        Then User should see success message for steady schedule
        And Verify total and guarantee value
        And Select Job code for some steadies under FM tab
        Then Enter remarks for first row
        And User clicks on Save button
        Then User should see success message for steady schedule
        And Verify total and guarantee value
        And Select Job code for some steadies under Vessel tab
        Then Enter remarks for first row
        And User clicks on Save button
        Then User should see success message for steady schedule
        And Select Job code for some steadies under Yard tab
        Then Enter remarks for first row
        And User clicks on Save button
        Then User should see success message for steady schedule
        And Select Job code for some steadies under Rail tab
        Then Enter remarks for first row
        And User clicks on Save button
        Then User should see success message for steady schedule
        And Select Job code for some steadies under TSRV tab
        Then Enter remarks for first row
        And User clicks on Save button
        Then User should see success message for steady schedule


