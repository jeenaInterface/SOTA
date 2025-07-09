Feature: Reports in SOTA APPLICATION

    @labororderReceiverLOG
    Scenario: VERIFY Labor Order Receiver Report
        Given TR user logged into the application
        Then I am on the Labor Order Receiver Report page
        Then Select One Jan 1 from the from date field
        And Select current date from the to date field
        And I click on the Search button
        Then Verify the ignore Functionalities
        Then Verify the add remarks Functionalities

    @LaborOrderDiscrepancies
    Scenario: VERIFY Labor Order Discrepancies Report
        Given TR user logged into the application
        # Then TR user creates a new labor order
        Then I am on the Labor Order Discrepancies Report page
        Then Verify Add Discrepancies Functionalities
        Then Verify Update Discrepancies Functionalities
        Then Verify discrepancies report downloaded successfully
        Then Verify discrepancies summary report downloaded successfully
        Then Verify Search Discrepancies Functionalities
        Then Verify Reset Discrepancies Functionalities
        Then Verify Delete Discrepancies Functionalities

    @DispatchNote
    Scenario: VERIFY Dispatch Note Report
        Given TR user logged into the application
        Then I am on the Dispatch Note Report page
        Then Verify Add Dispatch Note Functionalities
        Then Verify Update Dispatch Note Functionalities
        Then Verify Dispatch Note downloaded successfully
        Then Verify Search and Reset Dispatch Note Functionalities
        Then Verify Delete Dispatch Note Functionalities

    @steadyScheduleTrackingSheetReport
    Scenario: VERIFY Steady Schedule Tracking Sheet Report
        Given TR user logged into the application
        Then I am on the Steady Schedule Tracking Sheet Report page
        Then Click on Steady report button by select Tracking option and verify the report downloaded successfully
        Then Verify Steady Schedule Tracking Sheet Report reset functionalities
        Then Click on Steady report button by select schedule option and verify the report downloaded successfully

    @timesheetSteadyReport
    Scenario: VERIFY Timesheet Steady Report
        Given TR user logged into the application
        Then I am on the Timesheet Steady Report page
        Then Click on timesheet Steady report button and verify the report downloaded successfully

    @timesheetReport
    Scenario: VERIFY Timesheet Steady Report with date range
        Given TR user logged into the application
        Then I am on the Timesheet Report page
        Then Click on timesheet Report button with date range and verify the report downloaded successfully

    @TimesheetReviewRecapReport
    Scenario: VERIFY Timesheet Review Recap Report
        Given TR user logged into the application
        Then I am on the Timesheet Review Recap Report page
        Then Click on timesheet Review Recap report button and verify the report downloaded successfully

    @SteadyJobAssignmentsDuplicateCheckReport
    Scenario: VERIFY Steady Job Assignments Duplicate Check Report
        Given TR user logged into the application
        Then I am on the Steady Job Assignments Duplicate Check Report page
        Then Click on Steady Job Assignments Duplicate Check report button and verify the report downloaded successfully
    
    @LaborOrderFinalizedTimesReport
    Scenario: VERIFY Labor Order Finalized Times Report
        Given TR user logged into the application
        Then I am on the Labor Order Finalized Times Report page
        Then Click on Labor Order Finalized Times report button and verify the report downloaded successfully
        Then Click on Finalized after deadlines report button and verify the report downloaded successfully

