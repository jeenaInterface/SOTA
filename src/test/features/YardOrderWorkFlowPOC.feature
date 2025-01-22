# Automated the following test scenarios as a proof of concept (POC).​
# Test cases are written in the feature file using Gherkin syntax. 

Feature:  Yard order Functionalities - Yard Order, Summary Sheet, Timesheet, SOTA Approval and pma Approval
@auth1
Scenario: Workflow from Yard Order creation to PMA approval started by TR user
    Given TR user logged into the application
    Then TR user creates a new labor order
    # Then TR user verifies that the labor order is pushed to the summary sheet and verifies the details
    # Then TR user creates a timesheet for the same labor order
    Then user click on logout button
    # Then Ops user logged into the application
    # Then Ops user submits and approve the timesheet
    # Then user click on logout button
    Then OCU user logged into the application
    Then OCU user does the Batch ready and SOTA approval
    Then user click on logout button
    Then Accounting user logged into the application
    Then Accounting user does the final approval


    
