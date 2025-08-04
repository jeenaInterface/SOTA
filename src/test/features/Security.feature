Feature: Security Labor Order Management

    Background: 
        Given Security management user logged into the application

    @securityLaborOrder
    Scenario: Create security labor order and verify report download
        When User navigates to security labor order page
        When User selects date and clicks GO button
        And User enters order date and time
        And User adds job details with following information:
            | Number of Jobs | Job Type | Start Time | Finish Time | remarks |
            | 5              | WATCHMAN   | 08:00      | 10:00       | Test remark 1 |
            | 2              | WATCHMAN   | 10:00      | 12:00       | Test remark 2 |
        And User clicks Save button
        Then User should see success message for security labor order
        Then Delete one row from the security labor order
        Then verify cancel functionality
        When User downloads the security labor report


    @securityLaborOrderValidation
    Scenario: Verify Mandatory field validations
        When User navigates to security labor order page
        And User selects date and clicks GO button
        And User clicks Save button
        Then User should see message for Mandatory fields


    @securityLaborOrderValidation
    Scenario: Verify duplicate entry validation
        When User navigates to security labor order page
        When User selects date and clicks GO button
        And User enters order date and time
        And User adds job details with following information:
            | Number of Jobs | Job Type | Start Time | Finish Time | remarks |
            | 5              | WATCHMAN   | 08:00      | 10:00       | Test remark 1 |
            | 5              | WATCHMAN   | 08:00      | 10:00       | Test remark 1 |
        And User clicks Save button
        Then User should see validation message for duplicate entry
