Feature: Labor Order Difference Report
    As a user
    I want to generate the Labor Order Difference Report
    So that I can view labor order differences for a selected date and shift

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

@steadySchedukeleTrackingSheetReport
    Scenario: VERIFY Steady Schedule Tracking Sheet Report
        Given TR user logged into the application
        Then I am on the Steady Schedule Tracking Sheet Report page
        Then Verify Add Steady Schedule Tracking Sheet Functionalities
        Then Verify Update Steady Schedule Tracking Sheet Functionalities
        Then Verify Steady Schedule Tracking Sheet downloaded successfully
        Then Verify Search and Reset Steady Schedule Tracking Sheet Functionalities
        Then Verify Delete Steady Schedule Tracking Sheet Functionalities
