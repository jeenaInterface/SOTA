Feature: Rail Order by TR Management User - Create, Discard, Firm, Push to Summary Sheet, and Cancel rail  Orders

  @rail
  Scenario: TR user creates a new Rail order and then discards the order
    Given the user creates a new Rail order
    Then the user discards the Rail order

  @auth1
  Scenario: TR user creates, firms, pushes to summary sheet, and cancels a Rail order
    Given the user creates a new Rail order
    Then the user firm the Rail order
    Then the user push the Rail labor order to the summary sheet
    Then the user cancel the Rail order

  @auth1
  Scenario: TR user creates a rail order timesheet and verifies save without submit, save and submit, and download report functionalities
    Given the user creates a new Rail order
    Then the user push the Rail labor order to the summary sheet
    Given the user creates a new rail timesheet
    When the user saves the rail order without submitting it
    Then the user saves and submits the rail order
    Then user click on logout button
    Then Ops user logged into the application
    Then Ops user submits and approve the rail timesheet
    Then ops user reject the rail timesheet
    Then verify remove approval functionality in rail timehseet
    Then user click on logout button
    Then Timehseet entry user logged into the application
    Then Labor entry add new steady details and mgr comments and submit the rail order timehseet
    Then user click on logout button
    Then Ops user logged into the application
    Then Ops user submits and approve the rail order timesheet
    Then the user verifies the download report functionality for the rail order
    Then user click on logout button

