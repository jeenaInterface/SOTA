Feature: Steady Schedule Functionalities
    As a user of the system
    I want to manage steady schedules
    So that I can maintain and track steady assignments

    Background: 
        Given User is logged into the application
        And User navigates to the steady schedule page

    @steady @smoke
    Scenario: Create and save a new steady schedule
        When User selects a work date for steady schedule
        And User clicks on GO button
        And User adds steady details with following information:
            | Number of Jobs | Job Type | Start Time | Finish Time |
            | 1             | Regular  | 09:00      | 17:00       |
        And User adds remarks "Test steady schedule"
        And User clicks on Save button
        Then User should see success message for steady schedule

    @steady @regression
    Scenario: Update existing steady schedule
        When User selects a work date for steady schedule
        And User clicks on GO button
        And User updates steady details with following information:
            | Number of Jobs | Job Type | Start Time | Finish Time |
            | 2             | Regular  | 08:00      | 16:00       |
        And User updates remarks to "Updated steady schedule"
        And User clicks on Save button
        Then User should see success message for steady schedule

    @steady @regression
    Scenario: Verify validation for required fields in steady schedule
        When User selects a work date for steady schedule
        And User clicks on GO button
        And User tries to save without entering mandatory fields
        Then User should see validation messages for required fields

    @steady @regression
    Scenario: Cancel steady schedule creation
        When User selects a work date for steady schedule
        And User clicks on GO button
        And User adds steady details with following information:
            | Number of Jobs | Job Type | Start Time | Finish Time |
            | 1             | Regular  | 09:00      | 17:00       |
        And User clicks on Cancel button
        Then User should be returned to steady schedule list without saving
