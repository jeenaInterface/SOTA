Feature: Security Labor Order Management

    Background: 
        Given Security management user logged into the application

    @sanity @securityLaborOrder
    Scenario: Create security labor order and verify report download
        When User navigates to security labor order page
        And User selects date and clicks GO button
        And User enters order date and time
        And User adds job details with following information:
            | Number of Jobs | Job Type | Start Time | Finish Time |
            | 1             | WATCHMAN  | 09:00      | 17:00       |
        And User adds remarks "Test security labor order"
        And User clicks Save button
        Then User should see success message for security labor order
        When User downloads the security labor report
        Then Report should be downloaded successfully

