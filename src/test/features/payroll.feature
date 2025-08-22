Feature:  Payroll Management Functionalities

    @sanity
    Scenario: Functionalities under payroll management
        Given TR user logged into the application
        Then TR user creates a new labor order
        Then TR user verifies that the labor order is pushed to the summary sheet and verifies the details
        Then TR user creates a timesheet for the same labor order
        Then user click on logout button
        Then Ops user logged into the application
        Then Ops user submits and approve the timesheet
        Then user open payroll managemnt dashboard 
        Then Click on batch number 
        Then Click on shift
        Then Verify Save Info functionality
        Then Verify View timehseet functionality
        Then Verify back button functionality
        Then Verify timehseet report
        Then Verify steady list report
        Then verify steady recap report
        Then user click on logout button
        Then TR management user logged into the application
        Then user open payroll managemnt dashboard
        Then Click on batch number 
        Then verify OCU log history
        Then verify download batch report
        Then Click on shift
        Then verify the link in child tab payroll-timesheet screen
        Then user click on logout button
        Then OCU user logged into the application
        Then OCU user does the Batch ready, batch Unready, SOTA Approval and verify difference report
        Then user click on logout button
        Then Accounting user logged into the application
        Then Accounting user does the final approval
        Then Accouting user does PMA un approval and SOTA Un approval

    @sanity
    Scenario: Verify Notify manager and remarks functionalities under OCU user
        Given TR user logged into the application
        Then TR user creates a new labor order
        Then TR user verifies that the labor order is pushed to the summary sheet and verifies the details
        Then TR user creates a timesheet for the same labor order
        Then user click on logout button
        Then Ops user logged into the application
        Then Ops user submits and approve the timesheet
        Then user click on logout button
        Then OCU user logged into the application
        Then OCU user does the Batch ready
        Then Click on shift
        Then verify the link in child tab payroll-timesheet screen
        Then Add remarks by OCU user
        Then verify Notify manager functionality
    