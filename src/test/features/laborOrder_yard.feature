Feature: Yard Order and ops yard order timesheet functioanlities

    @auth1
    Scenario: TR user creates a new Yard order and then discards the order
        Given the user creates a new Yard order
        Then the user discards the Yard order

    @auth1
    Scenario: TR user creates, firms, pushes to summary sheet, and cancels a Yard order
        Given the user creates a new Yard order
        Then the user firm the Yard order
        Then the user push the Yard labor order to the summary sheet
        Then the user cancel the Yard order

    @sanity
    Scenario: The TR user creates a new yard order and discards it
        Given TR user logged into the application
        Given the user creates a new Yard order
        Then the user discards the Yard order

    @sanity
    Scenario: Verify Mandatory validation messages in yard order
        Given TR user logged into the application
        Then Verify that the appropriate validation message for start time field
        Then Verify that the appropriate validation message for steady name and steady count field in yard order


    @sanity
    Scenario: TR user creates, firms, pushes to summary sheet, and cancels a yard order
        Given TR user logged into the application
        Given the user creates a new Yard order
        Then the user firm the Yard order
        Then the user push the Yard labor order to the summary sheet
        Then the user cancel the Yard order

@sanity @yard
  Scenario: Yard Order Timesheet - Save without submit, Save and Submit, Reject, Approve, Remove Approval, Add new steady and Download Report
    Given TR user logged into the application
    Given the user creates a new Yard order
    Then the user push the Yard labor order to the summary sheet
    Given the user creates a timesheet for the yard order
    When the user saves the yard order without submitting it
    Then the user saves and submits the yard order
    Then user click on logout button
    Then Ops user logged into the application
    Then Ops user submits and approve the yard timesheet
    Then ops user reject the yard timesheet
    Then verify remove approval functionality of yard timehseet
    Then user click on logout button
    Then Timehseet entry user logged into the application
    Then Labor entry add new steady details and mgr comments and submit the yard order timehseet
    Then user click on logout button
    Then Ops user logged into the application
    Then Ops user submits and approve the yard timesheet
    Then the user verifies the download report functionality for the yard order
    Then user click on logout button