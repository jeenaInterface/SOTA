# Automated the following test scenarios as a proof of concept (POC).​
# Test cases are written in the feature file using Gherkin syntax.

Feature:  Yard order Functionalities - Yard Order, Summary Sheet, Timesheet, SOTA Approval and pma Approval
    @POC
    Scenario: Workflow from Yard Order creation to PMA approval started by TR user
        Given TR user logged into the application
        Then TR user creates a new labor order
        Then TR user verifies that the labor order is pushed to the summary sheet and verifies the details
        Then TR user creates a timesheet for the same labor order
        Then user click on logout button
        Then Ops user logged into the application
        Then Ops user submits and approve the timesheet
        Then user click on logout button
        Then OCU user logged into the application
        Then OCU user does the Batch ready and SOTA approval
        Then user click on logout button
        Then Accounting user logged into the application
        Then Accounting user does the final approval

@sanity
Scenario: Verify the mandatory validations in Yard order
        Given TR user logged into the application
        Then TR user creates a new labor order
        Then TR user creates a yard order timesheet for the same labor order without entering any details
        Then user click on logout button
        Then Ops user logged into the application
        Then Ops user click on save and submit button without entering any details in the timesheet
        Then Delete one timesheet row and click on save without save button
        Then Enter 10 on ST field and click on save and submit button
        Then Verify validation message is showing if enter value greater than 8 hours in ST field
        Then Enter 16 on OT field and click on save and submit button
        Then Verify validation message is showing if enter value greater than 15 hours in OT field
        Then Enter 10 on DFT field and click on save and submit button
        Then Verify validation message is showing if enter value greater than 2 hours in DFT field
        Then user click on logout button

 


