Feature:  Payroll Management and OCU Dashboard Functionalities
    @POC
    Scenario: Functionalities under payroll management dashboard
        Given TR user logged into the application
        Then TR user creates a new labor order
        Then TR user verifies that the labor order is pushed to the summary sheet and verifies the details
        Then TR user creates a timesheet for the same labor order
        Then user click on logout button
        Then Ops user logged into the application
        Then Ops user submits and approve the timesheet
        Then user open payroll managemnt dashboard
        Then Click on batch number 
        Then Verify OCU Log history
        Then verify download batch report
        Then user click on logout button
        Then Accounting user logged into the application
        Then Accounting user does the final approval